// Chat History
let chatHistory = [];

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const resetButton = document.getElementById('resetButton');
const typingIndicator = document.getElementById('typingIndicator');

// Event Listeners
sendButton.addEventListener('click', sendMessage);
resetButton.addEventListener('click', resetConversation);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Send Message Function
async function sendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Disable input while processing
    userInput.disabled = true;
    sendButton.disabled = true;
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    userInput.value = '';
    
    // Show typing indicator
    typingIndicator.classList.add('active');
    
    try {
        // Send to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                history: chatHistory,
                newMessage: message
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Hide typing indicator
        typingIndicator.classList.remove('active');
        
        // Add bot response to chat
        addMessage(data.response, 'bot');
        
    } catch (error) {
        console.error('Error:', error);
        typingIndicator.classList.remove('active');
        addMessage('عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى. | Sorry, a connection error occurred. Please try again.', 'bot');
    } finally {
        // Re-enable input
        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
    }
}

// Add Message to Chat
function addMessage(content, role) {
    // Add to history
    chatHistory.push({ role, content });
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(messageContent);
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Reset Conversation
function resetConversation() {
    if (chatHistory.length === 0) return;
    
    if (confirm('هل أنت متأكد من إعادة تعيين المحادثة؟ | Are you sure you want to reset the conversation?')) {
        chatHistory = [];
        
        // Clear chat container
        chatContainer.innerHTML = `
            <div class="welcome-message">
                <div class="message bot-message">
                    <div class="message-content">
                        مرحباً بك في مركز الفارس | Welcome to Al-Fares Center. أنا مساعدك التقني (Llama 3 Test)، كيف يمكنني مساعدتك اليوم؟
                    </div>
                </div>
            </div>
        `;
        
        userInput.value = '';
        userInput.focus();
    }
}

// Focus input on load
window.addEventListener('load', () => {
    userInput.focus();
});
