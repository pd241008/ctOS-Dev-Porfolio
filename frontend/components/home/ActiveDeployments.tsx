"use client";

export default function ActiveDeployments() {
  const deployments = [
    {
      name: "INTELLIDOC QUERY ENGINE",
      desc: "AI / RAG SYSTEM",
      status: "BUILDING",
      statusColor: "text-amber-400",
      dotColor: "bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.6)]",
      port: "8080",
      ping: "OFFLINE",
    },
    {
      name: "EXPRESSKIT CLI",
      desc: "NODE.JS DEVELOPER TOOLKIT",
      status: "LIVE",
      statusColor: "text-green-400",
      dotColor: "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]",
      port: "NPM",
      ping: "18ms",
    },
    {
      name: "AQI PREDICTION ENGINE",
      desc: "ML POLLUTION FORECAST MODEL",
      status: "LIVE",
      statusColor: "text-green-400",
      dotColor: "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]",
      port: "8000",
      ping: "45ms",
    },
    {
      name: "NEUROTRACK DASHBOARD",
      desc: "AI WELLNESS PLATFORM",
      status: "STANDBY",
      statusColor: "text-blue-400",
      dotColor: "bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.6)]",
      port: "REPO",
      ping: "GITHUB",
    },
    {
      name: "MILAN CORE PLATFORM",
      desc: "EVENT INFRASTRUCTURE",
      status: "DEPLOYED",
      statusColor: "text-green-400",
      dotColor: "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]",
      port: "443",
      ping: "12ms",
    },
  ];

  return (
    <div className="relative w-full h-full py-1">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-size:20px_20px pointer-events-none z-0"></div>

      {/* pl-8 gives room for the trunk, pr-2 prevents it from hugging the right wall too tightly */}
      <div className="relative pl-8 w-full z-10 flex flex-col h-full">
        {/* The main vertical trunk line - precisely centered behind the dots */}
        <div className="absolute left-[11px] top-6 bottom-6 w-px border-l border-dashed border-zinc-700/50 z-0"></div>

        <div className="flex flex-col justify-between h-full gap-2 w-full">
          {deployments.map((dep, idx) => (
            <div
              key={idx}
              className="relative w-full group">
              {/* Connecting horizontal branch */}
              <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-5 h-1px bg-zinc-800 group-hover:bg-purple-500/60 transition-colors z-0"></div>

              {/* Glowing Node Dot */}
              <div
                className={`absolute left-[-23px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full z-10 ${dep.dotColor}`}></div>

              {/* The Card - Added w-full to force it to stretch */}
              <div className="w-full relative border border-zinc-800/60 bg-zinc-950/80 p-3 lg:p-3.5 transition-all duration-300 group-hover:border-purple-500/40 group-hover:bg-purple-900/10 overflow-hidden cursor-crosshair">
                {/* Left Accent Bar on Hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-transparent group-hover:bg-purple-500/80 transition-all duration-300"></div>

                {/* Top Row: Title & Status */}
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-zinc-200 font-bold text-[11px] tracking-widest uppercase truncate pr-4">
                    {dep.name}
                  </h4>
                  <div
                    className={`flex items-center gap-1.5 shrink-0 ${dep.statusColor}`}>
                    <span className="text-[9px] font-mono tracking-widest">
                      [{dep.status}]
                    </span>
                    {dep.status === "LIVE" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse opacity-80"></span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Desc & Ports */}
                <div className="flex justify-between items-center border-t border-zinc-800/40 pt-2">
                  <p className="text-zinc-500 text-[9px] uppercase font-mono tracking-wider truncate pr-4">
                    {dep.desc}
                  </p>
                  <div className="text-zinc-600 text-[9px] font-mono flex gap-4 text-right shrink-0">
                    <span>PORT:{dep.port}</span>
                    <span className="text-zinc-400 w-28px text-right">
                      {dep.ping}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
