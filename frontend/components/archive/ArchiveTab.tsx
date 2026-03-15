"use client";

import { useState } from "react";
import Link from "next/link";
import SystemCard from "../ui/SystemCard";

interface Project {
  id: string;
  title: string;
  type?: string;
  description?: string;
  desc?: string;
  tags: string[];
  status?: string;
  githubUrl?: string;
  liveUrl?: string;
}

const MAJOR_PROJECTS: Project[] = [
  {
    id: "expresskit",
    title: "ExpressKit CLI",
    type: "Developer Tooling",
    description:
      "Convention-driven backend scaffolding tool engineered to standardize Express.js microservice architecture. Reduces initialization time from hours to seconds via dynamic route discovery.",
    tags: ["Node.js", "Express", "TypeScript", "CLI"],
    status: "LIVE_ON_NPM",
    githubUrl: "https://github.com/pd241008/ExpressKit",
    liveUrl: "https://www.npmjs.com/package/@pd241008/expresskit",
  },
  {
    id: "intellidoc",
    title: "IntelliDoc Query Engine",
    type: "AI & Search",
    description:
      "Full-stack document processing system. Utilizes Retrieval-Augmented Generation (RAG) to allow users to extract deep insights and query complex documents instantly.",
    tags: ["LLMs", "Vector DB", "FastAPI", "Next.js"],
    status: "BUILDING",
    githubUrl: "https://github.com/pd241008/IntelliDoc-Query",
    liveUrl: "#",
  },
  {
    id: "milan",
    title: "Milan Core Platform",
    type: "Event Infrastructure",
    description:
      "High-concurrency ticketing infrastructure architected for SRM University. Features dual-authentication flows, automated rate limiting, and AWS-backed deployment handling 4K+ active users.",
    tags: ["Next.js", "Node.js", "AWS", "MongoDB"],
    status: "STABLE_DEPLOYMENT",
    githubUrl: "#",
    liveUrl: "#",
  },
];

const MINOR_PROJECTS: Project[] = [
  {
    id: "aqi",
    title: "AQI Prediction Engine",
    desc: "Python and Next.js integration forecasting localized pollution levels. Currently optimizing accurate algorithmic forecasting.",
    tags: ["ML", "Python", "Next.js"],
    githubUrl: "https://github.com/pd241008/AQI-Preditcion-Model",
  },
  {
    id: "neuro",
    title: "NeuroTrack",
    desc: "Mental wellness dashboard using Next.js and Tailwind CSS with AI backend using FastAPI and LangChain for RAG pipeline support.",
    tags: ["FastAPI", "AI", "React"],
    githubUrl: "https://github.com/pd241008/NeuroTrack",
  },
  {
    id: "ai-tictactoe",
    title: "AI-TicTacToe",
    desc: "A Tic-Tac-Toe game powered by AI, built with Next.js using a minimax algorithm for optimal moves.",
    tags: ["TS", "Minimax", "Next.js"],
    githubUrl: "https://github.com/pd241008/AI-TicTacToe",
  },
  {
    id: "roadmap",
    title: "RoadMap Generator",
    desc: "AI-based roadmap generator built with TypeScript that dynamically creates curated learning paths.",
    tags: ["AI", "TypeScript", "Next.js"],
    githubUrl: "https://github.com/pd241008/RoadMap-Genrator",
  },
  {
    id: "color",
    title: "Color Palette Generator",
    desc: "A responsive Next.js and Tailwind CSS web application that generates beautiful, cohesive color palettes instantly.",
    tags: ["Next.js", "Tailwind", "Design"],
    githubUrl: "https://github.com/pd241008/Color-Palate-Generator",
  },
];

