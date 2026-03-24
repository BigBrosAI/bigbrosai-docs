import type { Metadata } from "next";
import { RadioTower } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocSection, DocCallout } from "@/components/docs/DocSection";
import { WEBHOOK_EVENTS } from "@/lib/docs-data";

export const metadata: Metadata = { title: "Webhook Events" };

const COLOR_MAP: Record<string, string> = {
  green: "text-emerald-400", blue: "text-blue-400", red: "text-red-400",
  purple: "text-purple-400", orange: "text-orange-400", yellow: "text-yellow-400",
};
const BG_MAP: Record<string, string> = {
  green: "bg-emerald-500/10 border-emerald-500/30", blue: "bg-blue-500/10 border-blue-500/30",
  red: "bg-red-500/10 border-red-500/30", purple: "bg-purple-500/10 border-purple-500/30",
  orange: "bg-orange-500/10 border-orange-500/30", yellow: "bg-yellow-500/10 border-yellow-500/30",
};

const WA_EVENTS = WEBHOOK_EVENTS.filter(e => !e.event.startsWith("send."));
const EMAIL_EVENTS = WEBHOOK_EVENTS.filter(e => e.event.startsWith("send."));

export default function WebhookEventsPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-[#1f6feb]/10"><RadioTower size={20} className="text-[#58a6ff]" /></div>
          <h1 className="text-2xl font-bold text-[#e1e4e8]">Webhook Events</h1>
        </div>
        <p className="text-[#6a737d]">Real-time event notifications delivered to your server</p>
      </div>

      <DocSection title="WhatsApp Events">
        <p className="text-[#8b949e] text-sm mb-3 leading-relaxed">
          Meta sends these events to your webhook URL configured in the dashboard under <strong className="text-[#e1e4e8]">Project → Settings → WhatsApp</strong>.
        </p>
        <div className="space-y-2">
          {WA_EVENTS.map(e => (
            <div key={e.event} className={`flex items-start gap-3 p-3.5 rounded-lg border ${BG_MAP[e.color] ?? "bg-[#161b22] border-[#21262d]"}`}>
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 bg-current ${COLOR_MAP[e.color] ?? "text-[#8b949e]"}`} />
              <div>
                <code className={`text-sm font-mono font-semibold ${COLOR_MAP[e.color] ?? "text-[#79c0ff]"}`}>{e.event}</code>
                <p className="text-[#8b949e] text-xs mt-0.5 leading-relaxed">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Email Events (Hyvor Relay)">
        <p className="text-[#8b949e] text-sm mb-3 leading-relaxed">
          These events are forwarded to your callback URL configured via the <a href="/docs/email/webhook-config" className="text-[#58a6ff] hover:underline">Email Webhook Config</a> endpoint.
          Each payload is signed with <code className="text-[#79c0ff] bg-[#161b22] px-1 rounded text-xs font-mono border border-[#21262d]">X-Bigbrosai-Signature</code> (HMAC-SHA256).
        </p>
        <div className="space-y-2">
          {EMAIL_EVENTS.map(e => (
            <div key={e.event} className={`flex items-start gap-3 p-3.5 rounded-lg border ${BG_MAP[e.color] ?? "bg-[#161b22] border-[#21262d]"}`}>
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 bg-current ${COLOR_MAP[e.color] ?? "text-[#8b949e]"}`} />
              <div>
                <code className={`text-sm font-mono font-semibold ${COLOR_MAP[e.color] ?? "text-[#79c0ff]"}`}>{e.event}</code>
                <p className="text-[#8b949e] text-xs mt-0.5 leading-relaxed">{e.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Email Webhook Payload">
        <p className="text-[#8b949e] text-sm mb-3">The payload forwarded to your callback URL:</p>
        <CodeBlock lang="json" code={`{
  "event": "send.recipient.accepted",
  "payload": {
    "send": {
      "id": 19,
      "uuid": "22ef6d06-bd67-420a-94d5-d02d0cb091c0",
      "from_address": "hello@yourdomain.com",
      "subject": "Welcome"
    },
    "recipient": {
      "id": 21,
      "address": "user@example.com",
      "status": "accepted"
    }
  }
}`} />
      </DocSection>

      <DocSection title="Verifying Email Webhook Signatures">
        <p className="text-[#8b949e] text-sm leading-relaxed mb-3">
          Every forwarded email webhook includes an HMAC-SHA256 signature in the{" "}
          <code className="text-[#79c0ff] bg-[#161b22] px-1 rounded text-xs font-mono border border-[#21262d]">X-Bigbrosai-Signature</code> header.
          The secret is returned once when you configure the webhook.
        </p>
        <CodeBlock lang="javascript" code={`const crypto = require('crypto');

function verifyWebhook(rawBody, signatureHeader, secret) {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signatureHeader),
    Buffer.from(expected)
  );
}`} />
      </DocSection>

      <DocCallout type="info" title="Retry Policy">
        Hyvor retries failed webhook deliveries automatically. Configure your callback URL to respond with HTTP 2xx within 10 seconds to acknowledge receipt.
      </DocCallout>
    </div>
  );
}
