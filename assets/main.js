(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  var themeToggle = document.querySelector(".theme-toggle");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.addEventListener("click", function (e) {
    var target = e.target;
    if (!target || target.tagName !== "A") return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });

  function setTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    if (themeToggle) {
      themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
      themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    }
    try {
      localStorage.setItem("freshline_theme", isDark ? "dark" : "light");
    } catch (e) {}
  }

  (function initTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem("freshline_theme");
    } catch (e) {}
    if (stored === "light") setTheme(false);
    else setTheme(true);
  })();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(!document.body.classList.contains("dark-mode"));
    });
  }
})();
