/**
 * Khaitan-Style Fullpage Slide Engine
 * Pradyumna Law Associates
 */
export function initKhaitanSlider() {
  const track = document.querySelector('.kh-track');
  const slides = document.querySelectorAll('.kh-slide');
  const stepperItems = document.querySelectorAll('.kh-step-item');
  const scrollDownBtn = document.querySelector('.kh-scroll-down');
  const header = document.querySelector('.kh-header');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let isAnimating = false;
  const totalSlides = slides.length;

  function updateSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;
    isAnimating = true;

    // Hardware-accelerated smooth slide translate
    track.style.transform = `translate3d(0, -${currentIndex * 100}vh, 0)`;

    // Update stepper active classes
    stepperItems.forEach((item, i) => {
      if (i === currentIndex) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });

    // Check if the current slide requires white logo on left
    const currentSlide = slides[currentIndex];
    const isDarkLeft = currentSlide.classList.contains('is-blue') || currentSlide.classList.contains('is-dark');

    if (header) {
      if (isDarkLeft) {
        header.classList.add('theme-dark-logo');
      } else {
        header.classList.remove('theme-dark-logo');
      }
    }

    // Release animation lock after transition duration
    setTimeout(() => {
      isAnimating = false;
    }, 850);
  }

  // Wheel listener with threshold & debounce lock
  let wheelAccumulator = 0;
  window.addEventListener('wheel', (e) => {
    // If full-screen menu or search modal is open, ignore slider wheel
    if (document.body.classList.contains('menu-open')) return;

    wheelAccumulator += e.deltaY;

    if (Math.abs(wheelAccumulator) > 40 && !isAnimating) {
      if (wheelAccumulator > 0) {
        if (currentIndex < totalSlides - 1) {
          updateSlide(currentIndex + 1);
        }
      } else {
        if (currentIndex > 0) {
          updateSlide(currentIndex - 1);
        }
      }
      wheelAccumulator = 0;
    }
  }, { passive: true });

  // Touch Swipe for Mobile / Tablets
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (document.body.classList.contains('menu-open') || isAnimating) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < totalSlides - 1) {
        updateSlide(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        updateSlide(currentIndex - 1);
      }
    }
  }, { passive: true });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (document.body.classList.contains('menu-open') || isAnimating) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      if (currentIndex < totalSlides - 1) {
        e.preventDefault();
        updateSlide(currentIndex + 1);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      if (currentIndex > 0) {
        e.preventDefault();
        updateSlide(currentIndex - 1);
      }
    }
  });

  // Stepper clicks
  stepperItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isAnimating && index !== currentIndex) {
        updateSlide(index);
      }
    });
  });

  // Circular scroll down button
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      if (!isAnimating) {
        const next = (currentIndex + 1) % totalSlides;
        updateSlide(next);
      }
    });
  }

  // Initialize first slide
  updateSlide(0);
}
