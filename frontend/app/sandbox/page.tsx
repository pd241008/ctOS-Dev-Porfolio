"use client";

import { useState, useEffect } from "react";
import SystemCard from "@/components/ui/SystemCard";
import FileExplorer from "@/components/sandbox/FileExplorer";
import CodeEditor from "@/components/sandbox/CodeEditor";
import ConsolePanel from "@/components/sandbox/ConsolePanel";
import RequestPanel from "@/components/sandbox/RequestPanel";
import LocalTerminal from "@/components/sandbox/LocalTerminal";
import {
  INITIAL_FILES,
  PRODUCTION_TEMPLATE,
  SandboxFile,
  executeRequest,
  getBootLogs,
} from "@/lib/sandbox";

// ─── Drafts Data ────────────────────────────────────────────────
const DRAFTS = [
  {
    id: "ai-mesh",
    title: "AI_MESH_NET",
    status: "DRAFT",
    desc: "Autonomous microservice orchestration using LLM routing.",
  },
  {
    id: "omega",
    title: "PROJECT_OMEGA",
    status: "CONCEPT",
    desc: "Highly available, fault-tolerant distributed system for micro-transactions.",
  },
  {
    id: "quantum-auth",
    title: "Q_AUTH_ZERO",
    status: "CONCEPT",
    desc: "Post-quantum cryptographic middleware for ExpressKit.",
  },
  {
    id: "edge-sync",
    title: "EDGE_SYNC_V2",
    status: "DRAFT",
    desc: "Real-time state synchronization for globally distributed backends.",
  },
];

