import { cn } from "@/lib/utils";

interface DocSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function DocSection({ title, children, className }: DocSectionProps) {
  return (
    <div className={cn("mb-10", className)}>
      <h2 className="flex items-center gap-2 text-base font-semibold dark:text-[#e1e4e8] text-gray-800 mb-4 pb-2 border-b dark:border-[#21262d] border-gray-200">
        <span className="w-0.5 h-5 bg-green-500 rounded-full inline-block" />
        {title}
      </h2>
      {children}
    </div>
  );
}

interface DocCalloutProps {
  type?: "info" | "warning" | "danger" | "success";
  title?: string;
  children: React.ReactNode;
}

export function DocCallout({ type = "info", title, children }: DocCalloutProps) {
  const styles = {
    info:    { bg: "bg-blue-500/5",    border: "border-blue-500/20",   text: "text-blue-500",   icon: "ℹ" },
    warning: { bg: "bg-orange-500/5",  border: "border-orange-500/20", text: "text-orange-500", icon: "⚠" },
    danger:  { bg: "bg-red-500/5",     border: "border-red-500/20",    text: "text-red-500",    icon: "✕" },
    success: { bg: "bg-green-500/5",   border: "border-green-500/20",  text: "text-green-600",  icon: "✓" },
  }[type];

  return (
    <div className={cn("rounded-lg border p-4 my-4", styles.bg, styles.border)}>
      {title && (
        <p className={cn("font-semibold text-sm mb-1.5 flex items-center gap-2", styles.text)}>
          <span>{styles.icon}</span> {title}
        </p>
      )}
      <div className="dark:text-[#8b949e] text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
