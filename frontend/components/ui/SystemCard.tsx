"use client";

import React from "react";

interface SystemCardProps {
  title: string;
  children: React.ReactNode;
  onMinimize?: () => void;
  onClose?: () => void;
  isGlitching?: boolean;
}

export default function SystemCard({
  title,
  children,
  onMinimize,
  onClose,
  isGlitching,
}: SystemCardProps) {
  return (
    <div className={`relative w-full h-full ${isGlitching ? "animate-glitch" : ""}`}>
      {/* The Neobrutalist Offset Shadow Block (Stay in Back) */}
      <div className={`absolute top-3 left-3 w-full h-full bg-purple-700 rounded-sm z-0 ${isGlitching ? "opacity-50" : ""}`}></div>

      {/* Main Window Container (Stay in Front) */}
      <div className={`relative z-10 w-full h-full bg-zinc-950 border-2 border-purple-500 rounded-sm flex flex-col shadow-[0_0_15px_rgba(168,85,247,0.4)] ${isGlitching ? "border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.6)]" : ""}`}>
        {/* Window Header Bar */}
        <div className={`flex items-center justify-between px-4 py-3 border-b-2 border-purple-500 bg-zinc-900/90 ${isGlitching ? "border-red-500 bg-red-950/20" : ""}`}>
          <span className={`text-purple-300 font-bold tracking-widest text-sm uppercase ${isGlitching ? "animate-pulse text-red-400" : ""}`}>
            {isGlitching ? "DEDSEC // ACCESS" : title}
          </span>
          {/* Window Controls - NOW INTERACTIVE */}
          <div className="flex gap-2">
            <button
              suppressHydrationWarning
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.6)] hover:opacity-70 cursor-pointer"></button>
            <button
              suppressHydrationWarning
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.6)] hover:opacity-70 cursor-pointer"></button>
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]"></div>
          </div>
        </div>

        {/* Window Content */}
        <div className="grow flex flex-col overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
