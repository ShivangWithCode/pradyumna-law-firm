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

  const totalSlides = slides.length;
  let currentIndex = 0;
  let isAnimating = false;
  const progressLine = document.querySelector('.kh-stepper-progress');
  const dots = document.querySelectorAll('.kh-step-dot');
  const stepper = document.querySelector('.kh-stepper');

  function updateStepperProgress(index) {
    try {
      if (!progressLine || dots.length === 0 || !stepper) return;
      const firstDot = dots[0];
      const targetDot = dots[index];
      if (!firstDot || !targetDot) return;

      const firstRect = firstDot.getBoundingClientRect();
      const targetRect = targetDot.getBoundingClientRect();
      const stepperRect = stepper.getBoundingClientRect();

      const topOffset = (firstRect.top + firstRect.height / 2) - stepperRect.top;
      const currentHeight = Math.max(0, (targetRect.top + targetRect.height / 2) - (firstRect.top + firstRect.height / 2));

      progressLine.style.top = `${topOffset}px`;
      progressLine.style.height = `${currentHeight}px`;
    } catch (e) {
      console.warn('Stepper progress calculation error:', e);
    }
  }

  function updateSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    currentIndex = index;
    isAnimating = true;

    // Hardware-accelerated smooth slide translate using dvh (dynamic viewport) to prevent mobile address-bar drift
    const unit = (window.CSS && CSS.supports && CSS.supports('height', '100dvh')) ? 'dvh' : 'vh';
    track.style.transform = `translate3d(0, -${currentIndex * 100}${unit}, 0)`;

    // Ensure all content containers are reset to top so text is never shifted or cut off
    slides.forEach(slide => {
      const container = slide.querySelector('.kh-content-container');
      if (container) container.scrollTop = 0;
    });

    // Update active class on slides to trigger Khaitan-style entrance animations
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('is-active');
      } else {
        slide.classList.remove('is-active');
      }
    });

    // Update stepper active classes
    stepperItems.forEach((item, i) => {
      if (i === currentIndex) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });

    // Animate the Option 3 stepper progress filling line
    updateStepperProgress(currentIndex);

    // Check if the current slide requires white logo and white menu icons
    const currentSlide = slides[currentIndex];
    const isMobile = window.innerWidth <= 768;
    const isDarkHeader = isMobile
      ? (currentIndex === 0 || currentIndex === 3)
      : (currentSlide.classList.contains('is-blue') || currentSlide.classList.contains('is-dark'));

    if (header) {
      if (isDarkHeader) {
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

  // Expose global navigation method
  window.goToSlide = updateSlide;

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

  // Advanced Multi-Directional Touch Swipe Engine for Mobile & Tablet
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let touchTarget = null;

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
    touchTarget = e.target;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (document.body.classList.contains('menu-open') || isAnimating) return;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (document.body.classList.contains('menu-open') || isAnimating) return;
    if (e.changedTouches.length !== 1) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    const elapsedTime = Date.now() - touchStartTime;

    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);

    // If tap without significant swipe movement, do nothing
    if (absX < 20 && absY < 20) return;

    // Check if touch originated inside an internal scrollable container on mobile
    const scrollContainer = touchTarget ? touchTarget.closest('.kh-content-container') : null;
    let allowVerticalSwipe = true;

    if (scrollContainer && scrollContainer.scrollHeight > scrollContainer.clientHeight + 8) {
      const isAtTop = scrollContainer.scrollTop <= 6;
      const isAtBottom = scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 6;

      if (diffY > 0 && !isAtBottom) {
        // User is scrolling DOWN inside the text card, don't flip the slide
        allowVerticalSwipe = false;
      } else if (diffY < 0 && !isAtTop) {
        // User is scrolling UP inside the text card, don't flip the slide
        allowVerticalSwipe = false;
      }
    }

    // 1. HORIZONTAL SWIPE (Swipe Left = Next, Swipe Right = Prev) - intuitive mobile UX
    if (absX > absY * 1.05) {
      const isFlick = elapsedTime < 360 && absX > 26;
      const isDrag = absX > 45;

      if (isFlick || isDrag) {
        if (diffX > 0 && currentIndex < totalSlides - 1) {
          updateSlide(currentIndex + 1);
        } else if (diffX < 0 && currentIndex > 0) {
          updateSlide(currentIndex - 1);
        }
      }
      return;
    }

    // 2. VERTICAL SWIPE (Swipe Up = Next, Swipe Down = Prev)
    if (allowVerticalSwipe && absY > absX * 1.05) {
      const isFlick = elapsedTime < 360 && absY > 26;
      const isDrag = absY > 45;

      if (isFlick || isDrag) {
        if (diffY > 0 && currentIndex < totalSlides - 1) {
          updateSlide(currentIndex + 1);
        } else if (diffY < 0 && currentIndex > 0) {
          updateSlide(currentIndex - 1);
        }
      }
    }
  }, { passive: true });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (document.body.classList.contains('menu-open') || isAnimating) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
      if (currentIndex < totalSlides - 1) {
        e.preventDefault();
        updateSlide(currentIndex + 1);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
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

  // Logo home click to smoothly go to Slide 0
  const logoLink = document.querySelector('.kh-header .kh-logo');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentIndex !== 0 && !isAnimating) {
        updateSlide(0);
      }
    });
  }

  // Window resize handler to recalculate stepper progress line geometry & track position
  window.addEventListener('resize', () => {
    const unit = (window.CSS && CSS.supports && CSS.supports('height', '100dvh')) ? 'dvh' : 'vh';
    track.style.transform = `translate3d(0, -${currentIndex * 100}${unit}, 0)`;
    updateStepperProgress(currentIndex);
    const isMobile = window.innerWidth <= 768;
    const isDarkHeader = isMobile
      ? (currentIndex === 0 || currentIndex === 3)
      : (slides[currentIndex]?.classList.contains('is-blue') || slides[currentIndex]?.classList.contains('is-dark'));
    if (header) {
      header.classList.toggle('theme-dark-logo', Boolean(isDarkHeader));
    }
  });

  // Initialize first slide
  updateSlide(0);
}
