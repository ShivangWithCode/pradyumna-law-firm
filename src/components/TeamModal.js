/**
 * Editorial Team Modal Component & Counsel Dossier Engine
 * Pradyumna Law Associates
 */
import { teamMembers, teamCategories } from '../data/teamMembers.js';
import { siteConfig } from '../data/siteConfig.js';

let activeCategory = 'all';
let selectedMember = null;

export function initTeamModal() {
  const modalOverlay = document.getElementById('team-modal');
  if (!modalOverlay) return;

  const closeBtn = modalOverlay.querySelector('.team-modal-close-btn');
  const scrollArea = modalOverlay.querySelector('.team-modal-scroll-area');
  const drawer = modalOverlay.querySelector('.counsel-dossier-drawer');
  const drawerCloseBtn = modalOverlay.querySelector('.dossier-close-btn');

  // Render Category Filter Tabs (Khaitan & Co clean tab bar with active indicator)
  function renderFilterBar() {
    const filterContainer = modalOverlay.querySelector('.team-filter-bar');
    if (!filterContainer) return;

    filterContainer.innerHTML = `
      <div class="team-tabs-list">
        ${teamCategories.map(cat => `
          <button type="button" class="team-filter-btn ${cat.id === activeCategory ? 'is-active' : ''}" data-category="${cat.id}">
            ${cat.label}
          </button>
        `).join('')}
      </div>
    `;

    filterContainer.querySelectorAll('.team-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category;
        renderFilterBar();
        renderRoster();
      });
    });
  }

  // Render Founder Spotlight (Khaitan & Co Signature Split Profile Card)
  function renderFounderCard() {
    const founder = teamMembers.find(m => m.isFounder);
    const container = modalOverlay.querySelector('.founder-spotlight-mount');
    if (!container || !founder) return;

    const waUrl = `https://wa.me/${siteConfig.contact.whatsAppNumber}?text=${encodeURIComponent('Hello Advocate Pradyumna Tyagi, I would like to schedule a strategic legal consultation.')}`;
    const mailUrl = `mailto:${founder.directContact.email}?subject=${encodeURIComponent('Strategic Counsel Inquiry — Pradyumna Law Associates')}`;

    container.innerHTML = `
      <article class="founder-spotlight-card" id="counsel-${founder.id}">
        <div class="founder-portrait-column">
          <div class="founder-passport-frame">
            <img src="${founder.portrait}" alt="Advocate Pradyumna Tyagi - Founder &amp; Managing Partner" class="founder-passport-img" loading="eager" />
          </div>
          <div class="founder-credentials-sidebar">
            <div class="sidebar-cred-block">
              <span class="sidebar-cred-label">Bar Registration &amp; Enrolment</span>
              <p class="sidebar-cred-val">Enrolment No: D/1922/2017</p>
              <p class="sidebar-cred-sub">Bar Council of Delhi</p>
            </div>

            <div class="sidebar-cred-block">
              <span class="sidebar-cred-label">Bar Association Memberships</span>
              <ul class="sidebar-cred-list">
                <li>Supreme Court Bar Association (SCBA)</li>
                <li>Delhi High Court Bar Association (DHCBA)</li>
                <li>Delhi Bar Association (DBA)</li>
              </ul>
            </div>

            <div class="sidebar-cred-block">
              <span class="sidebar-cred-label">Admitted Jurisdictions</span>
              <p class="sidebar-cred-val">Hon'ble Supreme Court of India</p>
              <p class="sidebar-cred-sub">High Court of Delhi &amp; National Tribunals</p>
            </div>

            <div class="sidebar-cred-block">
              <span class="sidebar-cred-label">Academic Credentials</span>
              <ul class="sidebar-cred-list">
                <li>LL.M. — Indian Law Institute (ILI)</li>
                <li>LL.B. — Campus Law Centre, DU</li>
                <li>B.Com — Shaheed Bhagat Singh College, DU</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="founder-info-column">
          <div class="founder-header-group">
            <div class="founder-title-row">
              <h3 class="founder-name">${founder.name}, New Delhi</h3>
              <a href="${founder.directContact.linkedin}" target="_blank" rel="noopener" class="founder-linkedin-badge" aria-label="LinkedIn Profile">
                <span class="linkedin-in">in</span>
              </a>
            </div>
            <p class="founder-role-lead">${founder.role}</p>
          </div>

          <div class="founder-contact-strip">
            <span class="founder-contact-item">
              <strong>T:</strong> <a href="tel:+919811000000">+91 98110 00000</a>
            </span>
            <span class="founder-contact-item">
              <strong>E:</strong> <a href="${mailUrl}">Write To Me</a>
            </span>
          </div>

          <div class="founder-credentials-section">
            <h4 class="founder-credentials-heading">Designation &amp; Standing Institutional Empanelment</h4>
            <ul class="founder-credentials-bullets">
              <li><strong>Panel Counsel (Govt. of India):</strong> Supreme Court of India (Central Government Litigation, Order dtd. 21.11.2025)</li>
              <li><strong>Addl. Standing Counsel:</strong> High Court of Delhi</li>
              <li><strong>Panel Counsel:</strong> N.B.C.C. (National Buildings Construction Corporation)</li>
              <li><strong>Panel Counsel:</strong> Punjab &amp; Sind Bank, Delhi</li>
              <li><strong>Bar Council Enrolment:</strong> D/4782/2016 &bull; ${founder.courtAffiliation}</li>
              <li><strong>Academic Pedigree:</strong> ${founder.qualifications}</li>
            </ul>
            <div style="margin-top: 1rem;">
              <button type="button" class="gov-view-order-btn view-official-order-trigger" style="display:inline-flex; width:auto; padding: 0.65rem 1.25rem; font-size: 0.78rem;" aria-label="View official Government of India order">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px; height:15px; margin-right: 6px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                <span>VIEW OFFICIAL ORDER (GOVT. OF INDIA)</span>
              </button>
            </div>
          </div>

          <div class="founder-bio-text">
            ${founder.bio}
          </div>

          <div class="founder-actions-row">
            <a href="${waUrl}" target="_blank" rel="noopener" class="counsel-primary-btn">
              <span>WHATSAPP CHAMBERS</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
            <a href="${mailUrl}" class="counsel-outline-btn">
              <span>DIRECT INQUIRY</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  // Render Associates & Counsel Roster Grid
  function renderRoster() {
    const grid = modalOverlay.querySelector('.counsel-grid');
    const countEl = modalOverlay.querySelector('.counsel-roster-count');
    if (!grid) return;

    let filtered = teamMembers.filter(m => !m.isFounder);
    if (activeCategory !== 'all') {
      filtered = filtered.filter(m => m.category === activeCategory);
    }

    if (countEl) {
      countEl.textContent = `${filtered.length} Associated Practices`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--team-slate-body); background: var(--team-bg-ice-light); border: 1.5px solid var(--khaitan-sky-border); border-radius: 4px;">
          <p style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--team-navy-dark); font-weight: 600;">Matters in this practice area are led directly by Managing Partner Pradyumna Tyagi.</p>
          <button type="button" class="counsel-primary-btn reset-filter-btn" style="margin-top: 0.5rem;">
            View All Counsel
          </button>
        </div>
      `;
      const resetBtn = grid.querySelector('.reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          renderFilterBar();
          renderRoster();
        });
      }
      return;
    }

    grid.innerHTML = filtered.map(member => `
      <div class="counsel-card" data-counsel-id="${member.id}">
        <div class="counsel-card-top">
          <div class="counsel-monogram ${member.portrait ? 'has-photo' : ''}">
            ${member.portrait ? `<img src="${member.portrait}" alt="${member.name}" class="counsel-avatar-img" />` : member.initials}
          </div>
          <div class="counsel-header-info">
            <h4 class="counsel-card-name">${member.name}</h4>
            <span class="counsel-card-designation">${member.designation}</span>
          </div>
        </div>

        <p class="counsel-card-court">${member.courtAffiliation}</p>

        <div class="counsel-practice-tags">
          ${member.primaryPractices.slice(0, 3).map(p => `<span class="counsel-tag">${p}</span>`).join('')}
        </div>

        <p class="counsel-card-quote">&ldquo;${member.quote}&rdquo;</p>

        <div class="counsel-card-footer">
          <span class="counsel-view-link">
            <span>View Full Dossier</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
      </div>
    `).join('');

    // Attach click events on cards
    grid.querySelectorAll('.counsel-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.counselId;
        const member = teamMembers.find(m => m.id === id);
        if (member) openDossier(member);
      });
    });
  }

  // Open Counsel Dossier Slide-in Drawer
  function openDossier(member) {
    selectedMember = member;
    if (!drawer) return;

    const drawerBody = drawer.querySelector('.dossier-body');
    const drawerFooter = drawer.querySelector('.dossier-footer');
    if (!drawerBody) return;

    drawerBody.innerHTML = `
      <div class="dossier-hero">
        <div class="dossier-portrait-frame ${member.portrait ? 'has-photo' : ''}">
          ${member.portrait 
            ? `<img src="${member.portrait}" alt="${member.name}" class="dossier-portrait-img" loading="eager" />` 
            : `<div class="dossier-fallback-initials">${member.initials}</div>`
          }
        </div>
        <div class="dossier-hero-info">
          <span class="dossier-designation">${member.designation}</span>
          <h3 class="dossier-name">${member.name}</h3>
          <p class="dossier-role-text">${member.role}</p>
          ${member.courtAffiliation ? `
            <div class="dossier-court-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px; height:13px; flex-shrink:0;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span>${member.courtAffiliation.split('|')[0].trim()}</span>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="dossier-block">
        <span class="dossier-block-label">Court Affiliation &amp; Jurisdictions</span>
        <p class="dossier-block-content">${member.courtAffiliation}</p>
      </div>

      ${member.institutionalDesignations && member.institutionalDesignations.length > 0 ? `
        <div class="dossier-block">
          <span class="dossier-block-label">Government &amp; Institutional Standing Designations</span>
          <ul class="dossier-list">
            ${member.institutionalDesignations.map(d => `<li><strong>${d}</strong></li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div class="dossier-block">
        <span class="dossier-block-label">Academic Credentials &amp; Bar Admission</span>
        <p class="dossier-block-content">${member.qualifications}</p>
        <p class="dossier-block-content" style="font-size: 0.86rem; color: var(--team-sky-tint); margin-top: 0.25rem;">${member.barCouncil || 'Bar Council of Delhi'}</p>
      </div>

      <div class="dossier-block">
        <span class="dossier-block-label">Professional Background</span>
        <p class="dossier-block-content">${member.bio}</p>
      </div>

      <div class="dossier-block">
        <span class="dossier-block-label">Primary Practice Areas</span>
        <ul class="dossier-list">
          ${member.primaryPractices.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      ${member.landmarkMatters && member.landmarkMatters.length > 0 ? `
        <div class="dossier-block">
          <span class="dossier-block-label">Landmark Litigation &amp; Precedents</span>
          <ul class="dossier-list">
            ${member.landmarkMatters.map(m => `<li>${m}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${member.positionsHeld && member.positionsHeld.length > 0 ? `
        <div class="dossier-block">
          <span class="dossier-block-label">Institutional Positions &amp; Accreditations</span>
          <ul class="dossier-list">
            ${member.positionsHeld.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${member.clientsRepresented && member.clientsRepresented.length > 0 ? `
        <div class="dossier-block">
          <span class="dossier-block-label">Notable Client Representations</span>
          <p class="dossier-block-content" style="font-size: 0.85rem; color: var(--silver-400);">
            ${member.clientsRepresented.join(' • ')}
          </p>
        </div>
      ` : ''}

      ${member.directContact ? `
        <div class="dossier-block" style="background: var(--team-bg-ice-light); padding: 1.25rem 1.4rem; border-left: 3px solid var(--khaitan-royal-blue); border-radius: 4px; margin-top: 1.5rem;">
          <span class="dossier-block-label" style="color: var(--khaitan-royal-blue); font-weight: 700; margin-bottom: 0.75rem;">Chambers &amp; Direct Contact</span>
          <p class="dossier-block-content" style="margin-bottom: 0.5rem; font-size: 0.92rem; line-height: 1.5;">
            <strong style="color: var(--khaitan-royal-blue);">Chamber Address:</strong><br/>
            ${member.directContact.office}
          </p>
          <p class="dossier-block-content" style="margin-bottom: 0.5rem; font-size: 0.92rem;">
            <strong style="color: var(--khaitan-royal-blue);">Contact Nos.:</strong> 
            <a href="tel:${member.directContact.primaryPhone}" style="color: var(--khaitan-sky-blue); font-weight: 600; text-decoration: none;">${member.directContact.primaryPhone}</a>
            ${member.directContact.secondaryPhone ? ` / <a href="tel:${member.directContact.secondaryPhone}" style="color: var(--khaitan-sky-blue); font-weight: 600; text-decoration: none;">${member.directContact.secondaryPhone}</a>` : ''}
          </p>
          <p class="dossier-block-content" style="font-size: 0.92rem;">
            <strong style="color: var(--khaitan-royal-blue);">Email:</strong> 
            <a href="mailto:${member.directContact.email}" style="color: var(--khaitan-sky-blue); font-weight: 600; text-decoration: underline;">${member.directContact.email}</a>
          </p>
        </div>
      ` : ''}
    `;

    const waMsg = encodeURIComponent(`Hello, I would like to consult with ${member.name} (${member.designation}) at Pradyumna Law Associates.`);
    const waUrl = `https://wa.me/${siteConfig.contact.whatsAppNumber}?text=${waMsg}`;
    const emailTo = member.directContact ? member.directContact.email : siteConfig.contact.email;
    const mailUrl = `mailto:${emailTo}?subject=${encodeURIComponent(`Consultation Request: ${member.name}`)}`;

    if (drawerFooter) {
      drawerFooter.innerHTML = `
        <a href="${waUrl}" target="_blank" rel="noopener" class="counsel-primary-btn" style="flex: 1; justify-content: center;">
          <span>CONSULT VIA WHATSAPP</span>
        </a>
        <a href="${mailUrl}" class="counsel-outline-btn">
          <span>EMAIL</span>
        </a>
      `;
    }

    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeDossier() {
    if (drawer) {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
    }
  }

  // Open and Close Team Modal
  window.openTeamModal = function(memberId = null) {
    modalOverlay.classList.add('is-active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');

    renderFilterBar();
    renderFounderCard();
    renderRoster();

    if (memberId) {
      const targetMember = teamMembers.find(m => m.id === memberId);
      if (targetMember) {
        setTimeout(() => openDossier(targetMember), 200);
      }
    }

    if (closeBtn) closeBtn.focus();
  };

  window.closeTeamModal = function() {
    closeDossier();
    modalOverlay.classList.remove('is-active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeTeamModal);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDossier);
  }

  // Close on Backdrop Click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      window.closeTeamModal();
    }
  });

  // ESC key dismiss
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (drawer && drawer.classList.contains('is-open')) {
        closeDossier();
      } else if (modalOverlay.classList.contains('is-active')) {
        window.closeTeamModal();
      }
    }
  });

  // Wire up "EXPLORE OUR TEAM" buttons across the site
  const teamTriggers = document.querySelectorAll('.explore-team-btn, a[href="#people"], .menu-nav-link[data-team-trigger]');
  teamTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // If menu was open, close it first
      const menuClose = document.querySelector('.menu-close-btn');
      if (menuClose && document.querySelector('.fullscreen-menu-overlay.is-active')) {
        menuClose.click();
      }
      window.openTeamModal();
    });
  });
}
