import gsap from "gsap";
import { motion } from "@/lib/animations/config";

/**
 * One soft fade per element as it enters the viewport.
 * Avoids ScrollTrigger.batch, which dumps whole groups at once and feels abrupt.
 */
export function animateReveals() {
  const targets = gsap.utils.toArray<HTMLElement>('[data-animate="reveal"]');
  if (targets.length === 0) return;

  const ctx = gsap.context(() => {
    targets.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: motion.revealY },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration,
          ease: motion.ease,
          overwrite: "auto",
          scrollTrigger: {
            trigger: el,
            start: motion.revealStart,
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    });
  });

  return () => ctx.revert();
}
