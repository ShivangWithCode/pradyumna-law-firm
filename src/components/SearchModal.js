/**
 * Live Search Modal Component
 * Pradyumna Law Associates
 */
import { practiceAreas } from '../data/practiceAreas.js';
import { teamMembers } from '../data/teamMembers.js';
import { insights } from '../data/insights.js';

export function initSearchModal() {
  const searchBtn = document.querySelector('.search-btn');
  const overlay = document.querySelector('.search-modal-overlay');
  const closeBtn = document.querySelector('.search-close-trigger');
  const input = document.querySelector('.search-input-field');
  const resultsContainer = document.querySelector('.search-results-panel');
  const quickPills = document.querySelectorAll('.search-quick-pill');

  if (!searchBtn || !overlay || !input || !resultsContainer) return;

  // Flatten searchable documents
  const searchableIndex = [
    ...practiceAreas.map(p => ({
      type: 'Practice Area',
      title: p.title,
      snippet: p.summary,
      target: `#expertise`,
      keywords: `${p.title} ${p.summary} ${p.subPractices.join(' ')}`
    })),
    ...teamMembers.map(t => ({
      type: 'Counsel / Team',
      title: `${t.name} — ${t.designation}`,
      snippet: `${t.courtAffiliation} | ${t.primaryPractices.join(', ')}`,
      target: `#people`,
      keywords: `${t.name} ${t.designation} ${t.primaryPractices.join(' ')}`
    })),
    ...insights.map(i => ({
      type: 'Legal Briefing',
      title: i.title,
      snippet: i.summary,
      target: `#insights`,
      keywords: `${i.title} ${i.summary} ${i.tags.join(' ')}`
    }))
  ];

  function openSearch() {
    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    setTimeout(() => {
      input.focus();
      renderResults(input.value.trim());
    }, 100);
  }

  function closeSearch() {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    searchBtn.focus();
  }

  function renderResults(query) {
    resultsContainer.innerHTML = '';

    if (!query) {
      resultsContainer.innerHTML = `
        <div style="padding: 1.5rem 0; color: rgba(255,255,255,0.4); font-size: 0.9rem;">
          Type to search practice areas, advocates, legal briefings, or click a quick category above.
        </div>
      `;
      return;
    }

    const lowerQuery = query.toLowerCase();
    const matches = searchableIndex.filter(item => 
      item.keywords.toLowerCase().includes(lowerQuery) ||
      item.title.toLowerCase().includes(lowerQuery)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 1.5rem 0; color: rgba(255,255,255,0.5); font-size: 0.95rem;">
          No matching records found for "<strong>${escapeHtml(query)}</strong>". Try searching for <em>Litigation</em>, <em>Corporate</em>, <em>NCLT</em>, or <em>RERA</em>.
        </div>
      `;
      return;
    }

    matches.forEach(item => {
      const el = document.createElement('a');
      el.href = item.target;
      el.className = 'search-result-item';
      el.innerHTML = `
        <span class="result-badge">${item.type}</span>
        <h4 class="result-title">${escapeHtml(item.title)}</h4>
        <p class="result-snippet">${escapeHtml(item.snippet)}</p>
      `;

      el.addEventListener('click', () => {
        closeSearch();
      });

      resultsContainer.appendChild(el);
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  searchBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  input.addEventListener('input', (e) => {
    renderResults(e.target.value.trim());
  });

  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const term = pill.getAttribute('data-term') || pill.textContent.trim();
      input.value = term;
      renderResults(term);
    });
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
      closeSearch();
    }
  });
}
