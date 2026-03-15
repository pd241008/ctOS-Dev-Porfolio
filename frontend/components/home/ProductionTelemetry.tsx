"use client";

export default function ProductionTelemetry() {
  return (
    <div className="p-5 bg-zinc-950 flex flex-col gap-4 font-mono">
      <div className="text-sm text-zinc-300 space-y-4">
        <div className="flex flex-col gap-1 border-l-2 border-purple-500/50 pl-4 bg-purple-900/10 py-2">
          <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">&gt; PEAK_CONCURRENCY_HANDLED:</span>
          <span className="text-zinc-200">4,000+ Active Users (Milan Platform)</span>
        </div>

        <div className="flex flex-col gap-1 border-l-2 border-green-500/50 pl-4 bg-green-900/10 py-2">
          <span className="text-green-400 text-xs font-bold uppercase tracking-widest">&gt; SERVICE_UPTIME:</span>
          <span className="text-zinc-200">99.9% (Zero Production Crashes)</span>
        </div>

        <div className="flex flex-col gap-1 border-l-2 border-blue-500/50 pl-4 bg-blue-900/10 py-2">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">&gt; OPTIMIZED_MEMORY_USAGE:</span>
          <span className="text-zinc-200">60-70MB (Node.js Backend)</span>
        </div>

        <div className="flex flex-col gap-1 border-l-2 border-amber-500/50 pl-4 bg-amber-900/10 py-2">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">&gt; NPM_REGISTRY_STATUS:</span>
          <span className="text-zinc-200">@pd241008/expresskit [ACTIVE]</span>
        </div>
      </div>
    </div>
  );
}
