"use client";

import { useState, useEffect } from "react";
import SystemCard from "../ui/SystemCard";

export default function SandboxTab() {
  const [installStep, setInstallStep] = useState(0);
  const [isInstalling, setIsInstalling] = useState(false);

  // The fake terminal output sequence
  const installLogs = [
    "> npx expresskit-core init",
    "FETCHING REGISTRY DATA...",
    "RESOLVING DEPENDENCIES...",
    "INSTALLING EXPRESSKIT v1.0.4",
    "SCAFFOLDING DIRECTORY STRUCTURE...",
    "CONFIGURING MIDDLEWARE & ERROR HANDLERS...",
    "GENERATING JWT AUTHENTICATION TEMPLATES...",
    "WRITING DOCKERFILE...",
    "INITIALIZING GIT REPOSITORY...",
    "SUCCESS! EXPRESSKIT ENVIRONMENT READY.",
  ];

  const handleInstall = () => {
    if (isInstalling) return;
    setIsInstalling(true);
    setInstallStep(0);
  };

  useEffect(() => {
    if (isInstalling && installStep < installLogs.length) {
      const timer = setTimeout(
        () => {
          setInstallStep((prev) => prev + 1);

          // FIXED: Handle the completion state INSIDE the async timeout
          // to prevent React from throwing a synchronous cascade render error!
          if (installStep + 1 >= installLogs.length) {
            setIsInstalling(false);
          }
        },
        Math.random() * 400 + 200,
      ); // Random delay for realism (200ms - 600ms)

      return () => clearTimeout(timer);
    }
  }, [isInstalling, installStep, installLogs.length]);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 max-w-6xl mx-auto space-y-8 pb-12">
      <header className="border-b border-purple-500/30 pb-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-300 tracking-widest uppercase mb-2 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
          Sandbox Environment
        </h2>
        <p className="text-zinc-400 text-sm uppercase tracking-wider">
          {"// Interactive testing grounds for deployed tooling."}
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* LEFT COLUMN: Project Details */}
        <SystemCard title="TOOLING_OVERVIEW // EXPRESSKIT">
          <div className="p-6 bg-zinc-950 flex flex-col h-full min-h-64">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-purple-200 uppercase tracking-widest">
                ExpressKit Core
              </h3>
              <p className="text-xs text-purple-400 uppercase tracking-widest mt-1">
                Production-Ready Node.js Framework
              </p>
            </div>

            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed flex-1">
              <p>
                A high-performance boilerplate designed to eliminate backend
                setup fatigue. ExpressKit abstracts away the repetitive tasks of
                initializing a new Node.js server.
              </p>
              <ul className="space-y-2 border-l-2 border-purple-500/30 pl-4 py-2">
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span> Built-in JWT Auth
                  Middleware
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span> Centralized Error
                  Handling
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span> Security Headers &
                  Rate Limiting
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">✓</span> Pre-configured
                  Docker Support
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-purple-500/30">
              <a
                href="https://www.npmjs.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-200 uppercase tracking-widest transition-colors cursor-pointer">
                [ VIEW ON NPM REGISTRY ]
              </a>
            </div>
          </div>
        </SystemCard>

        {/* RIGHT COLUMN: Interactive Simulator */}
        <SystemCard title="LIVE_SIMULATION // NPM_INSTALL">
          {/* FIXED: Changed min-h-[24rem] to min-h-96 */}
          <div className="p-4 bg-zinc-950 flex flex-col h-full min-h-96">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-purple-500/20">
              <span className="text-xs text-zinc-500 uppercase tracking-widest">
                Target: Node Environment
              </span>
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className={`px-4 py-1 text-xs font-bold uppercase tracking-widest border transition-colors ${
                  isInstalling
                    ? "border-zinc-700 text-zinc-600 cursor-not-allowed"
                    : "border-green-500 text-green-400 hover:bg-green-500/20 cursor-pointer"
                }`}>
                {isInstalling ? "[ RUNNING... ]" : "[ EXECUTE INIT ]"}
              </button>
            </div>

            {/* Simulated Terminal Output */}
            <div className="flex-1 bg-[#0a0a0a] border border-purple-500/20 p-4 font-mono text-sm overflow-y-auto">
              <div className="space-y-2">
                {installStep === 0 && !isInstalling && (
                  <div className="text-zinc-500 opacity-70 italic">
                    Waiting for execution command...
                  </div>
                )}

                {installLogs.slice(0, installStep).map((log, i) => (
                  <div
                    key={i}
                    className={`${i === 0 ? "text-purple-300 font-bold" : "text-zinc-300"} ${log.includes("SUCCESS") ? "text-green-400 font-bold mt-4" : ""}`}>
                    {log}
                  </div>
                ))}

                {isInstalling && installStep < installLogs.length && (
                  <div className="text-purple-500 animate-pulse">_</div>
                )}
              </div>
            </div>
          </div>
        </SystemCard>
      </div>
    </div>
  );
}
