document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".dropdown-toggle");
  const descriptionCard = document.querySelector(".description-card");

  if (toggleBtn && descriptionCard) {
    toggleBtn.addEventListener("click", () => {
      const isVisible = descriptionCard.style.display === "block";
      descriptionCard.style.display = isVisible ? "none" : "block";
      toggleBtn.innerHTML = isVisible
        ? 'Show Description <span class="arrow">&#9660;</span>'
        : 'Hide Description <span class="arrow">&#9650;</span>';
    });
  }
  const promoCodeBadge = document.querySelector(".promo-code-badge");
  if (promoCodeBadge) {
    promoCodeBadge.addEventListener("click", () => {
      const codeText = promoCodeBadge.textContent.replace("Code: ", "").trim();
      navigator.clipboard.writeText(codeText).then(() => {
        const existingTag = promoCodeBadge.querySelector(".copied-label");
        if (!existingTag) {
          const copiedTag = document.createElement("span");
          copiedTag.className = "copied-label";
          copiedTag.innerText = "Copied!";
          copiedTag.style.fontFamily = "Jomhuria, cursive";
          copiedTag.style.position = "absolute";
          copiedTag.style.top = "100%";
          copiedTag.style.left = "50%";
          copiedTag.style.transform = "translateX(-50%)";
          copiedTag.style.marginTop = "0.5rem";
          copiedTag.style.backgroundColor = "#FFD700";
          copiedTag.style.color = "#0b3d0b";
          copiedTag.style.fontSize = "2.5rem";
          copiedTag.style.padding = "0.4rem 1rem";
          copiedTag.style.borderRadius = "6px";
          copiedTag.style.whiteSpace = "nowrap";
          copiedTag.style.zIndex = "10";
          promoCodeBadge.appendChild(copiedTag);
          setTimeout(() => copiedTag.remove(), 1500);
        }
      });
    });
  }
});
