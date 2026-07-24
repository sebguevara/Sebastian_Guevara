import posthog from "posthog-js";
import { posthog as config } from "@/consts/site";

let started = false;

/**
 * Initialize PostHog once. Pageviews are captured manually (below) because the
 * site navigates with Astro's ClientRouter, so the browser rarely does a full
 * page load that PostHog's automatic capture would see.
 */
export function initAnalytics() {
  if (started || typeof window === "undefined" || !config.key) return;
  started = true;

  posthog.init(config.key, {
    api_host: config.host,
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: "identified_only",
    defaults: "2025-05-24",
  });
}

/** Record a $pageview for the current URL. */
export function capturePageview() {
  if (typeof window === "undefined" || !config.key) return;
  posthog.capture("$pageview");
}
