import { Construction } from "lucide-react";

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="p-3 rounded-xl bg-[#1f6feb]/10 border border-[#1f6feb]/20">
        <Construction size={28} className="text-[#58a6ff]" />
      </div>
      <h2 className="text-xl font-bold dark:text-[#e1e4e8] text-gray-800">{title}</h2>
      <p className="dark:text-[#8b949e] text-gray-500 text-sm max-w-sm leading-relaxed">
        This section is coming soon. Check back shortly or refer to the{" "}
        <a href="/docs/whatsapp/api-campaign" className="text-[#58a6ff] hover:underline">WhatsApp</a>{" "}
        and{" "}
        <a href="/docs/email/send" className="text-[#58a6ff] hover:underline">Email</a>{" "}
        docs for currently available endpoints.
      </p>
    </div>
  );
}
