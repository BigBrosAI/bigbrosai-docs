import type { Metadata } from "next";
import { KeyRound } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Authentication" };

export default function AuthPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-[#1f6feb]/10"><KeyRound size={20} className="text-[#58a6ff]" /></div>
          <h1 className="text-2xl font-bold text-[#e1e4e8]">Authentication</h1>
        </div>
        <p className="text-[#6a737d]">Authenticate every request with your project API key</p>
      </div>

      <p className="text-[#8b949e] leading-relaxed mb-8">
        All public API endpoints authenticate via the{" "}
        <code className="text-[#79c0ff] bg-[#161b22] px-1.5 py-0.5 rounded text-xs border border-[#21262d] font-mono">bigbrosai-api-key</code>{" "}
        request header. There is no OAuth or JWT required for client integrations.
      </p>

      <DocCallout type="danger" title="Keep your key secret">
        Never expose your API key in client-side code, public repositories, or logs. Always load it from an environment variable on your server.
      </DocCallout>

      <DocSection title="Header Format">
        <CodeBlock code={"bigbrosai-api-key: live_YOUR_API_KEY"} lang="bash" showLineNumbers={false} />
      </DocSection>

      <DocSection title="Example Request">
        <CodeBlock code={`curl -X POST https://api.bigbrosai.com/api/v1/email/send \\
  -H "bigbrosai-api-key: live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "from": "hello@yourdomain.com", "to": "user@example.com", "subject": "Hi" }'`} lang="bash" />
      </DocSection>

      <DocSection title="API Key Types">
        <div className="overflow-x-auto border border-[#21262d] rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#21262d]">
                {["Prefix", "Environment", "Behaviour"].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-[0.7rem] font-semibold text-[#8b949e] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["live_", "Production", "Real message delivery, charges apply"],
              ].map(([prefix, env, behaviour], i) => (
                <tr key={i} className="border-b border-[#161b22] last:border-0">
                  <td className="px-3 py-2.5 font-mono text-[#79c0ff] text-sm">{prefix}</td>
                  <td className="px-3 py-2.5 text-[#8b949e] text-sm">{env}</td>
                  <td className="px-3 py-2.5 text-[#8b949e] text-sm">{behaviour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Generating a Key">
        <p className="text-[#8b949e] text-sm leading-relaxed">
          Go to <span className="text-[#c9d1d9]">dashboard.bigbrosai.com</span> → your project → <span className="text-[#c9d1d9]">Settings → API Keys → Generate New Key</span>.
          Copy it immediately — it will not be shown again.
        </p>
      </DocSection>

      <DocSection title="Revoking a Key">
        <p className="text-[#8b949e] text-sm leading-relaxed">
          If a key is compromised, revoke it from the dashboard immediately. Any request using a revoked key will receive a{" "}
          <code className="text-[#79c0ff]">401 Unauthorized</code> response.
        </p>
      </DocSection>
    </div>
  );
}
