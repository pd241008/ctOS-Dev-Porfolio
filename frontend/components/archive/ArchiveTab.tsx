"use client";

import { useState } from "react";
import SystemCard from "../ui/SystemCard";

// 1. FIXED: We define exactly what a Project looks like so we don't use 'any'
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

// Mock Data structure
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
    desc: "Python and Next.js integration forecasting localized pollution levels. Currently optimizing the algorithmic accuracy to provide real-time carbon footprint reduction insights.",
    tags: ["Machine Learning", "Python", "Next.js"],
    githubUrl: "https://github.com/pd241008/AQI-Preditcion-Model",
  },

  {
    id: "omega",
    title: "Project: Omega",
    desc: "Researching and designing a highly available, fault-tolerant distributed system to manage micro-transactions at scale. Exploring advanced message queuing and event-driven architectures.",
    tags: ["Distributed Systems", "Architecture", "R&D"],
  },
  {
    id: "neuro",
    title: "NeuroTrack",
    desc: "Full-stack mental wellness dashboard using Next.js and Tailwind CSS with AI backend using FastAPI and LangChain for RAG pipeline semantic journal search.",
    tags: ["FastAPI", "React", "AI"],
    githubUrl: "https://github.com/pd241008/NeuroTrack",
  },
  {
    id: "ai-tictactoe",
    title: "AI-TicTacToe",
    desc: "A Tic-Tac-Toe game powered by AI, built with Next.js using a minimax algorithm to make mathematically optimal moves.",
    tags: ["TypeScript", "Next.js", "Algorithms"],
    githubUrl: "https://github.com/pd241008/AI-TicTacToe",
  },
  {
    id: "roadmap",
    title: "RoadMap Generator",
    desc: "An AI-based roadmap generator built with TypeScript that dynamically creates curated learning paths for various technical and non-technical disciplines.",
    tags: ["AI", "TypeScript", "Next.js"],
    githubUrl: "https://github.com/pd241008/RoadMap-Genrator",
  },
  {
    id: "color",
    title: "Color Palette Generator",
    desc: "A responsive Next.js and Tailwind CSS web application that generates beautiful, cohesive color palettes instantly based on a single user-selected base color.",
    tags: ["Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/pd241008/Color-Palate-Generator",
  }
];

