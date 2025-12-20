import Link from "next/link";
import { Package, Scale, Zap } from "lucide-react";

import { formatStats, getProjectStats } from "@/lib/stats";
import { GitHubIcon } from "@/components/ui/icons/github";

export default async function TrustIndicators() {
  const stats = await getProjectStats();
  const formatted = formatStats(stats);

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
      <Link
        href="https://pypi.org/project/opendataloader-pdf/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <Package className="h-4 w-4" />
        <span>PyPI: {formatted.pypiDownloads}+ downloads</span>
      </Link>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <Link
        href="https://github.com/opendataloader-project/opendataloader-pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <GitHubIcon className="h-4 w-4" />
        <span>GitHub: {formatted.githubStars}+</span>
      </Link>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <Link
        href="https://github.com/opendataloader-project/opendataloader-pdf/blob/main/LICENSE"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <Scale className="h-4 w-4" />
        <span>MPL-2.0 License</span>
      </Link>
      <span className="text-gray-300 dark:text-gray-600">|</span>
      <Link
        href="/docs/benchmark/speed"
        className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300"
      >
        <Zap className="h-4 w-4" />
        <span>0.05s/page</span>
      </Link>
    </div>
  );
}
