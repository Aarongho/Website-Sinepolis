document.addEventListener("DOMContentLoaded", async () => {
  const placeholder = document.querySelector(".navbar-placeholder");
  if (!placeholder) return;
  const res = await fetch("navbar.html");
  if (!res.ok) return;
  const html = await res.text();
  placeholder.innerHTML = html;

  const hamburger = document.querySelector(".navbar .hamburger");
  const navOverlay = document.getElementById("navOverlay");
  const overlayClose = document.getElementById("overlayClose");

  if (!hamburger || !navOverlay || !overlayClose) return;

  hamburger.addEventListener("click", () => {
    navOverlay.classList.add("active");
  });

  overlayClose.addEventListener("click", () => {
    navOverlay.classList.remove("active");
  });
});
