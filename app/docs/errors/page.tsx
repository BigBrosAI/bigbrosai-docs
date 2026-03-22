import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocSection } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Error Codes" };

const ERRORS = [
  { code: "UNAUTHORIZED",         status: 401, desc: "Invalid, expired, or missing API key"              },
  { code: "FORBIDDEN",            status: 403, desc: "API key lacks permission for this resource"        },
  { code: "NOT_FOUND",            status: 404, desc: "The requested resource does not exist"             },
  { code: "RATE_LIMIT_EXCEEDED",  status: 429, desc: "Too many requests — use Retry-After header"        },
  { code: "INVALID_PHONE_NUMBER", status: 400, desc: "Phone number is not valid E.164 format"            },
  { code: "TEMPLATE_NOT_FOUND",   status: 404, desc: "Template ID not found or not yet approved"         },
  { code: "CONTACT_EXISTS",       status: 409, desc: "Contact with this phone number already exists"     },
  { code: "CAMPAIGN_ACTIVE",      status: 409, desc: "Cannot modify a campaign that is currently active" },
  { code: "PAYLOAD_TOO_LARGE",    status: 413, desc: "Request body exceeds the size limit"               },
  { code: "INTERNAL_ERROR",       status: 500, desc: "Unexpected server error — contact support"         },
];

export default function ErrorsPage() {
  const statusColor = (s: number) =>
    s >= 500 ? "text-red-400" : s >= 400 ? "text-orange-400" : "text-emerald-400";

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-red-500/10"><AlertCircle size={20} className="text-red-400" /></div>
          <h1 className="text-2xl font-bold text-[#e1e4e8]">Error Codes</h1>
        </div>
        <p className="text-[#6a737d]">Comprehensive guide to API error responses</p>
      </div>
      <p className="text-[#8b949e] leading-relaxed mb-8">
        All errors return a consistent JSON envelope. Use the HTTP status code and the{" "}
        <code className="text-[#79c0ff] bg-[#161b22] px-1.5 py-0.5 rounded text-xs border border-[#21262d] font-mono">error</code>{" "}
        array for machine-readable error handling in your application logic.
      </p>
      <DocSection title="Error Response Format">
        <CodeBlock lang="json" code={`{
  "success": false,
  "message": "Request failed",
  "error": ["API key is required in bigbrosai-api-key header"],
  "timestamp": "2026-03-22T10:00:00.000Z",
  "path": "/api/v1/email/send"
}`} />
      </DocSection>
      <DocSection title="Error Reference">
        <div className="overflow-x-auto border border-[#21262d] rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#21262d]">
                {["Code", "HTTP Status", "Description"].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-[0.7rem] font-semibold text-[#8b949e] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ERRORS.map((e, i) => (
                <tr key={i} className="border-b border-[#161b22] hover:bg-[#161b22]/50 transition-colors">
                  <td className="px-3 py-2.5">
                    <code className="bg-[#161b22] text-[#f97583] px-1.5 py-0.5 rounded text-[0.75rem] font-mono border border-[#21262d]">{e.code}</code>
                  </td>
                  <td className={`px-3 py-2.5 font-mono text-sm font-semibold ${statusColor(e.status)}`}>{e.status}</td>
                  <td className="px-3 py-2.5 text-[#8b949e] text-sm">{e.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>
    </div>
  );
}
