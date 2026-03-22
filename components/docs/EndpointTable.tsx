import { cn } from "@/lib/utils";
import type { ApiParameter } from "@/types";

export function EndpointTable({ params, title, className }: { params: ApiParameter[]; title?: string; className?: string }) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      {title && <p className="text-xs font-mono dark:text-[#6a737d] text-gray-400 uppercase tracking-widest mb-3">{title}</p>}
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b dark:border-[#21262d] border-gray-200">
            {["Field", "Type", "Required", "Description"].map(h => (
              <th key={h} className="px-3 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {params.map((p, i) => (
            <tr key={i} className="border-b dark:border-[#161b22] border-gray-100 dark:hover:bg-[#161b22]/50 hover:bg-gray-50 transition-colors">
              <td className="px-3 py-2.5 align-top">
                <code className="dark:bg-[#161b22] bg-gray-100 dark:text-[#79c0ff] text-blue-600 px-1.5 py-0.5 rounded text-[0.78rem] font-mono dark:border-[#21262d] border-gray-200 border">{p.field}</code>
              </td>
              <td className="px-3 py-2.5 align-top">
                <code className="dark:bg-[#1c2128] bg-purple-50 dark:text-[#d2a8ff] text-purple-600 px-1.5 py-0.5 rounded text-[0.78rem] font-mono dark:border-[#30363d] border-purple-200 border">{p.type}</code>
              </td>
              <td className="px-3 py-2.5 align-top">
                {p.required
                  ? <span className="text-red-500 text-[0.75rem] font-semibold">required</span>
                  : <span className="dark:text-[#6a737d] text-gray-400 text-[0.75rem]">optional</span>}
              </td>
              <td className="px-3 py-2.5 dark:text-[#8b949e] text-gray-600 text-[0.83rem] leading-relaxed align-top">
                {p.description}
                {p.example && <span className="block mt-0.5 dark:text-[#6a737d] text-gray-400 text-[0.75rem]">e.g. <code className="dark:text-[#8b949e] text-gray-500">{p.example}</code></span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
