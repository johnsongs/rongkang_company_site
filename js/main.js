/* 荣康智能企业门户 - 交互脚本 */
(function () {
  "use strict";

  var navbar = document.getElementById("navbar");
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");
  var navLinks = document.querySelectorAll(".nav-link");
  var backTop = document.getElementById("backTop");
  var sections = document.querySelectorAll("section[id]");

  /* 导航栏滚动态 + 返回顶部按钮 */
  function onScroll() {
    var y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 40);
    backTop.classList.toggle("show", y > 500);

    var current = "home";
    sections.forEach(function (sec) {
      if (y >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* 移动端菜单 */
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      navToggle.classList.remove("open");
    });
  });

  /* 返回顶部 */
  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* 滚动入场动画 */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.08 + "s";
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* 数字滚动动画 */
  var statNums = document.querySelectorAll(".stat-num");
  var counted = false;

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var duration = 1200;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(target * progress);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            statNums.forEach(animateCount);
            countObserver.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    var statsBox = document.querySelector(".hero-stats");
    if (statsBox) countObserver.observe(statsBox);
  } else {
    statNums.forEach(function (el) {
      el.textContent = el.getAttribute("data-count");
    });
  }
})();
