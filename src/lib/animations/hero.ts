import gsap from "gsap";

export function animateHero(root: ParentNode = document) {
  const hero = root.querySelector<HTMLElement>('[data-animate="hero"]');
  if (!hero) return;

  const items = hero.querySelectorAll<HTMLElement>("[data-hero-item]");
  if (items.length === 0) return;

  gsap.fromTo(
    items,
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 1.15,
      stagger: 0.12,
      ease: "power2.out",
      overwrite: "auto",
    },
  );
}
