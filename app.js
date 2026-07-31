const header = document.querySelector(".site-header");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const mobileNavigation = window.matchMedia("(max-width: 48rem)");

const setNavigationOpen = (open, returnFocus = false) => {
  if (!nav || !navToggle) {
    return;
  }

  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");

  if (!open && returnFocus) {
    navToggle.focus();
  }
};

navToggle?.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") !== "true";
  setNavigationOpen(open);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNavigationOpen(false));
});

document.addEventListener("pointerdown", (event) => {
  if (
    mobileNavigation.matches &&
    navToggle?.getAttribute("aria-expanded") === "true" &&
    !header?.contains(event.target)
  ) {
    setNavigationOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navToggle?.getAttribute("aria-expanded") === "true") {
    setNavigationOpen(false, true);
  }
});

const resetNavigation = () => setNavigationOpen(false);

if (typeof mobileNavigation.addEventListener === "function") {
  mobileNavigation.addEventListener("change", resetNavigation);
} else {
  mobileNavigation.addListener(resetNavigation);
}
