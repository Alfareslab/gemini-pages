# 🚀 Gemini Chatbot with Cloudflare Pages

---

## 📋 نظرة عامة

هذا المشروع هو موقع ويب تجريبي لاختبار **Gemini 2.0 Flash**، مبني باستخدام **Cloudflare Pages** و **Cloudflare Pages Functions**.

المشروع مصمم ليكون سهل التعديل والنشر عبر **GitHub**.

## 🎯 الهدف

- ✅ **سهولة التعديل:** تعديل "عقل" الشات بوت من ملف JSON منفصل.
- ✅ **سهولة النشر:** نشر تلقائي عبر GitHub إلى Cloudflare Pages.
- ✅ **أداء ممتاز:** استخدام Gemini للحصول على أفضل النتائج باللغة العربية.

---

## 🔧 المتطلبات التقنية

- **Frontend:** HTML + CSS + Vanilla JavaScript
- **Backend:** Cloudflare Pages Functions
- **AI Model:** Google Gemini 2.0 Flash (via API)
- **Deployment:** GitHub + Cloudflare Pages

---

## 📂 بنية المشروع

```
gemini-pages/
├── functions/                # Cloudflare Pages Functions
│   └── api/
│       └── chat.js           # Backend (Gemini + Notifications)
├── app.js                    # منطق الواجهة الأمامية
├── index.html                # صفحة الشات بوت
├── style.css                 # التصميم
└── config.json               # 🧠 عقل الشات بوت (System Prompt)
```

---

## ⚙️ الإعداد والنشر (GitHub + Cloudflare Pages)

### الخطوة 1: إنشاء مستودع على GitHub

1. اذهب إلى [GitHub](https://github.com/new) وأنشئ مستودعاً جديداً (خاص أو عام).
2. ارفع جميع ملفات المشروع إلى المستودع.

### الخطوة 2: إنشاء مشروع على Cloudflare Pages

1. اذهب إلى **Cloudflare Dashboard** > **Workers & Pages**.
2. انقر على **Create application** > **Pages** > **Connect to Git**.
3. اختر المستودع الذي أنشأته.
4. في **Build settings**، اترك الإعدادات الافتراضية (لا حاجة لإعدادات بناء).
5. انقر على **Save and Deploy**.

### الخطوة 3: إضافة المتغيرات السرية

1. بعد النشر، اذهب إلى **Settings** > **Environment variables**.
2. أضف المتغيرات التالية (انقر على **Encrypt** لإضافتها كمتغيرات سرية):

   - **`GEMINI_API_KEY`**: مفتاح Gemini API الخاص بك.
   - **`NOTIFICATION_SERVICE_URL`**: رابط خدمة الإشعارات.

3. انقر على **Save**.

### الخطوة 4: إعادة النشر

اذهب إلى **Deployments** وانقر على **Retry deployment** لتطبيق المتغيرات.

---

## 🧠 كيفية تعديل "عقل" الشات بوت

**هذه هي الميزة الأهم!**

1. افتح ملف **`config.json`**.
2. عدّل قيمة **`systemPrompt`** كما تريد.
3. احفظ الملف وادفعه إلى GitHub (`git push`).

**Cloudflare Pages سيقوم بإعادة النشر تلقائياً بالتغييرات الجديدة!**

---

## 🧪 الاختبار المحلي (اختياري)

إذا أردت اختبار المشروع محلياً:

1. **ثبّت Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **أنشئ ملف `.dev.vars`:**
   ```
   GEMINI_API_KEY=your_gemini_api_key
   NOTIFICATION_SERVICE_URL=your_notification_service_url
   ```

3. **شغّل المشروع:**
   ```bash
   wrangler pages dev .
   ```

4. **افتح المتصفح:** `http://localhost:8788`

---

## 📝 ملاحظات مهمة

- **`config.json`**: هذا الملف هو "العقل"، عدّله بحرية.
- **`functions/api/chat.js`**: هذا هو "القلب"، لا تعدّله إلا إذا أردت تغيير منطق الـ Backend.
- **المتغيرات السرية**: يجب إضافتها في Cloudflare Pages ليعمل المشروع المنشور.

---

**المشروع جاهز للنشر! 🚀**
