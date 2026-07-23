/** Highlight nav links that match the section currently in view. */
export function initScrollSpy() {
  const links = document.querySelectorAll<HTMLAnchorElement>(
    "[data-section-link]",
  );
  const sections = document.querySelectorAll<HTMLElement>("[data-section]");

  if (links.length === 0 || sections.length === 0) return;

  const setActive = (id: string | null) => {
    links.forEach((link) => {
      link.classList.toggle("active", link.dataset.sectionLink === id);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActive(entry.target.getAttribute("id"));
        }
      }
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
  setActive(sections[0]?.getAttribute("id") ?? null);

  return () => observer.disconnect();
}
