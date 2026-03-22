import { MethodBadge } from "@/components/ui/MethodBadge";
import { CodeBlock } from "./CodeBlock";
import { ApiTabs } from "./ApiTabs";
import { EndpointTable } from "./EndpointTable";
import { DocSection } from "./DocSection";
import type { ApiEndpoint } from "@/types";

export function EndpointPage({ endpoint: ep }: { endpoint: ApiEndpoint }) {
  if (!ep) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="dark:text-[#8b949e] text-gray-500 text-sm">This page is not yet available.</p>
      </div>
    );
  }
  return (
    <div>
      {/* Title block */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <MethodBadge method={ep.method} size="lg" />
          <code className="dark:bg-[#161b22] bg-gray-100 border dark:border-[#21262d] border-gray-200 dark:text-[#8b949e] text-gray-500 px-3 py-1.5 rounded-lg text-sm font-mono">
            {ep.endpoint}
          </code>
        </div>
        <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800 mb-2">{ep.title}</h1>
        <p className="dark:text-[#6a737d] text-gray-500">{ep.subtitle}</p>
      </div>

      {ep.description && (
        <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-8 text-[0.9rem]">{ep.description}</p>
      )}

      <div className="border-b dark:border-[#21262d] border-gray-200 mb-8" />

      {ep.params && ep.params.length > 0 && (
        <DocSection title="Request Body Parameters">
          <div className="border dark:border-[#21262d] border-gray-200 rounded-lg overflow-hidden">
            <EndpointTable params={ep.params} />
          </div>
        </DocSection>
      )}

      {ep.queryParams && ep.queryParams.length > 0 && (
        <DocSection title="Query Parameters">
          <div className="border dark:border-[#21262d] border-gray-200 rounded-lg overflow-hidden">
            <EndpointTable params={ep.queryParams} />
          </div>
        </DocSection>
      )}

      <DocSection title="Code Examples">
        <ApiTabs examples={ep.codeExamples} />
      </DocSection>

      <DocSection title="Response">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-emerald-500 text-xs font-bold font-mono bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">200 Success</span>
            </div>
            <CodeBlock code={ep.successResponse} lang="json" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-500 text-xs font-bold font-mono bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-full">4xx Error</span>
            </div>
            <CodeBlock code={ep.errorResponse} lang="json" />
          </div>
        </div>
      </DocSection>
    </div>
  );
}
