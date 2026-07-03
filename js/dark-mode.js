const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const current =
    root.getAttribute('data-theme') ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');

  setTheme(current === 'dark' ? 'light' : 'dark');
}

// Wire up your toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
