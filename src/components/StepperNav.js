/**
 * Stepper Navigation & Viewport Slide Controller
 * Pradyumna Law Associates (Exact Khaitan & Co Interaction)
 */
export function initStepperNav() {
  const scroller = document.querySelector('.snap-scroller');
  const slides = document.querySelectorAll('.slide-section');
  const stepperItems = document.querySelectorAll('.stepper-nav-item');
  const scrollNextBtn = document.querySelector('.scroll-next-circle');
  const header = document.querySelector('.site-header');

  if (!scroller || slides.length === 0) return;

  const slideIds = Array.from(slides).map(s => s.id);

  function setActiveSlide(currentId) {
    stepperItems.forEach(item => {
      const targetId = item.getAttribute('data-target');
      if (targetId === currentId) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });

    const activeSlide = document.getElementById(currentId);
    if (!activeSlide) return;

    // Check if current slide has a light left-panel
    const isLight = activeSlide.classList.contains('theme-light-slide');
    if (header) {
      if (isLight) {
        header.classList.add('theme-light-active');
      } else {
        header.classList.remove('theme-light-active');
      }
    }
  }

  // Set up IntersectionObserver to detect the current slide
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveSlide(entry.target.id);
        }
      });
    }, {
      root: scroller,
      threshold: 0.5
    });

    slides.forEach(slide => observer.observe(slide));
  }

  // Stepper item clicks: smooth scroll to slide
  stepperItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      const targetSlide = document.getElementById(targetId);
      if (targetSlide) {
        targetSlide.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Scroll Next Circle Button click
  if (scrollNextBtn) {
    scrollNextBtn.addEventListener('click', () => {
      const currentActive = document.querySelector('.stepper-nav-item.is-active');
      const currentId = currentActive ? currentActive.getAttribute('data-target') : slideIds[0];
      const currentIndex = slideIds.indexOf(currentId);

      const nextIndex = (currentIndex + 1) % slideIds.length;
      const nextSlide = document.getElementById(slideIds[nextIndex]);
      if (nextSlide) {
        nextSlide.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
