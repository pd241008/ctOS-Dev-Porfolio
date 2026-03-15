"use client";

import { useState, useRef, useEffect } from "react";

interface LocalTerminalProps {
  onInit: (projectName: string, language: string) => void;
  isInitialized: boolean;
}

export default function LocalTerminal({ onInit, isInitialized }: LocalTerminalProps) {
  const [history, setHistory] = useState<string[]>(["ExpressKit Integrated Terminal v1.0.4", "Type 'help' for available commands.", ""]);
  const [input, setInput] = useState("");
  const [promptStep, setPromptStep] = useState<"none" | "name" | "lang">("none");
  const [sessionData, setSessionData] = useState({ name: "", lang: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const addLines = (lines: string[]) => {
    setHistory((prev) => [...prev, ...lines]);
  };

  const runInitSequence = (name: string, lang: string) => {
    setIsProcessing(true);
    const sequence = [
      { delay: 400, line: "ℹ️  Creating ExpressKit project..." },
      { delay: 1000, line: "ℹ️  Generating internal systems..." },
      { delay: 1800, line: "ℹ️  Installing dependencies..." },
      { delay: 3000, line: "✔ Dependencies installed & Git initialized" },
      { delay: 3300, line: "" },
      { delay: 3500, line: "✅ ExpressKit ready. Magic enabled ✨" },
      { delay: 3800, line: "" },
      { delay: 4000, line: `root@sandbox:~/${name}$ ` },
    ];

    sequence.forEach((item, idx) => {
      setTimeout(() => {
        if (item.line !== undefined) addLines([item.line]);
        if (idx === sequence.length - 1) {
          setIsProcessing(false);
          onInit(name, lang);
        }
      }, item.delay);
    });
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    addLines([`root@sandbox:~$ ${trimmed}`]);

    if (trimmed === "npx @pd241008/expresskit init") {
      setPromptStep("name");
      addLines(["? 📦 Project name: "]);
    } else if (trimmed === "clear") {
      setHistory([]);
    } else if (trimmed === "help") {
      addLines(["Available commands:", "  npx @pd241008/expresskit init - Initialize a new project", "  clear - Clear terminal", "  ls - List files"]);
    } else if (trimmed === "ls") {
      if (isInitialized) {
        addLines(["src/", "models/", "utils/", "package.json", "tsconfig.json", ".env", "README.md"]);
      } else {
        addLines(["README.md"]);
      }
    } else {
      addLines([`command not found: ${trimmed}`]);
    }
    setInput("");
  };

  const handlePrompt = (val: string) => {
    if (promptStep === "name") {
      const name = val || "express-backend";
      setSessionData((prev) => ({ ...prev, name }));
      addLines([name, "? 🧠 Choose language (TypeScript/JavaScript): "]);
      setPromptStep("lang");
    } else if (promptStep === "lang") {
      const lang = val || "TypeScript";
      setSessionData((prev) => ({ ...prev, lang }));
      addLines([lang, ""]);
      setPromptStep("none");
      runInitSequence(sessionData.name, lang);
    }
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    
    if (promptStep !== "none") {
      handlePrompt(input);
    } else {
      handleCommand(input);
    }
  };

  return (
    <div className="flex-1 bg-black/95 font-mono text-[11px] p-4 overflow-hidden flex flex-col group/terminal border-t border-purple-500/20">
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto space-y-1 text-zinc-300 custom-scrollbar scroll-smooth"
      >
        {history.map((line, i) => (
          <div 
            key={i} 
            className={`
              ${line.startsWith("✅") ? "text-green-400 font-black animate-in fade-in slide-in-from-left-2" : ""}
              ${line.startsWith("✔") ? "text-emerald-400 font-bold" : ""}
              ${line.startsWith("ℹ") ? "text-blue-400 font-medium" : ""}
              ${line.startsWith("?") ? "text-amber-400 font-bold" : ""}
              ${line.includes("root@sandbox") ? "text-purple-400 opacity-80" : ""}
            `}
          >
            {line}
          </div>
        ))}
        {!isProcessing && (
          <form onSubmit={onSubmit} className="flex items-center gap-2 mt-1">
            <span className="text-purple-500 font-bold shrink-0">
              {promptStep === "none" ? "root@sandbox:~$" : ">"}
            </span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white caret-purple-500 selection:bg-purple-500/30 font-bold"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        )}
      </div>
    </div>
  );
}
