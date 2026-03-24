import type { Metadata } from "next";
import { Link as LinkIcon } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocSection, DocCallout } from "@/components/docs/DocSection";
import Link from "next/link";

export const metadata: Metadata = { title: "Webhook Setup" };

export default function WebhookSetupPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-[#1f6feb]/10"><LinkIcon size={20} className="text-[#58a6ff]" /></div>
          <h1 className="text-2xl font-bold text-[#e1e4e8]">Webhook Setup</h1>
        </div>
        <p className="text-[#6a737d]">Configure endpoints to receive real-time event notifications</p>
      </div>

      <DocSection title="WhatsApp Webhooks">
        <p className="text-[#8b949e] text-sm leading-relaxed mb-3">
          WhatsApp webhooks are configured directly in your Meta App settings. Meta sends events to your registered URL.
          See the <Link href="/docs/whatsapp/webhooks" className="text-[#58a6ff] hover:underline">WhatsApp Webhooks</Link> page for setup details.
        </p>
      </DocSection>

      <DocSection title="Email Webhooks">
        <p className="text-[#8b949e] text-sm leading-relaxed mb-3">
          Register your callback URL using the Email Webhook Config endpoint. A signing secret is returned — use it to verify incoming payloads.
        </p>
        <CodeBlock lang="bash" code={`curl -X POST https://api.bigbrosai.com/api/v1/email/webhook/config \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "x-org-id: YOUR_ORG_ID" \\
  -H "Content-Type: application/json" \\
  -d '{
    "projectId": "YOUR_PROJECT_ID",
    "domain": "yourdomain.com",
    "callbackUrl": "https://yourapp.com/webhooks/email",
    "events": [
      "send.recipient.accepted",
      "send.recipient.bounced",
      "send.recipient.complained",
      "send.recipient.deferred",
      "send.recipient.failed",
      "send.recipient.suppressed"
    ]
  }'`} />
        <p className="text-[#8b949e] text-sm mt-3 leading-relaxed">
          The response includes a <code className="text-[#79c0ff] bg-[#161b22] px-1 rounded text-xs font-mono border border-[#21262d]">secret</code> — store it securely.
          It is shown only once and used to verify the <code className="text-[#79c0ff] bg-[#161b22] px-1 rounded text-xs font-mono border border-[#21262d]">X-Bigbrosai-Signature</code> header on incoming events.
        </p>
      </DocSection>

      <DocCallout type="warning" title="HTTPS Required">
        Webhook endpoints must use HTTPS. HTTP endpoints are rejected.
      </DocCallout>
    </div>
  );
}
