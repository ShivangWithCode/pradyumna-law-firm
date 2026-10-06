/**
 * Full-Screen Editorial Menu Component
 * Exact Khaitan & Co Split Screen Experience
 * Pradyumna Law Associates
 */
import { siteConfig } from '../data/siteConfig.js';

export function initFullScreenMenu() {
  const menuBtn = document.querySelector('.menu-toggle-btn');
  const overlay = document.querySelector('.fullscreen-menu-overlay');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.kh-menu-close-trigger, .menu-close-btn');
  const searchBtn = overlay.querySelector('.kh-menu-search-trigger');
  const navLinks = overlay.querySelectorAll('.kh-menu-link, .menu-nav-link');

  function openMenu() {
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    
    // Focus close button for accessibility
    setTimeout(() => {
      if (closeBtn) closeBtn.focus();
    }, 150);
  }

  function closeMenu() {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
    document.body.classList.remove('menu-open');
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const isOpen = overlay.classList.contains('is-active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      closeMenu();
      setTimeout(() => {
        if (window.openSearchModal) window.openSearchModal();
      }, 150);
    });
  }

  // Handle Menu Navigation Actions
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const action = link.getAttribute('data-action');
      closeMenu();

      setTimeout(() => {
        switch (action) {
          case 'expertise':
            if (window.goToSlide) {
              window.goToSlide(0);
            }
            break;

          case 'credentials':
            if (window.openCredentialsModal) {
              window.openCredentialsModal();
            }
            break;

          case 'practice-areas':
            if (window.openExpertiseModal) {
              window.openExpertiseModal();
            }
            break;

          case 'inquiry':
            if (window.openInquiryModal) {
              window.openInquiryModal();
            } else {
              window.open(
                `https://wa.me/${siteConfig.contact.whatsAppNumber}?text=${encodeURIComponent('Hello Chambers, I would like to schedule a legal consultation.')}`,
                '_blank'
              );
            }
            break;

          case 'people':
            if (window.openTeamModal) {
              window.openTeamModal();
            } else if (window.goToSlide) {
              window.goToSlide(2);
            }
            break;

          case 'thought-leadership':
            if (window.goToSlide) window.goToSlide(1);
            break;

          case 'legacy':
            if (window.goToSlide) window.goToSlide(3);
            break;

          case 'news':
            if (window.goToSlide) window.goToSlide(1);
            break;

          case 'careers': {
            const emailTo = siteConfig.contact.email || 'pradyumna@pradyumnalaw.com';
            const ccEmail = 'Pradyumna.ptlo@gmail.com';
            const subject = encodeURIComponent('Career Application / CV Submission – Pradyumna Law Associates');
            const body = encodeURIComponent(
              'Dear Adv. Pradyumna Tyagi,\n\n' +
              'I am writing to express my interest in joining Pradyumna Law Associates. Please find attached my Curriculum Vitae (CV) for your consideration.\n\n' +
              'Applicant Name:\n' +
              'Contact Number:\n' +
              'Bar Council Enrollment No. (if applicable):\n' +
              'Years of PQE / Experience:\n' +
              'Primary Areas of Practice / Interest:\n\n' +
              'Regards,\n'
            );
            window.location.href = `mailto:${emailTo}?cc=${ccEmail}&subject=${subject}&body=${body}`;
            break;
          }

          case 'blog':
          case 'dei':
          case 'innovation':
            if (window.openSearchModal) {
              window.openSearchModal();
            }
            break;

          default:
            const slideIndex = link.getAttribute('data-slide-index');
            if (slideIndex !== null && window.goToSlide) {
              window.goToSlide(parseInt(slideIndex, 10));
            }
            break;
        }
      }, 200);
    });
  });

  // Close on ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeMenu();
    }
  });

  window.openMenu = openMenu;
  window.closeMenu = closeMenu;
}
