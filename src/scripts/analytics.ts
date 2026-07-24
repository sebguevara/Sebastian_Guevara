import { capturePageview, initAnalytics } from "@/lib/analytics/posthog";

// `astro:page-load` fires on the initial load and after every ClientRouter
// navigation, so this both boots PostHog and records each virtual pageview.
document.addEventListener("astro:page-load", () => {
  initAnalytics();
  capturePageview();
});
