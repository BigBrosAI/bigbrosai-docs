import type { Metadata } from "next";
import { UserCog } from "lucide-react";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Update WhatsApp Profile" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-blue-500/10"><UserCog size={20} className="text-blue-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Update WhatsApp Profile</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Edit your business description, category, address, and contact details</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        You can update most of your WhatsApp Business profile fields at any time from the dashboard.
        Changes take effect immediately and are visible to recipients. The display name is the only
        field that requires Meta's approval — use the Display Name Request page for that.
      </p>

      <DocSection title="Editable Fields">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Field", "Notes"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["About",        "Max 256 characters. Shown below your name in the chat list."],
                ["Category",     "Choose from Meta's predefined business categories."],
                ["Description",  "Longer text shown on your full profile page."],
                ["Address",      "Your physical business address."],
                ["Email",        "Business contact email."],
                ["Websites",     "Up to 2 URLs. Must include https://."],
                ["Profile Photo","Square image recommended. Max 5MB. JPG or PNG."],
              ].map(([field, notes]) => (
                <tr key={field} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-blue-500 text-xs font-semibold whitespace-nowrap">{field}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="How to Update">
        <ol className="space-y-3 text-sm dark:text-[#8b949e] text-gray-600">
          {[
            "Go to your project dashboard → WhatsApp → Profile.",
            "Click Edit Profile.",
            "Update the fields you want to change.",
            "Click Save — changes are applied immediately.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500 text-xs font-bold font-mono">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocCallout type="info" title="Display name is separate">
        The display name (what recipients see in their chat list) requires Meta approval and is
        managed separately. See the Display Name Request page.
      </DocCallout>
    </div>
  );
}
