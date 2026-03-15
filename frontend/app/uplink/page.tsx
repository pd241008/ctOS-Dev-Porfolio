"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SystemCard from "@/components/ui/SystemCard";

export default function UplinkPage() {
  const router = useRouter();
  const [emailState, setEmailState] = useState({
    subject: "",
    message: "",
    status: "IDLE" as "IDLE" | "SENDING" | "SUCCESS" | "ERROR",
  });
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (log: string) =>
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);

  const handleSendMail = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation to match server-side rules
    if (!emailState.subject.trim() || !emailState.message.trim()) {
      addLog("ERROR: Empty payload detected. Aborting.");
      return;
    }

    setLogs([]);
    setEmailState((prev) => ({ ...prev, status: "SENDING" }));

    addLog("Initializing secure handshake...");
    addLog("Fragmenting payload for stealth relay...");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: emailState.subject,
          message: emailState.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "SUCCESS") {
        addLog("Routing through node: " + data.id);
        addLog("Transmission confirmed by remote gateway.");
        addLog("CLEANUP: Local buffers purged.");
        setEmailState((prev) => ({ ...prev, status: "SUCCESS" }));
      } else {
        throw new Error(data.message || "Relay failed");
      }
    } catch {
      addLog("ERROR: Gateway refused connection.");
      addLog("RETRIEVING_BACKUP: Local mail client fallback ready.");
      setEmailState((prev) => ({ ...prev, status: "ERROR" }));
    }
  };

  const contactLinks = [
    {
      label: "GITHUB_DATABASE",
      val: "github.com/pd241008",
      href: "https://github.com/pd241008",
      icon: "⚡",
    },
    {
      label: "LINKEDIN_UPLINK",
      val: "linkedin.com/in/pd241008",
      href: "https://linkedin.com/in/pd241008",
      icon: "🌐",
    },
  ];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-6xl mx-auto py-12 px-4 md:px-8 space-y-12 min-h-screen">
      <header className="border-b-2 border-purple-500/40 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative group">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-purple-400 tracking-[0.2em] uppercase mb-1 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
            Uplink // Comm_Channels
          </h2>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-purple-500 animate-pulse rounded-full" />
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em]">
              External Connections, GitHub Intelligence & Secure Contact Protocols
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Email Terminal */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-indigo-600 rounded-sm blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <SystemCard title="TERMINAL_COMMAND // INIT_EMAIL_PROTOCOL">
            <div className="p-8 bg-zinc-950 flex flex-col min-h-137.5">
              <div className="mb-8 space-y-2">
                <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest border-b border-zinc-800 pb-2 flex justify-between">
                  <span>Drafting_Internal_Ping</span>
                  <span className="text-purple-500">v4.0.2</span>
                </div>
              </div>

              {emailState.status === "SUCCESS" ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95">
                  <div className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center text-3xl text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] bg-green-950/20">
                    ✓
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">
                      Sent_Successfully
                    </h3>
                    <p className="text-zinc-500 text-[11px] font-mono uppercase tracking-widest max-w-sm leading-relaxed">
                      Your payload has been successfully routed to the
                      operator&apos;s node.
                    </p>
                  </div>
                  <div className="w-full bg-zinc-900/50 p-4 font-mono text-[9px] text-zinc-500 text-left">
                    {logs.map((log, i) => (
                      <div
                        key={i}
                        className="mb-0.5 text-green-500/70">
                        {log}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setEmailState({
                        subject: "",
                        message: "",
                        status: "IDLE",
                      })
                    }
                    className="text-[10px] text-purple-500 font-black hover:text-white transition-colors underline underline-offset-4 tracking-[0.2em]">
                    [ INIT_NEW_PROTOCOL ]
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  {logs.length > 0 && emailState.status === "SENDING" && (
                    <div className="mb-6 bg-zinc-900/50 p-4 border border-zinc-800 font-mono text-[9px] text-purple-400 space-y-1">
                      {logs.map((log, i) => (
                        <div
                          key={i}
                          className="animate-in slide-in-from-left-2">
                          {log}
                        </div>
                      ))}
                      <div className="animate-pulse">_</div>
                    </div>
                  )}

                  <form
                    onSubmit={handleSendMail}
                    className={`space-y-6 flex-1 flex flex-col ${emailState.status === "SENDING" ? "opacity-30 pointer-events-none" : ""}`}>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-500 font-black uppercase tracking-widest ml-1">
                        Subject_Line
                      </label>
                      <input
                        required
                        maxLength={200}
                        placeholder="Collaboration: Project_X"
                        value={emailState.subject}
                        onChange={(e) =>
                          setEmailState((prev) => ({
                            ...prev,
                            subject: e.target.value,
                          }))
                        }
                        className="w-full bg-zinc-900/50 border border-zinc-800 p-4 text-zinc-200 font-mono text-xs focus:border-purple-500 outline-none transition-all placeholder:text-zinc-700"
                      />
                    </div>
                    <div className="flex-1 flex flex-col space-y-1.5">
                      <label className="text-[10px] text-zinc-500 font-black uppercase tracking-widest ml-1">
                        Secure_Payload
                      </label>
                      <textarea
                        required
                        maxLength={5000}
                        placeholder="Write your message here... The operator is listening."
                        value={emailState.message}
                        onChange={(e) =>
                          setEmailState((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        className="flex-1 w-full bg-zinc-900/50 border border-zinc-800 p-4 text-zinc-200 font-mono text-xs focus:border-purple-500 outline-none transition-all resize-none placeholder:text-zinc-700 min-h-50"
                      />
                    </div>

                    {emailState.status === "ERROR" && (
                      <button
                        type="button"
                        onClick={() => {
                          const mailtoUrl = `mailto:prathmeshpdesai@gmail.com?subject=${encodeURIComponent(emailState.subject)}&body=${encodeURIComponent(emailState.message)}`;
                          window.location.href = mailtoUrl;
                        }}
                        className="text-[10px] text-amber-500 font-bold uppercase tracking-widest text-center mb-4 underline decoration-amber-500/30">
                        [ Fallback: Trigger_Local_Client ]
                      </button>
                    )}

                    <button
                      disabled={emailState.status === "SENDING"}
                      className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 text-white font-black uppercase text-xs tracking-[0.3em] transition-all shadow-[0_4px_0_0_rgba(126,34,206,1)] active:shadow-none active:translate-y-1">
                      {emailState.status === "SENDING"
                        ? "Transmitting..."
                        : "Execute_Protocol"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </SystemCard>
        </div>

        {/* Right: Social Hub */}
        <div className="space-y-8 flex flex-col">
          <div className="p-8 bg-zinc-900/40 border-2 border-zinc-800 relative group overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.1),transparent)]" />
            <div className="relative space-y-6">
              <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">
                Warning: Unverified Connection Detected
              </div>
              <p className="text-zinc-300 text-lg font-bold italic leading-relaxed tracking-wide">
                &quot;Looking to collaborate on scalable backend systems, AI
                integrations, or open-source tooling? The network is open.&quot;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 flex-1">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group p-6 bg-zinc-950 border-2 border-zinc-900 hover:border-purple-500 transition-all rounded-sm flex items-center justify-between relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/5 translate-x-12 translate-y-12 rotate-45 scale-0 group-hover:scale-150 transition-transform duration-700" />
                <div className="flex items-center gap-6">
                  <span className="text-3xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all">
                    {link.icon}
                  </span>
                  <div className="space-y-1 relative z-10">
                    <div className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] group-hover:text-purple-400 mb-1">
                      {link.label}
                    </div>
                    <div className="text-[14px] text-zinc-300 font-bold group-hover:text-white transition-colors underline decoration-purple-500/30 group-hover:decoration-purple-500 underline-offset-8">
                      {link.val}
                    </div>
                  </div>
                </div>
                <span className="text-zinc-800 group-hover:text-purple-500 transition-colors font-black text-xl">
                  »
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-center pt-20 border-t border-zinc-800">
        <button
          onClick={() => router.back()}
          className="px-8 py-2 text-[11px] font-black uppercase tracking-[0.3em] bg-zinc-950 border border-zinc-800 text-zinc-600 hover:border-purple-500/50 hover:text-purple-400 transition-all">
          ⋘ Return_To_Archive
        </button>
      </div>
    </div>
  );
}
