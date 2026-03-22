import type { Metadata } from "next";
import { BarChart2 } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Email Analytics Chart" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><BarChart2 size={20} className="text-blue-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Email Analytics Chart</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Visualize email delivery and engagement trends over time</p>
      </div>
      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        The analytics chart gives you a time-series view of your email sending activity. Track delivery rates,
        bounces, complaints, and deferrals across any date range to spot trends and identify issues early.
      </p>
      <DocSection title="Available Metrics">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Metric", "Description"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Sent",       "Total emails dispatched in the selected period."],
                ["Accepted",   "Emails accepted by the receiving mail server."],
                ["Bounced",    "Permanent delivery failures."],
                ["Complained", "Emails marked as spam by recipients."],
                ["Deferred",   "Temporary failures — retried automatically."],
              ].map(([m, d]) => (
                <tr key={m} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-blue-500 text-xs font-semibold">{m}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>
      <DocCallout type="info" title="Coming soon">
        The analytics chart API endpoint is under development. Data is currently available via the dashboard only.
      </DocCallout>
    </div>
  );
}
