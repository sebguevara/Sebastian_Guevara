import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
  ["/src/assets/projects/*.{webp,png}", "/src/assets/things/*.{webp,png}"],
);

const FALLBACK = "/src/assets/projects/dayflow.webp";

/** Resolve a CV project image path, falling back when the asset is missing. */
export function resolveProjectImage(image: string) {
  return images[image] ?? images[FALLBACK];
}

/** Resolve a list of CV image paths, silently dropping missing assets. */
export function resolveProjectImages(paths: string[]) {
  return paths
    .map((path) => images[path])
    .filter((loader): loader is NonNullable<typeof loader> => Boolean(loader));
}
