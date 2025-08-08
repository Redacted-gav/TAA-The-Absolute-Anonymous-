function loadPage(page) {
  const content = document.getElementById('content');
  if (!(page in pages)) {
    content.innerHTML = `<p>Page not found.</p>`;
    return;
  }
  content.innerHTML = pages[page];

  if (page === 'games') {
    renderGames();
  } else if (page === 'groupchat') {
    setupGroupChat();
  }
}

function renderGames() {
  const container = document.getElementById('games-container');
  container.innerHTML = ''; // Clear previous content

  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <h3>${game.title}</h3>
      <a href="${game.link}" target="_blank" rel="noopener noreferrer">Play</a>
    `;
    container.appendChild(card);
  });
}

// Load home page by default
loadPage('home');

