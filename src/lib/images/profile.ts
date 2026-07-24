import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/profile/*.{webp,png,svg}",
);

export function resolveProfileImage(image: string) {
  const loader = images[image];
  if (!loader) {
    throw new Error(`Profile image not found: ${image}`);
  }
  return loader;
}
