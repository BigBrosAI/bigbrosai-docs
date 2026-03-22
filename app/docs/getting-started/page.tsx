import type { Metadata } from "next";
import { Rocket } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocSection, DocCallout } from "@/components/docs/DocSection";
import Link from "next/link";

export const metadata: Metadata = { title: "Getting Started" };

const STEPS = [
  { n: "01", title: "Create an Account",    desc: "Sign up at dashboard.bigbrosai.com and complete onboarding for your chosen channel." },
  { n: "02", title: "Generate an API Key",  desc: "Go to your project Settings → API Keys → Generate New Key. Copy it — you won't see it again." },
  { n: "03", title: "Make your first call", desc: "Use one of the examples below to send a message or email in seconds." },
];

const WA_EXAMPLE = `curl -X POST https://api.bigbrosai.com/api/v1/campaign/api-campaign \\
  -H "bigbrosai-api-key: live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "campaignName": "Hello World",
    "destination": "+919876543210",
    "templateId": "YOUR_TEMPLATE_ID",
    "templateParams": ["Rahul"]
  }'`;

const EMAIL_EXAMPLE = `curl -X POST https://api.bigbrosai.com/api/v1/email/send \\
  -H "bigbrosai-api-key: live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "hello@yourdomain.com",
    "to": "user@example.com",
    "subject": "Hello from BigBrosAI",
    "body_html": "<h1>Hello!</h1><p>Your first email via BigBrosAI.</p>"
  }'`;

const WA_RESPONSE = `{
  "data": {
    "messaging_product": "whatsapp",
    "contacts": [{ "input": "+919876543210", "wa_id": "919876543210" }],
    "messages": [{ "id": "wamid.HBgM..." }]
  },
  "message": "Template message sent successfully"
}`;

const EMAIL_RESPONSE = `{
  "data": { "id": 98765, "status": "queued" },
  "message": "Email queued successfully"
}`;

export default function GettingStartedPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-[#1f6feb]/10"><Rocket size={20} className="text-[#58a6ff]" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Getting Started</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Be up and running in under 5 minutes</p>
      </div>

      <div className="space-y-4 mb-10">
        {STEPS.map(s => (
          <div key={s.n} className="flex gap-4 items-start p-4 dark:bg-[#161b22] bg-gray-50 border dark:border-[#21262d] border-gray-200 rounded-lg">
            <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-[#1f6feb]/10 border border-[#1f6feb]/30 rounded-lg font-bold font-mono text-[#58a6ff] text-sm">
              {s.n}
            </div>
            <div>
              <h3 className="font-semibold dark:text-[#e1e4e8] text-gray-800 mb-1">{s.title}</h3>
              <p className="dark:text-[#8b949e] text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <DocSection title="Send a WhatsApp Template Message">
        <p className="dark:text-[#8b949e] text-gray-600 text-sm mb-4">
          Use your project API key in the <code className="dark:text-[#79c0ff] text-blue-600">bigbrosai-api-key</code> header.
          The template must be approved by Meta before sending.
        </p>
        <CodeBlock lang="bash" code={WA_EXAMPLE} />
      </DocSection>

      <DocSection title="Expected WhatsApp Response">
        <CodeBlock lang="json" code={WA_RESPONSE} />
      </DocSection>

      <DocSection title="Send a Transactional Email">
        <p className="dark:text-[#8b949e] text-gray-600 text-sm mb-4">
          The <code className="dark:text-[#79c0ff] text-blue-600">from</code> domain must be verified in your project before sending.
        </p>
        <CodeBlock lang="bash" code={EMAIL_EXAMPLE} />
      </DocSection>

      <DocSection title="Expected Email Response">
        <CodeBlock lang="json" code={EMAIL_RESPONSE} />
      </DocSection>

      <DocCallout type="success" title="You're all set!">
        Your message is queued for delivery. Check the{" "}
        <Link href="/docs/whatsapp/api-campaign" className="text-[#58a6ff] hover:underline">WhatsApp API Campaign</Link>{" "}
        and{" "}
        <Link href="/docs/email/send" className="text-[#58a6ff] hover:underline">Send Email</Link>{" "}
        docs for the full list of supported parameters.
      </DocCallout>
    </div>
  );
}
