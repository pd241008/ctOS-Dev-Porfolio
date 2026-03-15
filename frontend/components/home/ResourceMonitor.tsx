export default function ResourceMonitor() {
  const skills = [
    { label: "BACKEND_ARCHITECTURE", sub: "(Node.js/FastAPI)", percentage: 85 },
    { label: "CLOUD_INFRASTRUCTURE", sub: "(AWS/Docker)", percentage: 70 },
    { label: "FRONTEND_DEV", sub: "(Next.js/React)", percentage: 60 },
    { label: "AI_INTEGRATION", sub: "(RAG/LLMs)", percentage: 75 },
  ];

  // Helper to render ASCII bar exactly 12 blocks wide
  const renderBar = (percent: number) => {
    const totalBlocks = 12;
    const filledBlocks = Math.round((percent / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    
    return `[${"█".repeat(filledBlocks)}${"░".repeat(emptyBlocks)}]`;
  };

  return (
    <div className="p-4 bg-zinc-950 flex flex-col gap-5 h-full min-h-[300px] justify-center font-mono text-xs md:text-sm">
      {skills.map((skill, i) => (
        <div key={i} className="flex flex-col xl:flex-row xl:items-center justify-between gap-1 xl:gap-4 border-b border-purple-500/10 pb-3 last:border-0 last:pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 w-full xl:w-auto">
            <span className="text-purple-300 font-bold uppercase tracking-widest min-w-[200px]">
              {skill.label}
            </span>
            <span className="text-zinc-500 text-[10px] sm:text-xs">
              {skill.sub}
            </span>
          </div>
          
          <div className="flex items-center gap-2 self-start xl:self-auto uppercase tracking-widest shrink-0 mt-2 xl:mt-0">
            <span className="text-purple-500">{renderBar(skill.percentage)}</span>
            <span className="text-zinc-300 w-8 text-right">{skill.percentage}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
