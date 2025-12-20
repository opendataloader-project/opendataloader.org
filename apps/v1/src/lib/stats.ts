const GITHUB_REPO = "opendataloader-project/opendataloader-pdf";
const PYPI_PACKAGE = "opendataloader-pdf";

interface ProjectStats {
  githubStars: number;
  pypiDownloads: number;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

export async function getProjectStats(): Promise<ProjectStats> {
  const [githubStars, pypiDownloads] = await Promise.all([
    getGitHubStars(),
    getPyPIDownloads(),
  ]);

  return { githubStars, pypiDownloads };
}

async function getGitHubStars(): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        Accept: "application/vnd.github.v3+json",
        // Add token if available for higher rate limits
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    });

    if (!res.ok) {
      console.error("GitHub API error:", res.status);
      return 700; // Fallback
    }

    const data = await res.json();
    return data.stargazers_count ?? 700;
  } catch (error) {
    console.error("Failed to fetch GitHub stars:", error);
    return 700; // Fallback
  }
}

async function getPyPIDownloads(): Promise<number> {
  try {
    // Using pypistats API for download counts
    const res = await fetch(
      `https://pypistats.org/api/packages/${PYPI_PACKAGE}/recent`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!res.ok) {
      console.error("PyPI Stats API error:", res.status);
      return 10000; // Fallback
    }

    const data = await res.json();
    // Get last month downloads
    return data.data?.last_month ?? 10000;
  } catch (error) {
    console.error("Failed to fetch PyPI downloads:", error);
    return 10000; // Fallback
  }
}

export function formatStats(stats: ProjectStats) {
  return {
    githubStars: formatNumber(stats.githubStars),
    pypiDownloads: formatNumber(stats.pypiDownloads),
  };
}
