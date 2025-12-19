import type { ReactNode } from "react";
import type { SectionVariant } from "@/types";

import { cn } from "@/lib/utils";

const variantStyles: Record<SectionVariant, string> = {
  default: "py-16",
  hero: "py-20 sm:py-28",
  compact: "py-10",
  full: "py-0",
};

type SectionProps = Readonly<{
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
  headerClassName?: string;
}>;

export function Section({
  id,
  title,
  subtitle,
  children,
  variant = "default",
  className,
  headerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        variantStyles[variant],
        className
      )}
    >
      {title && (
        <div className={cn("mb-8 text-center", headerClassName)}>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
