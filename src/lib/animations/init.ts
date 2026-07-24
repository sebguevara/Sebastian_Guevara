import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animateHero } from "@/lib/animations/hero";
import { animateReveals } from "@/lib/animations/reveal";
import { initCarousels } from "@/lib/carousel";
import { initLightbox } from "@/lib/lightbox";
import { initScrollSpy } from "@/lib/nav/scrollspy";

let cleanup: (() => void) | null = null;

/**
 * Wire scrollspy + entrance animations for the current DOM.
 * Safe to call again after a ClientRouter swap: previous observers and
 * ScrollTriggers are disposed before re-initializing against the new DOM.
 */
export function initClientEnhancements() {
  if (typeof window === "undefined") return;

  cleanup?.();
  gsap.registerPlugin(ScrollTrigger);

  const disposeScrollSpy = initScrollSpy();
  const disposeCarousels = initCarousels();
  const disposeLightbox = initLightbox();
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    animateHero();
    const disposeReveals = animateReveals();

    return () => {
      disposeReveals?.();
    };
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set('[data-animate="reveal"], [data-hero-item]', {
      clearProps: "all",
      opacity: 1,
      y: 0,
    });
  });

  cleanup = () => {
    disposeScrollSpy?.();
    disposeCarousels();
    disposeLightbox();
    mm.revert();
  };
}
