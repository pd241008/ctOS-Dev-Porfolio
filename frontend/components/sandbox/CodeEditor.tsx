"use client";

import { useRef } from "react";

interface CodeEditorProps {
  code: string;
  locked: boolean;
  onChange: (val: string) => void;
}

export default function CodeEditor({
  code,
  locked,
  onChange,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const lines = code.split("\n");

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden relative">
      {/* Line numbers */}
      <div
        ref={lineNumbersRef}
        className="w-10 shrink-0 bg-zinc-950 text-zinc-600 text-[11px] font-mono text-right pr-2 pt-3 pb-3 overflow-hidden select-none border-r border-purple-500/20"
      >
        {lines.map((_, i) => (
          <div key={i} className="leading-5 h-5">
            {i + 1}
          </div>
        ))}
      </div>

      {/* Editor area */}
      <div className="flex-1 relative">
        {locked && (
          <div className="absolute inset-0 z-10 bg-zinc-900/30 flex items-start justify-end p-2">
            <span className="text-[9px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-sm uppercase tracking-widest border border-zinc-700">
              read-only
            </span>
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => !locked && onChange(e.target.value)}
          onScroll={handleScroll}
          readOnly={locked}
          spellCheck={false}
          className={`w-full h-full bg-transparent text-[12px] font-mono leading-5 p-3 resize-none outline-none border-none focus:ring-0 ${
            locked
              ? "text-zinc-500 cursor-not-allowed"
              : "text-purple-200 caret-purple-400"
          }`}
          style={{ tabSize: 2 }}
        />
      </div>
    </div>
  );
}
