import type { Metadata } from "next";
import { History } from "lucide-react";
import { CHANGELOG } from "@/lib/docs-data";

export const metadata: Metadata = { title: "Changelog" };

const CHANGE_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  new:        { label: "New",        color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
  improved:   { label: "Improved",   color: "text-blue-400",    bg: "bg-blue-500/10 border-blue-500/30"       },
  fixed:      { label: "Fixed",      color: "text-orange-400",  bg: "bg-orange-500/10 border-orange-500/30"   },
  deprecated: { label: "Deprecated", color: "text-red-400",     bg: "bg-red-500/10 border-red-500/30"         },
};

export default function ChangelogPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-[#1f6feb]/10"><History size={20} className="text-[#58a6ff]" /></div>
          <h1 className="text-2xl font-bold text-[#e1e4e8]">Changelog</h1>
        </div>
        <p className="text-[#6a737d]">API version history and release notes</p>
      </div>
      <div className="space-y-8">
        {CHANGELOG.map(entry => (
          <div key={entry.version} className="pl-5 border-l-2 border-[#21262d]">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold text-[#58a6ff] bg-[#1f6feb]/10 border border-[#1f6feb]/30 px-2.5 py-1 rounded-full">
                {entry.version}
              </span>
              <span className="text-[#6a737d] text-sm">{entry.date}</span>
            </div>
            <div className="space-y-2">
              {entry.changes.map((c, i) => {
                const s = CHANGE_STYLES[c.type];
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`text-[0.65rem] font-bold font-mono px-1.5 py-0.5 rounded border shrink-0 mt-0.5 ${s.color} ${s.bg}`}>
                      {s.label}
                    </span>
                    <span className="text-[#8b949e] text-sm leading-relaxed">{c.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
