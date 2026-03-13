"use client";

import SystemCard from "../ui/SystemCard";

export default function HomeTab() {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 max-w-5xl mx-auto space-y-8 pb-12">
      <header className="border-b border-purple-500/30 pb-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-300 tracking-widest uppercase mb-2 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
          Command Center
        </h2>
        <p className="text-zinc-400 text-sm uppercase tracking-wider">
          {"// Welcome back, Operator. All core systems are operational."}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SystemCard title="IDENTITY_VERIFIED">
          <div className="p-5 bg-zinc-950 flex flex-col gap-4 h-full min-h-64">
            <div className="flex items-center gap-4 border-b border-purple-500/20 pb-4">
              <div className="w-16 h-16 bg-purple-900/40 border border-purple-500 flex items-center justify-center text-2xl font-bold text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.4)] shrink-0">
                PD
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-200 uppercase tracking-widest">
                  Prathmesh Desai
                </h3>
                <p className="text-xs text-purple-400 uppercase tracking-widest mt-1">
                  Full Stack + AI Systems Eng.
                </p>
              </div>
            </div>
            <div className="text-sm text-zinc-300 leading-relaxed space-y-3 flex-1">
              <p>
                &gt; B.Tech Computer Science (2023-2027) at SRM Institute of
                Science and Technology.
              </p>
              <p>
                &gt; Architecting scalable web systems, fine-tuning machine
                learning models, and building open-source developer tooling.
              </p>
            </div>
            <div className="mt-auto pt-4 border-t border-purple-500/20">
              <div className="text-xs text-purple-500 font-bold mb-2 uppercase tracking-widest">
                Core_Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "Python/FastAPI",
                  "Machine Learning",
                  "Docker",
                  "AWS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-purple-900/20 border border-purple-500/40 text-xs text-purple-300 uppercase tracking-wider">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SystemCard>

        <SystemCard title="ACTIVE_DEPLOYMENTS">
          <div className="p-4 bg-zinc-950 flex flex-col gap-3 h-full min-h-64">
            <DeploymentRow
              name="IntelliDoc-Query"
              status="ONLINE"
              type="AI/RAG System"
            />
            <DeploymentRow
              name="ExpressKit Framework"
              status="ONLINE"
              type="NPM Package"
            />
            <DeploymentRow
              name="AQI-Prediction-Engine"
              status="TRAINING"
              type="ML Model"
            />
            <DeploymentRow
              name="Milan '25/'26 Core"
              status="DEPLOYED"
              type="Event Infrastructure"
            />
          </div>
        </SystemCard>
      </div>
    </div>
  );
}

// Moved the DeploymentRow helper here since it's only used on the HomeTab
function DeploymentRow({
  name,
  status,
  type,
}: {
  name: string;
  status: string;
  type: string;
}) {
  const isOnline = status === "ONLINE" || status === "DEPLOYED";
  return (
    <div className="flex items-center justify-between p-3 border border-purple-500/20 bg-purple-900/10 hover:bg-purple-900/30 transition-colors cursor-default">
      <div>
        <div className="text-purple-200 text-sm font-bold uppercase tracking-widest">
          {name}
        </div>
        <div className="text-zinc-500 text-xs uppercase mt-1">{type}</div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="text-xs tracking-widest font-bold"
          style={{ color: isOnline ? "#4ade80" : "#eab308" }}>
          [{status}]
        </span>
        <span
          className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500 shadow-[0_0_5px_#22c55e]" : "bg-yellow-500 shadow-[0_0_5px_#eab308]"}`}></span>
      </div>
    </div>
  );
}
