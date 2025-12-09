// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const apiKeyModal = document.getElementById('apiKeyModal');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKey');

// Chat history for context
let conversationHistory = [
  {
    role: 'system',
    content: 'You are a helpful, friendly AI assistant. Provide clear and concise responses.'
  },
  {
    role: 'assistant',
    content: 'Hello! I\'m your AI assistant. How can I help you today?'
  }
];

// API Key Management
let apiKey = localStorage.getItem('openai_api_key');

// Check if API key exists
function checkApiKey() {
  if (apiKey) {
    apiKeyModal.classList.add('hidden');
  }
}

// Save API key
saveApiKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (key && key.startsWith('sk-')) {
    apiKey = key;
    localStorage.setItem('openai_api_key', key);
    apiKeyModal.classList.add('hidden');
    userInput.focus();
  } else {
    alert('Please enter a valid OpenAI API key (starts with sk-)');
  }
});

// Auto-resize textarea
userInput.addEventListener('input', () => {
  userInput.style.height = 'auto';
  userInput.style.height = Math.min(userInput.scrollHeight, 200) + 'px';
});

// Handle Enter key (Shift+Enter for new line)
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    chatForm.dispatchEvent(new Event('submit'));
  }
});

// Add message to chat UI
function addMessage(content, role, isImage = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;
  
  const avatar = role === 'user' ? '👤' : '🤖';
  const avatarBg = role === 'user' ? '#5436da' : '#19c37d';
  
  let contentHtml;
  if (isImage) {
    contentHtml = `<img src="${content}" alt="Generated image" class="generated-image" />`;
  } else {
    contentHtml = `<p>${escapeHtml(content)}</p>`;
  }
  
  messageDiv.innerHTML = `
    <div class="message-avatar" style="background: ${avatarBg}">${avatar}</div>
    <div class="message-content">
      ${contentHtml}
    </div>
  `;
  
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

// Add typing indicator
function addTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message assistant';
  typingDiv.id = 'typingIndicator';
  
  typingDiv.innerHTML = `
    <div class="message-avatar" style="background: #19c37d">🤖</div>
    <div class="message-content">
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
  const typing = document.getElementById('typingIndicator');
  if (typing) typing.remove();
}

// Scroll to bottom of chat
function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Generate image using DALL-E API
async function generateImage(prompt) {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Image generation failed');
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Send message to OpenAI API
async function sendMessage(userMessage) {
  // Add user message to history
  conversationHistory.push({
    role: 'user',
    content: userMessage
  });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: conversationHistory,
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API request failed');
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    // Add assistant response to history
    conversationHistory.push({
      role: 'assistant',
      content: assistantMessage
    });

    return assistantMessage;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Check if message is an image generation request
function isImageRequest(message) {
  return message.toLowerCase().startsWith('/image ');
}

// Extract image prompt from message
function getImagePrompt(message) {
  return message.slice(7).trim();
}

// Handle form submission
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const message = userInput.value.trim();
  if (!message) return;

  if (!apiKey) {
    apiKeyModal.classList.remove('hidden');
    return;
  }

  // Clear input and disable
  userInput.value = '';
  userInput.style.height = 'auto';
  sendBtn.disabled = true;

  // Add user message to UI
  addMessage(message, 'user');

  // Show typing indicator
  addTypingIndicator();

  try {
    // Check if it's an image generation request
    if (isImageRequest(message)) {
      const prompt = getImagePrompt(message);
      const imageUrl = await generateImage(prompt);
      
      removeTypingIndicator();
      addMessage(imageUrl, 'assistant', true);
      
      // Add to conversation history as text reference
      conversationHistory.push({
        role: 'user',
        content: `Generate an image: ${prompt}`
      });
      conversationHistory.push({
        role: 'assistant',
        content: `I generated an image based on: "${prompt}"`
      });
    } else {
      // Get AI response
      const response = await sendMessage(message);
      
      // Remove typing and add response
      removeTypingIndicator();
      addMessage(response, 'assistant');
    }
  } catch (error) {
    removeTypingIndicator();
    
    // Show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = `Error: ${error.message}`;
    chatMessages.appendChild(errorDiv);
    scrollToBottom();

    // Remove failed message from history if not image request
    if (!isImageRequest(message)) {
      conversationHistory.pop();
    }
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
  }
});

// Initialize
checkApiKey();
