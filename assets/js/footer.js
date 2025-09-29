document.addEventListener("DOMContentLoaded", () => {
  const footerPlaceholder = document.querySelector(".footer-placeholder");
  if (!footerPlaceholder) return;

  fetch("footer.html")
    .then(res => res.ok ? res.text() : "")
    .then(html => {
      if (html) footerPlaceholder.innerHTML = html;
    });
});
