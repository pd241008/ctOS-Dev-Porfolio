"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import FloatingTerminal from "../../ui/FloatingTerminal";

interface DashboardProps {
  children: React.ReactNode;
  viewMode: "terminal" | "gui";
  setViewMode: (mode: "terminal" | "gui") => void;
  terminalHistory: string[];
  setTerminalHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ToggleDashboard({
  children,
  viewMode,
  setViewMode,
  terminalHistory,
  setTerminalHistory,
}: DashboardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const isTerminal = viewMode === "terminal";

  if (!isTerminal && isTerminalMinimized) {
    setIsTerminalMinimized(false);
  }

  return (
    <div className="h-screen w-full flex text-purple-100 font-mono">
      {/* SIDEBAR - Still hides when Terminal is open */}
      <aside
        className={`${isCollapsed ? "w-16" : "w-64"} ${
          isTerminal ? "hidden" : "hidden md:flex"
        } transition-all duration-300 h-full border-r-2 border-purple-500/50 bg-zinc-950/95 backdrop-blur-md flex-col shrink-0 drop-shadow-[5px_0_15px_rgba(168,85,247,0.15)]`}>
        <div
          className={`h-20 border-b-2 border-purple-500/30 flex items-center ${isCollapsed ? "justify-center" : "justify-between px-6"}`}>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1 className="text-2xl font-bold text-purple-400 tracking-widest drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
                ctOS
              </h1>
              <p className="text-[10px] text-purple-500 mt-1 uppercase tracking-widest whitespace-nowrap">
                v2.0 // Core
              </p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-purple-400 hover:text-purple-100 hover:bg-purple-900/40 p-2 rounded-sm transition-colors cursor-pointer shrink-0 font-bold mx-auto">
            {isCollapsed ? ">>" : "<<"}
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-2 overflow-hidden">
          <NavButton
            label="OVERVIEW"
            icon="[O]"
            href="/"
            isCollapsed={isCollapsed}
          />
          <NavButton
            label="ARCHIVES"
            icon="[A]"
            href="/archive"
            isCollapsed={isCollapsed}
          />
          <NavButton
            label="SANDBOX"
            icon="[S]"
            href="/sandbox"
            isCollapsed={isCollapsed}
          />
          <NavButton
            label="UPLINK"
            icon="[U]"
            href="/uplink"
            isCollapsed={isCollapsed}
          />
        </nav>

        <div className="h-12 border-t border-purple-500/30 text-xs flex items-center justify-center gap-3 shrink-0">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e] shrink-0" />
          {!isCollapsed && (
            <span className="text-zinc-400 uppercase font-bold tracking-widest whitespace-nowrap">
              Sys. Integrity: 100%
            </span>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-full relative overflow-hidden">
        {/* NEXT.JS PAGE CONTENT (100% Visible, no blur, no opacity drop!) */}
        <div
          className={`h-full overflow-y-auto p-6 md:p-12 transition-all duration-300 ${isTerminal ? "pointer-events-none" : "pointer-events-auto"}`}>
          {children}
        </div>

        {/* TERMINAL OVERLAY - Removed background dark tint, made click-through */}
        {isTerminal && !isTerminalMinimized && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            {/* The terminal window itself is clickable and casts a glow */}
            <div className="w-full max-w-3xl pointer-events-auto drop-shadow-[0_0_40px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200">
              <FloatingTerminal
                switchToGui={() => setViewMode("gui")}
                onMinimize={() => setIsTerminalMinimized(true)}
                history={terminalHistory}
                setHistory={setTerminalHistory}
              />
            </div>
          </div>
        )}

        {/* RESTORE CLI BUTTON */}
        {isTerminal && isTerminalMinimized && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setIsTerminalMinimized(false)}
              className="px-6 py-3 bg-zinc-950 border-2 border-purple-500 rounded-sm text-purple-300 font-bold tracking-widest hover:bg-purple-900/40 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
              RESTORE_CLI
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// NavButton Component (Unchanged)
interface NavButtonProps {
  label: string;
  icon: string;
  href: string;
  isCollapsed: boolean;
}
function NavButton({ label, icon, href, isCollapsed }: NavButtonProps) {
  const currentPath = usePathname();
  const router = useRouter();
  const isActive =
    currentPath === href || (href !== "/" && currentPath.startsWith(href));
  return (
    <button
      onClick={() => router.push(href)}
      className={`w-full flex items-center ${isCollapsed ? "justify-center px-0" : "justify-start px-6"} py-3 rounded-sm text-sm uppercase tracking-widest transition-all duration-200 border-l-2 ${isActive ? "bg-purple-900/40 text-purple-300 border-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" : "border-transparent text-zinc-500 hover:text-purple-400 hover:bg-purple-900/20 hover:border-purple-500/50"}`}
      title={label}>
      {isCollapsed ? (
        <span className="font-bold">{icon}</span>
      ) : isActive ? (
        `> ${label}`
      ) : (
        `  ${label}`
      )}
    </button>
  );
}
