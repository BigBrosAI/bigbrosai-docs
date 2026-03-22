import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Mail, ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const metadata: Metadata = { title: "Introduction" };

const CAPABILITIES = [
  {
    icon: <MessageSquare size={18} />,
    title: "WhatsApp",
    desc: "Send approved template messages to any recipient via the WhatsApp Business API using your project API key.",
    color: "#25d366",
  },
  {
    icon: <Mail size={18} />,
    title: "Email",
    desc: "Send transactional emails from your verified domain with delivery tracking and attachment support.",
    color: "#388bfd",
  },
];

export default function IntroductionPage() {
  return (
    <div className="doc-content">
      <h1>Introduction</h1>
      <p className="text-lg text-[#8b949e] leading-relaxed mb-6">
        Welcome to the <strong className="text-[#c9d1d9]">BigBrosAI Developer Platform</strong> — a
        REST API for sending WhatsApp template messages and transactional emails from your own applications.
      </p>

      <p>
        All public endpoints authenticate with your project API key via the{" "}
        <code>bigbrosai-api-key</code> header. No OAuth, no JWT — just your key.
      </p>

      {/* Capability cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-8">
        {CAPABILITIES.map((c) => (
          <div
            key={c.title}
            className="bg-[#161b22] border border-[#21262d] rounded-lg p-4 hover:border-[#30363d] transition-colors"
          >
            <div className="mb-2" style={{ color: c.color }}>{c.icon}</div>
            <div className="font-semibold text-[#e1e4e8] text-sm mb-1">{c.title}</div>
            <div className="text-[#8b949e] text-[0.78rem] leading-relaxed">{c.desc}</div>
          </div>
        ))}
      </div>

      {/* Channels table */}
      <h2>Supported Channels</h2>
      <div className="overflow-x-auto border border-[#21262d] rounded-lg mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#21262d]">
              {["Channel", "Status", "Auth"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold text-[#8b949e] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["WhatsApp", "Live", "bigbrosai-api-key header"],
              ["Email",    "Live", "bigbrosai-api-key header"],
              ["SMS",      "Coming soon", "—"],
              ["RCS",      "Coming soon", "—"],
              ["Instagram","Coming soon", "—"],
            ].map(([ch, status, auth]) => (
              <tr key={ch} className="border-b border-[#161b22] last:border-0">
                <td className="px-4 py-2.5 font-medium text-[#e1e4e8] text-sm">{ch}</td>
                <td className="px-4 py-2.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                    status === "Live"
                      ? "bg-green-500/10 text-green-400 border-green-500/30"
                      : "bg-gray-500/10 text-[#8b949e] border-[#30363d]"
                  }`}>{status}</span>
                </td>
                <td className="px-4 py-2.5 text-[#8b949e] font-mono text-xs">{auth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Base URL */}
      <h2>Base URL</h2>
      <p>All API requests should be made to:</p>
      <CodeBlock code="https://api.bigbrosai.com" lang="bash" showLineNumbers={false} />

      {/* Versioning */}
      <h2>API Versioning</h2>
      <p>
        Endpoints are versioned via the URL path. The current stable version is{" "}
        <code>v1</code>. We maintain full backwards compatibility within major versions.
        Breaking changes are always introduced in a new major version with advance notice.
      </p>

      <div className="callout-info">
        <strong className="text-[#58a6ff]">Stability guarantee:</strong> All{" "}
        <code className="text-[#79c0ff]">v1</code> endpoints are stable and will not receive
        breaking changes without a deprecation period of at least 6 months.
      </div>

      {/* Request format */}
      <h2>Request & Response Format</h2>
      <p>
        All request bodies must be sent as <code>application/json</code>. All responses are JSON.
        Timestamps use ISO 8601 (UTC).
      </p>

      {/* Next steps */}
      <h2>Next Steps</h2>
      <div className="flex flex-col gap-2 mt-4">
        {[
          ["Get started in 5 minutes",        "/docs/getting-started"],
          ["Learn about authentication",       "/docs/authentication"],
          ["Send a WhatsApp template message", "/docs/whatsapp/api-campaign"],
          ["Send your first email",            "/docs/email/send"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 bg-[#161b22] border border-[#21262d] hover:border-[#30363d] rounded-lg px-4 py-3 text-[0.88rem] text-[#c9d1d9] transition-all group"
          >
            <ArrowRight size={14} className="text-[#58a6ff] group-hover:translate-x-0.5 transition-transform" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
