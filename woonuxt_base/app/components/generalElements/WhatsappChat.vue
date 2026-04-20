<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { whatsappNumber } from '../../constants';

const isChatOpen = ref(false);
const showTyping = ref(false);

const defaultMessage = "Hi! I'm interested in learning more about your products and services.";

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;

  if (isChatOpen.value) {
    // Simulate typing indicator briefly when chat opens
    setTimeout(() => {
      showTyping.value = true;
      setTimeout(() => {
        showTyping.value = false;
      }, 2000);
    }, 500);
  }
};

const openWhatsApp = () => {
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Close chat when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.whatsapp-chat-widget') && isChatOpen.value) {
    isChatOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
<template>
  <div class="whatsapp-chat-widget">
    <!-- Floating Chat Button -->
    <Transition name="bounce">
      <button v-if="!isChatOpen" @click="toggleChat" class="floating-chat-btn" aria-label="Open chat">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"
            fill="currentColor" />
        </svg>
        <span class="chat-notification">1</span>
      </button>
    </Transition>

    <!-- Chat Widget -->
    <Transition name="slide-up">
      <div v-if="isChatOpen" class="chat-widget">
        <!-- Chat Header -->
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="agent-avatar">
              <img src="/images/avatar2.jpeg" alt="Support Agent" />
              <div class="online-indicator"></div>
            </div>
            <div class="agent-details">
              <h4>Customer Support</h4>
              <p class="status">Online - Usually replies in a few minutes</p>
            </div>
          </div>
          <button @click="toggleChat" class="close-btn" aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Chat Messages -->
        <div class="chat-messages">
          <div class="message agent-message">
            <div class="message-content">
              <p>👋 Hi there! How can we help you today?</p>
              <span class="message-time">{{ formatTime(new Date()) }}</span>
            </div>
          </div>

          <div class="message agent-message">
            <div class="message-content">
              <p>Feel free to ask any questions about our products or services!</p>
              <span class="message-time">{{ formatTime(new Date(Date.now() - 30000)) }}</span>
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div class="chat-input-area">
          <div class="typing-indicator" v-if="showTyping">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div class="chat-input-container">
            <div class="chat-input" @click="openWhatsApp" contenteditable="false">
              <span class="placeholder">Type your message...</span>
            </div>
            <button @click="openWhatsApp" class="send-btn" aria-label="Send message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9"></polygon>
              </svg>
            </button>
          </div>

          <div class="powered-by">
            <span>Click to continue on WhatsApp</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.whatsapp-chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Floating Chat Button */
.floating-chat-btn {
  width: 60px;
  height: 60px;
  background: #25d366;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
  transition: all 0.3s ease;
  position: relative;
}

.floating-chat-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
}

.chat-notification {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* Chat Widget */
.chat-widget {
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 20px;
}

/* Chat Header */
.chat-header {
  background: #25d366;
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-avatar {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #4caf50;
  border: 2px solid white;
  border-radius: 50%;
}

.agent-details h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.status {
  margin: 0;
  font-size: 12px;
  opacity: 0.9;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: #f8f9fa;
}

.message {
  margin-bottom: 16px;
}

.agent-message .message-content {
  background: white;
  padding: 12px 16px;
  border-radius: 18px 18px 18px 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  word-wrap: break-word;
}

.message-content p {
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.message-time {
  font-size: 11px;
  color: #666;
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  margin-bottom: 8px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #999;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

/* Chat Input */
.chat-input-area {
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  background: white;
}

.chat-input-container {
  display: flex;
  gap: 8px;
  align-items: center;
}

.chat-input {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 12px 16px;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 20px;
}

.chat-input:hover {
  border-color: #25d366;
  background: white;
}

.placeholder {
  color: #999;
  user-select: none;
}

.send-btn {
  width: 40px;
  height: 40px;
  background: #25d366;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.send-btn:hover {
  background: #128c7e;
  transform: scale(1.05);
}

.powered-by {
  text-align: center;
  margin-top: 8px;
}

.powered-by span {
  font-size: 11px;
  color: #666;
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 12px;
}

/* Animations */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-out 0.3s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}

.slide-up-enter-active {
  animation: slide-up-in 0.3s ease-out;
}

.slide-up-leave-active {
  animation: slide-up-out 0.3s ease-in;
}

@keyframes slide-up-in {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-up-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

/* Mobile Responsive */
@media (max-width: 480px) {
  .chat-widget {
    width: calc(100vw - 40px);
    height: calc(100vh - 100px);
    max-height: 600px;
  }

  .floating-chat-btn {
    width: 50px;
    height: 50px;
  }
}
</style>
