import SystemCard from "@/components/ui/SystemCard";

export default function UplinkPage() {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 max-w-4xl mx-auto mt-12">
      <SystemCard title="COMM_UPLINK // SECURE_CHANNEL">
        <div className="p-8 bg-zinc-950 min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-900/30 border border-purple-500 flex items-center justify-center animate-pulse mb-4 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <span className="text-2xl">📡</span>
          </div>
          <h2 className="text-2xl font-bold text-purple-300 tracking-widest uppercase">
            Establish Connection
          </h2>
          <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
            The Uplink module is ready. Provide your contact vectors to open a
            secure channel with the operator.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8 pt-8 border-t border-purple-500/30 w-full max-w-md">
            <a
              href="mailto:prathmesh.desai@example.com"
              className="px-6 py-2 border border-purple-500 text-purple-400 hover:bg-purple-900/50 transition-colors uppercase tracking-widest text-sm font-bold">
              [ INIT_EMAIL ]
            </a>
            <a
              href="https://github.com/pd241008"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2 border border-purple-500 text-purple-400 hover:bg-purple-900/50 transition-colors uppercase tracking-widest text-sm font-bold">
              [ GITHUB_NODE ]
            </a>
          </div>
        </div>
      </SystemCard>
    </div>
  );
}
