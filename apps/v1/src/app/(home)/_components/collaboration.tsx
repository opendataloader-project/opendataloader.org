"use client";

import { motion } from "framer-motion";

const partners = [
  {
    name: "Hancom",
    logo: "/figures/hnc-logo.svg",
    role: "Building OpenDataLoader-PDF extraction engine",
    url: "https://hancom.com",
  },
  {
    name: "PDF Association",
    logo: "/figures/pdf-association-logo.png",
    role: "International organization advancing PDF technology standards",
    url: "https://pdfa.org",
  },
  {
    name: "Dual Lab",
    logo: "/figures/duallab-logo.png",
    role: "Developing veraPDF-based validation tools",
    url: "https://duallab.com",
  },
];

export default function Collaboration() {
  return (
    <section id="collaboration" className="bg-gray-50 py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Built in Collaboration
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Working with industry leaders to advance PDF data extraction
          </p>
        </motion.div>

        {/* Collaboration Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <video
            src="/figures/collaboration.mp4"
            poster="/figures/collaboration-poster.webp"
            autoPlay
            loop
            muted
            playsInline
            className="h-auto max-w-full rounded-lg shadow-lg md:max-w-4xl"
          />
        </motion.div>

        {/* Partners Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {partners.map((partner) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex cursor-pointer flex-col items-center rounded-lg border border-gray-200 bg-white p-6 text-center transition-shadow hover:border-blue-400 hover:shadow-lg dark:border-gray-700 dark:hover:border-blue-500"
            >
              <div className="flex h-20 items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-auto max-h-16 w-auto max-w-35 object-contain"
                />
              </div>
              <p className="mt-4 text-sm text-gray-600">{partner.role}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
