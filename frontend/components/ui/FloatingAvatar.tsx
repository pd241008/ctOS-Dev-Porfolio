"use client";

import { useState } from "react";

export default function FloatingAvatar({
  currentMode,
  onToggle,
}: {
  currentMode: "terminal" | "gui";
  onToggle: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-6 right-6 z-99999 flex flex-col items-end pointer-events-auto">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-12 h-12 rounded-full border-2 border-purple-500 bg-zinc-950 flex items-center justify-center drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] hover:bg-purple-900/40 transition-all cursor-pointer relative">
        <span className="text-purple-300 font-bold tracking-widest text-lg">
          PD
        </span>
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
      </button>

      {menuOpen && (
        <div className="mt-4 w-64 bg-#09090b border border-purple-500/50 rounded-sm p-3 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="text-purple-500 text-xs mb-2 border-b border-purple-500/30 pb-1">
            SYS_LOG // PREFERENCES
          </div>
          <div className="space-y-2 font-mono text-sm">
            <div className="text-zinc-400">
              &gt; CURRENT_STATE: {currentMode.toUpperCase()}
            </div>
            <button
              onClick={() => {
                onToggle();
                setMenuOpen(false);
              }}
              className="w-full text-left text-purple-300 hover:text-purple-100 hover:bg-purple-900/30 p-1 rounded transition-colors">
              &gt; EXEC{" "}
              {currentMode === "terminal" ? "gui_mount.sh" : "cli_mode.sh"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
