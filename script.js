/* =========================================================
   GZN EVERWORLD — script.js
   Handles: mobile nav, scroll-drawn road (signature element),
   waypoint reveal-on-scroll, rule chapter tabs, YouTube
   lightbox with lazy-loaded facades.
   ========================================================= */
(() => {
  "use strict";

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const open = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navList.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navList.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Scroll-drawn road ---------- */
  const roadFg = document.getElementById("roadPathFg");
  const roadRail = document.getElementById("roadRail");
  let roadLength = 0;

  function measureRoad() {
    if (!roadFg) return;
    roadLength = roadFg.getTotalLength();
    roadFg.style.strokeDasharray = String(roadLength);
    // set the rail's viewBox height to match actual document height
    const docHeight = document.documentElement.scrollHeight;
    if (roadRail) roadRail.setAttribute("viewBox", `0 0 100 ${docHeight}`);
    updateRoad();
  }

  function updateRoad() {
    if (!roadFg || !roadLength) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
    const offset = roadLength * (1 - progress);
    roadFg.style.strokeDashoffset = String(offset);
  }

  window.addEventListener("resize", debounce(measureRoad, 200));
  window.addEventListener("load", measureRoad);
  window.addEventListener("scroll", () => requestAnimationFrame(updateRoad), { passive: true });

  function debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  /* ---------- Waypoint reveal on scroll ---------- */
  const waypoints = document.querySelectorAll("[data-waypoint]");
  if ("IntersectionObserver" in window && waypoints.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    waypoints.forEach((w) => io.observe(w));
  } else {
    waypoints.forEach((w) => w.classList.add("is-visible"));
  }

  /* ---------- Sticky nav shrink shadow ---------- */
  const topnav = document.getElementById("topnav");
  window.addEventListener(
    "scroll",
    () => {
      if (!topnav) return;
      topnav.style.boxShadow = window.scrollY > 8 ? "0 6px 20px rgba(22,36,28,.08)" : "none";
    },
    { passive: true }
  );

  /* ---------- Rule chapter tabs ---------- */
  const ruleButtons = document.querySelectorAll(".rule-nav-btn");
  const rulePanels = document.querySelectorAll(".rule-panel");
  ruleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      ruleButtons.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      rulePanels.forEach((p) => p.classList.toggle("is-active", p.id === targetId));
    });
  });

  /* ---------- YouTube facade + lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxFrame = document.getElementById("lightboxFrame");
  const lightboxClose = document.getElementById("lightboxClose");

  function openVideo(ytId) {
    if (!lightbox || !lightboxFrame || !ytId) return;
    lightboxFrame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0" title="GZN Everworld Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeVideo() {
    if (!lightbox || !lightboxFrame) return;
    lightbox.hidden = true;
    lightboxFrame.innerHTML = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-yt-id]").forEach((frame) => {
    const id = frame.getAttribute("data-yt-id");
    frame.addEventListener("click", () => openVideo(id));
    frame.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openVideo(id);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeVideo);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeVideo();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideo();
  });

  /* ---------- Download button placeholder note ---------- */
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", (e) => {
      if (downloadBtn.getAttribute("href") === "#") {
        e.preventDefault();
        downloadBtn.textContent = "Download folgt in Kürze";
        setTimeout(() => (downloadBtn.textContent = "Client herunterladen"), 2200);
      }
    });
  }
})();
