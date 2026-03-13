"use client";

import { useState } from "react";
import FloatingTerminal from "../../ui/FloatingTerminal";
import ToggleDashboard from "../Dashboard/ToggleDashboard";
import FloatingAvatar from "../../ui/FloatingAvatar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewMode, setViewMode] = useState<"terminal" | "gui">("terminal");
  const isTerminal = viewMode === "terminal";

  return (
    <div className="min-h-screen w-full relative bg-zinc-950 bg-[radial-gradient(#3b0764_1px,transparent_1px)] bg-[size:24px_24px]">
      {/* 1. GUI LAYER */}
      <div
        style={{ isolation: "isolate" }}
        className={`transition-all duration-500 h-full w-full ${
          isTerminal
            ? "opacity-30 grayscale blur-[2px] pointer-events-none select-none"
            : "opacity-100 pointer-events-auto"
        }`}
        aria-hidden={isTerminal}
        {...(isTerminal ? { inert: true } : {})}>
        <ToggleDashboard isGuiMode={!isTerminal}>{children}</ToggleDashboard>
      </div>

      {/* 2. TERMINAL LAYER */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-300 ${
          isTerminal
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0 invisible"
        }`}>
        <FloatingTerminal switchToGui={() => setViewMode("gui")} />
      </div>

      {/* 3. AVATAR — always on top */}
      <FloatingAvatar
        currentMode={viewMode}
        onToggle={() =>
          setViewMode((p) => (p === "terminal" ? "gui" : "terminal"))
        }
      />
    </div>
  );
}
