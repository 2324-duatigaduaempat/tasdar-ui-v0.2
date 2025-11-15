// main.js
// - Load navbar, footer, floating button
// - Handle floating button click

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar-placeholder", "components/navbar.html");
  loadComponent("footer-placeholder", "components/footer.html");
  loadComponent("floating-button-placeholder", "components/floating-button.html", () => {
    const btn = document.querySelector(".floating-chat-btn");
    if (btn) {
      btn.addEventListener("click", () => {
        // Sentiasa bawa ke chat.html
        window.location.href = "chat.html";
      });
    }
  });

  enableAutoResizeTextareas();
});

function loadComponent(placeholderId, url, callback) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;

  fetch(url)
    .then((res) => res.text())
    .then((html) => {
      placeholder.innerHTML = html;
      if (typeof callback === "function") callback();
    })
    .catch((err) => {
      console.warn("Gagal load component:", url, err);
    });
}

function enableAutoResizeTextareas() {
  const areas = document.querySelectorAll("textarea[data-auto-resize], #chat-input");
  areas.forEach((area) => {
    area.addEventListener("input", () => {
      area.style.height = "auto";
      area.style.height = Math.min(area.scrollHeight, 120) + "px";
    });
  });
}
