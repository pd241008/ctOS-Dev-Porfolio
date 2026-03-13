"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import SystemCard from "../ui/SystemCard";

interface FloatingTerminalProps {
  switchToGui: () => void;
}

export default function FloatingTerminal({
  switchToGui,
}: FloatingTerminalProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState<string[]>([
    "ctOS BOOT SEQUENCE INITIATED...",
    "LOADING KERNEL: Prathmesh_OS v2.0",
    "TYPE 'help' FOR COMMANDS OR 'gui' TO MOUNT VISUAL INTERFACE.",
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isMinimized]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmdString = input.trim().toLowerCase();
    const args = cmdString.split(" ");
    const baseCmd = args[0];
    let newHistory = [...history, `root@ctos:~$ ${cmdString}`];

    const commandMap: Record<string, () => void> = {
      help: () => {
        newHistory.push(
          "AVAILABLE COMMANDS:",
          "  ls        — list directories",
          "  cd [dir]  — navigate (home/archive/sandbox/uplink)",
          "  clear     — clear terminal",
          "  gui       — switch to GUI mode",
          "  whoami    — operator info",
        );
      },
      clear: () => {
        newHistory = [];
      },
      gui: () => {
        newHistory.push("MOUNTING GUI INTERFACE...");
        setTimeout(() => switchToGui(), 400);
      },
      whoami: () => {
        newHistory.push("Operator: Prathmesh Desai | Clearance: ADMIN");
      },
      ls: () => {
        newHistory.push(
          "drwxr-xr-x  home",
          "drwxr-xr-x  archive",
          "drwxr-xr-x  sandbox",
          "drwxr-xr-x  uplink",
        );
      },
      cd: () => {
        const target = args[1];
        const validRoutes: Record<string, string> = {
          home: "/",
          archive: "/archive",
          sandbox: "/sandbox",
          uplink: "/uplink",
        };
        if (!target) {
          newHistory.push("cd: missing operand");
          return;
        }
        if (validRoutes[target]) {
          router.push(validRoutes[target]);
          newHistory.push(`// Navigated to ${validRoutes[target]}`);
        } else {
          newHistory.push(`cd: no such directory: ${target}`);
        }
      },
    };

    if (commandMap[baseCmd]) commandMap[baseCmd]();
    else newHistory.push(`ctOS: command not found: ${baseCmd}`);

    setHistory(newHistory);
    setInput("");
  };

  if (isMinimized) {
    return (
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
        <button
          onClick={() => setIsMinimized(false)}
          className="p-3 bg-zinc-950 border border-purple-500 rounded-sm drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] hover:bg-purple-900/50 transition-all cursor-pointer flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-purple-300 font-mono text-sm uppercase tracking-widest">
            RESTORE_CLI
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl drop-shadow-2xl">
        <SystemCard
          title="ctOS // TERMINAL"
          onMinimize={() => setIsMinimized(true)}>
          <div className="h-28rem max-h-[80vh] bg-zinc-950/95 backdrop-blur-md p-4 flex flex-col font-mono text-sm">
            <div className="flex-1 overflow-y-auto space-y-1 mb-4 scrollbar-thin scrollbar-thumb-purple-500">
              {history.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith("root@")
                      ? "text-purple-300 font-semibold mt-2"
                      : "text-purple-400 opacity-90"
                  }>
                  {line}
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <form
              onSubmit={handleCommand}
              className="flex items-center gap-2 pt-2 border-t border-purple-500/30">
              <span className="text-purple-500 font-bold whitespace-nowrap">
                root@ctos:~$
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-purple-100 focus:ring-0"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </div>
        </SystemCard>
      </div>
    </div>
  );
}
