const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('mobile-menu');

function setMenu(open) {
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

toggle.addEventListener('click', () => setMenu(menu.hidden));
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});

// Show the public Java Edition server's player count. GitHub Pages cannot
// connect to a Minecraft server directly, so we use a status API instead.
const serverAddress = 'blitzffa.net';
const statusBox = document.getElementById('server-status');
const playerCount = document.getElementById('player-count');
const copyButton = document.getElementById('copy-server-ip');

async function updatePlayerCount() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const url = `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(serverAddress)}?query=false`;
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Status API returned ${response.status}`);

    const data = await response.json();
    const count = data?.players?.online;
    if (data.online === true && Number.isInteger(count) && count >= 0) {
      statusBox.dataset.state = 'online';
      playerCount.textContent = `${count.toLocaleString()} ${count === 1 ? 'player' : 'players'} online`;
    } else if (data.online === false) {
      statusBox.dataset.state = 'offline';
      playerCount.textContent = 'Server offline';
    } else {
      throw new Error('Player count missing');
    }
  } catch (error) {
    statusBox.dataset.state = 'unavailable';
    playerCount.textContent = 'Player count unavailable';
    console.warn('Could not load Minecraft server status:', error);
  } finally {
    clearTimeout(timeout);
  }
}

updatePlayerCount();
setInterval(updatePlayerCount, 60_000);

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(serverAddress);
    copyButton.textContent = 'Copied!';
    setTimeout(() => { copyButton.textContent = `${serverAddress} ⧉`; }, 1800);
  } catch {
    copyButton.textContent = serverAddress;
  }
});
