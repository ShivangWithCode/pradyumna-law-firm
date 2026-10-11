/**
 * Chambers Inquiry & Consultation Modal Component
 * Pradyumna Law Associates
 */
import { siteConfig } from '../data/siteConfig.js';

let isInquiryModalOpen = false;

export function initInquiryModal() {
  const modalOverlay = document.getElementById('inquiry-modal');
  if (!modalOverlay) return;

  const closeBtn = modalOverlay.querySelector('.inquiry-modal-close-btn');

  function openModal() {
    modalOverlay.classList.add('is-open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    isInquiryModalOpen = true;
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    isInquiryModalOpen = false;
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isInquiryModalOpen) {
      closeModal();
    }
  });

  window.openInquiryModal = openModal;
  window.closeInquiryModal = closeModal;
}
