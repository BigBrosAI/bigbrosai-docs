"use client";

import { useState } from "react";
import { Terminal, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";
import { CODE_TABS, CODE_TAB_LABELS, CODE_TAB_LANG } from "@/lib/nav";
import type { CodeLanguage } from "@/types";

interface ApiTabsProps {
  examples: Partial<Record<CodeLanguage, string>>;
  className?: string;
}

export function ApiTabs({ examples, className }: ApiTabsProps) {
  const available = CODE_TABS.filter((t) => examples[t]);
  const [active, setActive] = useState<CodeLanguage>(available[0] ?? "curl");

  if (available.length === 0) return null;

  const icons: Record<string, React.ReactNode> = {
    curl: <Terminal size={13} />, nodejs: <Code2 size={13} />,
    python: <Code2 size={13} />, java: <Code2 size={13} />,
    php: <Code2 size={13} />, go: <Code2 size={13} />,
  };

  return (
    <div className={cn("rounded-lg overflow-hidden border dark:border-[#21262d] border-gray-200", className)}>
      {/* Tab bar */}
      <div className="flex dark:bg-[#161b22] bg-gray-50 border-b dark:border-[#21262d] border-gray-200 overflow-x-auto">
        {available.map((tab) => (
          <button key={tab} onClick={() => setActive(tab)}
            className={cn("flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono whitespace-nowrap transition-all duration-150 border-b-2",
              active === tab
                ? "dark:bg-[#0d1117] bg-white dark:text-[#e1e4e8] text-gray-800 border-green-500"
                : "dark:text-[#8b949e] text-gray-500 border-transparent hover:dark:text-[#c9d1d9] hover:text-gray-700"
            )}>
            {icons[tab]} {CODE_TAB_LABELS[tab]}
          </button>
        ))}
      </div>
      <CodeBlock code={examples[active] ?? ""} lang={CODE_TAB_LANG[active]} className="rounded-none border-0" />
    </div>
  );
}
