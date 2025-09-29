document.addEventListener("DOMContentLoaded", () => {
  const seats = document.querySelectorAll(".seat.regular");
  seats.forEach(seat => {
    seat.addEventListener("click", () => {
      seat.classList.toggle("selected");
    });
  });

  const confirmBtn = document.querySelector(".confirm-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const modal = document.getElementById("no-seat-modal");
  const modalClose = document.querySelector(".modal-close");
  const modalOk = document.querySelector(".modal-ok-btn");

  confirmBtn.addEventListener("click", () => {
    const selected = [...document.querySelectorAll(".seat.selected")];
    if (selected.length === 0) {
      modal.style.display = "block";
    } else {
      const seatNumbers = selected.map(seat => seat.innerText);
      localStorage.setItem("selectedSeats", JSON.stringify(seatNumbers));
      localStorage.setItem("selectedSeatCount", seatNumbers.length);
      window.location.href = "confirmation.html";
    }
  });

  cancelBtn.addEventListener("click", () => {
    window.location.href = "nowshowing.html";
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modalOk.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
