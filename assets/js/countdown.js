document.addEventListener("DOMContentLoaded", () => {
      const countdownEl = document.getElementById("countdown");
      const endDate = new Date("2025-07-06T23:59:59");

      function updateCountdown() {
        const now = new Date();
        const diff = endDate - now;

        if (diff <= 0) {
          countdownEl.innerHTML = "Promo has ended.";
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        countdownEl.innerHTML = 
          `Ends in ${days}d ${hours}h ${minutes}m ${seconds}s`;
      }

      updateCountdown();
      setInterval(updateCountdown, 1000);
    });