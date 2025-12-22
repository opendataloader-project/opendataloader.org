import Image from "next/image";
import Link from "next/link";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { LazyVideo } from "@/components/ui/lazy-video";

const partners = [
  {
    name: "Hancom",
    logo: "/figures/hnc-logo.webp",
    logoDark: "/figures/hnc-logo-dark.webp",
    width: 280,
    height: 62,
    role: "Building OpenDataLoader-PDF extraction engine",
    url: "https://hancom.com",
  },
  {
    name: "PDF Association",
    logo: "/figures/pdf-association-logo.webp",
    width: 280,
    height: 132,
    role: "International organization advancing PDF technology standards",
    url: "https://pdfa.org",
  },
  {
    name: "Dual Lab",
    logo: "/figures/duallab-logo.webp",
    width: 280,
    height: 59,
    role: "Developing veraPDF-based validation tools",
    url: "https://duallab.com",
  },
];

export default function Collaboration() {
  return (
    <section id="collaboration" className="bg-gray-50 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Built in Collaboration
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Working with industry leaders to advance PDF data extraction
          </p>
        </AnimateOnScroll>

        {/* Collaboration Illustration */}
        <AnimateOnScroll
          animation="scale-in"
          className="mt-12 flex justify-center"
        >
          <LazyVideo
            src="/figures/collaboration.mp4"
            poster="/figures/collaboration-poster.webp"
            className="h-auto max-w-full rounded-lg shadow-lg md:max-w-4xl"
          />
        </AnimateOnScroll>

        {/* Partners Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {partners.map((partner, index) => (
            <AnimateOnScroll key={partner.name} delay={30 * index}>
              <Link
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] hover:border-blue-400 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-500"
              >
                <div className="flex h-20 w-35 items-center justify-center">
                  {partner.logoDark ? (
                    <>
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={partner.width}
                        height={partner.height}
                        className="h-auto max-h-16 w-auto max-w-35 object-contain dark:hidden"
                      />
                      <Image
                        src={partner.logoDark}
                        alt={partner.name}
                        width={partner.width}
                        height={partner.height}
                        className="hidden h-auto max-h-16 w-auto max-w-35 object-contain dark:block"
                      />
                    </>
                  ) : (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={partner.width}
                      height={partner.height}
                      className="h-auto max-h-16 w-auto max-w-35 object-contain"
                    />
                  )}
                </div>
                <p className="mt-4 text-sm text-gray-600">{partner.role}</p>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
