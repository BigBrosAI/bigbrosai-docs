import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Business Verification" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-green-500/10"><BadgeCheck size={20} className="text-green-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Business Verification</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Verify your business with Meta to unlock higher messaging limits</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        Meta requires businesses to complete a verification process before they can access higher
        messaging tiers and certain WhatsApp Business API features. Verification confirms your
        business identity and increases trust with Meta's systems.
      </p>

      <DocSection title="Why Verify?">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Without Verification", "With Verification"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["250 conversations/day limit", "Up to 100,000+ conversations/day"],
                ["Cannot request Official Business Account", "Eligible for Official Business Account (green tick)"],
                ["Limited template categories", "Access to all template categories"],
              ].map(([without, with_], i) => (
                <tr key={i} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600 text-sm">{without}</td>
                  <td className="px-4 py-2.5 text-green-500 text-sm">{with_}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Verification Process">
        <ol className="space-y-3 text-sm dark:text-[#8b949e] text-gray-600">
          {[
            "Go to your project dashboard → WhatsApp → Business Verification.",
            "Click Submit for Verification — this opens the Meta Business Manager flow.",
            "Provide your legal business name, address, and website.",
            "Upload supporting documents (business registration, tax certificate, etc.).",
            "Meta reviews your submission — this typically takes 1–5 business days.",
            "You'll receive an email from Meta when the review is complete.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-bold font-mono">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection title="Accepted Documents">
        <ul className="space-y-2 text-sm dark:text-[#8b949e] text-gray-600 ml-4 list-disc">
          <li>Business registration certificate</li>
          <li>Tax registration document (GST, VAT, EIN, etc.)</li>
          <li>Utility bill or bank statement showing business name and address</li>
          <li>Government-issued business license</li>
        </ul>
        <p className="text-sm dark:text-[#8b949e] text-gray-600 mt-3">
          Documents must be in English or accompanied by a certified translation. Accepted formats: PDF, JPG, PNG.
        </p>
      </DocSection>

      <DocCallout type="info" title="Verification is done through Meta">
        BigBrosAI initiates the verification flow, but the actual review is done by Meta. BigBrosAI
        has no control over the outcome or timeline of Meta's review process.
      </DocCallout>

      <DocCallout type="warning" title="Business Manager required">
        Your WhatsApp Business Account must be linked to a Meta Business Manager account before
        you can submit for verification. If you haven't done this yet, set it up at
        business.facebook.com first.
      </DocCallout>
    </div>
  );
}
