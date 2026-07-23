/**
 * Scroll-snap carousel behavior for every [data-carousel] on the page.
 * Markup contract (see src/components/ui/Carousel.astro):
 *   [data-carousel]
 *     [data-carousel-track]  — snap-x scroll container, one child per slide
 *     [data-carousel-prev] / [data-carousel-next]  — optional arrows
 *     [data-carousel-dot]    — optional dot per slide
 *
 * Re-runnable after ClientRouter swaps: returns a disposer that removes
 * every listener it attached.
 */
export function initCarousels(): () => void {
  const disposers: Array<() => void> = [];

  document
    .querySelectorAll<HTMLElement>("[data-carousel]")
    .forEach((root) => {
      const track = root.querySelector<HTMLElement>("[data-carousel-track]");
      if (!track || track.children.length < 2) return;

      const count = track.children.length;
      const dots = Array.from(
        root.querySelectorAll<HTMLButtonElement>("[data-carousel-dot]"),
      );
      const prev = root.querySelector<HTMLButtonElement>(
        "[data-carousel-prev]",
      );
      const next = root.querySelector<HTMLButtonElement>(
        "[data-carousel-next]",
      );

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const current = () =>
        Math.min(
          count - 1,
          Math.max(0, Math.round(track.scrollLeft / track.clientWidth)),
        );

      const goTo = (index: number) => {
        const clamped = ((index % count) + count) % count;
        track.scrollTo({
          left: clamped * track.clientWidth,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      };

      const sync = () => {
        const active = current();
        dots.forEach((dot, i) => {
          dot.classList.toggle("is-active", i === active);
          dot.setAttribute("aria-current", i === active ? "true" : "false");
        });
      };

      const onPrev = () => goTo(current() - 1);
      const onNext = () => goTo(current() + 1);

      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(sync);
      };

      prev?.addEventListener("click", onPrev);
      next?.addEventListener("click", onNext);
      track.addEventListener("scroll", onScroll, { passive: true });

      const dotHandlers = dots.map((dot, i) => {
        const handler = () => goTo(i);
        dot.addEventListener("click", handler);
        return handler;
      });

      sync();

      disposers.push(() => {
        cancelAnimationFrame(raf);
        prev?.removeEventListener("click", onPrev);
        next?.removeEventListener("click", onNext);
        track.removeEventListener("scroll", onScroll);
        dots.forEach((dot, i) => dot.removeEventListener("click", dotHandlers[i]));
      });
    });

  return () => disposers.forEach((dispose) => dispose());
}
