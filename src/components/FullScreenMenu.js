/**
 * Full-Screen Editorial Menu Component
 * Pradyumna Law Associates
 */
export function initFullScreenMenu() {
  const menuBtn = document.querySelector('.menu-toggle-btn');
  const closeBtn = document.querySelector('.menu-close-btn');
  const overlay = document.querySelector('.fullscreen-menu-overlay');
  const navLinks = document.querySelectorAll('.menu-nav-link, .menu-bottom-links a, .menu-sidebar a');

  if (!menuBtn || !overlay) return;

  function openMenu() {
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    
    // Focus close button or first nav link for accessibility
    setTimeout(() => {
      if (closeBtn) closeBtn.focus();
    }, 150);
  }

  function closeMenu() {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    menuBtn.focus();
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('is-active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close when clicking any navigation link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeMenu();
    }
  });
}
