document.addEventListener("DOMContentLoaded", () => {
  const movieTitle = localStorage.getItem("selectedMovie") || "Unknown Movie";
  const showInfo = localStorage.getItem("selectedShow") || "Unknown Location - Time";
  const seats = JSON.parse(localStorage.getItem("selectedSeats") || "[]");

  const [locationPart, timeInfo] = showInfo.split(" - ");
  const [time, dateText] = timeInfo.split(" on ");
  const formattedDate = dateText || new Date().toLocaleDateString("id-ID");

  document.getElementById("movie-title").innerText = movieTitle;
  document.getElementById("location").innerText = locationPart || "Unknown";
  document.getElementById("day").innerText = formattedDate;
  document.getElementById("time").innerText = time || "Unknown";
  document.getElementById("seat-count").innerText = seats.length;
  document.getElementById("seats").innerText = seats.join(", ");
  const posterSrc = localStorage.getItem("selectedPoster");
  document.getElementById("movie-poster").src = posterSrc;

  const pricePerSeat = 50000;
  const originalPrice = pricePerSeat * seats.length;
  let discountPercent = 0;

  const updatePrices = () => {
    const discountAmount = originalPrice * (discountPercent / 100);
    const total = originalPrice - discountAmount;
    document.getElementById("price").innerText = originalPrice.toLocaleString("id-ID");
    document.getElementById("discount").innerText = discountAmount.toLocaleString("id-ID");
    document.getElementById("total").innerText = total.toLocaleString("id-ID");
  };

  updatePrices();

  document.getElementById("voucher").addEventListener("input", (e) => {
    const code = e.target.value.trim().toUpperCase();
    const status = document.getElementById("voucher-status");

    if (code === "BOGO2025") {
      discountPercent = 50;
      status.innerText = "✓ Valid";
      status.className = "valid";
    } else if (code === "IMAX30") {
      discountPercent = 30;
      status.innerText = "✓ Valid";
      status.className = "valid";
    } else if (["POPCORN2025", "VIPLOUNGE25", "WINBIG40", "TBLOT2025"].includes(code)) {
      discountPercent = 0;
      status.innerText = "✗ Invalid use";
      status.className = "invalid";
    } else if (code === "") {
      discountPercent = 0;
      status.innerText = "";
      status.className = "";
    } else {
      discountPercent = 0;
      status.innerText = "✗ Invalid";
      status.className = "invalid";
    }

    updatePrices();
  });

  document.getElementById("confirm-btn").addEventListener("click", () => {
    const payment = document.getElementById("payment-method").value;
    if (!payment) {
      const modal = document.getElementById("payment-modal");
      modal.style.display = "flex";
      return; 
    }

    const history = JSON.parse(localStorage.getItem("ticketHistory") || "[]");
    const order = {
      id: `ORD${Date.now()}`,
      movie: movieTitle,
      date: formattedDate,
      time: time,
      location: locationPart,
      seats,
      total: document.getElementById("total").innerText
    };

    history.push(order);
    localStorage.setItem("ticketHistory", JSON.stringify(history));
    localStorage.setItem("ticketGenerated", "true");

    window.location.href = "qr.html";
  });

  document.getElementById("cancel-btn").addEventListener("click", () => {
    window.location.href = "seats.html";
  });

  const closeBtn = document.querySelector(".modal-close");
  closeBtn.addEventListener("click", () => {
    const modal = document.getElementById("payment-modal");
    modal.style.display = "none";
  });

  const modalOverlay = document.getElementById("payment-modal");
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = "none";
    }
  });
});
