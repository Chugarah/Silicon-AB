// themeSwitch.js

const themeToggle = document.querySelector(
  ".header__theme-btn-access__toggle__check-box"
);
const body = document.body;

// New function to update background images
// This is written 100% by Phind AI this part

// Updated event listener for theme switching
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  }
});

// Check saved theme setting on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-theme");
  themeToggle.checked = true;
}
