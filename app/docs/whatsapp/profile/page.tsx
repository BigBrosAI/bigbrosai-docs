import type { Metadata } from "next";
import { User } from "lucide-react";
import { DocSection } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "WhatsApp Business Profile" };

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-green-500/10"><User size={20} className="text-green-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">WhatsApp Business Profile</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">View your WhatsApp Business profile information</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        Your WhatsApp Business profile is what users see when they tap on your business name in a
        conversation. It includes your business description, category, address, website, and email.
        A complete profile builds trust and helps recipients understand who they're talking to.
      </p>

      <DocSection title="Profile Fields">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Field", "Description"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Display Name",  "The name shown to recipients in conversations."],
                ["About",         "A short description of your business (max 256 characters)."],
                ["Category",      "Your business category (e.g. Technology, Retail, Finance)."],
                ["Address",       "Your business address."],
                ["Description",   "A longer description of your business and what you offer."],
                ["Email",         "Business contact email shown on your profile."],
                ["Websites",      "Up to 2 website URLs shown on your profile."],
                ["Profile Photo", "Your business logo or profile image."],
              ].map(([field, desc]) => (
                <tr key={field} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-green-500 text-xs font-semibold whitespace-nowrap">{field}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Where to View Your Profile">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          Go to your project dashboard → WhatsApp → Profile. This page shows your current profile
          information as it appears to recipients. To make changes, use the Profile Update page.
        </p>
      </DocSection>

      <DocSection title="Profile Visibility">
        <p className="text-sm dark:text-[#8b949e] text-gray-600">
          Your profile is visible to any WhatsApp user who receives a message from your number or
          searches for your business. A complete, accurate profile improves trust and reduces the
          chance of your messages being reported as spam.
        </p>
      </DocSection>
    </div>
  );
}
