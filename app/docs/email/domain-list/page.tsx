import type { Metadata } from "next";
import { List } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Managing Domains" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-purple-500/10"><List size={20} className="text-purple-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Managing Domains</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">View and manage all sending domains registered to your project</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        The Domains page in your project dashboard shows every domain you've registered for email sending,
        along with the verification status of each DNS record. You can add new domains, re-verify existing
        ones, and see at a glance which domains are ready to send.
      </p>

      <DocSection title="Domain List Overview">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Column", "Description"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Domain",     "The registered domain name."],
                ["DKIM",       "Status of the DKIM TXT record (PENDING / VERIFIED / FAILED)."],
                ["SPF",        "Status of the SPF TXT record."],
                ["DMARC",      "Status of the DMARC TXT record."],
                ["Verified",   "Overall status — true only when all three records are VERIFIED."],
                ["Actions",    "Verify button to re-check DNS records at any time."],
              ].map(([col, desc]) => (
                <tr key={col} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-purple-500 text-xs font-semibold">{col}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Adding Multiple Domains">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          You can register multiple domains per project. This is useful if you send from different brands
          or subdomains (e.g. <code className="dark:text-[#79c0ff] text-blue-600">notifications.yourdomain.com</code> for transactional
          and <code className="dark:text-[#79c0ff] text-blue-600">marketing.yourdomain.com</code> for campaigns).
          Each domain has its own independent DNS records and verification status.
        </p>
      </DocSection>

      <DocSection title="Sending From a Domain">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          Once a domain is verified, you can use any address on that domain as the <code className="dark:text-[#79c0ff] text-blue-600">from</code> field
          when sending email. For example, if <code className="dark:text-[#79c0ff] text-blue-600">yourdomain.com</code> is verified,
          you can send from <code className="dark:text-[#79c0ff] text-blue-600">hello@yourdomain.com</code>,{" "}
          <code className="dark:text-[#79c0ff] text-blue-600">support@yourdomain.com</code>, or any other address on that domain.
        </p>
      </DocSection>

      <DocCallout type="warning" title="Unverified domains are blocked">
        Attempting to send from an address on an unverified domain will result in an error.
        Make sure all three DNS records are verified before sending.
      </DocCallout>
    </div>
  );
}
