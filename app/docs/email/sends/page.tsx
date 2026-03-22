import type { Metadata } from "next";
import { Inbox } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Email Send History" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Inbox size={20} className="text-blue-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Email Send History</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Browse and filter all emails sent from your project</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        The Sends page gives you a full log of every email dispatched from your project. You can filter by
        status, search by sender or recipient address, and paginate through large volumes. Click any send
        to see its full details including delivery status per recipient, body preview, and any bounce or
        complaint feedback.
      </p>

      <DocSection title="Send Statuses">
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
                ["queued",     "Email has been accepted and is waiting to be sent."],
                ["processing", "Email is currently being sent to the relay."],
                ["accepted",   "The relay accepted the email for delivery."],
                ["bounced",    "Permanent delivery failure — the address is invalid or the server rejected it."],
                ["complained", "The recipient marked the email as spam."],
              ].map(([status, meaning]) => (
                <tr key={status} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className={`px-4 py-2.5 font-mono text-xs font-semibold ${
                    status === "accepted" ? "text-green-500"
                    : status === "bounced" || status === "complained" ? "text-red-400"
                    : "text-yellow-500"
                  }`}>{status}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Filtering and Search">
        <div className="space-y-3 text-sm dark:text-[#8b949e] text-gray-600">
          <p>Use the filters at the top of the Sends page to narrow down results:</p>
          <ul className="space-y-2 ml-4">
            {[
              ["Status filter", "Show only emails with a specific delivery status."],
              ["From search",   "Filter by the sender address (partial match supported)."],
              ["To search",     "Filter by the recipient address (partial match supported)."],
              ["Pagination",    "Results are paginated — use the Next/Previous buttons or load more."],
            ].map(([label, desc]) => (
              <li key={label} className="flex gap-2">
                <span className="dark:text-[#c9d1d9] text-gray-700 font-medium shrink-0">{label}:</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </DocSection>

      <DocSection title="Send Detail View">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          Clicking a send opens the detail view, which shows the full recipient list with per-address
          delivery status, the email subject and body preview, attachment info, and any bounce or
          complaint feedback received via webhook. This is useful for debugging delivery issues.
        </p>
      </DocSection>

      <DocCallout type="info" title="Retention">
        Send history is retained for 90 days. For long-term storage, set up a webhook to capture
        delivery events and store them in your own database.
      </DocCallout>
    </div>
  );
}
