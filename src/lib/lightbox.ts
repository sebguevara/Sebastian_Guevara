/**
 * Fullscreen image viewer for project galleries.
 *
 * Markup contract:
 *   [data-lightbox]                 — overlay root
 *     [data-lightbox-image]         — <img> that shows the active slide
 *     [data-lightbox-counter]       — "1 / 3" text
 *     [data-lightbox-close]
 *     [data-lightbox-prev]
 *     [data-lightbox-next]
 *
 * Triggers:
 *   [data-lightbox-open="<index>"] inside [data-lightbox-source]
 *   Sources are read from <img> elements under that source root.
 */
export function initLightbox(): () => void {
  const overlay = document.querySelector<HTMLElement>("[data-lightbox]");
  if (!overlay) return () => {};

  const image = overlay.querySelector<HTMLImageElement>("[data-lightbox-image]");
  const counter = overlay.querySelector<HTMLElement>("[data-lightbox-counter]");
  const closeBtn = overlay.querySelector<HTMLButtonElement>("[data-lightbox-close]");
  const prevBtn = overlay.querySelector<HTMLButtonElement>("[data-lightbox-prev]");
  const nextBtn = overlay.querySelector<HTMLButtonElement>("[data-lightbox-next]");

  if (!image) return () => {};

  let sources: string[] = [];
  let alts: string[] = [];
  let index = 0;
  let lastFocus: HTMLElement | null = null;

  const isOpen = () => overlay.dataset.open === "true";

  const render = () => {
    if (sources.length === 0) return;
    image.src = sources[index];
    image.alt = alts[index] || "";
    if (counter) {
      counter.textContent = `${index + 1} / ${sources.length}`;
    }
    const multi = sources.length > 1;
    prevBtn?.toggleAttribute("hidden", !multi);
    nextBtn?.toggleAttribute("hidden", !multi);
  };

  const open = (sourceRoot: HTMLElement, startIndex: number) => {
    const imgs = Array.from(sourceRoot.querySelectorAll<HTMLImageElement>("img"));
    sources = imgs.map((img) => img.currentSrc || img.src).filter(Boolean);
    alts = imgs.map((img) => img.alt || "");
    if (sources.length === 0) return;

    index = Math.min(Math.max(0, startIndex), sources.length - 1);
    lastFocus = document.activeElement as HTMLElement | null;
    overlay.dataset.open = "true";
    overlay.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
    render();
    closeBtn?.focus();
  };

  const close = () => {
    if (!isOpen()) return;
    overlay.dataset.open = "false";
    overlay.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    image.removeAttribute("src");
    lastFocus?.focus?.();
    lastFocus = null;
  };

  const go = (delta: number) => {
    if (sources.length < 2) return;
    index = (index + delta + sources.length) % sources.length;
    render();
  };

  const onTriggerClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const trigger = target.closest<HTMLElement>("[data-lightbox-open]");
    if (!trigger) return;
    const sourceRoot = trigger.closest<HTMLElement>("[data-lightbox-source]");
    if (!sourceRoot) return;
    event.preventDefault();
    event.stopPropagation();
    const start = Number(trigger.dataset.lightboxOpen ?? "0");
    open(sourceRoot, Number.isFinite(start) ? start : 0);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!isOpen()) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  const onOverlayClick = (event: MouseEvent) => {
    if (event.target === overlay) close();
  };

  const onClose = () => close();
  const onPrev = () => go(-1);
  const onNext = () => go(1);

  document.addEventListener("click", onTriggerClick);
  document.addEventListener("keydown", onKeyDown);
  overlay.addEventListener("click", onOverlayClick);
  closeBtn?.addEventListener("click", onClose);
  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);

  return () => {
    close();
    document.removeEventListener("click", onTriggerClick);
    document.removeEventListener("keydown", onKeyDown);
    overlay.removeEventListener("click", onOverlayClick);
    closeBtn?.removeEventListener("click", onClose);
    prevBtn?.removeEventListener("click", onPrev);
    nextBtn?.removeEventListener("click", onNext);
  };
}
