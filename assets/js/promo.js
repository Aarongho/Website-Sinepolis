document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.promo-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelector('.tab.active').classList.remove('active');
      tab.classList.add('active');
      const category = tab.getAttribute('data-category');
      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
