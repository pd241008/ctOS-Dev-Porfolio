"use client";

import SystemCard from "@/components/ui/SystemCard";
import BioOverview from "@/components/home/BioOverview";
import GithubIntel from "@/components/home/GithubIntel";
import ActiveDeployments from "@/components/home/ActiveDeployments";
import ResourceMonitor from "@/components/home/ResourceMonitor";
import ProductionTelemetry from "@/components/home/ProductionTelemetry";
import LiveCommits from "@/components/home/LiveCommits";

export default function Page() {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-7xl mx-auto space-y-10 pb-12 px-4">
      {/* HEADER SECTION */}
      <header className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-300 tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
          Command Center
        </h2>
        <div className="flex items-center gap-3 border-t border-zinc-800 pt-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <p className="text-zinc-500 text-[11px] font-mono uppercase tracking-widest">
            {"// DECP KERNEL V2.4 INITIALIZED — ALL SUBSYSTEMS OPERATIONAL"}
          </p>
        </div>
      </header>

      {/* SECTION 1: CORE BIOMETRICS */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-400/80">
          <span className="text-xs">✦</span>
          <h3 className="text-[11px] font-bold tracking-[0.3em] uppercase">
            Core_Biometrics
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div className="lg:col-span-3">
            <SystemCard title="NODE: BIOGRAPHIC_DATA">
              <div className="p-1 bg-zinc-950/50 backdrop-blur-sm h-full flex flex-col">
                <BioOverview />
              </div>
            </SystemCard>
          </div>

          <div className="lg:col-span-3">
            <SystemCard title="NODE: SKILL_ALLOCATION_MATRIX">
              <div className="bg-zinc-950/50 h-full">
                <ResourceMonitor />
              </div>
            </SystemCard>
          </div>
        </div>
      </section>

      {/* SECTION 2: SYSTEM INTELLIGENCE - Refined Bento Layout */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-400/80">
          <span className="text-xs">{"</>"}</span>
          <h3 className="text-[11px] font-bold tracking-[0.3em] uppercase">
            System_Intelligence
          </h3>
        </div>

        {/* Using a 6-column grid to allow a 4:2 ratio */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* ACTIVE DEPLOYMENTS - Slimmer Side Block (2/6) */}
          <div className="lg:col-span-2 group flex flex-col">
            <SystemCard title="NODE: ACTIVE_UPLINKS">
              <div className="p-4 lg:p-5 bg-zinc-950/40 h-full flex flex-col overflow-hidden group-hover:bg-purple-900/5 transition-colors">
                <ActiveDeployments />
              </div>
            </SystemCard>
          </div>
          
          {/* GITHUB INTEL - Wide Block (4/6) */}
          <div className="lg:col-span-4 group transition-transform duration-300 flex flex-col">
            <SystemCard title="NODE: GITHUB_INTEL">
              <div className="p-4 lg:p-6 bg-zinc-950/40 min-h-[400px] h-full group-hover:bg-purple-900/5 transition-colors">
                <GithubIntel />
              </div>
            </SystemCard>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCTION SCALE OPERATIONS */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-400/80">
          <span className="text-xs animate-pulse">⚡</span>
          <h3 className="text-[11px] font-bold tracking-[0.3em] uppercase">
            Production_Scale_Operations
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div className="lg:col-span-4 group transition-transform duration-300 flex flex-col">
            <SystemCard title="NODE: PRODUCTION_TELEMETRY">
              <div className="p-4 lg:p-6 bg-zinc-950/40 min-h-[300px] h-full group-hover:bg-purple-900/5 transition-colors">
                <ProductionTelemetry />
              </div>
            </SystemCard>
          </div>

          <div className="lg:col-span-2 group flex flex-col">
            <SystemCard title="NODE: UPLINK_COMMITS">
              <div className="bg-zinc-950/40 h-full flex flex-col min-h-[300px] max-h-[400px] overflow-hidden group-hover:bg-purple-900/5 transition-colors">
                <LiveCommits />
              </div>
            </SystemCard>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-12 flex justify-between items-center text-[9px] text-zinc-700 font-mono uppercase tracking-[0.4em] border-t border-zinc-900">
        <div className="flex gap-6">
          <span>UID: PRATHMESH_DESAI</span>
          <span>LOC: SRM_UNIVERSITY</span>
        </div>
        <span>SYS. INTEGRITY: 100%</span>
      </footer>
    </div>
  );
}
