"use client";

import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type HeroSectionProps = Readonly<{
  /** Left side content (badge, title, description, actions) */
  children: ReactNode;
  /** Right side media (image, video, etc.) */
  media?: ReactNode;
  /** Additional className for the section */
  className?: string;
  /** Additional className for the content container */
  contentClassName?: string;
  /** Additional className for the media container */
  mediaClassName?: string;
}>;

export function HeroSection({
  children,
  media,
  className,
  contentClassName,
  mediaClassName,
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={cn(
        "relative isolate border-b bg-muted/40",
        "min-h-120 flex items-center",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div
          className={cn(
            "grid gap-12 md:items-center w-full",
            media ? "md:grid-cols-2" : "md:grid-cols-1"
          )}
        >
          <div
            className={cn(
              "space-y-6 transition-all duration-500 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3",
              contentClassName
            )}
          >
            {children}
          </div>

          {media && (
            <div
              className={cn(
                "flex items-center justify-center transition-all duration-500 ease-out delay-100",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
                mediaClassName
              )}
            >
              {media}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
