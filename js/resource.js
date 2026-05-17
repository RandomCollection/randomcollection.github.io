"use strict";

async function loadLinks() {
  try {
    const response = await fetch("/page/resource/resource.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    Object.entries(data).forEach(([category, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        // Nested object (e.g. "Coding" → { "Python": [...], "SQL": [...] })
        Object.entries(value).forEach(([subcategory, links]) => {
          const container = document.querySelector(
            `[resource-key="${category}/${subcategory}"]`,
          );
          if (container) container.appendChild(createLinksList(links));
        });
      } else if (Array.isArray(value)) {
        // Flat array (e.g. "Data Science": [...])
        const container = document.querySelector(
          `[resource-key="${category}"]`,
        );
        if (container) container.appendChild(createLinksList(value));
      }
    });
  } catch (error) {
    console.error("Failed to load resources:", error);

    document.querySelectorAll("[resource-key]").forEach((el) => {
      el.innerHTML = `<p class="error">Failed to load resources.</p>`;
    });
  }
}

function createLinksList(links) {
  const ul = document.createElement("ul");
  ul.classList.add("resource-list");

  links.forEach(({ name, url }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = url;
    a.textContent = name;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    li.appendChild(a);
    ul.appendChild(li);
  });

  return ul;
}

document.addEventListener("DOMContentLoaded", loadLinks);
