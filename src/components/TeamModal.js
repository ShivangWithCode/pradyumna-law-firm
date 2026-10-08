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
      <div class="team-tab-actions">
        <a href="/assets/docs/Pradyumna_Tyagi_CV.pdf" download="Pradyumna_Tyagi_CV.pdf" target="_blank" class="team-download-cv-btn" title="Download Founder CV (PDF)">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Download CV</span>
        </a>
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

  // Render Founder Spotlight (Executive Editorial Profile Card)
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
            <div class="founder-badges-row">
              <span class="founder-badge-pill">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z"/></svg>
                Panel Counsel (Govt. of India) &bull; Supreme Court
              </span>
              <span class="founder-badge-pill">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M3 9l9-6 9 6M6 13l-3 6h6l-3-6zM18 13l-3 6h6l-3-6z"/></svg>
                Addl. Standing Counsel &bull; High Court of Delhi
              </span>
              <span class="founder-badge-pill">
                Panel Counsel &bull; N.B.C.C. &amp; Punjab &amp; Sind Bank
              </span>
            </div>

            <div class="founder-title-row">
              <div class="founder-title-main">
                <h3 class="founder-name">${founder.name}</h3>
                <span class="founder-city-badge">Founder &amp; Managing Partner &bull; New Delhi</span>
              </div>
              <div class="founder-title-actions">
                <a href="/assets/docs/Pradyumna_Tyagi_CV.pdf" download="Pradyumna_Tyagi_CV.pdf" target="_blank" class="founder-cv-btn" title="Download Advocate Pradyumna Tyagi CV (PDF)">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Download CV</span>
                </a>
                <a href="${founder.directContact.linkedin}" target="_blank" rel="noopener" class="founder-linkedin-btn" aria-label="LinkedIn Profile">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.5a1.64 1.64 0 0 0-1.64 1.64c0 .91.73 1.64 1.64 1.64.91 0 1.64-.73 1.64-1.64 0-.91-.73-1.64-1.64-1.64z"/></svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <div class="founder-contact-strip">
            <span class="founder-contact-item">
              <span class="contact-lbl">T:</span>
              <a href="tel:+917503455000">+91 75034 55000</a>
            </span>
            <span class="founder-contact-item">
              <span class="contact-lbl">E:</span>
              <a href="${mailUrl}">Write To Me</a>
            </span>
          </div>

          <div class="founder-credentials-section">
            <h4 class="founder-credentials-heading">Standing Institutional Empanelments &amp; Designations</h4>
            <ul class="founder-credentials-bullets">
              <li><strong>Panel Counsel (Govt. of India):</strong> Supreme Court of India (Central Government Litigation, Order dtd. 21.11.2025)</li>
              <li><strong>Addl. Standing Counsel:</strong> High Court of Delhi</li>
              <li><strong>Panel Counsel:</strong> N.B.C.C. (National Buildings Construction Corporation)</li>
              <li><strong>Panel Counsel:</strong> Punjab &amp; Sind Bank, Delhi</li>
              <li><strong>Bar Council Enrolment:</strong> D/4782/2016 &bull; ${founder.courtAffiliation}</li>
              <li><strong>Academic Pedigree:</strong> ${founder.qualifications}</li>
            </ul>
            <div style="margin-top: 0.9rem;">
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
            <a href="/assets/docs/Pradyumna_Tyagi_CV.pdf" download="Pradyumna_Tyagi_CV.pdf" target="_blank" class="counsel-cv-download-btn" title="Download Advocate Pradyumna Tyagi CV (PDF)">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>DOWNLOAD CV (PDF)</span>
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

    grid.innerHTML = filtered.map(member => {
      let badge = { icon: '🏛️', label: 'Supreme Court & High Court' };
      if (member.id === 'surjeet-singh') {
        badge = { icon: '⚖️', label: 'Govt. Pleader • Union of India' };
      } else if (member.id === 'gaurav-singh') {
        badge = { icon: '🏛️', label: 'Supreme Court AOR' };
      } else if (member.id === 'vrinda-khanna') {
        badge = { icon: '🔬', label: 'Forensic & Cyber Law' };
      }

      const courtShort = member.courtAffiliation ? member.courtAffiliation.split('|')[0].trim() : 'Supreme Court & High Court';
      const phoneNum = member.directContact?.primaryPhone || '+91-7503455000';
      const emailAddr = member.directContact?.email || 'plaoffices@gmail.com';

      return `
        <div class="counsel-card" data-counsel-id="${member.id}">
          <div class="counsel-card-media">
            ${member.portrait 
              ? `<img src="${member.portrait}" alt="${member.name}" class="counsel-media-img" loading="lazy" />` 
              : `<div class="counsel-media-fallback">${member.initials}</div>`
            }
            <div class="counsel-card-badge-overlay">
              <span class="counsel-prestige-chip">
                <span class="chip-icon">${badge.icon}</span>
                <span>${badge.label}</span>
              </span>
            </div>
          </div>

          <div class="counsel-card-content">
            <div class="counsel-card-title-group">
              <h4 class="counsel-card-name">${member.name}</h4>
              <span class="counsel-card-designation">${member.designation}</span>
            </div>

            <p class="counsel-card-court">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" class="court-icon"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z"/></svg>
              <span>${courtShort}</span>
            </p>

            <div class="counsel-practice-tags">
              ${member.primaryPractices.slice(0, 3).map(p => `<span class="counsel-tag">${p}</span>`).join('')}
            </div>

            <p class="counsel-card-quote">&ldquo;${member.quote}&rdquo;</p>

            <div class="counsel-card-footer">
              <div class="counsel-quick-contacts">
                <a href="tel:${phoneNum}" class="counsel-quick-btn" title="Call Counsel" onclick="event.stopPropagation()">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </a>
                <a href="mailto:${emailAddr}" class="counsel-quick-btn" title="Email Counsel" onclick="event.stopPropagation()">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </a>
              </div>
              <span class="counsel-view-link">
                <span>View Dossier</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </div>
        </div>
      `;
    }).join('');

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
