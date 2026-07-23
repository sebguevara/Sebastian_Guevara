import { navigate } from "astro:transitions/client";
import { initClientEnhancements } from "@/lib/animations/init";
import { themeColors } from "@/consts/site";

initClientEnhancements();

// Whole-card navigation: any click inside [data-card-href] goes to the detail
// page, unless it landed on a real interactive element (external links,
// carousel arrows/dots). Delegated once — survives ClientRouter swaps, and
// touch swipes on the carousel never produce a click, so swiping stays safe.
document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.closest("a, button")) return;
  const card = target.closest<HTMLElement>("[data-card-href]");
  if (card?.dataset.cardHref) navigate(card.dataset.cardHref);
});

// ClientRouter swaps replace <html> attributes and the whole body, so runtime
// state (js gate, theme) and DOM-bound behavior must be restored after a swap.
document.addEventListener("astro:after-swap", () => {
  const root = document.documentElement;
  root.classList.add("js");

  try {
    const stored = localStorage.getItem("theme");
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    root.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", themeColors[theme]);
  } catch {
    /* localStorage unavailable */
  }

  // Language switch: keep the reading position instead of jumping to top.
  try {
    const storedScroll = sessionStorage.getItem("lang-switch-scroll");
    if (storedScroll !== null) {
      sessionStorage.removeItem("lang-switch-scroll");
      window.scrollTo({ top: Number(storedScroll), behavior: "instant" });
    }
  } catch {
    /* sessionStorage unavailable */
  }

  initClientEnhancements();
});
