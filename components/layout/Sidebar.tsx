"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen, Rocket, KeyRound, Gauge, AlertCircle,
  MessageSquare, LayoutTemplate, Paperclip, Send,
  Megaphone, CalendarClock, BarChart2,
  UserPlus, UserCog, User, Users,
  Workflow, Zap, TrendingUp, CheckCircle2, FileBarChart,
  Link as LinkIcon, RadioTower, Code2, Terminal, History,
  Mail, MailOpen, MessageCircle, MessagesSquare,
  Smartphone, Instagram, Shield, ShieldCheck, Globe, Webhook,
  List, Inbox, FileText, Settings,
  FilePlus, Pencil, Clock, BadgeCheck,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_STRUCTURE } from "@/lib/nav";
import { MethodBadge } from "@/components/ui/MethodBadge";
import type { NavItem, HttpMethod } from "@/types";

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  BookOpen, Rocket, KeyRound, Gauge, AlertCircle,
  MessageSquare, LayoutTemplate, Paperclip, Send,
  Megaphone, CalendarClock, BarChart2,
  UserPlus, UserCog, User, Users,
  Workflow, Zap, TrendingUp, CheckCircle2, FileBarChart,
  Link: LinkIcon, RadioTower, Code2, Terminal, History,
  Mail, MailOpen, MessageCircle, MessagesSquare,
  Smartphone, Instagram, Shield, ShieldCheck, Globe, Webhook,
  List, Inbox, FileText, Settings,
  FilePlus, Pencil, Clock, BadgeCheck,
};

function NavIcon({ name, size = 13 }: { name?: string; size?: number }) {
  if (!name) return null;
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} className="shrink-0 opacity-60" />;
}

function SidebarItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const isSoon = item.badge === "Soon";
  return (
    <Link href={isSoon ? "#" : item.href}
      className={cn(
        "group flex items-center gap-2 px-3 py-1.5 rounded-md text-[0.82rem] transition-all duration-100 border-l-2 ml-1 pl-3",
        isActive
          ? "bg-green-500/10 text-green-600 dark:text-[#22c55e] border-green-500"
          : "dark:text-[#8b949e] text-gray-500 border-transparent hover:dark:text-[#c9d1d9] hover:text-gray-800 hover:dark:bg-[#161b22] hover:bg-gray-50",
        isSoon && "opacity-60 cursor-default"
      )}>
      <NavIcon name={item.icon} size={13} />
      <span className="flex-1 truncate">{item.label}</span>
      {item.method && !isSoon && <MethodBadge method={item.method as HttpMethod} size="sm" />}
      {item.badge && (
        <span className={cn(
          "text-[0.6rem] font-semibold px-1.5 py-0.5 rounded-full border",
          item.badge === "Soon"
            ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
            : "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30"
        )}>{item.badge}</span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[240px] shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto dark:border-[#21262d] border-gray-200 border-r dark:bg-[#0d1117] bg-white py-6 pb-16 transition-colors">
      {NAV_STRUCTURE.map((section) => (
        <div key={section.section} className="mb-2">
          <p className="px-4 py-1 text-[0.65rem] font-semibold dark:text-[#6a737d] text-gray-400 uppercase tracking-[0.12em] mt-2">{section.section}</p>
          <div className="mt-0.5 space-y-0.5 px-2">
            {section.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/docs" && pathname.startsWith(item.href));
              return <SidebarItem key={item.id} item={item} isActive={isActive} />;
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}
