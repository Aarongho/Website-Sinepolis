document.addEventListener('DOMContentLoaded', () => {
  const filter = document.getElementById('locationFilter');
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.card');
  const popup = document.getElementById('popup');
  const popupDetails = document.getElementById('popupDetails');
  const closeBtn = document.getElementById('closePopup');

  function updateCards() {
    const selectedLoc = filter.value;
    const query = searchInput.value.trim().toLowerCase();

    cards.forEach(card => {
      const loc = card.getAttribute('data-location');
      const name = card.querySelector('.theater-name').textContent.toLowerCase();

      const matchLoc = (selectedLoc === 'all' || loc === selectedLoc);
      const matchSearch = name.includes(query);

      if (matchLoc && matchSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filter.addEventListener('change', updateCards);

  searchInput.addEventListener('input', updateCards);

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const detailHTML = card.querySelector('.card-detail').innerHTML;
      popupDetails.innerHTML = detailHTML;
      popup.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.add('hidden');
    }
  });
});
