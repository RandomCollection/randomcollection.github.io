"use strict";

async function loadComponent(id, file, callback) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
    if (callback) callback();
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}

async function loadAll() {
  await Promise.all([
    loadComponent("header", "/element/header.html"),
    loadComponent("nav", "/element/nav.html", initNav),
    loadComponent("footer", "/element/footer.html"),
    loadComponent("language", "/element/language.html", initLanguage),
    loadComponent("theme", "/element/theme.html", initTheme),
  ]);
  document.body.style.visibility = "visible";
}

loadAll();
