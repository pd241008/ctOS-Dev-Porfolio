"use client";

import { useState } from "react";

interface RequestPanelProps {
  onSend: (method: string, path: string, body?: string) => void;
  serverReady: boolean;
  lastResponse: { status: number; body: unknown } | null;
}

export default function RequestPanel({
  onSend,
  serverReady,
  lastResponse,
}: RequestPanelProps) {
  const [method, setMethod] = useState("GET");
  const [path, setPath] = useState("/hello");
  const [body, setBody] = useState('{ "data": "test" }');

  const handleSend = () => {
    onSend(
      method,
      path,
      method === "POST" || method === "PUT" ? body : undefined,
    );
  };

  return (
    <div className="w-72 shrink-0 border-l border-purple-500/30 flex flex-col border-t">
      <div className="px-3 py-1.5 text-[10px] text-purple-500 font-bold uppercase tracking-widest border-b border-purple-500/20 shrink-0">
        ⚡ Request Simulator
      </div>

      <div className="p-3 space-y-3 flex-1 overflow-y-auto">
        {/* Method + Path */}
        <div className="flex gap-2">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="bg-zinc-900 border border-purple-500/30 text-purple-300 text-[11px] px-2 py-1 font-mono outline-none focus:border-purple-500 w-20 cursor-pointer">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="flex-1 bg-zinc-900 border border-purple-500/30 text-purple-200 text-[11px] px-2 py-1 font-mono outline-none focus:border-purple-500"
            placeholder="/route"
          />
        </div>

        {/* Body (POST/PUT only) */}
        {(method === "POST" || method === "PUT") && (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full h-16 bg-zinc-900 border border-purple-500/30 text-zinc-300 text-[11px] px-2 py-1 font-mono resize-none outline-none focus:border-purple-500"
            placeholder="Request body (JSON)"
          />
        )}

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!serverReady}
          className={`w-full py-1.5 text-[11px] font-bold uppercase tracking-widest border transition-colors cursor-pointer ${
            serverReady
              ? "border-green-500 text-green-400 hover:bg-green-500/20"
              : "border-zinc-700 text-zinc-600 cursor-not-allowed"
          }`}>
          {serverReady ? "[ SEND REQUEST ]" : "[ SERVER OFFLINE ]"}
        </button>

        {/* Response */}
        {lastResponse && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                Response
              </span>
              <span
                className={`text-[11px] font-bold ${
                  lastResponse.status < 400 ? "text-green-400" : "text-red-400"
                }`}>
                {lastResponse.status}{" "}
                {lastResponse.status < 400 ? "OK" : "ERROR"}
              </span>
            </div>
            <pre className="bg-zinc-900 border border-purple-500/20 p-2 text-[11px] text-zinc-300 font-mono overflow-auto max-h-40 whitespace-pre-wrap">
              {typeof lastResponse.body === "object"
                ? JSON.stringify(lastResponse.body, null, 2)
                : String(lastResponse.body)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
