document.addEventListener("DOMContentLoaded", () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dateDropdown = document.getElementById("date-dropdown");
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const option = document.createElement("option");
    option.value = date.toISOString();
    option.innerText = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
    dateDropdown.appendChild(option);
  }

  const showtimeContainer = document.getElementById("showtime-container");
  const locations = {
    "Sinepolis Aceh": ["10:00", "13:30","21:00","21:35"],
    "Sinepolis Bali": ["11:00","12:00","15:00","22:00"],
    "Sinepolis Jakarta": ["12:00", "17:00","18:00","20:00"],
    "Sinepolis Kalimantan": ["10:45","12:00","16:15","21:15"],
    "Sinepolis Pekanbaru": ["09:30","13:00","18:00","21:35"],
    "Sinepolis Semarang": ["10:15", "14:45","16:00","18:00"],
    "Sinepolis Tangerang": ["11:30", "15:30","17:00","19:00"]
  };

  let activeBtn = null;
  let bookBtn = null;

  function renderTimes() {
    showtimeContainer.innerHTML = "";
    const selectedDate = new Date(dateDropdown.value);

    Object.entries(locations).forEach(([location, times]) => {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = location;
      details.appendChild(summary);

      const timeWrap = document.createElement("div");
      timeWrap.className = "times-list";

      times.forEach(t => {
        const [h, m] = t.split(":").map(Number);
        const showTime = new Date(selectedDate);
        showTime.setHours(h, m, 0, 0);

        const btn = document.createElement("button");
        btn.innerText = t;
        btn.className = "showtime-time-btn";
        if (showTime < new Date()) btn.disabled = true;

        btn.addEventListener("click", () => {
          if (activeBtn === btn) {
            btn.classList.remove("selected");
            activeBtn = null;
            if (bookBtn) {
              bookBtn.remove();
              bookBtn = null;
            }
            return;
          }

          document.querySelectorAll(".showtime-time-btn").forEach(b => b.classList.remove("selected"));
          if (bookBtn) {
            bookBtn.remove();
            bookBtn = null;
          }

          btn.classList.add("selected");
          activeBtn = btn;

          showBookBtn(`${location} - ${btn.innerText} on ${dateDropdown.options[dateDropdown.selectedIndex].innerText}`);
        });

        timeWrap.appendChild(btn);
      });

      details.appendChild(timeWrap);
      showtimeContainer.appendChild(details);
    });

    const trailerBtn = document.querySelector(".trailer-btn");
    const poster = document.querySelector(".detail-poster");
    const body = document.body;

    const trailerModal = document.createElement("div");
    trailerModal.className = "trailer-modal";
    trailerModal.innerHTML = `
    <div class="trailer-overlay"></div>
    <div class="trailer-content">
        <button class="trailer-close">×</button>
        <iframe class="trailer-iframe" src="https://www.youtube.com/embed/JfVOs4VSpmA" frameborder="0" allowfullscreen></iframe>
    </div>
    `;
    body.appendChild(trailerModal);

    if (trailerBtn) {
    trailerBtn.addEventListener("click", () => {
        trailerModal.style.display = "flex";
    });
}

trailerModal.querySelector(".trailer-close").addEventListener("click", () => {
  trailerModal.style.display = "none";
});

trailerModal.querySelector(".trailer-overlay").addEventListener("click", () => {
  trailerModal.style.display = "none";
});

  }

  function showBookBtn(info) {
    bookBtn = document.createElement("button");
    bookBtn.className = "book-btn";
    bookBtn.innerText = "Book Tickets";

    document.querySelector(".detail-info").appendChild(bookBtn);

    bookBtn.onclick = () => {
      const movieTitle = document.querySelector(".movie-title").innerText.trim();
      const posterPath = document.querySelector(".detail-poster").getAttribute("src");
      const selectedDateText = dateDropdown.options[dateDropdown.selectedIndex].innerText;

      localStorage.setItem("selectedMovie", movieTitle);
      localStorage.setItem("selectedPoster", posterPath);
      localStorage.setItem("selectedShow", info);
      localStorage.setItem("selectedDate", selectedDateText);

      window.location.href = "seats.html";
    };
  }


  renderTimes();
  dateDropdown.addEventListener("change", renderTimes);
});
