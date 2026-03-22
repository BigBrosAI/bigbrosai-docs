import type { Metadata } from "next";
import { Link as LinkIcon } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

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
      <DocSection title="Register a Webhook">
        <CodeBlock lang="bash" code={`curl -X POST https://api.bigbrosai.com/api/v1/webhooks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://yourapp.com/webhooks/bigbrosai",
    "events": ["message.delivered", "message.failed", "campaign.completed"],
    "secret": "your_webhook_secret"
  }'`} />
      </DocSection>
      <DocCallout type="warning" title="HTTPS Required">
        Webhook endpoints must use HTTPS. HTTP endpoints are rejected for security reasons.
      </DocCallout>
    </div>
  );
}
