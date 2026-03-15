"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import SystemCard from "../ui/SystemCard";
import {
  INITIAL_BOOT_SEQUENCE,
  executeCommand,
  getPrompt,
  getVisibleCommandNames,
} from "../../lib/commands";
import { resolvePath } from "../../lib/filesystem";

let hasAnimatedBoot = false;

// ─── Typewriter animation for boot lines ────────────────────────
function TypewriterLine({
  text,
  speed = 15,
  onComplete,
}: {
  text: string;
  speed?: number;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let charIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayed(text.slice(0, charIndex + 1));
      charIndex++;
      if (charIndex >= text.length) {
        clearInterval(intervalId);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, onComplete]);

  return <span>{displayed}</span>;
}

// ─── Line renderer with color support ────────────────────────────
function TerminalLine({ line }: { line: string }) {
  // [OK] status lines → green prefix
  if (line.startsWith("[OK]")) {
    return (
      <div className="flex gap-1">
        <span className="text-green-400 font-bold">[OK]</span>
        <span className="text-zinc-300">{line.slice(4)}</span>
      </div>
    );
  }

  // Prompt lines
  if (line.startsWith("root@")) {
    return (
      <div className="text-purple-300 font-semibold mt-2">{line}</div>
    );
  }

  // Box-drawing characters
  if (line.startsWith("╔") || line.startsWith("╚") || line.startsWith("║")) {
    return <div className="text-purple-500 font-bold">{line}</div>;
  }

  // Error / warning lines
  if (
    line.startsWith("ERROR") ||
    line.startsWith("COMMAND NOT FOUND")
  ) {
    return <div className="text-red-400 font-bold">{line}</div>;
  }

  // ACCESS GRANTED
  if (line.includes("ACCESS GRANTED")) {
    return <div className="text-green-400 font-bold">{line}</div>;
  }

  // Boot header
  if (line.startsWith("ctOS BOOT") || line.startsWith("LOADING KERNEL")) {
    return (
      <div className="text-purple-300 font-bold tracking-wider">{line}</div>
    );
  }

  // Help commands (two-space indented entries)
  if (line.startsWith("  ") && line.includes("—")) {
    const [cmd, ...rest] = line.split("—");
    return (
      <div>
        <span className="text-purple-300">{cmd}</span>
        <span className="text-zinc-500">— {rest.join("—")}</span>
      </div>
    );
  }

  // DedSec / Hack lines
  if (line.includes("DEDSEC BACKDOOR") || line.includes("EXPLOIT PAYLOADS")) {
    return (
      <div className="text-red-500 font-bold animate-pulse tracking-tighter">
        {line}
      </div>
    );
  }

  if (line.startsWith("> ") || (line.startsWith("[SYSTEM]") && !line.startsWith("[OK]"))) {
    return (
      <div className="flex gap-2 font-bold">
        <span className="text-red-600">{line.slice(0, 1) === ">" ? ">" : ""}</span>
        <span className="text-zinc-100">{line.slice(line.startsWith("> ") ? 2 : 0)}</span>
      </div>
    );
  }

  if (line === "-----------------------------------") {
    return <div className="text-zinc-700">{line}</div>;
  }

  // Default
  return <div className="text-purple-400 opacity-90">{line}</div>;
}

// ─── FloatingTerminal Component ──────────────────────────────────
interface FloatingTerminalProps {
  switchToGui: () => void;
  onMinimize: () => void;
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  cwd: string[];
  setCwd: (path: string[]) => void;
  isGlitching: boolean;
  triggerGlitch: () => void;
}

