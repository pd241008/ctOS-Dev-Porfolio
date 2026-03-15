"use client";

import { useEffect, useState } from "react";

interface Commit {
  id: string;
  repo: string;
  message: string;
  timeAgo: string;
}

export default function LiveCommits() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommits() {
      try {
        // We use the search API to pull commits, which bypasses the 90-day event limitation
        const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "pd241008";
        const res = await fetch(
          `https://api.github.com/search/commits?q=author:${username}&sort=author-date&order=desc`,
          {
            headers: {
              Accept: "application/vnd.github.cloak-preview+json",
            },
          }
        );
        
        if (!res.ok) {
          throw new Error("Failed to fetch from GitHub API");
        }

        const data = await res.json();
        
        const recentCommits: Commit[] = [];
        const items = data.items || [];
        
        for (const item of items) {
          if (recentCommits.length >= 5) break;

          const repoName = item.repository?.name || "Unknown";
          const message = item.commit?.message?.split("\n")[0] || "Update";
          const sha = item.sha?.substring(0, 7) || "0000000";
          const dateStr = item.commit?.author?.date;
          
          let timeStr = "recently";
          if (dateStr) {
            const date = new Date(dateStr);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            const diffHrs = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHrs / 24);
            const diffMonths = Math.floor(diffDays / 30);

            if (diffMonths > 0) timeStr = `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
            else if (diffDays > 0) timeStr = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
            else if (diffHrs > 0) timeStr = `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
            else if (diffMins > 0) timeStr = `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
            else timeStr = "just now";
          }

          recentCommits.push({
            id: sha,
            repo: repoName,
            message: message,
            timeAgo: timeStr,
          });
        }

        setCommits(recentCommits);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError("UPLINK_COMMITS // CONNECTION_FAILED");
        setLoading(false);
      }
    }

    fetchCommits();
  }, []);

  return (
    <div className="p-4 bg-[#0a0a0a] border border-purple-500/20 h-full font-mono text-sm overflow-y-auto">
      <div className="space-y-3">
        <div className="text-zinc-500 opacity-70 italic mb-4 text-xs">
          {loading ? "PULLING LIVE DATA..." : "UPLINK_COMMITS // LIVE"}
        </div>

        {error ? (
          <div className="text-red-500 animate-pulse">{error}</div>
        ) : (
          commits.map((commit, i) => {
            // Determine type based on conventional commit prefixes
            let statusColor = "text-green-400";
            let statusTag = "SUCCESS";

            if (commit.message.startsWith("fix") || commit.message.startsWith("bug")) {
              statusColor = "text-amber-400";
              statusTag = "PATCH";
            } else if (commit.message.startsWith("refactor")) {
              statusColor = "text-blue-400";
              statusTag = "REFACTOR";
            } else if (commit.message.startsWith("feat")) {
              statusTag = "FEATURE";
            }

            return (
              <div key={commit.id + i} className="text-zinc-300 leading-relaxed mb-3">
                <span className={`${statusColor} font-bold`}>[{statusTag}]</span>{" "}
                <span className="text-purple-300 font-semibold">{commit.repo}</span>{" "}-{" "}
                &quot;{commit.message}&quot;{" "}
                <span className="text-zinc-500">({commit.timeAgo})</span>
              </div>
            );
          })
        )}

        {!loading && commits.length === 0 && !error && (
          <div className="text-zinc-500">NO RECENT COMMITS FOUND.</div>
        )}

        <div className="text-purple-500 animate-pulse mt-4">_</div>
      </div>
    </div>
  );
}
