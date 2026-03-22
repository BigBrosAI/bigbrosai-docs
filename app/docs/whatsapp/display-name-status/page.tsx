import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Display Name Status" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-yellow-500/10"><Clock size={20} className="text-yellow-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Display Name Status</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Track the review status of your display name change request</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        After submitting a display name change request, you can track its review status here.
        Meta reviews all display name requests and will either approve or reject them. This page
        shows the current status and any feedback from Meta.
      </p>

      <DocSection title="Status Values">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Status", "Meaning"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["PENDING",  "Your request has been submitted and is awaiting Meta's review."],
                ["APPROVED", "Meta approved the name. It is now active on your WhatsApp number."],
                ["REJECTED", "Meta rejected the request. A reason is provided — review it and submit a revised name."],
              ].map(([status, meaning]) => (
                <tr key={status} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className={`px-4 py-2.5 font-mono text-xs font-semibold ${
                    status === "APPROVED" ? "text-green-500" : status === "REJECTED" ? "text-red-400" : "text-yellow-500"
                  }`}>{status}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="What Happens After Approval">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          Once Meta approves your request, the new display name is applied to your WhatsApp Business
          number automatically. Recipients will see the new name in new conversations. Existing
          conversations may take a short time to update on the recipient's device.
        </p>
      </DocSection>

      <DocSection title="If Your Request Is Rejected">
        <p className="text-sm dark:text-[#8b949e] text-gray-600 mb-3">
          Meta will provide a rejection reason. Common reasons include:
        </p>
        <ul className="space-y-2 text-sm dark:text-[#8b949e] text-gray-600 ml-4 list-disc">
          <li>Name doesn't clearly represent a business</li>
          <li>Name contains prohibited content (URLs, phone numbers)</li>
          <li>Name is too generic</li>
          <li>Name doesn't match the verified business name</li>
        </ul>
        <p className="text-sm dark:text-[#8b949e] text-gray-600 mt-3">
          Review the reason, adjust your name accordingly, and submit a new request from the
          Display Name Request page.
        </p>
      </DocSection>

      <DocCallout type="info" title="Review timeline">
        Meta typically completes reviews within 1–3 business days. If your request has been
        pending for more than 5 business days, contact BigBrosAI support.
      </DocCallout>
    </div>
  );
}
