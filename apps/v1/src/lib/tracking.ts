import ReactGA from "react-ga4";

// ---- Lightweight GA4 tracker helper -----------------------------------------------------
export const track = (event: string, params?: Record<string, any>) => {
  try {
    ReactGA.event(event, params);
  } catch {
    // do nothing
  }
};
