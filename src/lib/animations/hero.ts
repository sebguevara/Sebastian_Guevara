import gsap from "gsap";
import { motion } from "@/lib/animations/config";

export function animateHero(root: ParentNode = document) {
  const hero = root.querySelector<HTMLElement>('[data-animate="hero"]');
  if (!hero) return;

  const items = hero.querySelectorAll<HTMLElement>("[data-hero-item]");
  if (items.length === 0) return;

  gsap.fromTo(
    items,
    { opacity: 0, y: motion.heroY },
    {
      opacity: 1,
      y: 0,
      duration: motion.heroDuration,
      stagger: motion.heroStagger,
      ease: motion.ease,
      overwrite: "auto",
    },
  );
}
