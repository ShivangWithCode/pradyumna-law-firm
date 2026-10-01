/**
 * Main Application Orchestrator
 * Pradyumna Law Associates (Khaitan & Co Exact Visual Experience)
 */
import { initKhaitanSlider } from './components/KhaitanSlider.js';
import { initFullScreenMenu } from './components/FullScreenMenu.js';
import { initSearchModal } from './components/SearchModal.js';
import { siteConfig } from './data/siteConfig.js';

function initActionButtons() {
  const searchBtn = document.querySelector('.search-btn');

  // Trigger search modal with prefilled query when clicking explore buttons
  function triggerSearch(keyword) {
    if (searchBtn) searchBtn.click();
    setTimeout(() => {
      const input = document.querySelector('.search-input-field');
      if (input) {
        input.value = keyword;
        input.dispatchEvent(new Event('input'));
      }
    }, 150);
  }

  const practicesBtn = document.querySelector('.explore-practices-btn');
  if (practicesBtn) practicesBtn.addEventListener('click', () => triggerSearch('Commercial Litigation'));

  const focusBtn = document.querySelector('.explore-focus-btn');
  if (focusBtn) focusBtn.addEventListener('click', () => triggerSearch('Corporate'));

  const pubBtn = document.querySelector('.explore-publications-btn');
  if (pubBtn) pubBtn.addEventListener('click', () => triggerSearch('Briefing'));

  const eventsBtn = document.querySelector('.explore-events-btn');
  if (eventsBtn) eventsBtn.addEventListener('click', () => triggerSearch('Regulatory'));

  const teamBtn = document.querySelector('.explore-team-btn');
  if (teamBtn) teamBtn.addEventListener('click', () => triggerSearch('Advocate'));

  const chambersBtn = document.querySelector('.explore-chambers-btn');
  if (chambersBtn) {
    chambersBtn.addEventListener('click', () => {
      const menuBtn = document.querySelector('.menu-toggle-btn');
      if (menuBtn) menuBtn.click();
    });
  }

  // Menu links index selection
  const menuLinks = document.querySelectorAll('.menu-nav-link[data-slide-index]');
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(link.getAttribute('data-slide-index'), 10);
      const closeBtn = document.querySelector('.menu-close-btn');
      if (closeBtn) closeBtn.click();

      // Trigger stepper click to navigate
      const targetStep = document.querySelector(`.kh-step-item[data-index="${targetIndex}"]`);
      if (targetStep) targetStep.click();
    });
  });
  // Dynamically wire WhatsApp, Email, and Phone from siteConfig/env
  function initContactLinks() {
    const waLinks = document.querySelectorAll('a[href*="wa.me"]');
    const waUrl = `https://wa.me/${siteConfig.contact.whatsAppNumber}?text=${encodeURIComponent('Hello, I would like to consult regarding legal counsel at Pradyumna Law Associates.')}`;
    waLinks.forEach(link => {
      link.href = waUrl;
    });

    const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const mailUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent('Legal Consultation Inquiry — Pradyumna Law Associates')}`;
    mailLinks.forEach(link => {
      link.href = mailUrl;
    });

    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      link.href = `tel:${siteConfig.contact.phone}`;
      link.textContent = siteConfig.contact.displayPhone;
    });
  }
  initContactLinks();
}

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initKhaitanSlider();
  initFullScreenMenu();
  initSearchModal();
  initActionButtons();
});

