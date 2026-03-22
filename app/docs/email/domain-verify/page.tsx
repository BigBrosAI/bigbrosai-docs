import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Verify Your Domain" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-green-500/10"><ShieldCheck size={20} className="text-green-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Verify Your Domain</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Check your DNS records and confirm your domain is ready to send</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        After adding the DNS records for your domain, you need to verify them. BigBrosAI performs live DNS
        lookups for your DKIM, SPF, and DMARC records and updates the status of each one. All three must
        be verified before you can send email from that domain.
      </p>

      <DocSection title="Verification Steps">
        <ol className="space-y-3 text-sm dark:text-[#8b949e] text-gray-600">
          {[
            "Add the DNS records provided by BigBrosAI to your DNS provider.",
            "Wait for DNS propagation (usually a few minutes, up to 48 hours).",
            "Go to your project dashboard → Email → Domains.",
            "Click Verify next to your domain.",
            "BigBrosAI checks each record (DKIM, SPF, DMARC) in real time.",
            "Once all three show VERIFIED, the domain is active and ready to send.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-bold font-mono">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection title="Record Statuses">
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
                ["PENDING",  "Record has not been checked yet, or was not found on the last check."],
                ["VERIFIED", "Record was found and matches the expected value."],
                ["FAILED",   "Record was found but the value is incorrect, or the lookup failed."],
              ].map(([status, meaning]) => (
                <tr key={status} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className={`px-4 py-2.5 font-mono text-xs font-semibold ${
                    status === "VERIFIED" ? "text-green-500" : status === "FAILED" ? "text-red-400" : "text-yellow-500"
                  }`}>{status}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Troubleshooting Failed Records">
        <div className="space-y-4 text-sm dark:text-[#8b949e] text-gray-600">
          <div>
            <p className="font-semibold dark:text-[#c9d1d9] text-gray-700 mb-1">DKIM fails</p>
            <p>Make sure you added the record to the correct subdomain: <code className="dark:text-[#79c0ff] text-blue-600">relay._domainkey.yourdomain.com</code>. Some DNS providers auto-append the root domain — check that the full hostname is correct.</p>
          </div>
          <div>
            <p className="font-semibold dark:text-[#c9d1d9] text-gray-700 mb-1">SPF fails</p>
            <p>You can only have one SPF record per domain. If you already have one, merge it: <code className="dark:text-[#79c0ff] text-blue-600">v=spf1 include:relay.bigbrosai.com include:existing.provider.com ~all</code></p>
          </div>
          <div>
            <p className="font-semibold dark:text-[#c9d1d9] text-gray-700 mb-1">DMARC fails</p>
            <p>Add the record to <code className="dark:text-[#79c0ff] text-blue-600">_dmarc.yourdomain.com</code>. If you already have a DMARC record, you don't need to change it — any valid DMARC record will pass.</p>
          </div>
        </div>
      </DocSection>

      <DocCallout type="info" title="Re-verify anytime">
        You can click Verify again at any time from the Domains page. This is useful if you updated
        a record and want to confirm the change was picked up.
      </DocCallout>
    </div>
  );
}
