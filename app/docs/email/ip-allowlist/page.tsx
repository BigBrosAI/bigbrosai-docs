import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const metadata: Metadata = { title: "IP Allowlist" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-red-500/10"><Shield size={20} className="text-red-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">IP Allowlist</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Restrict email sending to specific IP addresses for extra security</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        The IP allowlist lets you lock down your project's email sending API so that only requests
        originating from specific IP addresses or CIDR ranges are accepted. This is an optional but
        recommended security layer for production environments where your sending server has a fixed IP.
      </p>

      <DocSection title="How It Works">
        <p className="text-sm dark:text-[#8b949e] text-gray-600 mb-4">
          When IP restriction is enabled for a project, any call to the Send Email API from an IP
          not on the allowlist will be rejected with a <code className="dark:text-[#79c0ff] text-blue-600">403 Forbidden</code> response,
          even if the API key is valid. This prevents your API key from being misused if it's ever leaked.
        </p>
        <ol className="space-y-3 text-sm dark:text-[#8b949e] text-gray-600">
          {[
            "Go to your project dashboard → Email → Settings → IP Allowlist.",
            "Add the IP addresses or CIDR ranges of your sending servers.",
            "Enable the restriction toggle.",
            "Save — the restriction takes effect immediately.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold font-mono">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection title="CIDR Range Examples">
        <CodeBlock lang="bash" code={`# Single IP
203.0.113.5

# /24 subnet (256 addresses)
198.51.100.0/24

# /32 is equivalent to a single IP
203.0.113.5/32`} />
      </DocSection>

      <DocSection title="Disabling the Restriction">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          You can disable IP restriction at any time from the same settings page. When disabled,
          any IP can call the Send Email API as long as the API key is valid. The saved IP list
          is preserved so you can re-enable it later without re-entering the addresses.
        </p>
      </DocSection>

      <DocCallout type="warning" title="Don't lock yourself out">
        Before enabling IP restriction, make sure your current IP (or your server's IP) is on the
        allowlist. If you enable it without adding your IP, your sends will start failing immediately.
      </DocCallout>

      <DocCallout type="info" title="Dynamic IPs">
        If your server uses a dynamic IP (e.g. a cloud function or serverless environment), IP
        restriction may not be practical. In that case, rely on API key security and consider
        rotating keys regularly instead.
      </DocCallout>
    </div>
  );
}
