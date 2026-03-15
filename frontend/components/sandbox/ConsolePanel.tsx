"use client";

import { useRef, useEffect } from "react";

interface ConsolePanelProps {
  logs: string[];
}

export default function ConsolePanel({ logs }: ConsolePanelProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="flex-1 flex flex-col border-t border-purple-500/30">
      <div className="px-3 py-1.5 text-[10px] text-purple-500 font-bold uppercase tracking-widest border-b border-purple-500/20 flex items-center gap-2 shrink-0">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        Console Output
      </div>
      <div className="flex-1 overflow-y-auto p-3 font-mono text-[11px] space-y-0.5 bg-zinc-950/80">
        {logs.length === 0 && (
          <div className="text-zinc-600 italic">
            Waiting for execution...
          </div>
        )}
        {logs.map((line, i) => (
          <div
            key={i}
            className={
              !line
                ? "h-2"
                : line.startsWith("[ctOS")
                  ? "text-green-400"
                  : line.startsWith("  ├")
                    ? "text-purple-400"
                    : line.startsWith("ERROR") || line.startsWith("SYNTAX")
                      ? "text-red-400 font-bold"
                      : line.startsWith("✅")
                        ? "text-green-400 font-bold"
                        : line.startsWith("←")
                          ? "text-amber-400"
                          : "text-zinc-300"
            }
          >
            {line || ""}
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
