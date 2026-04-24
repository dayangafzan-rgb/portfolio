document.addEventListener('DOMContentLoaded', () => {
  // Quiz Logic
  const questionBlocks = document.querySelectorAll('.question-block');
  const resultDiv = document.getElementById('quiz-result');
  const resultTitle = document.getElementById('result-title');
  const resultMessage = document.getElementById('result-message');
  const resetBtn = document.getElementById('reset-quiz');
  
  let answers = {};
  const totalQuestions = questionBlocks.length;

  questionBlocks.forEach((block) => {
    const questionId = block.getAttribute('data-question');
    const buttons = block.querySelectorAll('.quiz-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove selected class from all buttons in this block
        buttons.forEach(b => b.classList.remove('selected'));
        
        // Add selected class to clicked button
        btn.classList.add('selected');
        
        // Store answer
        answers[questionId] = parseInt(btn.getAttribute('data-value'));
        
        checkCompletion();
      });
    });
  });

  function checkCompletion() {
    if (Object.keys(answers).length === totalQuestions) {
      calculateResult();
    }
  }

  function calculateResult() {
    let score = Object.values(answers).reduce((sum, val) => sum + val, 0);
    
    questionBlocks.forEach(b => b.style.display = 'none');
    resultDiv.style.display = 'block';

    if (score === 3) {
      resultTitle.textContent = 'Great Job! 🌟';
      resultTitle.style.color = 'var(--success)';
      resultMessage.textContent = 'Your team has a strong foundation for AI usage. Let\'s explore how we can optimize and scale your AI initiatives responsibly.';
    } else if (score >= 1) {
      resultTitle.textContent = 'You\'re on the right track! 🚀';
      resultTitle.style.color = 'var(--warning)';
      resultMessage.textContent = 'You have some elements in place, but there are critical gaps in your AI oversight. A quick consultation can help secure your processes.';
    } else {
      resultTitle.textContent = 'Action Needed ⚠️';
      resultTitle.style.color = 'var(--danger)';
      resultMessage.textContent = 'Your team is likely using AI without guardrails. We highly recommend an AI Readiness Check to prevent data leaks or compliance issues.';
    }
  }

  resetBtn.addEventListener('click', () => {
    answers = {};
    questionBlocks.forEach(block => {
      block.style.display = 'block';
      const buttons = block.querySelectorAll('.quiz-btn');
      buttons.forEach(b => b.classList.remove('selected'));
    });
    resultDiv.style.display = 'none';
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
