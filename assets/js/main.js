const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const closeButton = document.querySelector(".mobile-menu__close");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu__nav a");
const casesGrid = document.querySelector("#cases-grid");
const revealItems = document.querySelectorAll(".reveal");

function openMenu() {
  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");
  menuButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("no-scroll");
}

function closeMenu() {
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
}

if (menuButton && mobileMenu && closeButton) {
  menuButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);

  mobileMenu.addEventListener("click", (event) => {
    if (event.target === mobileMenu) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function renderCases() {
  if (!casesGrid || !window.caseStudies) return;

  casesGrid.innerHTML = window.caseStudies
    .map(
      (item) => `
        <a class="case-card reveal" href="${item.link}">
          <div class="case-card__image">
            <img
              src="${item.image}"
              alt="${item.title}"
              width="960"
              height="600"
              loading="lazy"
            />
          </div>
          <div class="case-card__content">
            <h3 class="case-card__title">${item.title}</h3>
            <p class="case-card__description">${item.description}</p>
            <div class="case-card__meta">
              ${item.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
          </div>
        </a>
      `
    )
    .join("");
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  elements.forEach((element) => observer.observe(element));
}

renderCases();
initReveal();
