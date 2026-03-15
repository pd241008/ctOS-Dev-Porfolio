import { CommandHandler, TerminalContext } from "@/types/terminal";
import { filesystem, resolvePath } from "./filesystem";

// ─── Boot Sequence ───────────────────────────────────────────────
export const INITIAL_BOOT_SEQUENCE = [
  "ctOS BOOT SEQUENCE INITIATED...",
  "",
  "[OK] Initializing Kernel Modules",
  "[OK] Mounting DevFS",
  "[OK] Loading Developer Profile",
  "[OK] Connecting GitHub Telemetry",
  "[OK] Syncing Deployment Registry",
  "",
  "LOADING KERNEL: Prathmesh_OS v2.0",
  "",
  "TYPE 'help' FOR COMMANDS OR 'gui' TO MOUNT VISUAL INTERFACE",
];

// ─── Prompt Helpers ──────────────────────────────────────────────
export function getPromptPath(cwd: string[]): string {
  if (cwd.length === 0) return "/";
  if (cwd.length === 1 && cwd[0] === "home") return "~";
  return "/" + cwd.join("/");
}

export function getPrompt(cwd: string[]): string {
  return `root@ctos:${getPromptPath(cwd)}$`;
}

// ─── Hidden commands (excluded from help) ────────────────────────
const hiddenCommands = new Set([
  "oh-captain-my-captain",
  "whats-in-the-box",
  "sudo",
]);

