"use client";

import { useState } from "react";
import ToggleDashboard from "../Dashboard/ToggleDashboard";
import FloatingAvatar from "../../ui/FloatingAvatar";
import { INITIAL_BOOT_SEQUENCE } from "../../../lib/terminalCommands";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewMode, setViewMode] = useState<"terminal" | "gui">("terminal");

  // Lifted state: The layout remembers the terminal history forever
  const [terminalHistory, setTerminalHistory] = useState<string[]>(
    INITIAL_BOOT_SEQUENCE,
  );

  const handleSetViewMode = (mode: "terminal" | "gui") => {
    if (viewMode === "gui" && mode === "terminal") {
      setTerminalHistory(INITIAL_BOOT_SEQUENCE);
    }
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen w-full relative bg-zinc-950 bg-[radial-gradient(#3b0764_1px,transparent_1px)] bg-size:24px_24px">
      {/* Dashboard handles all the layout logic now */}
      <ToggleDashboard
        viewMode={viewMode}
        setViewMode={handleSetViewMode}
        terminalHistory={terminalHistory}
        setTerminalHistory={setTerminalHistory}>
        {children}
      </ToggleDashboard>

      <FloatingAvatar
        currentMode={viewMode}
        onToggle={() =>
          handleSetViewMode(viewMode === "terminal" ? "gui" : "terminal")
        }
      />
    </div>
  );
}
