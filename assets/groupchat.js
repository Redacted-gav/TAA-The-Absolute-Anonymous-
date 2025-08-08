// Make sure Firebase compat SDK scripts are loaded via <script> tags in your HTML

// Your Firebase config — replace with your own config as needed
const firebaseConfig = {
  apiKey: "AIzaSyCvHg1BxV_DSjykPszTcmsZVtkTwP2NTE4",
  authDomain: "taa-file.firebaseapp.com",
  databaseURL: "https://taa-file-default-rtdb.firebaseio.com",
  projectId: "taa-file",
  storageBucket: "taa-file.firebasestorage.app",
  messagingSenderId: "27982660641",
  appId: "1:27982660641:web:208b26f51ac9875f65cf60",
  measurementId: "G-V8YC9ED50K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function setupGroupChat() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const usernameInput = document.getElementById('username-input');

  if (!chatWindow || !chatInput || !sendBtn || !usernameInput) return;

  // Load saved username from localStorage
  usernameInput.value = localStorage.getItem('taa_username') || '';

  usernameInput.addEventListener('change', () => {
    localStorage.setItem('taa_username', usernameInput.value.trim());
  });

  function appendMessage(msg, isUser = false) {
    const message = document.createElement('div');
    message.style.padding = '0.3rem 0.5rem';
    message.style.margin = '0.2rem 0';
    message.style.borderRadius = '5px';
    message.style.backgroundColor = isUser ? '#ff5252' : '#333';
    message.style.color = isUser ? 'white' : '#ccc';

    message.innerHTML = `<strong>${msg.name || '?'}:</strong> ${msg.text}`;

    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  const messagesRef = db.ref('chat/messages');

  messagesRef.off();
  messagesRef.on('child_added', snapshot => {
    const msg = snapshot.val();
    appendMessage(msg, false);

    // Trim messages to latest 50
    messagesRef.once('value', snap => {
      const messages = snap.val();
      const keys = messages ? Object.keys(messages) : [];
      if (keys.length > 50) {
        // Sort by timestamp ascending to find oldest
        const sortedKeys = keys.sort((a, b) => messages[a].timestamp - messages[b].timestamp);
        const oldestKey = sortedKeys[0];
        messagesRef.child(oldestKey).remove();
      }
    });
  });

  sendBtn.onclick = () => {
    const text = chatInput.value.trim();
    const name = usernameInput.value.trim() || "Anon";
    if (!text) return;

    messagesRef.push({
      name: name,
      text: text,
      timestamp: Date.now()
    });

    chatInput.value = '';
  };

  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      sendBtn.click();
    }
  });
}

