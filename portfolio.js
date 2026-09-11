(() => {
  const career = document.querySelector(".career");
  const intro = document.querySelector(".intro-grid");
  const work = document.querySelector(".work-section");
  const mobile = window.matchMedia("(max-width: 760px)");
  const placeCareer = () => {
    if (!career || !intro || !work) return;
    if (mobile.matches) work.after(career);
    else intro.append(career);
  };
  placeCareer();
  mobile.addEventListener("change", placeCareer);

  const toggle = document.querySelector("#motion-toggle");
  const videos = [...document.querySelectorAll(".project-film")];
  if (!toggle || !videos.length || !("IntersectionObserver" in window)) return;

  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let motionEnabled = !preference.matches && !navigator.connection?.saveData;
  const visible = new Set();

  function updateToggle() {
    toggle.querySelector("[data-motion-label]").textContent = motionEnabled ? "Pause motion" : "Play motion";
    toggle.querySelector(".motion-icon").textContent = motionEnabled ? "Ⅱ" : "▷";
  }

  function syncVideo(video) {
    if (!motionEnabled || document.hidden || !visible.has(video) || video.dataset.failed) {
      video.pause();
      return;
    }
    const source = video.querySelector("source");
    if (!source.hasAttribute("src")) {
      source.src = source.dataset.src;
      video.load();
    }
    video.muted = true;
    video.play().catch((error) => {
      // Browsers may deny autoplay. Keep the poster and allow a user-initiated retry.
      if (error.name === "AbortError" || !motionEnabled || document.hidden || !visible.has(video)) return;
      if (error.name !== "NotAllowedError") {
        video.dataset.failed = "true";
        delete video.dataset.ready;
        return;
      }
      motionEnabled = false;
      videos.forEach((item) => item.pause());
      updateToggle();
    });
  }

  function syncAll() {
    updateToggle();
    videos.forEach(syncVideo);
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.1) visible.add(entry.target);
      else visible.delete(entry.target);
      syncVideo(entry.target);
    }
  }, { threshold: 0.1 });

  for (const video of videos) {
    video.addEventListener("playing", () => { video.dataset.ready = ""; });
    const showPoster = () => {
      video.dataset.failed = "true";
      delete video.dataset.ready;
    };
    video.addEventListener("error", showPoster);
    video.querySelector("source").addEventListener("error", showPoster);
    observer.observe(video);
  }

  toggle.addEventListener("click", () => { motionEnabled = !motionEnabled; syncAll(); });
  preference.addEventListener("change", () => {
    motionEnabled = !preference.matches && !navigator.connection?.saveData;
    if (!motionEnabled) videos.forEach((video) => { delete video.dataset.ready; });
    syncAll();
  });
  document.addEventListener("visibilitychange", syncAll);
  toggle.hidden = false;
  updateToggle();
})();
