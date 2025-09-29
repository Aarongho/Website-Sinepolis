document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const movieCards = document.querySelectorAll(".movie-card");
  const searchInput = document.querySelector(".search-input");
  const sortSelect = document.querySelector(".sort-select");
  const titleHeader = document.querySelector(".now-showing-header h1");

  function updateVisibleMovies() {
    const activeTab = document.querySelector(".tab.active").dataset.category;
    const query = searchInput.value.toLowerCase();
    const sortOrder = sortSelect.value;

    let visibleCards = Array.from(movieCards).filter(card => {
      const category = card.dataset.category;
      const title = card.querySelector("h2").textContent.toLowerCase();
      const matchCategory = activeTab === "all" || category === activeTab;
      const matchSearch = title.includes(query);
      return matchCategory && matchSearch;
    });

    visibleCards.sort((a, b) => {
      const titleA = a.querySelector("h2").textContent.toLowerCase();
      const titleB = b.querySelector("h2").textContent.toLowerCase();
      return sortOrder === "az"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });

    movieCards.forEach(card => (card.style.display = "none"));
    visibleCards.forEach(card => (card.style.display = "flex"));
    const grid = document.querySelector('.movies-grid');
    let msg = grid.querySelector('.no-movies-message');
    if (visibleCards.length === 0) {
      if (!msg) {
        msg = document.createElement('div');
        msg.className = 'no-movies-message';
        msg.textContent = "No movies found. Please try another search.";
        grid.appendChild(msg);
      }
      grid.classList.add('no-movies');
    } else {
      if (msg) msg.remove();
      grid.classList.remove('no-movies');
    }


    titleHeader.textContent =
      activeTab === "all"
        ? "Film & Movies In Sinepolis"
        : activeTab === "now"
        ? "Now Showing"
        : "Coming Soon";
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      updateVisibleMovies();
    });
  });

  if (searchInput) searchInput.addEventListener("input", updateVisibleMovies);
  if (sortSelect) sortSelect.addEventListener("change", updateVisibleMovies);

  const defaultTab = document.querySelector('.tab[data-category="all"]');
  if (defaultTab) defaultTab.click();
});

document.addEventListener("DOMContentLoaded", () => {
  const showBtn = document.querySelector(".show-tickets-button");
  const ticketPopup = document.querySelector(".ticket-popup");
  const closeBtn = document.querySelector(".ticket-popup .close-btn");
  const qrContainer = document.querySelector(".ticket-popup .qr-container");

  if (showBtn && ticketPopup) {
    showBtn.addEventListener("click", () => {
      const hasQR = localStorage.getItem("ticketGenerated") === "true";
      ticketPopup.style.display = "flex";

      if (hasQR && qrContainer) {
        qrContainer.innerHTML = `
          <h2 class="qr-heading">Your Ticket</h2>
          <img src="../src/images/qr.png" alt="Your Ticket QR" class="qr-image" />
          <button class="close-qr-btn">Close QR</button>
        `;
        
        qrContainer.querySelector(".close-qr-btn").addEventListener("click", () => {
          ticketPopup.style.display = "none";
        });
      } else {
        qrContainer.innerHTML = `<p class="qr-empty">Belum ada tiket yang dipesan.</p>`;
      }
    });
  }

  if (closeBtn && ticketPopup) {
    closeBtn.addEventListener("click", () => {
      ticketPopup.style.display = "none";
    });
  }
});


document.querySelector('.sort-select').addEventListener('change', function () {
  const order = this.value;
  const container = document.querySelector('.movies-grid');
  const cards = Array.from(container.querySelectorAll('.movie-card'));

  cards.sort((a, b) => {
    const titleA = a.querySelector('h2').textContent.toLowerCase();
    const titleB = b.querySelector('h2').textContent.toLowerCase();
    return order === 'az' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
  });

  cards.forEach(card => container.appendChild(card));
});
