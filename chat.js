const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const currentUserName = document.getElementById('current-user-name');
const currentUserPic = document.getElementById('current-user-pic');

// Simulated chat data
const chatData = {
    'Ajith koli': [
        { sender: 'Ajith koli', message: 'Hey! How are you?', time: '10:00 AM' },
        { sender: 'You', message: 'I am good, thanks!', time: '10:05 AM' },
    ],
    'Akash MS': [
        { sender: 'Akash MS', message: 'Let\'s Do it!', time: '11:00 AM' },
        { sender: 'You', message: 'Sure! Let me know when.', time: '11:10 AM' },
    ]
};

// Function to load chat history
function loadChat(userName) {
    currentUserName.textContent = userName;
    chatBox.innerHTML = ''; // Clear chat box
    const messages = chatData[userName] || [];
    messages.forEach(msg => {
        addMessage(msg.message, msg.sender === 'You');
    });

    // Simulate receiving new messages in real-time
  
}

// Function to add a message to the chat box
function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'right' : 'left');
    messageDiv.innerHTML = `<div class="message-text">${message}</div>`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Send message
sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        const userName = currentUserName.textContent;

        // Add the user's message to the chat data
        if (!chatData[userName]) {
            chatData[userName] = [];
        }
        chatData[userName].push({ sender: 'You', message: message, time: new Date().toLocaleTimeString() });

        // Add the message to the chat interface
        addMessage(message, true);
        chatInput.value = ''; // Clear input field
    }
});

// Load the first chat by default when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    loadChat('Ajith koli'); // Load chat for Ajith Koli by default
});