// ─── Command Registry ───────────────────────────────────────────
export const commandRegistry: Record<string, CommandHandler> = {
  // ── help ─────────────────────────────────────────────────────
  help: (_args, ctx) => [
    ...ctx.history,
    "",
    "╔══════════════════════════════════════════════╗",
    "║            AVAILABLE COMMANDS                ║",
    "╚══════════════════════════════════════════════╝",
    "",
    "  help           — display this help message",
    "  clear          — clear terminal output",
    "  gui            — mount GUI visual interface",
    "  cd [dir]       — change directory (e.g., 'cd archives')",
    "  pwd            — print working directory",
    "  ls             — list directory contents",
    "  cat [file]     — view file contents",
    "  whoami         — operator identification",
    "  projects       — list all archived projects",
    "",
    "  Navigation:  cd <dir> | cd .. | cd / | cd ~",
    "",
  ],

  // ── clear ────────────────────────────────────────────────────
  clear: (_args, ctx) => {
    ctx.setHistory(INITIAL_BOOT_SEQUENCE);
    ctx.setInput("");
    // void = bypass normal history update
  },

  // ── gui ──────────────────────────────────────────────────────
  gui: (_args, ctx) => {
    setTimeout(() => ctx.switchToGui(), 400);
    return [...ctx.history, "", "MOUNTING GUI INTERFACE..."];
  },

  // ── pwd ──────────────────────────────────────────────────────
  pwd: (_args, ctx) => [
    ...ctx.history,
    getPromptPath(ctx.cwd),
  ],

  // ── whoami ───────────────────────────────────────────────────
  whoami: (_args, ctx) => [
    ...ctx.history,
    "",
    "Operator:   Prathmesh Desai",
    "Clearance:  ADMIN",
    "Role:       Backend-Focused Full Stack Developer",
    "Node:       SRM University",
    "",
  ],

  // ── ls ───────────────────────────────────────────────────────
  ls: (_args, ctx) => {
    const dir = resolvePath(ctx.cwd);
    if (!dir || dir.type !== "dir") {
      return [...ctx.history, "ls: cannot access directory"];
    }
    const entries = Object.keys(dir.children).map((name) => {
      const node = dir.children[name];
      return node.type === "dir" ? `  📁 ${name}/` : `  📄 ${name}`;
    });
    if (entries.length === 0) {
      return [...ctx.history, "  (empty directory)"];
    }
    return [...ctx.history, "", ...entries, ""];
  },

  // ── cd ───────────────────────────────────────────────────────
  cd: (args, ctx) => {
    const target = args[0];
    if (!target) {
      return [...ctx.history, "cd: missing operand"];
    }

    const routes: Record<string, string> = {
      home: "/",
      overview: "/",
      "~": "/",
      "/": "/",
      archives: "/archive",
      archive: "/archive",
      "/archive": "/archive",
      sandbox: "/sandbox",
      "/sandbox": "/sandbox",
      uplink: "/uplink",
      "/uplink": "/uplink",
    };

    // Map route targets to virtual cwd paths
    const cwdMap: Record<string, string[]> = {
      home: ["home"],
      overview: ["home"],
      "~": ["home"],
      "/": [],
      archives: ["archives"],
      archive: ["archives"],
      "/archive": ["archives"],
      sandbox: ["sandbox"],
      "/sandbox": ["sandbox"],
      uplink: ["uplink"],
      "/uplink": ["uplink"],
    };

    const path = routes[target];
    if (path) {
      if (path === ctx.currentPath) {
        return [...ctx.history, `cd: ${target}: already in directory`];
      }
      // Update virtual cwd
      if (cwdMap[target]) {
        ctx.setCwd(cwdMap[target]);
      }
      setTimeout(() => ctx.onMinimize(), 400);
      ctx.router.push(path);
      return [...ctx.history, `CHANGING DIRECTORY TO: ${target.toUpperCase()}`];
    } else {
      return [...ctx.history, `cd: no such file or directory: ${target}`];
    }
  },

  // ── cat (async-aware for GitHub telemetry) ───────────────────
  cat: async (args, ctx) => {
    const target = args[0];
    if (!target) {
      return [...ctx.history, "cat: missing file operand"];
    }

    // Resolve the target file
    let dirPath: string[];
    let filename: string;

    if (target.includes("/")) {
      const segments = target.startsWith("/")
        ? target.slice(1).split("/")
        : [...ctx.cwd, ...target.split("/")];
      filename = segments[segments.length - 1];
      dirPath = segments.slice(0, -1);
    } else {
      filename = target;
      dirPath = [...ctx.cwd];
    }

    const dir = resolvePath(dirPath);
    if (!dir || dir.type !== "dir") {
      return [...ctx.history, `cat: ${target}: No such file or directory`];
    }

    const file = dir.children[filename];
    if (!file) {
      return [...ctx.history, `cat: ${target}: No such file or directory`];
    }
    if (file.type === "dir") {
      return [...ctx.history, `cat: ${target}: Is a directory`];
    }

    let content: string;
    if (file.asyncContent) {
      try {
        content = await file.asyncContent();
      } catch {
        return [
          ...ctx.history,
          "",
          "ERROR: Failed to fetch live telemetry data.",
          "Check network connection and try again.",
        ];
      }
    } else {
      content = file.content;
    }

    return [...ctx.history, "", ...content.split("\n"), ""];
  },

  // ── projects ─────────────────────────────────────────────────
  projects: (_args, ctx) => {
    const archiveDir = filesystem.children.archives;
    if (!archiveDir || archiveDir.type !== "dir") {
      return [...ctx.history, "Error: archive directory not found"];
    }
    const projects = Object.keys(archiveDir.children).map((name, i) => {
      const displayName = name.replace(/\.txt$/, "");
      return `  ${i + 1}. ${displayName}`;
    });
    return [
      ...ctx.history,
      "",
      "╔══════════════════════════════════════════════╗",
      "║          ARCHIVED PROJECT NODES              ║",
      "╚══════════════════════════════════════════════╝",
      "",
      ...projects,
      "",
      "  Use 'cd archives' then 'cat <name>.txt' to view details.",
      "",
    ];
  },

  // ─── Easter Eggs ─────────────────────────────────────────────
  "oh-captain-my-captain": (_args, ctx) => [
    ...ctx.history,
    "",
    "Standing by the console...",
    "",
    "  O Captain! My Captain!",
    "  The dev voyage continues.",
    "",
    "  — Crew acknowledges the operator —",
    "",
  ],

  "whats-in-the-box": (_args, ctx) => [
    ...ctx.history,
    "",
    "Opening container...",
    "",
    "  📦 CONTENTS:",
    "",
    "  - unfinished side projects",
    "  - 23 git branches",
    "  - one production deploy at 3 AM",
    "  - mass amounts of mass-produced mass caffeine",
    "",
  ],

  sudo: (args, ctx) => {
    if (args[0] === "hire-prathmesh") {
      return [
        ...ctx.history,
        "",
        "  ACCESS GRANTED ✓",
        "",
        "  Operator deployed successfully.",
        "  Welcome aboard, commander.",
        "",
      ];
    }
    return [
      ...ctx.history,
      "",
      `  sudo: ${args[0] || "???"}: permission denied`,
      "  Nice try though 😏",
      "",
    ];
  },
};

// ─── Visible command names (for autocomplete, excludes easter eggs) ──
export function getVisibleCommandNames(): string[] {
  return Object.keys(commandRegistry).filter((c) => !hiddenCommands.has(c));
}

export function getAllCommandNames(): string[] {
  return Object.keys(commandRegistry);
}

// ─── Execute ─────────────────────────────────────────────────────
export async function executeCommand(
  cmd: string,
  args: string[],
  context: TerminalContext,
): Promise<void> {
  const handler = commandRegistry[cmd];

  if (handler) {
    const result = await Promise.resolve(handler(args, context));
    if (result) {
      context.setHistory(result);
      context.setInput("");
    }
  } else {
    context.setHistory([
      ...context.history,
      "",
      "COMMAND NOT FOUND",
      "",
      "Type 'help' for available commands.",
    ]);
    context.setInput("");
  }
}
