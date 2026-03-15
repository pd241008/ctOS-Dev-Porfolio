export default function BioOverview() {
  return (
    <div className="p-5 bg-zinc-950 flex flex-col gap-4 font-mono min-h-20rem">
      <div className="flex items-center gap-4 border-b border-purple-500/20 pb-4">
        <div className="w-16 h-16 bg-purple-900/40 border border-purple-500 flex items-center justify-center text-2xl font-bold text-purple-300">
          PD
        </div>

        <div>
          <h3 className="text-xl font-bold text-purple-200 uppercase tracking-widest">
            Prathmesh Desai
          </h3>

          <p className="text-xs uppercase tracking-widest mt-1 flex flex-wrap gap-x-1">
            <span className="text-purple-300 font-bold bg-purple-500/20 px-1">Backend-Focused</span>
            <span className="text-purple-400/70">Full Stack Developer</span>
          </p>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
            Architecting robust backend systems, developer tooling, and scalable cloud infrastructure.
          </p>
        </div>
      </div>

      <div className="text-sm text-zinc-300 leading-relaxed space-y-3">
        <p>&gt; B.Tech Computer Science (2023-2027) — SRM University</p>

        <p>
          &gt; Technical Lead — Milan &apos;25 &amp; &apos;26 (SRM University). Architected and deployed the official festival ticketing platform (Next.js + Node.js), successfully scaling to handle 4K+ concurrent users.
        </p>

        <p>
          &gt; Web Development Intern — CodeClause. Developed responsive web applications using HTML, CSS, JavaScript, and React.
        </p>

        <p>
          &gt; Specializing in building production-grade applications using modern backend systems, cloud infrastructure, and machine learning.
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-purple-500/20">
        <div className="text-xs text-purple-500 font-bold mb-2 uppercase tracking-widest">
          SYS_CORE_STACK
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            "JavaScript",
            "TypeScript",
            "Python",
            "C++",
            "Java",
            "Next.js",
            "React.js",
            "Tailwind CSS",
            "Node.js",
            "Express.js",
            "FastAPI",
            "MongoDB",
            "PostgreSQL",
            "AWS EC2",
            "PM2",
            "Docker"
          ].map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-purple-900/20 border border-purple-500/40 text-[10px] text-purple-300 uppercase">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
