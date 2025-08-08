const pages = {
  home: `
    <h2>Welcome to TAA</h2>
    <p>Your hub for unblocked games and tools.</p>
    <br>
    <p>Made by Emma</p>
  `,
  games: `
    <h2>Games</h2>
    <div id="games-container"></div>
  `,
groupchat: `
  <h2>Group Chat</h2>
  <div id="chat-window" style="height: 300px; overflow-y: auto; border: 1px solid #444; background: #121212; padding: 1rem; margin-bottom: 1rem;"></div>
  
  <input id="username-input" type="text" placeholder="Enter your name" style="width: 40%; padding: 0.5rem; margin-bottom: 0.5rem;" />
  
  <input id="chat-input" type="text" placeholder="Type a message..." style="width: 55%; padding: 0.5rem;" />
  <button id="send-btn" style="padding: 0.5rem 1rem; background: #ff5252; border: none; color: white; cursor: pointer;">Send</button>
`

};

