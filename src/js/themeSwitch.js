// themeSwitch.js

const themeToggle = document.querySelector(
  ".header__theme-btn-access__toggle__check-box"
);
const body = document.body;

// New function to update background images
// This is written 100% by Phind AI this part
function updateBackgroundImages() {
  const androidElement = document.querySelector(
    ".hero-section__apps-links__link-item__android"
  );
  const appleElement = document.querySelector(
    ".hero-section__apps-links__link-item__apple"
  );

  if (androidElement) {
    androidElement.style.backgroundImage = "var(--app-image-android)";
    androidElement.style.display = "block";
  }

  if (appleElement) {
    appleElement.style.backgroundImage = "var(--app-image-apple)";
    appleElement.style.display = "block";
  }
}

function isEdgeIOS() {
  return /EdgiOS/.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded", function () {
  if (isEdgeIOS()) {
    document.documentElement.setAttribute("data-theme", "light");
  }
});

// Resten av koden förblir oförändrad

// Updated event listener for theme switching
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  }
  // Call updateBackgroundImages after theme change
  updateBackgroundImages();
});

// Check saved theme setting on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  body.classList.add("dark-theme");
  themeToggle.checked = true;
}

// Update background images on page load
document.addEventListener("DOMContentLoaded", updateBackgroundImages);
