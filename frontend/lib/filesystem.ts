import { FSDir } from "@/types/terminal";

export const filesystem: FSDir = {
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        "about.txt": {
          type: "file",
          content: [
            "╔══════════════════════════════════════════════╗",
            "║       OPERATOR PROFILE: PRATHMESH DESAI      ║",
            "╚══════════════════════════════════════════════╝",
            "",
            "DESIGNATION:  Backend-Focused Full Stack Developer",
            "EDUCATION:    B.Tech Computer Science (2023–2027)",
            "INSTITUTION:  SRM University",
            "",
            "CLEARANCE:    ADMIN",
            "STATUS:       ACTIVE",
            "",
            "> Architecting robust backend systems,",
            "  developer tooling, and scalable cloud infrastructure.",
          ].join("\n"),
        },
        "skills.txt": {
          type: "file",
          content: [
            "SYS_CORE_STACK:",
            "",
            "LANGUAGES:    JavaScript · TypeScript · Python · C++ · Java",
            "FRONTEND:     Next.js · React.js · Tailwind CSS",
            "BACKEND:      Node.js · Express.js · FastAPI",
            "DATABASES:    MongoDB · PostgreSQL",
            "INFRA:        AWS EC2 · PM2 · Docker",
          ].join("\n"),
        },
        "contact.txt": {
          type: "file",
          content: [
            "╔══════════════════════════════════════════════╗",
            "║            COMM-LINK ENDPOINTS               ║",
            "╚══════════════════════════════════════════════╝",
            "",
            "EMAIL:      prathmeshpdesai@gmail.com",
            "LINKEDIN:   linkedin.com/in/pd241008",
            "GITHUB:     github.com/pd241008",
            "PHONE:      +91 9923464748",
          ].join("\n"),
        },
      },
    },

    archive: {
      type: "dir",
      children: {
        "expresskit.txt": {
          type: "file",
          content: [
            "PROJECT:  ExpressKit CLI",
            "TYPE:     Developer Tooling",
            "STATUS:   LIVE_ON_NPM",
            "",
            "Convention-driven backend scaffolding tool engineered to",
            "standardize Express.js microservice architecture.",
            "Reduces initialization time from hours to seconds via",
            "dynamic route discovery.",
            "",
            "STACK:  Node.js · Express · TypeScript · CLI",
            "NPM:    npmjs.com/package/@pd241008/expresskit",
            "REPO:   github.com/pd241008/ExpressKit",
          ].join("\n"),
        },
        "intellidoc.txt": {
          type: "file",
          content: [
            "PROJECT:  IntelliDoc Query Engine",
            "TYPE:     AI & Search",
            "STATUS:   BUILDING",
            "",
            "Full-stack document processing system.",
            "Utilizes Retrieval-Augmented Generation (RAG) to allow",
            "users to extract deep insights and query complex",
            "documents instantly.",
            "",
            "STACK:  LLMs · Vector DB · FastAPI · Next.js",
            "REPO:   github.com/pd241008/IntelliDoc-Query",
          ].join("\n"),
        },
        "milan.txt": {
          type: "file",
          content: [
            "PROJECT:  Milan Core Platform",
            "TYPE:     Event Infrastructure",
            "STATUS:   STABLE_DEPLOYMENT",
            "",
            "High-concurrency ticketing infrastructure architected",
            "for SRM University. Features dual-authentication flows,",
            "automated rate limiting, and AWS-backed deployment",
            "handling 4K+ active users.",
            "",
            "STACK:  Next.js · Node.js · AWS · MongoDB",
          ].join("\n"),
        },
        "aqi.txt": {
          type: "file",
          content: [
            "PROJECT:  AQI Prediction Engine",
            "TYPE:     Machine Learning",
            "STATUS:   OPTIMIZING",
            "",
            "Python and Next.js integration forecasting localized",
            "pollution levels. Currently optimizing algorithmic",
            "accuracy to provide real-time carbon footprint",
            "reduction insights.",
            "",
            "STACK:  Machine Learning · Python · Next.js",
            "REPO:   github.com/pd241008/AQI-Preditcion-Model",
          ].join("\n"),
        },
        "neurotrack.txt": {
          type: "file",
          content: [
            "PROJECT:  NeuroTrack",
            "TYPE:     AI & Wellness",
            "STATUS:   DEVELOPMENT",
            "",
            "Full-stack mental wellness dashboard using Next.js and",
            "Tailwind CSS with AI backend using FastAPI and LangChain",
            "for RAG pipeline semantic journal search.",
            "",
            "STACK:  FastAPI · React · AI",
            "REPO:   github.com/pd241008/NeuroTrack",
          ].join("\n"),
        },
        "omega.txt": {
          type: "file",
          content: [
            "PROJECT:  Project Omega",
            "TYPE:     Distributed Systems R&D",
            "STATUS:   RESEARCH",
            "",
            "Researching and designing a highly available,",
            "fault-tolerant distributed system to manage",
            "micro-transactions at scale. Exploring advanced",
            "message queuing and event-driven architectures.",
            "",
            "STACK:  Distributed Systems · Architecture",
          ].join("\n"),
        },
      },
    },

    sandbox: {
      type: "dir",
      children: {
        "expresskit-demo.txt": {
          type: "file",
          content: [
            "╔══════════════════════════════════════════════╗",
            "║      SANDBOX: EXPRESSKIT CLI SIMULATOR       ║",
            "╚══════════════════════════════════════════════╝",
            "",
            "Run 'gui' and navigate to /sandbox to try the",
            "interactive ExpressKit installation simulator.",
            "",
            "  > npx @pd241008/expresskit init",
            "",
            "Watch the scaffolding process in real-time.",
          ].join("\n"),
        },
      },
    },

    uplink: {
      type: "dir",
      children: {
        "github-stats.log": {
          type: "file",
          content: "Loading telemetry data... Use 'cat' to fetch live data.",
          asyncContent: async () => {
            const username =
              process.env.NEXT_PUBLIC_GITHUB_USERNAME || "pd241008";
            const res = await fetch(
              `https://api.github.com/users/${username}`,
            );
            if (!res.ok) throw new Error("Telemetry fetch failed");
            const data = await res.json();
            return [
              "╔══════════════════════════════════════════════╗",
              "║        GITHUB TELEMETRY — LIVE DATA          ║",
              "╚══════════════════════════════════════════════╝",
              "",
              `  PUBLIC REPOS:   ${data.public_repos}`,
              `  FOLLOWERS:      ${data.followers}`,
              `  FOLLOWING:      ${data.following}`,
              `  ACCOUNT SINCE:  ${data.created_at?.slice(0, 10) ?? "N/A"}`,
              "",
              `  PROFILE:  github.com/${username}`,
            ].join("\n");
          },
        },
        "links.txt": {
          type: "file",
          content: [
            "UPLINK CHANNELS:",
            "",
            "  [1]  GitHub     github.com/pd241008",
            "  [2]  LinkedIn   linkedin.com/in/pd241008",
            "  [3]  Email      prathmeshpdesai@gmail.com",
          ].join("\n"),
        },
      },
    },
  },
};

/**
 * Resolve a path array (e.g. ["archive"]) against the filesystem root.
 * Returns the FSNode at that path, or null if not found.
 */
export function resolvePath(
  pathSegments: string[],
): import("@/types/terminal").FSNode | null {
  let current: import("@/types/terminal").FSNode = filesystem;
  for (const segment of pathSegments) {
    if (current.type !== "dir" || !current.children[segment]) return null;
    current = current.children[segment];
  }
  return current;
}
