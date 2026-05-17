"use strict";

function highlightActiveNav() {
  const current = window.location.pathname;

  document
    .querySelectorAll(".nav-page > li:not(.nav-dropdown) a")
    .forEach((a) => {
      const linkPath = new URL(a.href).pathname;
      if (current === linkPath) {
        a.classList.add("active");
      }
    });

  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const hasActiveChild = [...dropdown.querySelectorAll("a")].some((a) => {
      return current === new URL(a.href).pathname;
    });
    if (hasActiveChild) {
      dropdown.querySelector(".nav-dropdown-toggle").classList.add("active");
    }
  });
}
function initNav() {
  const toggleBtn = document.querySelector(".nav-hamburger");
  const menu = document.querySelector(".nav-page");
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.parentElement.classList.toggle("open");
    });
  });

  document.addEventListener("click", (e) => {
    document.querySelectorAll(".nav-dropdown").forEach((drop) => {
      if (!drop.contains(e.target)) {
        drop.classList.remove("open");
        const btn = drop.querySelector(".nav-dropdown-toggle");
      }
    });

    if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
      menu.classList.remove("active");
    }
  });

  highlightActiveNav();
}
