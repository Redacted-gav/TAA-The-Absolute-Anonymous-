function loadPage(page) {
  const content = document.getElementById('content');

  if (!pages[page]) {
    content.innerHTML = `<p>Page not found.</p>`;
    return;
  }

  content.innerHTML = pages[page];

  switch (page) {
    case 'games':
      renderGames();
      break;
    case 'groupchat':
      setupGroupChat();
      break;
  }
}

/**
 * Normalize the game link to be relative and not start with slash or protocol.
 * This helps avoid file:/// root issues in local file context.
 */
function normalizeLink(link) {
  // Remove leading slashes
  link = link.replace(/^\/+/, '');
  // Remove file:// protocol if somehow present
  link = link.replace(/^file:\/\//, '');
  return link;
}

function renderGames() {
  const container = document.getElementById('games-container');
  if (!container) return;

  container.innerHTML = '';

  games.forEach(({ title, link }) => {
    const safeLink = normalizeLink(link);
    const url = safeLink.endsWith('/') ? `${safeLink}index.html` : `${safeLink}/index.html`;

    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <h3>${title}</h3>
      <a href="${url}" target="_blank" rel="noopener noreferrer">Play</a>
    `;
    container.appendChild(card);
  });
}


// Load home page by default
loadPage('home');

