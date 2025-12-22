"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  /** Animation delay in ms */
  delay?: number;
  /** Animation type */
  animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in";
}

export function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const baseStyles = "transition-all duration-300 ease-out";

  const animationStyles = {
    "fade-up": isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-2.5",
    "fade-in": isVisible ? "opacity-100" : "opacity-0",
    "fade-left": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-2.5",
    "fade-right": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-2.5",
    "scale-in": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]",
  };

  return (
    <div
      ref={ref}
      className={`${baseStyles} ${animationStyles[animation]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
