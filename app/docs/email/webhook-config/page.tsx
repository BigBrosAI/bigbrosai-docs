import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Configure Email Webhooks" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-purple-500/10"><Settings size={20} className="text-purple-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Configure Email Webhooks</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Set up a callback URL to receive real-time email delivery events</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        Webhook configuration lets you register an HTTPS endpoint that BigBrosAI will call whenever
        a delivery event occurs for emails sent from a specific domain. This is how you get real-time
        delivery receipts, bounce notifications, and spam complaints into your own system.
      </p>

      <DocSection title="Setup Steps">
        <ol className="space-y-3 text-sm dark:text-[#8b949e] text-gray-600">
          {[
            "Go to your project dashboard → Email → Settings → Webhooks.",
            "Select the domain you want to configure webhooks for.",
            "Enter your callback URL (must be HTTPS and publicly reachable).",
            "Choose which events to subscribe to (or leave all selected).",
            "Click Save — BigBrosAI returns a signing secret.",
            "Store the secret securely in your environment variables — it is shown only once.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-500 text-xs font-bold font-mono">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection title="Subscribable Events">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Event", "When it fires"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["email.delivered",  "The receiving mail server accepted the email."],
                ["email.bounced",    "Permanent delivery failure — address invalid or server rejected."],
                ["email.complained", "Recipient marked the email as spam."],
                ["email.deferred",   "Temporary failure — the platform will retry automatically."],
              ].map(([event, when]) => (
                <tr key={event} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-purple-400 text-xs whitespace-nowrap">{event}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="The Signing Secret">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          When you save the webhook config, BigBrosAI returns a <code className="dark:text-[#79c0ff] text-blue-600">secret</code> string
          (prefixed <code className="dark:text-[#79c0ff] text-blue-600">whsec_...</code>). This secret is used to sign every
          webhook payload with HMAC-SHA256. Store it as an environment variable and use it to verify
          incoming requests. See the <a href="/docs/email/webhooks" className="text-blue-500 hover:underline">Email Webhooks guide</a> for
          full verification examples.
        </p>
      </DocSection>

      <DocSection title="Updating or Rotating">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          To change your callback URL or subscribed events, go back to Settings → Webhooks and update
          the config. To rotate the signing secret, delete the existing config and create a new one —
          a new secret will be generated. Update your server's environment variable before rotating
          to avoid a gap in verification.
        </p>
      </DocSection>

      <DocCallout type="warning" title="Secret shown once">
        The signing secret is only displayed at the time of creation. If you lose it, you'll need
        to reconfigure the webhook to get a new one.
      </DocCallout>

      <DocCallout type="info" title="One config per domain">
        Each domain can have one active webhook configuration. Saving a new config for a domain
        that already has one will replace the existing config and generate a new secret.
      </DocCallout>
    </div>
  );
}
