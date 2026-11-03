document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('questionsContainer');
  const sectionTitle = document.getElementById('sectionTitle');
  const sectionDesc = document.getElementById('sectionDesc');

  // Diagnostic Check: questions.js load hua ya nahi
  if (typeof modernHistoryMCQs === 'undefined' || !Array.isArray(modernHistoryMCQs) || modernHistoryMCQs.length === 0) {
    container.innerHTML = `
      <div style="background:#fee2e2; border:1px solid #ef4444; color:#991b1b; padding:1.2rem; border-radius:8px; text-align:center;">
        <p style="font-weight:600; font-size:1.1rem; margin-bottom:0.5rem;">⚠️ Data Load Error</p>
        <p><code>questions.js</code> file browser tak nahi pahunch rahi hai.</p>
        <p style="font-size:0.85rem; margin-top:0.4rem; color:#b91c1c;">Kripya check karein ki GitHub par <b>questions.js</b> file ka naam bilkul sahi hai (small letters) aur wo index.html ke saath usi folder me hai.</p>
      </div>
    `;
    return;
  }

  // Render function
  function renderMCQs(items) {
    container.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'mcq-card';
      card.id = `mcq-${item.id}`;

      const optionsHtml = item.options.map(opt => `<li>${opt}</li>`).join('');

      card.innerHTML = `
        <div class="mcq-header">
          <span class="q-num">${item.id}.</span>
          <span class="q-text">${item.q}</span>
        </div>
        <ul class="mcq-options">
          ${optionsHtml}
        </ul>
        <button class="ans-toggle-btn" onclick="toggleAnswer(${item.id})">
          <i class="fa-solid fa-lightbulb"></i> उत्तर देखें
        </button>
        <div class="ans-box" id="ans-${item.id}">
          <strong>सही उत्तर:</strong> ${item.ans}
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Toggle Answer
  window.toggleAnswer = function(id) {
    const box = document.getElementById(`ans-${id}`);
    const btn = box.previousElementSibling;
    if (box.classList.contains('show')) {
      box.classList.remove('show');
      btn.innerHTML = '<i class="fa-solid fa-lightbulb"></i> उत्तर देखें';
    } else {
      box.classList.add('show');
      btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> उत्तर छुपाएँ';
    }
  };

  // Show/Hide All Buttons
  const showBtn = document.getElementById('showAllAnswersBtn');
  const hideBtn = document.getElementById('hideAllAnswersBtn');

  if (showBtn) {
    showBtn.addEventListener('click', () => {
      document.querySelectorAll('.ans-box').forEach(b => b.classList.add('show'));
      document.querySelectorAll('.ans-toggle-btn').forEach(b => b.innerHTML = '<i class="fa-solid fa-eye-slash"></i> उत्तर छुपाएँ');
    });
  }

  if (hideBtn) {
    hideBtn.addEventListener('click', () => {
      document.querySelectorAll('.ans-box').forEach(b => b.classList.remove('show'));
      document.querySelectorAll('.ans-toggle-btn').forEach(b => b.innerHTML = '<i class="fa-solid fa-lightbulb"></i> उत्तर देखें');
    });
  }

  // Hamburger Menu & Sidebar
  const menuBtn = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const closeBtn = document.getElementById('closeSidebar');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  }
  function closeSidebarMenu() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }

  if (menuBtn) menuBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebarMenu);
  if (overlay) overlay.addEventListener('click', closeSidebarMenu);

  // Practice Set (Random 25)
  const practiceBtn = document.getElementById('practiceSetBtn');
  if (practiceBtn) {
    practiceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebarMenu();
      const shuffled = [...modernHistoryMCQs].sort(() => 0.5 - Math.random());
      sectionTitle.textContent = "प्रैक्टिस सेट (यादृच्छिक 25 प्रश्न)";
      sectionDesc.textContent = "परीक्षा अभ्यास हेतु 25 महत्वपूर्ण प्रश्न";
      renderMCQs(shuffled.slice(0, 25));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Modern History Full Set
  const modernLink = document.querySelector('[data-category="modern"]');
  if (modernLink) {
    modernLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeSidebarMenu();
      sectionTitle.textContent = "आधुनिक भारत का इतिहास";
      sectionDesc.textContent = "कुल 1 से 492 वस्तुनिष्ठ प्रश्न (उत्तर कुंजी सहित)";
      renderMCQs(modernHistoryMCQs);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // First Load
  renderMCQs(modernHistoryMCQs);
});
