import type { ReactNode } from "react";

// ---- Tracking Types ----

export type TrackingLocation =
  | "home-hero"
  | "home-about"
  | "home-benchmark"
  | "home-ai-safety"
  | "home-tagged-pdf"
  | "home-contact"
  | "home-footer"
  | "home-cta"
  | "home-problem"
  | "home-solution"
  | "home-how-it-works"
  | "home-quick-start"
  | "home-output-preview"
  | "home-why-opendataloader"
  | "home-use-cases";

export type TrackingParams = {
  from: TrackingLocation;
  [key: string]: unknown;
};

// ---- Section Types ----

export type SectionId =
  | "top"
  | "about"
  | "benchmark"
  | "ai-safety"
  | "tagged-pdf"
  | "contact";

export type SectionVariant = "default" | "hero" | "compact" | "full";

// ---- Feature Types ----

export type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

// ---- Badge Types ----

export type BadgeLinkItem = {
  badge: string;
  href: string;
  imageSrc: string;
  alt: string;
};

// ---- Footer Types ----

export type FooterNavLink = {
  label: string;
  href: string;
  trackingId: string;
  external?: boolean;
};

// ---- Filter Types ----

export type FilterItem = {
  name: string;
  status: string;
  note: string;
};

// ---- Cookie Consent Types ----

export type ConsentStatus = "accepted" | "rejected" | "unknown";
