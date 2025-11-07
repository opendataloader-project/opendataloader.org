"use client";

import HomeAbout from "@/components/sections/home-about";
import HomeBenchmark from "@/components/sections/home-benchmark";
import HomeContact from "@/components/sections/home-contact";
import HomeFooter from "@/components/sections/home-footer";
import HomeHero from "@/components/sections/home-hero";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HomeHero />
      <HomeAbout />
      <HomeBenchmark />
      <HomeContact />
      <HomeFooter />
    </div>
  );
}
