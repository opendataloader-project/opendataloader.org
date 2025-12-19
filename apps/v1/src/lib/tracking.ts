import type { TrackingLocation } from "@/types";
import ReactGA from "react-ga4";

// ---- Lightweight GA4 tracker helper -----------------------------------------------------

export const track = (event: string, params?: Record<string, unknown>) => {
  try {
    ReactGA.event(event, params);
  } catch {
    // do nothing
  }
};

// ---- Standardized tracking functions -----------------------------------------------------

export const trackNavigation = (
  destination: string,
  from: TrackingLocation,
  additionalParams?: Record<string, unknown>
) => {
  track(`nav_${destination}`, { from, ...additionalParams });
};

export const trackClick = (
  element: string,
  from: TrackingLocation,
  additionalParams?: Record<string, unknown>
) => {
  track(`click_${element}`, { from, ...additionalParams });
};

export const trackBadgeClick = (badge: string, from: TrackingLocation) => {
  track("badge_click", { from, badge });
};

export const trackSectionView = (section: TrackingLocation) => {
  track("section_view", { section });
};
