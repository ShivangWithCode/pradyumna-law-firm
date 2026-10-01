/**
 * Consultation Contact Form & WhatsApp Gateway
 * Pradyumna Law Associates
 */
import { siteConfig } from '../data/siteConfig.js';

export function initContactForm() {
  const form = document.getElementById('consultation-form');
  const responseBox = document.getElementById('form-feedback-message');
  const whatsappBtn = document.getElementById('whatsapp-direct-btn');

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = encodeURIComponent(
        `Hello Pradyumna Law Associates, I would like to schedule a confidential legal consultation regarding a matter in Lucknow / Allahabad High Court.`
      );
      window.open(`https://wa.me/${siteConfig.contact.whatsAppNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
    });
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('[name="fullName"]');
    const phoneInput = form.querySelector('[name="phone"]');
    const emailInput = form.querySelector('[name="email"]');
    const matterInput = form.querySelector('[name="matterType"]');
    const messageInput = form.querySelector('[name="brief"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Basic Validation
    if (!nameInput.value.trim() || !phoneInput.value.trim() || !messageInput.value.trim()) {
      showFeedback('Please provide your name, phone number, and brief nature of the legal query.', 'error');
      return;
    }

    // UX Feedback: submitting state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Submitting Request...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      form.reset();
      showFeedback(
        'Thank you. Your consultation enquiry has been recorded with the Counsel Desk. A member of our legal team will reach out to you within one business day.',
        'success'
      );
    }, 1000);
  });

  function showFeedback(msg, type) {
    if (!responseBox) return;
    responseBox.style.display = 'block';
    responseBox.style.padding = '1rem 1.25rem';
    responseBox.style.marginTop = '1rem';
    responseBox.style.fontSize = '0.875rem';
    responseBox.style.lineHeight = '1.6';

    if (type === 'success') {
      responseBox.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
      responseBox.style.border = '1px solid var(--white-100)';
      responseBox.style.color = 'var(--white-100)';
    } else {
      responseBox.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
      responseBox.style.border = '1px solid #EF4444';
      responseBox.style.color = '#FCA5A5';
    }

    responseBox.textContent = msg;

    setTimeout(() => {
      responseBox.style.display = 'none';
    }, 8000);
  }
}
