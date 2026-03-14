"use client";

import { useState, useRef, useEffect } from "react";
import SystemWindow from "../../ui/SystemCard";

interface TerminalProps {
  switchToGui: () => void;
}

export default function Terminal({ switchToGui }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([
    "SYSTEM BOOT SEQUENCE INITIATED...",
    "LOADING KERNEL: Prathmesh_OS v2.0",
    "TYPE 'help' FOR COMMANDS OR 'gui' TO MOUNT VISUAL INTERFACE.",
  ]);
  const [input, setInput] = useState("");
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `root@devcp:~$ ${cmd}`];

    switch (cmd) {
      case "help":
        newHistory.push(
          "AVAILABLE COMMANDS: whoami, projects, cd [project], gui, clear",
        );
        break;
      case "whoami":
        newHistory.push("Prathmesh | Full Stack & AI Systems | SRMIST");
        break;
      case "projects":
        newHistory.push("1. IntelliDoc-Query (AI Document Processing)");
        newHistory.push("2. ExpressKit (Backend Framework)");
        newHistory.push("3. AQI-Prediction-Model");
        break;
      case "gui":
        newHistory.push("INITIALIZING GRAPHICAL INTERFACE...");
        setTimeout(switchToGui, 800);
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "":
        break;
      default:
        newHistory.push(`Command not found: ${cmd}`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-transparent pointer-events-none">
      {/* Pointer events auto allows us to click the terminal but ignore the transparent background wrapper */}
      <div className="pointer-events-auto w-full">
        <SystemWindow title="TERMINAL_EMULATOR">
          {/* Terminal Body - Forced Height */}
          <div className="h-28rem bg-#09090b p-4 flex flex-col justify-start overflow-y-auto font-mono text-sm sm:text-base">
            <div className="space-y-2 mb-4">
              {history.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith("root@")
                      ? "text-purple-300 font-semibold"
                      : "text-purple-400 opacity-90"
                  }>
                  {line}
                </div>
              ))}
              <div ref={endOfTerminalRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleCommand}
              className="flex items-center gap-2 mt-auto pt-2 border-t border-purple-500/30">
              <span className="text-purple-500 font-bold whitespace-nowrap">
                root@devcp:~$
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-purple-100 focus:ring-0 w-full"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </form>
          </div>
        </SystemWindow>
      </div>
    </div>
  );
}
