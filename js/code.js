"use strict";

document.querySelectorAll("code[data-src]").forEach(async (el) => {
  const response = await fetch(el.dataset.src);
  const text = await response.text();

  el.textContent = text;

  Prism.highlightElement(el);

  const block = el.closest(".code");

  if (!block) return;

  let language = "CODE";

  const match = [...el.classList].find((c) => c.startsWith("language-"));

  if (match) {
    language = match.replace("language-", "").toUpperCase();
  }

  const label = document.createElement("span");
  label.className = "code-label";
  label.textContent = language;

  const button = document.createElement("button");
  button.className = "code-copy";

  button.innerHTML = `
    <svg class="icon-copy" xmlns="http://www.w3.org/2000/svg">
      <use href="/img/copy.svg"></use>
    </svg>

    <svg class="icon-check" xmlns="http://www.w3.org/2000/svg">
      <use href="/img/check.svg"></use>
    </svg>
  `;

  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(el.innerText);

    button.classList.add("copied");

    setTimeout(() => {
      button.classList.remove("copied");
    }, 2000);
  });

  block.prepend(button);
  block.prepend(label);
});
