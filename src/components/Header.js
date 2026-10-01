/**
 * Header Component & Dynamic Contrast Controller
 * Pradyumna Law Associates
 */
export function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Observe all sections marked as theme-light to invert header contrast
  const lightSections = document.querySelectorAll('.chapter-section.theme-light');
  
  if ('IntersectionObserver' in window && lightSections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    };

    const headerObserver = new IntersectionObserver((entries) => {
      let isOverLight = false;
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Check if top of viewport collides with section
        if (rect.top <= 80 && rect.bottom >= 80) {
          isOverLight = true;
        }
      });

      if (isOverLight) {
        header.classList.add('theme-light-active');
      } else {
        header.classList.remove('theme-light-active');
      }
    }, observerOptions);

    // Also attach scroll listener for high-precision boundary tracking
    window.addEventListener('scroll', () => {
      let isOverLight = false;
      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          isOverLight = true;
        }
      });

      if (isOverLight) {
        header.classList.add('theme-light-active');
      } else {
        header.classList.remove('theme-light-active');
      }
    }, { passive: true });

    lightSections.forEach(sec => headerObserver.observe(sec));
  }
}
