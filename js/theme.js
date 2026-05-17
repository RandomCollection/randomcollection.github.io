"use strict";

function initTheme() {
  const toggleBtn = document.querySelector(".theme");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("theme-settings");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("theme-settings", next);
    localStorage.setItem("theme", next);
  });

  toggleBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleBtn.click();
    }
  });

  [
    ["sun", "/img/sun.svg"],
    ["moon", "/img/moon.svg"],
  ].forEach(([cls, src]) => {
    fetch(src)
      .then((r) => r.text())
      .then((svg) => {
        const el = document.querySelector(`.${cls}`);
        if (el) el.innerHTML = svg;
      })
      .catch((err) => console.error(`Failed to load ${src}:`, err));
  });
}
