/**
 * Chambers Credentials & Recognition Modal Component
 * Government of India — Supreme Court Panel Counsel & Institutional Standing
 * Pradyumna Law Associates
 */

let isCredentialsModalOpen = false;

export function initCredentialsModal() {
  const modalOverlay = document.getElementById('credentials-modal');
  if (!modalOverlay) return;

  const closeBtns = modalOverlay.querySelectorAll('.credentials-modal-close-btn');
  const printBtns = modalOverlay.querySelectorAll('.credentials-print-btn');
  const scrollToOrderBtn = modalOverlay.querySelector('.scroll-to-order-btn');
  const orderSheet = modalOverlay.querySelector('.credentials-doc-sheet');

  function openModal() {
    const modal = document.getElementById('credentials-modal');
    if (!modal) return;

    modal.classList.add('is-active');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    isCredentialsModalOpen = true;

    // Reset scroll
    const modalBody = modal.querySelector('.credentials-modal-body');
    if (modalBody) modalBody.scrollTop = 0;

    // Focus close button for accessibility
    setTimeout(() => {
      const primaryClose = modal.querySelector('.credentials-modal-close-btn');
      if (primaryClose) primaryClose.focus();
    }, 80);
  }

  function closeModal() {
    const modal = document.getElementById('credentials-modal');
    if (!modal) return;

    modal.classList.remove('is-active');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    isCredentialsModalOpen = false;
  }

  // Delegated click listener for all credentials buttons (works reliably even across HMR reloads)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.explore-credentials-btn, .view-official-order-trigger, a[href="#credentials"], [data-action="credentials"]');
    if (trigger) {
      e.preventDefault();
      openModal();
    }
  });

  // Close buttons
  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  // Print button
  printBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });

  // Smooth scroll to order sheet
  if (scrollToOrderBtn && orderSheet) {
    scrollToOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      orderSheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Click outside dialog to close
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isCredentialsModalOpen) {
      closeModal();
    }
  });

  // Expose global methods
  window.openCredentialsModal = openModal;
  window.closeCredentialsModal = closeModal;
}