export default function SandboxPage() {
  const [viewMode, setViewMode] = useState<"overview" | "ide">("overview");
  const [files, setFiles] = useState<Record<string, SandboxFile>>(() =>
    JSON.parse(JSON.stringify(INITIAL_FILES)),
  );
  const [activeFile, setActiveFile] = useState("README.md");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [serverReady, setServerReady] = useState(false);
  const [lastResponse, setLastResponse] = useState<{
    status: number;
    body: unknown;
  } | null>(null);
  const [activeBottomTab, setActiveBottomTab] = useState<
    "terminal" | "console"
  >("terminal");
  const [isInitialized, setIsInitialized] = useState(false);

  const updateFile = (name: string, content: string) => {
    setFiles((prev) => ({ ...prev, [name]: { ...prev[name], content } }));
  };

  const handleInit = (projectName: string, language: string) => {
    const template = JSON.parse(JSON.stringify(PRODUCTION_TEMPLATE));
    if (template["package.json"]) {
      const pkg = JSON.parse(template["package.json"].content);
      pkg.name = projectName;
      template["package.json"].content = JSON.stringify(pkg, null, 2);
    }
    setFiles(template);
    setIsInitialized(true);
    setActiveFile("src/routes/health/route.ts");
    setActiveBottomTab("console");
    setViewMode("ide"); // Auto-expand on init
  };

  const handleRun = () => {
    setConsoleLogs([]);
    setServerReady(false);
    setLastResponse(null);
    setActiveBottomTab("console");
    const bootLogs = getBootLogs(files);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < bootLogs.length) {
        setConsoleLogs((prev) => [...prev, bootLogs[idx] ?? ""]);
        idx++;
      } else {
        clearInterval(interval);
        if (isInitialized) setServerReady(true);
      }
    }, 150);
  };

  const handleSendRequest = (method: string, path: string, body?: string) => {
    let parsedBody: unknown = undefined;
    if (body) {
      try {
        parsedBody = JSON.parse(body);
      } catch {
        parsedBody = body;
      }
    }
    const result = executeRequest(files, method, path, parsedBody);
    result.logs.forEach((log) => setConsoleLogs((prev) => [...prev, log]));
    setConsoleLogs((prev) => [
      ...prev,
      `← ${result.status} ${result.status < 400 ? "OK" : "ERROR"}`,
    ]);
    setLastResponse({ status: result.status, body: result.body });
  };

  const handleReset = () => {
    setFiles(JSON.parse(JSON.stringify(INITIAL_FILES)));
    setConsoleLogs([]);
    setServerReady(false);
    setLastResponse(null);
    setActiveFile("README.md");
    setIsInitialized(false);
    setActiveBottomTab("terminal");
    setViewMode("overview");
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-7xl mx-auto space-y-6 pb-20 p-4 md:p-8 min-h-screen">
      {/* Dynamic Header */}
      <header className="border-b-2 border-purple-500/40 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-transparent translate-x--100% group-hover:translate-x-100% transition-transform duration-1000" />
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-purple-400 tracking-[0.2em] uppercase mb-1 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
            Innovation_Lab
          </h2>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-purple-500 animate-pulse rounded-full" />
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em]">
              {/* Experimental_SandBox // Tooling_Intelligence */}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div
            className={`px-4 py-1.5 text-[10px] font-black border-2 ${isInitialized ? "border-green-500 text-green-400 bg-green-950/20 shadow-[0_0_10px_rgba(34,197,94,0.3)]" : "border-zinc-800 text-zinc-600"} uppercase tracking-[0.2em] transition-all`}>
            {isInitialized ? "SYSTEM_ARMED" : "SYSTEM_IDLE"}
          </div>
          <button
            onClick={() =>
              setViewMode(viewMode === "overview" ? "ide" : "overview")
            }
            className="text-[10px] text-purple-500 hover:text-purple-400 uppercase tracking-widest font-bold underline decoration-2 underline-offset-4">
            [ {viewMode === "overview" ? "Enter_Full_View" : "Exit_Full_View"} ]
          </button>
        </div>
      </header>

      {viewMode === "overview" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-5 duration-700">
          {/* Block 1: Overview */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-indigo-600 rounded-sm blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <SystemCard title="TOOLING_OVERVIEW // EXPRESSKIT_CLI">
              <div className="p-8 space-y-8 bg-zinc-950/90 h-450px">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-2">
                    ExpressKit CLI
                  </h3>
                  <p className="text-purple-400/80 text-xs font-bold tracking-widest uppercase">
                    Production-Ready Node.js Framework
                  </p>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                  A high-performance boilerplate designed to eliminate backend
                  setup fatigue. ExpressKit abstracts away repetitive tasks of
                  initializing a new Node.js server with enterprise standards.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    "JWT Auth Middleware",
                    "Centralized Error Logic",
                    "Security Headers",
                    "Service Mapping",
                  ].map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-2 text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
                      <span className="text-purple-500">✓</span> {feat}
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-purple-500/20 flex gap-6">
                  <a
                    href="https://www.npmjs.com/package/@pd241008/expresskit"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-black text-purple-300 hover:text-white transition-colors uppercase tracking-[0.2em]">
                    [ VIEW_ON_NPM ]
                  </a>
                  <a
                    href="https://github.com/pd241008/ExpressKit#readme"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]">
                    [ DOCUMENTATION ]
                  </a>
                </div>
              </div>
            </SystemCard>
          </div>

          {/* Block 2: Live Sim / Terminal */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-green-600 to-emerald-600 rounded-sm blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <SystemCard title="LIVE_SIMULATION // ENV_SANDBOX">
              <div className="flex flex-col bg-zinc-950/90 h-450px">
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-zinc-900/40">
                  <span className="text-[10px] text-zinc-500 uppercase font-mono">
                    Target: Node_Environment
                  </span>
                  <button
                    onClick={() => setViewMode("ide")}
                    className="text-[10px] text-green-500 font-black border border-green-500/50 px-3 py-1 hover:bg-green-500/20 transition-all uppercase">
                    [ Execute_Full_Shell ]
                  </button>
                </div>
                <div
                  className="flex-1 overflow-hidden"
                  onClick={() => setViewMode("ide")}>
                  <LocalTerminal
                    onInit={handleInit}
                    isInitialized={isInitialized}
                  />
                </div>
              </div>
            </SystemCard>
          </div>

          {/* Drafts Section */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] flex items-center gap-4">
              <span className="w-12 h-[1px bg-zinc-800" />{" "}
              INNOVATION_DRAFTS_REPOSITORY{" "}
              <span className="flex-1 h-1px bg-zinc-800" />
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DRAFTS.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-zinc-900/30 border border-zinc-800 p-6 hover:border-purple-500/30 transition-all group cursor-not-allowed">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black text-white tracking-widest">
                      {draft.title}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 bg-zinc-800 text-zinc-500 font-bold uppercase">
                      {draft.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                    {draft.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex justify-center py-10">
            <button
              onClick={handleReset}
              className="px-8 py-2 text-[11px] font-black uppercase tracking-[0.3em] bg-zinc-900 border border-purple-500/50 text-purple-400 hover:bg-purple-900/20 transition-all shadow-[0_0_20px_rgba(168,85,247,0.1)] active:scale-95">
              • RESTORE_CLI_STATE •
            </button>
          </div>
        </div>
      ) : (
        /* IDE Full Screen View */
        <div className="animate-in zoom-in-98 duration-500">
          <SystemCard title="INFRASTRUCTURE_IDE // MODE: PRODUCTION_SIM">
            <div
              className="bg-zinc-950 flex flex-col"
              style={{ height: "80vh" }}>
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-purple-500/30 bg-zinc-900/50 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 grayscale opacity-50">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                    <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-purple-400 ml-4 font-mono font-bold tracking-widest">
                    ACTIVE_PROCESS: {activeFile}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-1 text-[10px] font-black uppercase border border-zinc-800 text-zinc-500 hover:text-amber-500 hover:border-amber-500 transition-all bg-black/40">
                    [ FACTORY_RESET ]
                  </button>
                  <button
                    onClick={handleRun}
                    className="px-6 py-1 text-[10px] font-black uppercase border border-green-500 text-green-400 hover:bg-green-500/20 transition-all shadow-[0_0_10px_rgba(34,197,94,0.15)] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                    BOOT_PRODUCTION
                  </button>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                <FileExplorer
                  files={files}
                  activeFile={activeFile}
                  onSelect={setActiveFile}
                />

                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex-1 overflow-hidden bg-black/40">
                    <CodeEditor
                      code={files[activeFile]?.content || ""}
                      locked={files[activeFile]?.locked || false}
                      onChange={(val) => updateFile(activeFile, val)}
                    />
                  </div>

                  <div className="flex flex-col h-80 shrink-0 border-t border-purple-500/30 bg-zinc-950">
                    <div className="flex items-center bg-zinc-900/40 px-2 shrink-0 border-b border-white/5">
                      <button
                        onClick={() => setActiveBottomTab("terminal")}
                        className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] font-black transition-all ${activeBottomTab === "terminal" ? "text-purple-400 bg-purple-950/30 border-t-2 border-purple-500" : "text-zinc-600 hover:text-zinc-400"}`}>
                        Terminal_System
                      </button>
                      <button
                        onClick={() => setActiveBottomTab("console")}
                        className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] font-black transition-all ${activeBottomTab === "console" ? "text-purple-400 bg-purple-950/30 border-t-2 border-purple-500" : "text-zinc-600 hover:text-zinc-400"}`}>
                        Debug_Environment
                      </button>
                    </div>

                    <div className="flex-1 flex overflow-hidden">
                      {activeBottomTab === "terminal" ? (
                        <LocalTerminal
                          onInit={handleInit}
                          isInitialized={isInitialized}
                        />
                      ) : (
                        <>
                          <ConsolePanel logs={consoleLogs} />
                          <RequestPanel
                            onSend={handleSendRequest}
                            serverReady={serverReady}
                            lastResponse={lastResponse}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SystemCard>
        </div>
      )}
    </div>
  );
}
