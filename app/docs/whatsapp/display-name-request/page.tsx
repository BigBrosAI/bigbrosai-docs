import type { Metadata } from "next";
import { Pencil } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Request Display Name Change" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><Pencil size={20} className="text-blue-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Request Display Name Change</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Change the name shown to recipients when they receive your WhatsApp messages</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        Your WhatsApp display name is what recipients see in their chat list and message header when
        they receive a message from your business. Changing it requires Meta's approval — you submit
        a request and Meta reviews it, typically within 1–3 business days.
      </p>

      <DocSection title="Display Name Guidelines">
        <p className="text-sm dark:text-[#8b949e] text-gray-600 mb-3">
          Meta has strict rules about what display names are allowed. Your name must:
        </p>
        <ul className="space-y-2 text-sm dark:text-[#8b949e] text-gray-600 ml-4 list-disc">
          <li>Clearly represent your business or brand</li>
          <li>Not be a generic term (e.g. "Support" or "Notifications" alone)</li>
          <li>Not impersonate another business or public figure</li>
          <li>Not contain URLs, phone numbers, or special characters</li>
          <li>Match or closely relate to your verified business name</li>
        </ul>
      </DocSection>

      <DocSection title="How to Request a Change">
        <ol className="space-y-3 text-sm dark:text-[#8b949e] text-gray-600">
          {[
            "Go to your project dashboard → WhatsApp → Display Name.",
            "Enter the new display name you want.",
            "Provide a brief reason for the change (optional but recommended).",
            "Submit the request — it is sent to Meta for review.",
            "Track the status on the Display Name Status page.",
            "Once approved, the new name is applied to your WhatsApp number automatically.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500 text-xs font-bold font-mono">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection title="Review Timeline">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          Meta typically reviews display name requests within 1–3 business days. During the review
          period, your current display name remains active. If the request is rejected, you'll receive
          a reason and can submit a revised name.
        </p>
      </DocSection>

      <DocCallout type="info" title="One pending request at a time">
        You can only have one pending display name request at a time. If you need to change your
        request, cancel the existing one first and submit a new one.
      </DocCallout>

      <DocCallout type="warning" title="Frequent changes may be flagged">
        Meta may flag accounts that change their display name too frequently. Only request a change
        when necessary.
      </DocCallout>
    </div>
  );
}
