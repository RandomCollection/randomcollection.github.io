"use strict";

function buildList(data, listTag = "ol") {
  if (typeof data === "string") {
    return data;
  }

  let html = "";

  if (Array.isArray(data.items)) {
    html += `<${listTag}>`;
    data.items.forEach((item) => {
      if (typeof item === "string") {
        html += `<li>${item}</li>`;
      } else {
        html += `<li>${item.text}`;
        if (Array.isArray(item.subitems)) {
          html += "<ul>";
          item.subitems.forEach((sub) => {
            html += `<li>${sub}</li>`;
          });
          html += "</ul>";
        }
        html += "</li>";
      }
    });
    html += `</${listTag}>`;
  }

  return html;
}

function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (langData[key] !== undefined) {
      const value = langData[key];
      const listTag = element.getAttribute("data-i18n-list") || "ol";
      element.innerHTML =
        typeof value === "object" ? buildList(value, listTag) : value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (langData[key]) {
      element.placeholder = langData[key];
    }
  });
}
