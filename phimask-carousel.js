// Selection and deep links for PHI Mask's eight shipped capture examples.
export function createPhimaskCarousel(video, { onChange, onPause, onSelect }) {
  const root = document.querySelector(".phimask-carousel");
  if (!root || !video) return null;
  const choices = [...root.querySelectorAll("[data-example]")];
  const compact = matchMedia("(max-width: 640px)");
  const source = video.querySelector("source");
  const picture = root.querySelector("picture");
  const demo = root.querySelector(".carousel-demo");
  const label = root.querySelector("#carousel-label");
  const status = root.querySelector("#carousel-status");
  let selected = 0;
  let hovered = false;

  function select(index, manual = false) {
    selected = (index + choices.length) % choices.length;
    const choice = choices[selected];
    const base = "/assets/work/phimask-" + choice.dataset.example;
    video.pause();
    delete video.dataset.ready;
    delete video.dataset.failed;
    source.removeAttribute("src");
    source.dataset.src = base + (compact.matches ? "-square.mp4" : "-wide.mp4");
    // The playback controller loads this source only when motion is enabled.
    picture.querySelector("source").srcset = base + "-square.png";
    picture.querySelector("img").src = base + "-wide.png";
    demo.href = choice.href;
    demo.setAttribute("aria-label", "Try " + choice.dataset.label + " in PHI Mask");
    label.textContent = (selected + 1) + " / " + choices.length + " · " + choice.dataset.label;
    for (const item of choices) item.setAttribute("aria-pressed", String(item === choice));
    if (manual) status.textContent = label.textContent;
    onChange();
  }

  choices.forEach((choice, index) => {
    // Without JavaScript these remain direct links to every example.
    choice.setAttribute("role", "button");
    choice.setAttribute("aria-controls", "phimask-film");
    choice.addEventListener("click", event => {
      event.preventDefault();
      select(index, true);
      onSelect();
    });
    choice.addEventListener("keydown", event => {
      if (event.key === " ") {
        event.preventDefault();
        choice.click();
      }
    });
  });
  demo.addEventListener("pointerenter", event => {
    if (event.pointerType === "touch") return;
    hovered = true;
    onChange();
  });
  demo.addEventListener("pointerleave", () => { hovered = false; onChange(); });
  root.addEventListener("focusin", onPause);
  compact.addEventListener("change", () => select(selected));
  select(0);
  return { next: () => select(selected + 1), isHeld: () => hovered };
}
