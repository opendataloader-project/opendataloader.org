import Link from "next/link";
import { Download, Scale, Star } from "lucide-react";

import { formatStats, getProjectStats } from "@/lib/stats";

export default async function TrustIndicators() {
  const stats = await getProjectStats();
  const formatted = formatStats(stats);

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <Link
        href="https://pypi.org/project/opendataloader-pdf/"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 backdrop-blur-sm transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-900 dark:hover:text-white"
      >
        <Download className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
        <span className="font-medium">{formatted.pypiDownloads}+</span>
        <span className="text-slate-400 dark:text-slate-500">downloads</span>
      </Link>
      <Link
        href="https://github.com/opendataloader-project/opendataloader-pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 backdrop-blur-sm transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-900 dark:hover:text-white"
      >
        <Star className="h-4 w-4 text-amber-500" />
        <span className="font-medium">{formatted.githubStars}+</span>
        <span className="text-slate-400 dark:text-slate-500">stars</span>
      </Link>
      <Link
        href="https://github.com/opendataloader-project/opendataloader-pdf/blob/main/LICENSE"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 backdrop-blur-sm transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-900 dark:hover:text-white"
      >
        <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span className="font-medium">MPL-2.0</span>
        <span className="text-slate-400 dark:text-slate-500">license</span>
      </Link>
    </div>
  );
}
