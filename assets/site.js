const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const narrow = window.matchMedia("(max-width: 720px)");

function setMenu(open) {
  menu.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
}

menu.hidden = false;
menu.addEventListener("click", () => {
  setMenu(menu.getAttribute("aria-expanded") !== "true");
});

nav.addEventListener("click", (event) => {
  if (!narrow.matches || !event.target.matches("a[href^='#']")) return;

  setMenu(false);
  const section = document.getElementById(event.target.hash.slice(1));
  section.tabIndex = -1;
  section.focus({ preventScroll: true });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || menu.getAttribute("aria-expanded") !== "true") return;

  setMenu(false);
  menu.focus();
});

narrow.addEventListener("change", () => setMenu(false));

const filters = document.querySelector(".work-filters");
const filterButtons = [...filters.querySelectorAll("button")];
const projects = [...document.querySelectorAll(".project")];
const filterStatus = document.querySelector("#filter-status");

filters.hidden = false;
for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    for (const choice of filterButtons) {
      choice.setAttribute("aria-pressed", String(choice === button));
    }

    for (const project of projects) {
      const isVisible = filter === "all" || project.dataset.category === filter;
      project.hidden = !isVisible;
      visibleCount += Number(isVisible);
    }

    filterStatus.textContent = `${visibleCount} projects shown. ${button.textContent}.`;
  });
}
