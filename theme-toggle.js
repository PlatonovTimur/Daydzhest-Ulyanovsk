/* Переключатель темы + ротатор иконок мессенджеров.
   Подключи в <head> с атрибутом defer, а в HTML добавь кнопку:
   <button class="theme-toggle" id="theme-toggle" aria-label="Сменить тему"></button>
   (на обложке — с классом "theme-toggle floating") */

(function () {
  var root = document.documentElement;
  var KEY = "theme";

  // применяем сохранённую тему как можно раньше, чтобы не было мигания
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}

  function current() {
    var forced = root.getAttribute("data-theme");
    if (forced) return forced;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function paint(btn) {
    btn.textContent = current() === "dark" ? "Светлая тема" : "Тёмная тема";
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* ===== Переключатель темы ===== */
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      paint(btn);
      btn.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem(KEY, next); } catch (e) {}
        paint(btn);
      });
    }

    /* ===== Ротатор иконок мессенджеров ===== */
    (function initSocialRotator() {
      var icons = document.querySelectorAll('.rotating-icon');
      if (!icons.length) return;

      var currentIcon = 0;
      icons.forEach(function (el, i) {
        el.classList.toggle('active', i === 0);
      });

      setInterval(function () {
        icons[currentIcon].classList.remove('active');
        currentIcon = (currentIcon + 1) % icons.length;
        icons[currentIcon].classList.add('active');
      }, 2500);
    })();
  });
})();