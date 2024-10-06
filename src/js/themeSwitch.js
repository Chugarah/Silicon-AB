// themeSwitch.js

const themeToggle = document.querySelector(
  ".header__theme-btn-access__toggle__check-box"
);
const body = document.body;

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  }
});

// Kontrollera sparad temainställning vid sidladdning
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-theme");
  themeToggle.checked = true;
}
