import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const INITIAL_BOOT_SEQUENCE = [
  "ctOS BOOT SEQUENCE INITIATED...",
  "LOADING KERNEL: Prathmesh_OS v2.0",
  "TYPE 'help' FOR COMMANDS OR 'gui' TO MOUNT VISUAL INTERFACE.",
];

export interface CommandContext {
  args: string[];
  history: string[];
  router: AppRouterInstance;
  currentPath: string;
  switchToGui: () => void;
  onMinimize: () => void;
  setHistory: (history: string[]) => void;
  setInput: (input: string) => void;
}

type CommandHandler = (context: CommandContext) => string[] | void;

export const commandRegistry: Record<string, CommandHandler> = {
  help: ({ history }) => {
    return [
      ...history,
      "AVAILABLE COMMANDS:",
      "  clear      — clear terminal",
      "  gui        — switch to GUI mode",
      "  cd [dir]   — navigate directory (home, archives, sandbox, uplink)",
      "  pwd        — print working directory",
      "  whoami     — operator info",
    ];
  },
  gui: ({ history, switchToGui }) => {
    setTimeout(() => switchToGui(), 400);
    return [...history, "MOUNTING GUI INTERFACE..."];
  },
  clear: ({ setHistory, setInput }) => {
    setHistory(INITIAL_BOOT_SEQUENCE);
    setInput("");
    return; // Returns void, bypassing standard history update
  },
  whoami: ({ history }) => {
    return [...history, "Operator: Prathmesh Desai | Clearance: ADMIN"];
  },
  pwd: ({ history, currentPath }) => {
    return [...history, currentPath];
  },
  cd: ({ args, history, router, currentPath, onMinimize }) => {
    const target = args[1];
    if (!target) {
      return [...history, "cd: missing operand"];
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

    const path = routes[target];
    if (path) {
      if (path === currentPath) {
        return [...history, `cd: ${target}: already in directory`];
      }
      setTimeout(() => onMinimize(), 400);
      router.push(path);
      return [...history, `CHANGING DIRECTORY TO: ${target.toUpperCase()}`];
    } else {
      return [...history, `cd: no such file or directory: ${target}`];
    }
  },
};

export function executeCommand(cmd: string, context: CommandContext) {
  const handler = commandRegistry[cmd];
  
  if (handler) {
    const result = handler(context);
    if (result) {
      context.setHistory(result);
      context.setInput("");
    }
  } else {
    // Command not found
    context.setHistory([...context.history, `ctOS: command not found: ${cmd}`]);
    context.setInput("");
  }
}
