"use client";

import { cn } from "@/lib/utils";
import { METHOD_META } from "@/lib/nav";
import type { HttpMethod } from "@/types";

interface MethodBadgeProps {
  method: HttpMethod;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function MethodBadge({ method, size = "sm", className }: MethodBadgeProps) {
  const meta = METHOD_META[method] ?? METHOD_META.GET;

  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-[0.65rem]",
    md: "px-2 py-0.5 text-xs",
    lg: "px-2.5 py-1 text-xs",
  }[size];

  return (
    <span
      className={cn(
        "inline-block font-mono font-bold tracking-wide rounded border leading-none",
        meta.bg, meta.text, meta.border, sizeClasses, className
      )}
    >
      {method}
    </span>
  );
}
