"use strict";

window.currentLangData = {};

const DE_TOAST_SHOWN_KEY = "deToastShown";

// Fetch language data
async function fetchLanguageData(lang) {
  const response = await fetch(`/language/${lang}.json`);
  return response.json();
}

// Set language preference
function setLanguagePreference(lang) {
  localStorage.setItem("language", lang);
}

// Update content based on selected language
function updateContent(langData) {
  // Text content
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (key in langData) {
      element.innerHTML = langData[key];
    }
  });
  // Placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (key in langData) {
      element.placeholder = langData[key];
    }
  });
}

// Show toast notification
function showToast(message, duration = 5000) {
  const toast = document.querySelector(".language-toast");
  if (!toast) return;
  toast.innerHTML = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

// Change language
async function changeLanguage(lang) {
  document.documentElement.setAttribute("lang", lang);
  setLanguagePreference(lang);
  const langData = await fetchLanguageData(lang);
  window.currentLangData = langData;
  updateContent(langData);
  updateButtonText(lang);
  highlightSelectedLanguage(lang);

  document.dispatchEvent(new CustomEvent("languageLoaded"));

  if (lang === "de" && !sessionStorage.getItem(DE_TOAST_SHOWN_KEY)) {
    showToast(langData.language_toast);
    sessionStorage.setItem(DE_TOAST_SHOWN_KEY, "true");
  }
  if (lang !== "de") {
    sessionStorage.removeItem(DE_TOAST_SHOWN_KEY);
  }
}

// Update language button
function updateButtonText(lang) {
  const currentLangEl = document.querySelector(".language-active");
  if (currentLangEl) {
    currentLangEl.textContent = lang.toUpperCase();
  }
}

// Highlight active language dropdown
function highlightSelectedLanguage(lang) {
  document.querySelectorAll(".language-dropdown li").forEach((li) => {
    li.classList.remove("active");
    if (li.getAttribute("language-item") === lang) {
      li.classList.add("active");
    }
  });
}

// Handle language selection from the dropdown menu
function initLanguage() {
  const btn = document.querySelector(".language-button");
  const menu = document.querySelector(".language-dropdown");

  // Fetch and update content based on the user's preferred language (or default to 'en')
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  changeLanguage(userPreferredLanguage);

  // Toggle the dropdown visibility when the button is clicked
  btn.addEventListener("click", () => {
    menu.classList.toggle("show");
    btn.classList.toggle("active");
  });

  // Change language when an item in the dropdown is clicked
  document.querySelectorAll(".language-dropdown li").forEach((item) => {
    item.addEventListener("click", () => {
      const lang = item.getAttribute("language-item");
      changeLanguage(lang); // Change the language when an item is clicked

      // Close the dropdown after language change
      menu.classList.remove("show");
      btn.classList.remove("active");
    });
  });

  // Close the dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("show");
      btn.classList.remove("active");
    }
  });
}
