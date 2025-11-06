/**
 * Cloudflare Pages Function - Chat API
 * يقرأ System Prompt من ملف config.json
 */

// قراءة ملف config.json
import config from '../../config.json';

/**
 * استدعاء Gemini API
 */
async function callGeminiAPI(messages, env) {
  try {
    const contents = [];
    
    // إضافة System Prompt من ملف config.json
    contents.push({
      role: 'user',
      parts: [{ text: config.systemPrompt }]
    });
    
    contents.push({
      role: 'model',
      parts: [{ text: 'فهمت تماماً. أنا جاهز للعمل كمُشخِّص ذكي وفقاً للتعليمات.' }]
    });
    
    // إضافة سجل المحادثة
    messages.forEach(msg => {
      if (msg.role === 'user') {
        contents.push({
          role: 'user',
          parts: [{ text: msg.content }]
        });
      } else if (msg.role === 'assistant') {
        contents.push({
          role: 'model',
          parts: [{ text: msg.content }]
        });
      }
    });
    
    // إرسال الطلب إلى Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: config.temperature,
            maxOutputTokens: config.maxTokens,
          }
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        return candidate.content.parts[0].text;
      }
    }
    
    throw new Error('No valid response from Gemini API');
    
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

/**
 * إرسال إشعار إلى خدمة الإشعارات
 */
async function sendNotificationToService(conversationHistory, env) {
  try {
    const timestamp = new Date().toLocaleString('ar-SA', { timeZone: 'Asia/Riyadh' });
    
    let conversationText = '';
    conversationHistory.forEach((msg) => {
      if (msg.role === 'user') {
        conversationText += `العميل: ${msg.content}\n\n`;
      } else if (msg.role === 'assistant') {
        conversationText += `البوت: ${msg.content}\n\n`;
      }
    });
    
    const metadata = {
      'التاريخ والوقت': timestamp,
      'عدد الرسائل': conversationHistory.length,
      'المصدر': 'Gemini Chatbot - Al-Fares Center'
    };
    
    const notificationPayload = {
      source: 'Gemini Chatbot - مركز الفارس',
      subject: '🔔 تقرير محادثة جديدة',
      content: conversationText,
      metadata: metadata
    };
    
    const response = await fetch(env.NOTIFICATION_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationPayload)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Notification service error: ${response.status} - ${errorText}`);
    }
    
    console.log('✅ تم إرسال الإشعار بنجاح');
    return await response.json();
    
  } catch (error) {
    console.error('❌ فشل إرسال الإشعار:', error.message);
    throw error;
  }
}

/**
 * Cloudflare Pages Function Handler
 */
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // قراءة البيانات من الطلب
    const { history, newMessage } = await request.json();
    
    // بناء رسائل للإرسال إلى Gemini
    const messages = [];
    
    if (history && history.length > 0) {
      history.forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      });
    }
    
    messages.push({
      role: 'user',
      content: newMessage
    });
    
    // استدعاء Gemini API
    const botResponse = await callGeminiAPI(messages, env);
    
    // التحقق من نهاية المحادثة
    if (botResponse.includes('[END_OF_CONVERSATION]')) {
      const cleanResponse = botResponse.replace('[END_OF_CONVERSATION]', '').trim();
      
      const fullHistory = [
        ...history,
        { role: 'user', content: newMessage },
        { role: 'assistant', content: cleanResponse }
      ];
      
      // إرسال الإشعار بشكل غير متزامن
      context.waitUntil(sendNotificationToService(fullHistory, env));
      
      return new Response(JSON.stringify({ response: cleanResponse }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ response: botResponse }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
