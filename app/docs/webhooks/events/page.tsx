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
      <p className="text-[#8b949e] leading-relaxed mb-8">
        Webhooks deliver real-time event notifications to your server via HTTP POST requests.
        Configure endpoints in your dashboard under <strong className="text-[#e1e4e8]">Settings → Webhooks</strong>.
      </p>
      <DocSection title="Available Events">
        <div className="space-y-2">
          {WEBHOOK_EVENTS.map(e => (
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
      <DocSection title="Webhook Payload">
        <CodeBlock lang="json" code={`{
  "event": "message.delivered",
  "timestamp": "2026-03-09T10:30:05Z",
  "data": {
    "message_id": "msg_01HXYZ9876ABC",
    "phone": "+919876543210",
    "delivered_at": "2026-03-09T10:30:04Z",
    "read_at": null
  },
  "signature": "sha256=abc123def456..."
}`} />
      </DocSection>
      <DocSection title="Security Verification">
        <p className="text-[#8b949e] text-sm leading-relaxed mb-3">
          Every webhook request includes an HMAC-SHA256 signature in the <code className="text-[#79c0ff] bg-[#161b22] px-1 rounded text-xs font-mono border border-[#21262d]">X-BigBrosAI-Signature</code> header.
          Verify it to ensure the payload is genuine.
        </p>
        <CodeBlock lang="javascript" code={`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}`} />
      </DocSection>
      <DocCallout type="info" title="Retry Policy">
        Failed webhook deliveries are retried with exponential backoff: 5s, 30s, 2m, 10m, 1h. After 5 failures, the event is marked as failed and no further retries are attempted.
      </DocCallout>
    </div>
  );
}
