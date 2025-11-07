import type { ReactNode } from "react";

export const Section = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) => (
  <section id={id} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mb-8 text-center">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {subtitle ? (
        <p className="mt-2 text-neutral-600 dark:text-neutral-300">
          {subtitle}
        </p>
      ) : null}
    </div>
    {children}
  </section>
);