export default function FloatingTerminal({
  switchToGui,
  onMinimize,
  history,
  setHistory,
  cwd,
  setCwd,
  isGlitching,
  triggerGlitch,
}: FloatingTerminalProps) {
  const [input, setInput] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const currentPath = usePathname();

  // Command history for arrow-key navigation
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  // Boot animation state
  const [isInitialBoot, setIsInitialBoot] = useState(
    !hasAnimatedBoot && history.length === INITIAL_BOOT_SEQUENCE.length,
  );
  const [completedLines, setCompletedLines] = useState(
    isInitialBoot ? 0 : history.length,
  );

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, completedLines]);

  // Keep focus on input
  useEffect(() => {
    if (!isInitialBoot || completedLines >= INITIAL_BOOT_SEQUENCE.length) {
      inputRef.current?.focus();
    }
  }, [isInitialBoot, completedLines]);

  // ── Handle command submission ──────────────────────────────────
  const handleCommand = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      // Push to command history
      setCmdHistory((prev: string[]) => [...prev, trimmedInput]);
      setHistoryIdx(-1);

      const prompt = getPrompt(cwd);
      const newHistory = [...history, `${prompt} ${trimmedInput}`];

      const parts = trimmedInput.toLowerCase().split(/\s+/);
      const [cmd, ...args] = parts;

      await executeCommand(cmd, args, {
        cwd,
        setCwd,
        history: newHistory,
        setHistory: (h: string[]) => setHistory(h),
        setInput: (val: string) => {
          setInput(val);
          setCursorPos(0);
        },
        onMinimize,
        router,
        currentPath,
        switchToGui,
        triggerGlitch,
      });
    },
    [input, cwd, setCwd, history, setHistory, switchToGui, onMinimize, router, currentPath, triggerGlitch],
  );

  // ── Keyboard navigation (arrows + tab) ────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Arrow Up — previous command
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (cmdHistory.length > 0) {
          const newIdx =
            historyIdx === -1
              ? cmdHistory.length - 1
              : Math.max(0, historyIdx - 1);
          setHistoryIdx(newIdx);
          setInput(cmdHistory[newIdx]);
          setCursorPos(cmdHistory[newIdx].length);
        }
        return;
      }

      // Arrow Down — next command
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIdx !== -1) {
          const newIdx = historyIdx + 1;
          if (newIdx >= cmdHistory.length) {
            setHistoryIdx(-1);
            setInput("");
            setCursorPos(0);
          } else {
            setHistoryIdx(newIdx);
            setInput(cmdHistory[newIdx]);
            setCursorPos(cmdHistory[newIdx].length);
          }
        }
        return;
      }

      // Tab — autocomplete
      if (e.key === "Tab") {
        e.preventDefault();
        const parts = input.split(/\s+/);

        if (parts.length <= 1) {
          // Autocomplete command name
          const partial = parts[0].toLowerCase();
          const matches = getVisibleCommandNames().filter((c) =>
            c.startsWith(partial),
          );
          if (matches.length === 1) {
            setInput(matches[0] + " ");
            setCursorPos(matches[0].length + 1);
          } else if (matches.length > 1) {
            const prompt = getPrompt(cwd);
            setHistory((prev: string[]) => [
              ...prev,
              `${prompt} ${input}`,
              matches.join("  "),
            ]);
          }
        } else {
          // Autocomplete filename/directory in current directory
          const partial = parts[parts.length - 1].toLowerCase();
          const dir = resolvePath(cwd);
          if (dir && dir.type === "dir") {
            const matches = Object.keys(dir.children).filter((n) =>
              n.toLowerCase().startsWith(partial),
            );
            if (matches.length === 1) {
              parts[parts.length - 1] = matches[0];
              const newInput = parts.join(" ");
              setInput(newInput);
              setCursorPos(newInput.length);
            } else if (matches.length > 1) {
              const prompt = getPrompt(cwd);
              setHistory((prev: string[]) => [
                ...prev,
                `${prompt} ${input}`,
                matches.join("  "),
              ]);
            }
          }
        }
        return;
      }

      // Normal key — update cursor position
      setTimeout(
        () =>
          setCursorPos(
            (e.target as HTMLInputElement).selectionStart || 0,
          ),
        0,
      );
    },
    [cmdHistory, historyIdx, input, cwd, setHistory],
  );

  // ── Boot line typing speed ─────────────────────────────────────
  const getBootSpeed = (line: string): number => {
    if (line.startsWith("[OK]")) return 8;
    if (line === "") return 1;
    return 14;
  };

  const prompt = getPrompt(cwd);
  const bootDone = completedLines >= INITIAL_BOOT_SEQUENCE.length;

  return (
    <SystemCard
      title="ctOS // TERMINAL"
      onMinimize={onMinimize}
      onClose={switchToGui}
      isGlitching={isGlitching}
    >
      <div className={`h-112 max-h-[80vh] bg-zinc-950/95 backdrop-blur-md p-4 flex flex-col font-mono text-sm border-t border-purple-500/50 ${isGlitching ? "animate-glitch-intense" : ""}`}>
        {/* ── Output area ──────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto space-y-0.5 mb-4 scrollbar-thin scrollbar-thumb-purple-500 pr-2">
          {history.map((line, i) => {
            const isAnimated =
              isInitialBoot && i < INITIAL_BOOT_SEQUENCE.length;

            // Don't show lines that haven't animated yet
            if (isAnimated && i > completedLines) return null;

            return (
              <div key={i}>
                {isAnimated && i === completedLines ? (
                  <TypewriterLine
                    text={line}
                    speed={getBootSpeed(line)}
                    onComplete={() => {
                      const nextLine = completedLines + 1;
                      setCompletedLines(nextLine);
                      if (nextLine >= INITIAL_BOOT_SEQUENCE.length) {
                        setIsInitialBoot(false);
                        hasAnimatedBoot = true;
                      }
                    }}
                  />
                ) : (
                  <TerminalLine line={line} />
                )}
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* ── Input prompt (visible only after boot completes) ── */}
        {bootDone && (
          <form
            onSubmit={handleCommand}
            className="flex items-center gap-2 pt-2 border-t border-purple-500/30 animate-in fade-in duration-500"
          >
            <span className="text-purple-500 font-bold whitespace-nowrap">
              {prompt}
            </span>
            <div className="relative flex-1 flex items-center h-full">
              {/* Visual cursor overlay */}
              <div className="absolute inset-y-0 left-0 pointer-events-none flex items-center font-mono text-purple-100 whitespace-pre overflow-hidden">
                {input.slice(0, cursorPos)}
                <span className="bg-purple-400 text-zinc-950 animate-pulse">
                  {input[cursorPos] || " "}
                </span>
                {input.slice(cursorPos + 1)}
              </div>
              {/* Actual input (transparent) */}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setCursorPos(e.target.selectionStart || 0);
                }}
                onSelect={(e) => {
                  setCursorPos(
                    (e.target as HTMLInputElement).selectionStart || 0,
                  );
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-transparent caret-transparent border-none outline-none focus:ring-0 font-mono p-0 m-0 h-full"
                autoFocus
                spellCheck={false}
                autoComplete="off"
                suppressHydrationWarning
              />
            </div>
          </form>
        )}
      </div>
    </SystemCard>
  );
}
