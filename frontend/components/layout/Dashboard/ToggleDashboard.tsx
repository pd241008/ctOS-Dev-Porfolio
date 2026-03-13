"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface DashboardProps {
  children: React.ReactNode;
  isGuiMode: boolean;
}

export default function ToggleDashboard({
  children,
  isGuiMode,
}: DashboardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen w-full flex text-purple-100 font-mono relative transition-all">
      {/* SIDEBAR — only rendered when GUI mode is active */}
      {isGuiMode && (
        <aside
          className={`${
            isCollapsed ? "w-16" : "w-64"
          } transition-all duration-300 h-full border-r-2 border-purple-500/50 bg-zinc-950/95 backdrop-blur-md hidden md:flex flex-col drop-shadow-[5px_0_15px_rgba(168,85,247,0.15)] shrink-0`}>
          {/* Header */}
          <div
            className={`h-20 border-b-2 border-purple-500/30 flex items-center ${
              isCollapsed ? "justify-center" : "justify-between px-6"
            }`}>
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
              className="text-purple-400 hover:text-purple-100 hover:bg-purple-900/40 p-2 rounded-sm transition-colors cursor-pointer shrink-0 font-bold mx-auto"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
              {isCollapsed ? ">>" : "<<"}
            </button>
          </div>

          {/* Nav Links */}
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

          {/* Status */}
          <div className="h-12 border-t border-purple-500/30 text-xs flex items-center justify-center gap-3 shrink-0">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e] shrink-0" />
            {!isCollapsed && (
              <span className="text-zinc-400 uppercase font-bold tracking-widest whitespace-nowrap">
                Sys. Integrity: 100%
              </span>
            )}
          </div>
        </aside>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 h-full overflow-y-auto p-6 md:p-12 relative">
        {children}
      </main>
    </div>
  );
}

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
      className={`w-full flex items-center ${
        isCollapsed ? "justify-center px-0" : "justify-start px-6"
      } py-3 rounded-sm text-sm uppercase tracking-widest transition-all duration-200 border-l-2 ${
        isActive
          ? "bg-purple-900/40 text-purple-300 border-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
          : "border-transparent text-zinc-500 hover:text-purple-400 hover:bg-purple-900/20 hover:border-purple-500/50"
      }`}
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
