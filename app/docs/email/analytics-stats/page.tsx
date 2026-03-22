import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Email Analytics Stats" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-green-500/10"><TrendingUp size={20} className="text-green-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Email Analytics Stats</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Aggregate delivery and engagement statistics for your project</p>
      </div>
      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        The stats endpoint returns aggregate counts for your project's email activity — total sent, accepted,
        bounced, complained, and deferred — for a given time window. Use this for dashboards and health monitoring.
      </p>
      <DocSection title="Stats Summary">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Stat", "Description"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["total_sent",       "Total emails dispatched."],
                ["total_accepted",   "Emails successfully accepted by receiving servers."],
                ["total_bounced",    "Permanent delivery failures."],
                ["total_complained", "Spam complaints received."],
                ["total_deferred",   "Temporary failures pending retry."],
                ["delivery_rate",    "Percentage of sent emails that were accepted."],
              ].map(([s, d]) => (
                <tr key={s} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-green-500 text-xs font-semibold">{s}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>
      <DocCallout type="info" title="Coming soon">
        The analytics stats API endpoint is under development. Data is currently available via the dashboard only.
      </DocCallout>
    </div>
  );
}
