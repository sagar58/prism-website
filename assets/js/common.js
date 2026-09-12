/* Prism — shared navigation behavior */
(function () {
  "use strict";

  function closeMenus(except) {
    document.querySelectorAll(".nav-dropdown.open").forEach(function (item) {
      if (item !== except) {
        item.classList.remove("open");
        var toggle = item.querySelector(".dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.addEventListener("click", function (event) {
    var toggle = event.target.closest(".dropdown-toggle");
    if (toggle) {
      var dropdown = toggle.closest(".nav-dropdown");
      var isOpen = dropdown.classList.contains("open");
      closeMenus(dropdown);
      dropdown.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
      event.preventDefault();
      return;
    }

    var menuButton = event.target.closest(".mobile-menu-btn");
    if (menuButton) {
      var nav = menuButton.parentElement.querySelector(".main-nav, .hero-nav");
      if (!nav) return;

      var isOpen = nav.classList.toggle("mobile-open");
      menuButton.classList.toggle("active", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));

      if (!isOpen) closeMenus();
      return;
    }

    if (!event.target.closest(".main-nav, .hero-nav")) {
      closeMenus();
      document.querySelectorAll(".main-nav.mobile-open, .hero-nav.mobile-open").forEach(function (nav) {
        nav.classList.remove("mobile-open");
      });
      document.querySelectorAll(".mobile-menu-btn.active").forEach(function (button) {
        button.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
      });
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenus();
      document.querySelectorAll(".main-nav.mobile-open, .hero-nav.mobile-open").forEach(function (nav) {
        nav.classList.remove("mobile-open");
      });
      document.querySelectorAll(".mobile-menu-btn.active").forEach(function (button) {
        button.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
      });
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 800) {
      document.querySelectorAll(".main-nav.mobile-open, .hero-nav.mobile-open").forEach(function (nav) {
        nav.classList.remove("mobile-open");
      });
      document.querySelectorAll(".mobile-menu-btn.active").forEach(function (button) {
        button.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
      });
    }
  });
})();
