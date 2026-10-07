/**
 * Main Application Orchestrator
 * Pradyumna Law Associates
 */
import { initKhaitanSlider } from './components/KhaitanSlider.js';
import { initFullScreenMenu } from './components/FullScreenMenu.js';
import { initTeamModal } from './components/TeamModal.js';
import { initExpertiseModal } from './components/ExpertiseModal.js';
import { initInquiryModal } from './components/InquiryModal.js';
import { initCredentialsModal } from './components/CredentialsModal.js';
import { siteConfig } from './data/siteConfig.js';

function initActionButtons() {
  const practicesBtn = document.querySelector('.explore-practices-btn');
  if (practicesBtn) {
    practicesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.openExpertiseModal) {
        window.openExpertiseModal();
      }
    });
  }

  const credentialsBtn = document.querySelector('.explore-credentials-btn');
  if (credentialsBtn) {
    credentialsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.openCredentialsModal) {
        window.openCredentialsModal();
      }
    });
  }

  const focusBtn = document.querySelector('.explore-focus-btn');
  if (focusBtn) {
    focusBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.openExpertiseModal) {
        window.openExpertiseModal();
      }
    });
  }

  const teamBtn = document.querySelector('.explore-team-btn');
  if (teamBtn) {
    teamBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.openTeamModal) {
        window.openTeamModal();
      }
    });
  }

  const chambersBtn = document.querySelector('.explore-chambers-btn');
  if (chambersBtn) {
    chambersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.openCredentialsModal) {
        window.openCredentialsModal();
      }
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
    const waLinks = document.querySelectorAll('a[href*="wa.me"]:not(.developer-credit-link)');
    const waUrl = `https://wa.me/${siteConfig.contact.whatsAppNumber}?text=${encodeURIComponent('Hello, I would like to consult regarding legal counsel at Pradyumna Law Associates.')}`;
    waLinks.forEach(link => {
      link.href = waUrl;
    });

    // Developer Direct WhatsApp (Shivang Pandey)
    const devLinks = document.querySelectorAll('.developer-credit-link');
    const devNumber = siteConfig.developer?.whatsAppNumber || '919026399211';
    const devMsg = encodeURIComponent(
      siteConfig.developer?.whatsAppMessage || 'Hello Shivang, I saw your work on Pradyumna Law Associates website and would like to connect.'
    );
    const devUrl = `https://wa.me/${devNumber}?text=${devMsg}`;
    devLinks.forEach(link => {
      link.href = devUrl;
    });

    const mailLinks = document.querySelectorAll('a[href^="mailto:"]');
    const mailUrl = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent('Legal Consultation Inquiry — Pradyumna Law Associates')}`;
    mailLinks.forEach(link => {
      link.href = mailUrl;
    });
  }
  initContactLinks();
}

// Bootstrap Application on DOM Ready or immediately if already loaded
function startApp() {
  initKhaitanSlider();
  initFullScreenMenu();
  initTeamModal();
  initExpertiseModal();
  initInquiryModal();
  initCredentialsModal();
  initActionButtons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

