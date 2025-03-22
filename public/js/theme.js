// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved theme preference, otherwise use system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }

  // Create and add theme toggle button to navbar
  const navbarNav = document.querySelector('.navbar-nav.d-flex.flex-row');
  if (navbarNav && !document.querySelector('.theme-toggle')) {
    const themeToggle = document.createElement('li');
    themeToggle.className = 'nav-item';
    themeToggle.innerHTML = `
      <button class="theme-toggle" aria-label="Toggle theme">
        <i class="fas fa-moon"></i>
      </button>
    `;
    navbarNav.insertBefore(themeToggle, navbarNav.firstChild);

    // Add click event listener
    const toggleButton = themeToggle.querySelector('.theme-toggle');
    toggleButton.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update icon
      const icon = toggleButton.querySelector('i');
      icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Set initial icon
    const icon = toggleButton.querySelector('i');
    icon.className = document.documentElement.getAttribute('data-theme') === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}); 