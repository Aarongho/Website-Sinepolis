document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown");
  const deadline = new Date("2025-06-30T23:59:59").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = deadline - now;

    if (distance < 0) {
      countdownElement.textContent = "Expired";
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); 
});
