"use client";

import { useState } from "react";
import ToggleDashboard from "../Dashboard/ToggleDashboard";
import FloatingAvatar from "../../ui/FloatingAvatar";
import { INITIAL_BOOT_SEQUENCE } from "../../../lib/commands";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewMode, setViewMode] = useState<"terminal" | "gui">("terminal");

  // Lifted state: terminal history persists across mode switches
  const [terminalHistory, setTerminalHistory] = useState<string[]>(
    INITIAL_BOOT_SEQUENCE,
  );

  // Virtual filesystem CWD — defaults to /home
  const [cwd, setCwd] = useState<string[]>(["home"]);

  const handleSetViewMode = (mode: "terminal" | "gui") => {
    if (viewMode === "gui" && mode === "terminal") {
      setTerminalHistory(INITIAL_BOOT_SEQUENCE);
      setCwd(["home"]); // Reset CWD on re-boot
    }
    setViewMode(mode);
  };

  return (
    <div className="min-h-screen w-full relative bg-zinc-950 bg-[radial-gradient(#3b0764_1px,transparent_1px)] bg-size:24px_24px">
      <ToggleDashboard
        viewMode={viewMode}
        setViewMode={handleSetViewMode}
        terminalHistory={terminalHistory}
        setTerminalHistory={setTerminalHistory}
        cwd={cwd}
        setCwd={setCwd}
      >
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
