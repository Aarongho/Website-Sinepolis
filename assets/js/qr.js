document.addEventListener("DOMContentLoaded", () => {
  const qr = new QRious({
    element: document.getElementById("qr-code"),
    size: 250,
    value: "default"
  });

  const movie = localStorage.getItem("selectedMovie") || "Unknown";
  const show = localStorage.getItem("selectedShow") || "Unknown";
  const seats = JSON.parse(localStorage.getItem("selectedSeats") || "[]");
  const method = localStorage.getItem("selectedPayment") || "Not selected";

  if (movie === "Unknown" || show === "Unknown" || seats.length === 0) {
    alert("Booking data not found!");
    window.location.href = "index.html";
    return;
  }

  const value = `Movie: ${movie}\nShow: ${show}\nSeats: ${seats.join(", ")}\nPayment: ${method}`;
  qr.value = value;

  document.getElementById("movie-title").innerText = `Movie: ${movie}`;
  document.getElementById("location").innerText = `Location: ${show.split(" - ")[0]}`;
  document.getElementById("date-time").innerText = `Date & Time: ${show.split("on")[1]?.trim() || "-"}`;
  document.getElementById("seats").innerText = `Seats: ${seats.join(", ")}`;
  document.getElementById("payment").innerText = `Payment: ${method}`;

  document.getElementById("done-btn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.querySelector(".close-qr-btn");
  closeBtn.addEventListener("click", () => {
    window.location.href = "nowshowing.html";
  });

  localStorage.setItem("ticketGenerated", "true");
});


