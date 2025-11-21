import Image from "next/image";
import { type LinkItemType } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { GitHubIcon } from "@/components/icons/github";

export const linkItems: LinkItemType[] = [
  {
    text: "Documentation",
    url: "/docs",
    active: "nested-url",
  },
  {
    text: "Demo",
    url: "/demo",
  },
  {
    text: "Showcase",
    url: "/showcase",
  },
  {
    text: "Contact",
    url: "/contact",
  },
  {
    type: "icon",
    url: "https://github.com/opendataloader-project/opendataloader-pdf",
    text: "Github",
    label: "GitHub",
    icon: <GitHubIcon title="GitHub" className="h-5 w-5" />,
    external: true,
  },
];

export const logo = (
  <Image
    src="/logo-icon.webp"
    alt="OpenDataLoader Logo"
    width={45}
    height={45}
    priority
  />
);

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {logo}
          OpenDataLoader
        </>
      ),
    },
  };
}
