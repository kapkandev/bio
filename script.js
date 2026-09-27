document.getElementById("year").textContent = new Date().getFullYear();

const themeCheckbox = document.getElementById("theme-toggle-checkbox");
const htmlElement = document.documentElement;

themeCheckbox.addEventListener("change", () => {
  const theme = themeCheckbox.checked ? "dark" : "light";
  htmlElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});

const savedTheme = localStorage.getItem("theme") || "light";
htmlElement.setAttribute("data-theme", savedTheme);
themeCheckbox.checked = (savedTheme === "dark");

const cloudsEl = document.getElementById("clouds");
const starsEl  = document.getElementById("stars");

function buildClouds() {
  if (!cloudsEl || cloudsEl.childElementCount) return;
  for (let i = 0; i < 9; i++) {
    const c = document.createElement("div");
    c.className = "cloud";
    const size = 80 + Math.random() * 120;
    c.style.width  = size + "px";
    c.style.height = size * 0.5 + "px";
    c.style.top    = (5 + Math.random() * 75) + "%";
    c.style.opacity = (0.55 + Math.random() * 0.4).toFixed(2);
    c.style.animationDuration = (50 + Math.random() * 70) + "s";
    c.style.animationDelay    = (-Math.random() * 80) + "s";
    cloudsEl.appendChild(c);
  }
}

function buildStars() {
  if (!starsEl || starsEl.childElementCount) return;
  for (let i = 0; i < 140; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const size = 1 + Math.random() * 2.5;
    s.style.width  = size + "px";
    s.style.height = size + "px";
    s.style.left   = Math.random() * 100 + "%";
    s.style.top    = Math.random() * 100 + "%";
    s.style.animationDuration = (1.5 + Math.random() * 3) + "s";
    s.style.animationDelay    = (-Math.random() * 4) + "s";
    starsEl.appendChild(s);
  }
}

buildClouds();
buildStars();

document.querySelectorAll("[data-redirect]").forEach((el) => {
  el.addEventListener("click", () => {
    try {
      sessionStorage.setItem("redirect_url", el.getAttribute("data-redirect"));
    } catch (e) {}
  });
});