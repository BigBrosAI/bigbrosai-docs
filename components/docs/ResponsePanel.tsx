"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils";

interface Props {
  successResponse: string;
  errorResponse: string;
}

export function ResponsePanel({ successResponse, errorResponse }: Props) {
  const [tab, setTab] = useState<"success" | "error">("success");

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setTab("success")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.78rem] font-mono font-semibold border transition-all",
            tab === "success"
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              : "dark:bg-[#161b22] bg-gray-100 dark:text-[#8b949e] text-gray-500 dark:border-[#30363d] border-gray-200 hover:dark:text-[#c9d1d9] hover:text-gray-700"
          )}
        >
          <CheckCircle2 size={12} />
          200 Success
        </button>
        <button
          onClick={() => setTab("error")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[0.78rem] font-mono font-semibold border transition-all",
            tab === "error"
              ? "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/30"
              : "dark:bg-[#161b22] bg-gray-100 dark:text-[#8b949e] text-gray-500 dark:border-[#30363d] border-gray-200 hover:dark:text-[#c9d1d9] hover:text-gray-700"
          )}
        >
          <XCircle size={12} />
          4xx Error
        </button>
      </div>
      <CodeBlock
        code={tab === "success" ? successResponse : errorResponse}
        lang="json"
      />
    </div>
  );
}
