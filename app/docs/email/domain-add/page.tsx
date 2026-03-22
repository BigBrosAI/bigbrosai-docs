import type { Metadata } from "next";
import { Globe } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const metadata: Metadata = { title: "Add a Sending Domain" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Globe size={20} className="text-blue-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Add a Sending Domain</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Register a domain and get the DNS records you need to start sending email</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        Before you can send email from a custom address, you need to register your domain with BigBrosAI
        and add a few DNS records. This proves ownership and enables proper email authentication (DKIM, SPF, DMARC),
        which is critical for deliverability and avoiding spam folders.
      </p>

      <DocSection title="How It Works">
        <ol className="space-y-3 text-sm dark:text-[#8b949e] text-gray-600">
          {[
            "Go to your project dashboard → Email → Domains → Add Domain.",
            "Enter your domain name (e.g. yourdomain.com).",
            "BigBrosAI generates three DNS records: DKIM, SPF, and DMARC.",
            "Add those records to your DNS provider (Cloudflare, Route53, GoDaddy, etc.).",
            "Click Verify Domain — BigBrosAI checks the records live.",
            "Once all three are verified, you can send from any address on that domain.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500 text-xs font-bold font-mono">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection title="DNS Records Explained">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Record", "Type", "Purpose"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["DKIM", "TXT", "Cryptographically signs outgoing emails so receivers can verify they came from you."],
                ["SPF",  "TXT", "Lists the mail servers authorised to send on behalf of your domain."],
                ["DMARC","TXT", "Tells receivers what to do with emails that fail DKIM/SPF checks (none, quarantine, reject)."],
              ].map(([rec, type, purpose]) => (
                <tr key={rec} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-blue-500 text-xs font-semibold">{rec}</td>
                  <td className="px-4 py-2.5 font-mono dark:text-[#8b949e] text-gray-500 text-xs">{type}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Example DNS Records">
        <p className="text-sm dark:text-[#8b949e] text-gray-600 mb-3">
          After adding your domain, BigBrosAI returns records like these. The exact values will be unique to your domain.
        </p>
        <CodeBlock lang="bash" code={`# DKIM — add to: relay._domainkey.yourdomain.com
Type:  TXT
Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GN...

# SPF — add to: yourdomain.com
Type:  TXT
Value: v=spf1 include:relay.bigbrosai.com ~all

# DMARC — add to: _dmarc.yourdomain.com
Type:  TXT
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com`} />
      </DocSection>

      <DocSection title="DNS Propagation">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          DNS changes can take anywhere from a few minutes to 48 hours to propagate globally, depending on your
          provider and TTL settings. Most modern providers (Cloudflare, Route53) propagate within minutes.
          If verification fails immediately after adding records, wait 5–10 minutes and try again.
        </p>
      </DocSection>

      <DocCallout type="info" title="Subdomain sending">
        You can add a subdomain like <code>mail.yourdomain.com</code> instead of the root domain.
        This is common when you want to separate transactional email reputation from your main domain.
      </DocCallout>

      <DocCallout type="warning" title="One domain per project">
        Each domain is scoped to a project. If you have multiple projects, you need to add and verify
        the domain separately in each one.
      </DocCallout>
    </div>
  );
}