export default function ArchiveTab() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <div className="animate-in slide-in-from-right-8 fade-in duration-500 max-w-5xl mx-auto space-y-8 pb-20">
        <button
          onClick={() => setSelectedProject(null)}
          className="group flex items-center gap-3 text-purple-500 hover:text-purple-300 transition-all font-black uppercase text-[10px] tracking-[0.3em] cursor-pointer">
          <span className="group-hover:-translate-x-1 transition-transform">
            ⋘
          </span>{" "}
          [ BACK_TO_ARCHIVE ]
        </button>

        <SystemCard
          title={`NODE_DEEP_SCAN // ${selectedProject.id.toUpperCase()}`}>
          <div className="p-8 bg-zinc-950 flex flex-col md:flex-row gap-12 min-h-[50vh]">
            <div className="flex-1 space-y-8">
              <div>
                <h1 className="text-4xl font-black text-white tracking-[0.2em] uppercase mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                  {selectedProject.title}
                </h1>
                <p className="text-purple-500 font-bold uppercase tracking-[0.3em] text-[11px] mt-4">
                  SYSTEM_TYPE: {selectedProject.type || "Experimental_Module"}
                </p>
              </div>

              <div className="p-6 bg-purple-900/5 border-l-4 border-purple-500 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <p className="text-zinc-300 leading-relaxed font-mono text-[14px]">
                  {selectedProject.description || selectedProject.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-400 font-black uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:w-64 space-y-4 shrink-0">
              <div className="bg-zinc-900/50 p-4 border border-zinc-800 space-y-4">
                <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest border-b border-zinc-800 pb-2">
                  Deployment_Links
                </div>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center py-2 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase text-[10px] tracking-widest transition-all shadow-[0_4px_0_0_rgba(126,34,206,1)] active:shadow-none active:translate-y-1">
                  Initialize Repo
                </a>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center py-2 border border-purple-500 text-purple-400 hover:bg-purple-900/20 font-black uppercase text-[10px] tracking-widest transition-all">
                    Live Interface
                  </a>
                )}
              </div>
              <div className="bg-zinc-900/30 p-4 border border-zinc-800">
                <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-2">
                  Build_Status
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[11px] text-green-400 font-bold uppercase">
                    {selectedProject.status || "STABLE"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SystemCard>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-7xl mx-auto space-y-16 pb-20 p-4 md:p-8">
      {/* Premium Header */}
      <header className="border-b-2 border-purple-500/40 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative group">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-purple-400 tracking-[0.2em] uppercase mb-1 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
            Archives // System_Registry
          </h2>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-purple-500 animate-pulse rounded-full" />
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em]">
              Stable Deployments, Past Operations & Production Systems
            </p>
          </div>
        </div>
        <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] bg-zinc-900/50 px-3 py-1 border border-zinc-800">
          NODE_COUNT: {MAJOR_PROJECTS.length + MINOR_PROJECTS.length}
        </div>
      </header>

      {/* MAJOR DEPLOYMENTS GRID */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <span className="h-0.5 w-12 bg-purple-500/50" />
          <h3 className="text-white font-black tracking-[0.4em] uppercase text-[11px]">
            Primary_Deployments
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {MAJOR_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500" />
              <SystemCard
                title="ARCHIVE_NODE">
                <div className="p-8 bg-zinc-950 flex flex-col min-h-[300px] border-b-2 border-transparent group-hover:border-purple-500 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-[0.2em] group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[10px] text-purple-500 font-bold uppercase tracking-[0.3em] mt-2">
                        {project.type}
                      </p>
                    </div>
                    <span className="text-2xl opacity-20 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                      📂
                    </span>
                  </div>
                  <p className="text-zinc-400 text-[13px] leading-relaxed mb-8 flex-1 font-mono opacity-80 group-hover:opacity-100">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-500 font-black uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </SystemCard>
            </div>
          ))}
        </div>
      </section>

      {/* MINOR MODULES LIST */}
      <section className="space-y-8">
        <h3 className="text-purple-500 font-black tracking-[0.4em] uppercase text-[11px] flex items-center gap-3">
          <span className="text-purple-400">&lt;/&gt;</span> MINOR_MODULES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINOR_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="p-6 bg-zinc-950/80 border border-zinc-800 hover:border-purple-500 hover:bg-purple-900/20 transition-all cursor-pointer rounded-sm flex flex-col min-h-60 group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-amber-500 text-2xl group-hover:scale-110 transition-transform">
                  📁
                </span>
                <span className="text-purple-500 text-[10px] font-black tracking-[0.2em]">
                  [ VIEW ]
                </span>
              </div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-3 group-hover:text-purple-300 transition-colors">
                {project.title}
              </h4>
              <p className="text-[11px] text-zinc-500 line-clamp-3 mb-6 flex-1 font-medium leading-relaxed">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded-sm uppercase font-black tracking-tighter">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REDIRECT TO UPLINK SECTION */}
      <section className="space-y-10 pt-20">
        <div className="flex items-center gap-4">
          <span className="h-0.5 w-12 bg-amber-500/50" />
          <h3 className="text-amber-500 font-black tracking-[0.4em] uppercase text-[11px] flex items-center gap-2">
            ESTABLISH_UPLINK{" "}
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          </h3>
        </div>

        <SystemCard title="INFRASTRUCTURE_GATEWAY // SECURE_ACCESS">
          <div className="p-8 md:p-24 bg-zinc-950 flex flex-col items-center gap-12 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05),transparent)] pointer-events-none" />

            <div className="space-y-6 max-w-2xl relative">
              <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                Warning: Encrypted Channel Required
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-4">
                Secure_Uplink
              </h3>
              <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed tracking-wide italic">
                &quot;To establish a stable communication vector, you must
                initialize the Comm_Uplink protocol. This provides a direct
                bridge to the operator&apos;s primary node.&quot;
              </p>
            </div>

            <Link
              href="/uplink"
              className="group relative px-12 py-4 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase text-xs tracking-[0.4em] transition-all shadow-[0_6px_0_0_rgba(126,34,206,1)] active:shadow-none active:translate-y-1 overflow-hidden">
              <span className="relative z-10">
                [ INITIALIZE_SECURE_CHANNEL ]
              </span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            </Link>

            <div className="flex flex-col items-center gap-4 mt-4">
              <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
              <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.5em]">
                Gate_Status: Awaiting_Auth
              </p>
            </div>
          </div>
        </SystemCard>
      </section>

      {/* Mock Restore Button for Aesthetic Consistency */}
      <div className="flex justify-center py-10 opacity-30">
        <button className="px-8 py-2 text-[11px] font-black uppercase tracking-[0.3em] bg-zinc-900 border border-zinc-800 text-zinc-700 pointer-events-none">
          • RESTORE_ARCHIVE_STATE •
        </button>
      </div>
    </div>
  );
}
