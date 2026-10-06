/**
 * Expertise & Practice Areas Modal Component
 * Exact Khaitan & Co Split Experience
 * Pradyumna Law Associates
 */
import { practiceAreas } from '../data/practiceAreas.js';
import { siteConfig } from '../data/siteConfig.js';

let isExpertiseModalOpen = false;
let activeSearchQuery = '';

export function initExpertiseModal() {
  const modalOverlay = document.getElementById('expertise-modal');
  if (!modalOverlay) return;

  const closeBtn = modalOverlay.querySelector('.expertise-close-btn');
  const backHomeBtn = modalOverlay.querySelector('.expertise-back-home-btn');
  const cardsGrid = modalOverlay.querySelector('.expertise-cards-grid');
  const searchInput = modalOverlay.querySelector('.expertise-search-input');
  const countBadge = modalOverlay.querySelector('.expertise-count-badge');
  const drawer = modalOverlay.querySelector('.practice-detail-drawer');
  const drawerCloseBtn = modalOverlay.querySelector('.practice-drawer-close-btn');
  const searchTriggerBtn = modalOverlay.querySelector('.expertise-search-trigger');
  const menuTriggerBtn = modalOverlay.querySelector('.expertise-menu-trigger');

  // Render Practice Cards Grid
  function renderPracticeCards() {
    if (!cardsGrid) return;

    const query = activeSearchQuery.toLowerCase().trim();
    const filtered = practiceAreas.filter(item => {
      if (!query) return true;
      return (
        item.title.toLowerCase().includes(query) ||
        (item.shortTitle && item.shortTitle.toLowerCase().includes(query)) ||
        (item.summary && item.summary.toLowerCase().includes(query)) ||
        (item.subPractices && item.subPractices.some(sp => sp.toLowerCase().includes(query)))
      );
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} Practice Area${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      cardsGrid.innerHTML = `
        <div class="expertise-empty-state">
          <p>No practice area matching &ldquo;<strong>${escapeHtml(activeSearchQuery)}</strong>&rdquo;</p>
          <button type="button" class="expertise-header-btn" style="margin-top: 10px; border: 1px solid #CBD5E1;" id="reset-exp-search">
            Clear Search Filter
          </button>
        </div>
      `;
      const resetBtn = cardsGrid.querySelector('#reset-exp-search');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeSearchQuery = '';
          if (searchInput) searchInput.value = '';
          renderPracticeCards();
        });
      }
      return;
    }

    cardsGrid.innerHTML = filtered.map(item => `
      <div class="practice-card" data-id="${item.id}" role="button" tabindex="0" aria-label="${item.title}">
        <h3 class="practice-card-title">${item.title}</h3>
        <span class="practice-card-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </span>
      </div>
    `).join('');

    // Attach click listener to each practice card
    cardsGrid.querySelectorAll('.practice-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const item = practiceAreas.find(p => p.id === id);
        if (item) openPracticeDrawer(item);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // Open Slide-In Drawer for a Specific Practice
  function openPracticeDrawer(item) {
    if (!drawer) return;

    const drawerBody = drawer.querySelector('.practice-drawer-body');
    const drawerBadge = drawer.querySelector('.practice-drawer-badge');
    const drawerTitle = drawer.querySelector('.practice-drawer-header-title');
    const drawerFooter = drawer.querySelector('.practice-drawer-footer');

    if (drawerBadge) drawerBadge.textContent = `Practice Area ${item.number || '01'}`;
    if (drawerTitle) drawerTitle.textContent = item.title;

    const waText = encodeURIComponent(`Hello Pradyumna Law Associates, I am seeking legal counsel regarding: ${item.title}.`);
    const waUrl = `https://wa.me/${siteConfig.contact.whatsAppNumber}?text=${waText}`;
    const phoneUrl = `tel:${siteConfig.contact.primaryPhone}`;

    if (drawerBody) {
      drawerBody.innerHTML = `
        <div class="drawer-section-block">
          <span class="drawer-block-label">Overview &amp; Strategy</span>
          <p class="drawer-lead-text">${item.description || item.summary}</p>
        </div>

        <div class="drawer-section-block">
          <span class="drawer-block-label">Supervising Counsel</span>
          <div class="drawer-counsel-card">
            <div class="drawer-counsel-name">${item.leadCounsel || 'Pradyumna Tyagi (Founder &amp; Managing Partner)'}</div>
            <p class="drawer-counsel-designation">Central Govt. Counsel, Supreme Court | Addl. Standing Counsel, High Court of Delhi | Panel Counsel, N.B.C.C. &amp; Punjab &amp; Sind Bank</p>
          </div>
        </div>

        ${item.subPractices && item.subPractices.length > 0 ? `
          <div class="drawer-section-block">
            <span class="drawer-block-label">Key Focus &amp; Sub-Practices</span>
            <ul class="drawer-subpractice-list">
              ${item.subPractices.map(sp => `<li>${sp}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        ${item.keyForums ? `
          <div class="drawer-section-block">
            <span class="drawer-block-label">Key Courts &amp; Jurisdictions</span>
            <div class="drawer-forums-box">${item.keyForums}</div>
          </div>
        ` : ''}

        ${item.highlight ? `
          <div class="drawer-section-block">
            <span class="drawer-block-label">Chambers Distinction</span>
            <p style="font-size: 0.92rem; color: #082D54; font-weight: 600; margin: 0;">${item.highlight}</p>
          </div>
        ` : ''}
      `;
    }

    if (drawerFooter) {
      drawerFooter.innerHTML = `
        <a href="${waUrl}" target="_blank" rel="noopener" class="practice-drawer-cta-primary">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span>WhatsApp Consultation</span>
        </a>
        <a href="${phoneUrl}" class="practice-drawer-cta-secondary">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Call Chambers</span>
        </a>
      `;
    }

    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closePracticeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
  }

  // Open Fullscreen Expertise Modal
  function openModal(targetPracticeId = null) {
    modalOverlay.classList.add('is-open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    isExpertiseModalOpen = true;

    // Reset layout scroll to top
    const layout = modalOverlay.querySelector('.expertise-layout');
    if (layout) layout.scrollTop = 0;

    // Reset filter
    activeSearchQuery = '';
    if (searchInput) searchInput.value = '';
    renderPracticeCards();

    // If specific practice requested, open its drawer immediately
    if (targetPracticeId) {
      const match = practiceAreas.find(p => p.id === targetPracticeId);
      if (match) {
        setTimeout(() => openPracticeDrawer(match), 250);
      }
    }
  }

  // Close Fullscreen Expertise Modal
  function closeModal() {
    closePracticeDrawer();
    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    isExpertiseModalOpen = false;
  }

  // Wire event handlers to ALL close buttons (mobile header, desktop top bar, etc.)
  modalOverlay.querySelectorAll('.expertise-close-btn').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  if (backHomeBtn) backHomeBtn.addEventListener('click', closeModal);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closePracticeDrawer);

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value;
      renderPracticeCards();
    });
  }

  if (searchTriggerBtn) {
    searchTriggerBtn.addEventListener('click', () => {
      closeModal();
      const globalSearchBtn = document.querySelector('.search-btn');
      if (globalSearchBtn) globalSearchBtn.click();
    });
  }

  modalOverlay.querySelectorAll('.expertise-menu-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal();
      const globalMenuBtn = document.querySelector('.menu-toggle-btn');
      if (globalMenuBtn) globalMenuBtn.click();
    });
  });

  // Global Keydown listener for Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isExpertiseModalOpen) {
      if (drawer && drawer.classList.contains('is-open')) {
        closePracticeDrawer();
      } else {
        closeModal();
      }
    }
  });

  // Expose global methods
  window.openExpertiseModal = openModal;
  window.closeExpertiseModal = closeModal;

  // Initial render of cards
  renderPracticeCards();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[m]);
}
