import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { DocSection } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Send Detail" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-orange-500/10"><FileText size={20} className="text-orange-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Send Detail</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Full delivery information for a single sent email</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        The send detail view shows everything about a specific email send — who it was sent to, the
        delivery status per recipient, the email content, and any feedback (bounces, complaints) received.
        Access it by clicking any row in the Sends list.
      </p>

      <DocSection title="What You'll See">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Field", "Description"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["ID / UUID",       "Unique numeric ID and UUID for this send."],
                ["From",            "The sender address used."],
                ["Subject",         "Email subject line."],
                ["Size",            "Total size of the email in bytes."],
                ["Created at",      "Timestamp when the send was created."],
                ["Recipients",      "Full list of to/cc/bcc addresses with per-address delivery status and retry count."],
                ["Body preview",    "HTML and plain text body of the email."],
                ["Feedback",        "Any bounce or complaint events received for this send."],
              ].map(([field, desc]) => (
                <tr key={field} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-orange-500 text-xs font-semibold whitespace-nowrap">{field}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Recipient Statuses">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          Each recipient in the list has its own delivery status. A single send can have some recipients
          accepted and others bounced — for example if one address is invalid. The <code className="dark:text-[#79c0ff] text-blue-600">try_count</code> field
          shows how many delivery attempts were made for that address.
        </p>
      </DocSection>

      <DocSection title="Feedback Events">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          The feedback section shows any bounce or complaint notifications received from the receiving
          mail server. Bounces indicate the address is invalid or the server rejected the email.
          Complaints mean the recipient marked it as spam. Both are important signals — repeated
          complaints can affect your sending reputation.
        </p>
      </DocSection>
    </div>
  );
}
