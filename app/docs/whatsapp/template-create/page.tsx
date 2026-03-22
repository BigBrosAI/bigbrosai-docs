import type { Metadata } from "next";
import { LayoutTemplate } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";
import { CodeBlock } from "@/components/docs/CodeBlock";

export const metadata: Metadata = { title: "Create a Message Template" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-orange-500/10"><LayoutTemplate size={20} className="text-orange-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Create a Message Template</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Build and submit WhatsApp message templates for Meta approval</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        WhatsApp requires all business-initiated messages to use pre-approved templates. Templates
        define the structure of your message — the header, body, footer, and buttons. You create
        them in the dashboard and submit them to Meta for review. Once approved, you can send them
        to any opted-in recipient.
      </p>

      <DocSection title="Template Structure">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Component", "Required", "Description"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Header", "No",  "Optional top section. Can be text, image, video, or document."],
                ["Body",   "Yes", "Main message text. Supports variables like {{1}}, {{2}}."],
                ["Footer", "No",  "Optional small text at the bottom of the message."],
                ["Buttons","No",  "Up to 3 buttons: Quick Reply, Call to Action (URL or phone)."],
              ].map(([comp, req, desc]) => (
                <tr key={comp} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-orange-500 text-xs font-semibold">{comp}</td>
                  <td className={`px-4 py-2.5 text-xs font-semibold ${req === "Yes" ? "text-green-500" : "dark:text-[#8b949e] text-gray-500"}`}>{req}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Template Categories">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Category", "Use Case"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["UTILITY",       "Transactional messages — order confirmations, shipping updates, OTPs."],
                ["MARKETING",     "Promotional messages — offers, announcements, re-engagement."],
                ["AUTHENTICATION","One-time passwords and verification codes."],
              ].map(([cat, use]) => (
                <tr key={cat} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-orange-500 text-xs font-semibold">{cat}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Using Variables">
        <p className="text-sm dark:text-[#8b949e] text-gray-600 mb-3">
          Use <code className="dark:text-[#79c0ff] text-blue-600">{"{{1}}"}</code>, <code className="dark:text-[#79c0ff] text-blue-600">{"{{2}}"}</code>, etc.
          as placeholders in your body text. When sending, you provide the actual values in order via <code className="dark:text-[#79c0ff] text-blue-600">templateParams</code>.
        </p>
        <CodeBlock lang="bash" code={`# Template body
Hello {{1}}, your order {{2}} has been shipped!

# When sending, provide:
templateParams: ["Rahul", "#ORD-12345"]

# Result
Hello Rahul, your order #ORD-12345 has been shipped!`} />
      </DocSection>

      <DocSection title="Approval Process">
        <ol className="space-y-3 text-sm dark:text-[#8b949e] text-gray-600">
          {[
            "Create your template in the dashboard → WhatsApp → Templates → New Template.",
            "Fill in the name, category, language, and components.",
            "Submit for review — Meta reviews within 24–48 hours (usually faster).",
            "Once approved, the template status changes to APPROVED and it's ready to send.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs font-bold font-mono">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocCallout type="warning" title="Template names are permanent">
        Once a template is created, its name cannot be changed. If you need a different name,
        create a new template. Template names must be lowercase with underscores only (e.g. <code>order_confirmation</code>).
      </DocCallout>

      <DocCallout type="info" title="Quality rating">
        Meta assigns a quality rating to each template based on recipient feedback. Templates with
        low quality ratings may be paused or disabled. Keep your content relevant and only send to
        opted-in users.
      </DocCallout>
    </div>
  );
}
