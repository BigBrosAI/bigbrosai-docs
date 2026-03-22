import type { Metadata } from "next";
import { List } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Message Templates" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-purple-500/10"><List size={20} className="text-purple-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Message Templates</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">View and manage all your WhatsApp message templates</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        The Templates page lists all message templates associated with your WhatsApp Business Account.
        You can see their approval status, category, language, and quality rating. Only templates
        with an APPROVED status can be used for sending.
      </p>

      <DocSection title="Template Statuses">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Status", "Meaning"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["APPROVED",         "Template is approved and ready to send."],
                ["PENDING",          "Submitted and awaiting Meta's review."],
                ["REJECTED",         "Meta rejected the template. Review the reason and create a revised version."],
                ["PAUSED",           "Template has been paused due to low quality rating. Can be resumed."],
                ["DISABLED",         "Template has been disabled by Meta due to policy violations."],
                ["IN_APPEAL",        "A rejection appeal has been submitted and is under review."],
              ].map(([status, meaning]) => (
                <tr key={status} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className={`px-4 py-2.5 font-mono text-xs font-semibold ${
                    status === "APPROVED" ? "text-green-500"
                    : status === "REJECTED" || status === "DISABLED" ? "text-red-400"
                    : status === "PAUSED" ? "text-orange-400"
                    : "text-yellow-500"
                  }`}>{status}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Quality Rating">
        <p className="text-sm dark:text-[#8b949e] text-gray-600 mb-3">
          Meta assigns each template a quality rating based on how recipients interact with messages
          sent using it. A high block or report rate lowers the rating.
        </p>
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Rating", "Meaning"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["HIGH",   "Good quality. No action needed."],
                ["MEDIUM", "Some negative feedback. Monitor and improve content."],
                ["LOW",    "High negative feedback. Template may be paused soon."],
                ["UNKNOWN","Not enough data yet to assign a rating."],
              ].map(([rating, meaning]) => (
                <tr key={rating} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className={`px-4 py-2.5 font-mono text-xs font-semibold ${
                    rating === "HIGH" ? "text-green-500" : rating === "LOW" ? "text-red-400" : rating === "MEDIUM" ? "text-yellow-500" : "dark:text-[#8b949e] text-gray-500"
                  }`}>{rating}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Filtering Templates">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          Use the filters on the Templates page to narrow down by status, category, or language.
          This is useful when you have many templates and need to find a specific one quickly.
        </p>
      </DocSection>

      <DocCallout type="info" title="Templates sync from Meta">
        The template list is synced from your WhatsApp Business Account via Meta's API. If you
        created templates directly in Meta Business Manager, they will appear here too.
      </DocCallout>
    </div>
  );
}
