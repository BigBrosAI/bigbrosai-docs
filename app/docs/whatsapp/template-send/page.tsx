import type { Metadata } from "next";
import { Send } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const metadata: Metadata = { title: "Send a Template Message" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-green-500/10"><Send size={20} className="text-green-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Send a Template Message</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Send an approved WhatsApp template to a recipient from the dashboard</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        Once a template is approved, you can send it to any opted-in recipient. From the dashboard
        you can send one-off messages manually, or use the API Campaign endpoint for server-to-server
        automated sends. This page covers the manual dashboard flow.
      </p>

      <DocSection title="Sending from the Dashboard">
        <ol className="space-y-3 text-sm dark:text-[#8b949e] text-gray-600">
          {[
            "Go to your project dashboard → WhatsApp → Templates.",
            "Find the approved template you want to send.",
            "Click Send.",
            "Enter the recipient's phone number (with country code, e.g. +919876543210).",
            "Fill in the template variable values (if the template has {{1}}, {{2}}, etc.).",
            "If the template has a media header, provide the media URL.",
            "Click Send Message.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-bold font-mono">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection title="Template Variables">
        <p className="text-sm dark:text-[#8b949e] text-gray-600 mb-3">
          If your template body contains variables like <code className="dark:text-[#79c0ff] text-blue-600">{"{{1}}"}</code>,
          you'll be prompted to fill them in before sending. The values are substituted in order.
        </p>
        <CodeBlock lang="bash" code={`# Template body
Hi {{1}}, your appointment on {{2}} at {{3}} is confirmed.

# Fill in:
{{1}} → "Priya"
{{2}} → "March 25"
{{3}} → "10:00 AM"

# Sent as:
Hi Priya, your appointment on March 25 at 10:00 AM is confirmed.`} />
      </DocSection>

      <DocSection title="Sending via API">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          For automated, server-to-server sends, use the API Campaign endpoint with your project
          API key. See the <a href="/docs/whatsapp/api-campaign" className="text-blue-500 hover:underline">API Campaign</a> page
          for the full reference and code examples.
        </p>
      </DocSection>

      <DocCallout type="warning" title="Opt-in required">
        You can only send template messages to users who have opted in to receive messages from
        your business. Sending to non-opted-in users violates WhatsApp's policies and can result
        in your number being banned.
      </DocCallout>

      <DocCallout type="info" title="24-hour window">
        After a user sends you a message, you have a 24-hour window to reply with any content
        (not just templates). Outside that window, you must use an approved template.
      </DocCallout>
    </div>
  );
}