export default function ArchiveTab() {
  // 1. FIXED: Replaced <any | null> with <Project | null>
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // --- DETAILED VIEW MODE ---
  if (selectedProject) {
    return (
      <div className="animate-in slide-in-from-right-8 fade-in duration-300 max-w-4xl mx-auto space-y-6 pb-12">
        <button
          onClick={() => setSelectedProject(null)}
          className="text-purple-400 hover:text-purple-200 uppercase tracking-widest text-sm font-bold flex items-center gap-2 mb-4 transition-colors cursor-pointer">
          [ &lt; RETURN TO ARCHIVES ]
        </button>

        <SystemCard
          title={`NODE_DETAIL // ${selectedProject.title.toUpperCase()}`}>
          <div className="p-8 bg-zinc-950 min-h-[60vh] flex flex-col">
            <h1 className="text-3xl font-bold text-purple-300 tracking-widest uppercase mb-2">
              {selectedProject.title}
            </h1>
            <p className="text-purple-500 uppercase tracking-widest text-sm mb-8">
              {selectedProject.type || selectedProject.desc}
            </p>

            <div className="space-y-6 text-zinc-300 leading-relaxed flex-1">
              <p className="p-4 bg-purple-900/10 border-l-2 border-purple-500">
                {selectedProject.description || selectedProject.desc}
              </p>

              <div>
                <h3 className="text-purple-400 uppercase tracking-widest text-xs font-bold mb-3">
                  Tech Stack_
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-zinc-900 border border-purple-500/30 text-xs text-purple-200 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 border-t border-purple-500/30 pt-6 mt-8">
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white uppercase tracking-widest text-sm font-bold rounded-sm transition-colors cursor-pointer">
                [ INIT REPO ]
              </button>
              {selectedProject.liveUrl && (
                <button className="px-6 py-2 border border-purple-500 hover:bg-purple-900/30 text-purple-300 uppercase tracking-widest text-sm font-bold rounded-sm transition-colors cursor-pointer">
                  [ LIVE DEPLOYMENT ]
                </button>
              )}
            </div>
          </div>
        </SystemCard>
      </div>
    );
  }

  // --- GRID VIEW MODE (Default) ---
  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 max-w-6xl mx-auto space-y-12 pb-12">
      <header className="border-b border-purple-500/30 pb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-300 tracking-widest uppercase mb-2 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
          Archive Nodes
        </h2>
        <p className="text-zinc-400 text-sm uppercase tracking-wider">
          {"// Decrypted system builds and deployed architectures."}
        </p>
      </header>

      {/* MAJOR PROJECTS SECTION */}
      <section className="space-y-6">
        <h3 className="text-purple-500 flex items-center gap-2 font-bold tracking-widest uppercase text-sm">
          <span className="text-purple-400">✦</span> MAJOR_DEPLOYMENTS
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {MAJOR_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer group">
              <SystemCard title={`NODE: ${project.title.toUpperCase()}`}>
                {/* 2. FIXED: Changed min-h-[16rem] to min-h-64 */}
                <div className="p-6 bg-zinc-950 flex flex-col h-full min-h-64 group-hover:bg-purple-900/10 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-purple-200 uppercase tracking-widest group-hover:text-purple-100">
                        {project.title}
                      </h3>
                      <p className="text-xs text-purple-400 uppercase tracking-widest mt-1">
                        {project.type}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 line-clamp-3 mb-6 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-zinc-900 border border-purple-500/30 text-[10px] text-zinc-400 uppercase">
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

      {/* MINOR PROJECTS SECTION */}
      <section className="space-y-6">
        <h3 className="text-purple-500 flex items-center gap-2 font-bold tracking-widest uppercase text-sm">
          <span className="text-purple-400">&lt;/&gt;</span> MINOR_MODULES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MINOR_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="p-5 bg-zinc-950/80 border border-purple-500/30 hover:border-purple-500 hover:bg-purple-900/20 transition-all cursor-pointer rounded-sm flex flex-col h-48">
              <div className="flex justify-between items-start mb-3">
                <span className="text-purple-400 text-lg">📁</span>
                <span className="text-purple-500 text-xs tracking-widest">
                  [ VIEW ]
                </span>
              </div>
              <h4 className="text-purple-200 font-bold uppercase tracking-widest text-sm mb-2">
                {project.title}
              </h4>
              <p className="text-xs text-zinc-400 line-clamp-2 mb-4 flex-1">
                {project.desc}
              </p>
              <div className="flex gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded-sm uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMM-LINK SECTION */}
      <section className="space-y-6 pt-12 border-t border-purple-500/30">
        <h3 className="text-purple-500 flex items-center gap-2 font-bold tracking-widest uppercase text-sm">
          <span className="text-purple-400 font-bold animate-pulse text-xl">⚠️</span> ESTABLISH COMM-LINK
        </h3>
        
        <SystemCard title="WARNING: UNVERIFIED CONNECTION DETECTED">
          <div className="p-6 md:p-10 bg-zinc-950 flex flex-col gap-8">
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl border-l-2 border-amber-500/50 pl-4 py-2 bg-amber-500/5">
              &quot;Looking to collaborate on scalable backend systems, AI integrations, or open-source tooling? The network is always open for other engineers and recruiters. Initialize a secure channel to discuss projects, architectural designs, or job opportunities.&quot;
            </p>
            
            <div className="flex flex-col gap-4 font-mono text-xs md:text-sm">
              <a href="mailto:prathmeshpdesai@gmail.com" className="group flex items-center gap-4 p-3 bg-zinc-900/50 hover:bg-purple-900/20 border border-zinc-800 hover:border-purple-500/50 transition-all cursor-pointer rounded-sm w-fit">
                <span className="text-zinc-500 group-hover:text-purple-400 transition-colors">[Execute Email Protocol]</span>
                <span className="text-purple-300 group-hover:text-purple-100 transition-colors">-&gt; prathmeshpdesai@gmail.com</span>
              </a>
              
              <a href="https://linkedin.com/in/pd241008" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-3 bg-zinc-900/50 hover:bg-purple-900/20 border border-zinc-800 hover:border-purple-500/50 transition-all cursor-pointer rounded-sm w-fit">
                <span className="text-zinc-500 group-hover:text-purple-400 transition-colors">[Open LinkedIn Uplink]</span>
                <span className="text-purple-300 group-hover:text-purple-100 transition-colors">-&gt; linkedin.com/in/pd241008</span>
              </a>
              
              <a href="https://github.com/pd241008" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-3 bg-zinc-900/50 hover:bg-purple-900/20 border border-zinc-800 hover:border-purple-500/50 transition-all cursor-pointer rounded-sm w-fit">
                <span className="text-zinc-500 group-hover:text-purple-400 transition-colors">[Access GitHub Database]</span>
                <span className="text-purple-300 group-hover:text-purple-100 transition-colors">-&gt; github.com/pd241008</span>
              </a>
              
              <a href="tel:+919923464748" className="group flex items-center gap-4 p-3 bg-zinc-900/50 hover:bg-purple-900/20 border border-zinc-800 hover:border-purple-500/50 transition-all cursor-pointer rounded-sm w-fit">
                <span className="text-zinc-500 group-hover:text-purple-400 transition-colors">[Direct Node Ping]</span>
                <span className="text-purple-300 group-hover:text-purple-100 transition-colors">-&gt; +91 9923464748</span>
              </a>
            </div>
          </div>
        </SystemCard>
      </section>
    </div>
  );
}
