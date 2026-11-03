document.addEventListener('DOMContentLoaded', () => {
  const questionsContainer = document.getElementById('questionsContainer');
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const closeSidebar = document.getElementById('closeSidebar');
  const showAllAnswersBtn = document.getElementById('showAllAnswersBtn');
  const hideAllAnswersBtn = document.getElementById('hideAllAnswersBtn');
  const practiceSetBtn = document.getElementById('practiceSetBtn');
  const sectionTitle = document.getElementById('sectionTitle');
  const sectionDesc = document.getElementById('sectionDesc');

  // Verify that database is loaded
  if (!window.modernHistoryMCQs || window.modernHistoryMCQs.length === 0) {
    questionsContainer.innerHTML = '<p style="color:red; text-align:center; padding:2rem;">डेटा लोड नहीं हो सका। कृपया questions.js चेक करें।</p>';
    return;
  }

  // Render function
  function renderQuestions(items) {
    questionsContainer.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'mcq-card';
      card.id = `mcq-${item.id}`;

      const optHtml = item.options.map(opt => `<li>${opt}</li>`).join('');

      card.innerHTML = `
        <div class="mcq-header">
          <span class="q-num">${item.id}.</span>
          <span class="q-text">${item.q}</span>
        </div>
        <ul class="mcq-options">
          ${optHtml}
        </ul>
        <button class="ans-toggle-btn" onclick="toggleAnswer(${item.id})">
          <i class="fa-solid fa-lightbulb"></i> उत्तर देखें
        </button>
        <div class="ans-box" id="ans-${item.id}">
          <strong>सही उत्तर:</strong> ${item.ans}
        </div>
      `;
      questionsContainer.appendChild(card);
    });
  }

  // Toggle Single Answer
  window.toggleAnswer = function(id) {
    const ansBox = document.getElementById(`ans-${id}`);
    const btn = ansBox.previousElementSibling;
    if (ansBox.classList.contains('show')) {
      ansBox.classList.remove('show');
      btn.innerHTML = '<i class="fa-solid fa-lightbulb"></i> उत्तर देखें';
    } else {
      ansBox.classList.add('show');
      btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> उत्तर छुपाएँ';
    }
  };

  // Show/Hide All Buttons
  if (showAllAnswersBtn) {
    showAllAnswersBtn.addEventListener('click', () => {
      document.querySelectorAll('.ans-box').forEach(box => box.classList.add('show'));
      document.querySelectorAll('.ans-toggle-btn').forEach(btn => {
        btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> उत्तर छुपाएँ';
      });
    });
  }

  if (hideAllAnswersBtn) {
    hideAllAnswersBtn.addEventListener('click', () => {
      document.querySelectorAll('.ans-box').forEach(box => box.classList.remove('show'));
      document.querySelectorAll('.ans-toggle-btn').forEach(btn => {
        btn.innerHTML = '<i class="fa-solid fa-lightbulb"></i> उत्तर देखें';
      });
    });
  }

  // Sidebar Controls
  function openDrawer() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
  }

  function closeDrawer() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (closeSidebar) closeSidebar.addEventListener('click', closeDrawer);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeDrawer);

  // Practice Set (25 Random MCQs)
  if (practiceSetBtn) {
    practiceSetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      const shuffled = [...window.modernHistoryMCQs].sort(() => 0.5 - Math.random());
      const practiceSubset = shuffled.slice(0, 25);
      sectionTitle.textContent = "प्रैक्टिस सेट (यादृच्छिक 25 प्रश्न)";
      sectionDesc.textContent = "परीक्षा अभ्यास हेतु 25 महत्वपूर्ण प्रश्नों का सेट";
      renderQuestions(practiceSubset);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Modern History Category Click
  const modernLink = document.querySelector('[data-category="modern"]');
  if (modernLink) {
    modernLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      sectionTitle.textContent = "आधुनिक भारत का इतिहास";
      sectionDesc.textContent = "कुल 1 से 492 वस्तुनिष्ठ प्रश्न (उत्तर कुंजी सहित)";
      renderQuestions(window.modernHistoryMCQs);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Load All 492 Questions Initially
  renderQuestions(window.modernHistoryMCQs);
});
