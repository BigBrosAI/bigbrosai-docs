import type { Metadata } from "next";
import { Gauge } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Rate Limits" };

export default function RateLimitsPage() {
  const plans = [
    ["Starter",    "60",     "5",       "1,000"],
    ["Growth",     "300",    "25",      "10,000"],
    ["Business",   "1,000",  "100",     "50,000"],
    ["Enterprise", "Custom", "Unlimited","Unlimited"],
  ];
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-[#1f6feb]/10"><Gauge size={20} className="text-[#58a6ff]" /></div>
          <h1 className="text-2xl font-bold text-[#e1e4e8]">Rate Limits</h1>
        </div>
        <p className="text-[#6a737d]">Understand API usage limits and quotas</p>
      </div>
      <p className="text-[#8b949e] leading-relaxed mb-8">
        Rate limits protect platform stability and ensure fair usage. Limits vary by plan and endpoint type.
        When you exceed a rate limit, the API returns a <code className="text-[#79c0ff] bg-[#161b22] px-1 rounded text-xs font-mono border border-[#21262d]">429 Too Many Requests</code> response.
      </p>
      <DocSection title="Plan Limits">
        <div className="overflow-x-auto border border-[#21262d] rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#21262d]">
                {["Plan", "Messages / min", "Campaigns / day", "API Calls / hour"].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-[0.7rem] font-semibold text-[#8b949e] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans.map((row, i) => (
                <tr key={i} className="border-b border-[#161b22]">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-3 py-2.5 text-sm ${j === 0 ? "font-semibold text-[#e1e4e8]" : "text-[#8b949e]"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>
      <DocSection title="Rate Limit Headers">
        <p className="text-[#8b949e] text-sm mb-3 leading-relaxed">Every response includes headers to help you track your current usage:</p>
        <CodeBlock code={`X-RateLimit-Limit: 300
X-RateLimit-Remaining: 247
X-RateLimit-Reset: 1709982600
Retry-After: 37`} lang="bash" />
      </DocSection>
      <DocSection title="Handling 429 Errors">
        <DocCallout type="warning" title="Exponential Backoff">
          When you receive a 429, wait for the number of seconds in the <code className="font-mono text-xs">Retry-After</code> header before retrying. Use exponential backoff for repeated failures.
        </DocCallout>
      </DocSection>
    </div>
  );
}
