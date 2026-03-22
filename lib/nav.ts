import type { NavSection } from "@/types";

export const NAV_STRUCTURE: NavSection[] = [
  {
    section: "Overview",
    items: [
      { id: "introduction",    label: "Introduction",    href: "/docs",                 icon: "BookOpen"    },
      { id: "getting-started", label: "Getting Started", href: "/docs/getting-started", icon: "Rocket"      },
      { id: "authentication",  label: "Authentication",  href: "/docs/authentication",  icon: "KeyRound"    },
      { id: "rate-limits",     label: "Rate Limits",     href: "/docs/rate-limits",     icon: "Gauge"       },
      { id: "errors",          label: "Error Codes",     href: "/docs/errors",          icon: "AlertCircle" },
    ],
  },
  {
    section: "WhatsApp API",
    items: [
      { id: "wa-api-campaign", label: "API Campaign", href: "/docs/whatsapp/api-campaign", method: "POST", icon: "Megaphone" },
      { id: "wa-webhooks",     label: "Webhooks",     href: "/docs/whatsapp/webhooks",     icon: "Webhook" },
    ],
  },
  {
    section: "WhatsApp — Dashboard",
    items: [
      { id: "wa-templates",             label: "Templates",              href: "/docs/whatsapp/template-list",          icon: "LayoutTemplate" },
      { id: "wa-template-create",       label: "Create Template",        href: "/docs/whatsapp/template-create",        icon: "FilePlus"       },
      { id: "wa-template-send",         label: "Send Template",          href: "/docs/whatsapp/template-send",          icon: "Send"           },
      { id: "wa-profile",               label: "Business Profile",       href: "/docs/whatsapp/profile",                icon: "User"           },
      { id: "wa-profile-update",        label: "Update Profile",         href: "/docs/whatsapp/profile-update",         icon: "UserCog"        },
      { id: "wa-display-name-request",  label: "Display Name Request",   href: "/docs/whatsapp/display-name-request",   icon: "Pencil"         },
      { id: "wa-display-name-status",   label: "Display Name Status",    href: "/docs/whatsapp/display-name-status",    icon: "Clock"          },
      { id: "wa-business-verification", label: "Business Verification",  href: "/docs/whatsapp/business-verification",  icon: "BadgeCheck"     },
    ],
  },
  {
    section: "Email API",
    items: [
      { id: "email-send",     label: "Send Email", href: "/docs/email/send",     method: "POST", icon: "Mail"    },
      { id: "email-webhooks", label: "Webhooks",   href: "/docs/email/webhooks", icon: "Webhook" },
    ],
  },
  {
    section: "Email — Dashboard",
    items: [
      { id: "email-domain-add",     label: "Add Domain",     href: "/docs/email/domain-add",     icon: "Globe"       },
      { id: "email-domain-verify",  label: "Verify Domain",  href: "/docs/email/domain-verify",  icon: "ShieldCheck" },
      { id: "email-domain-list",    label: "Domains",        href: "/docs/email/domain-list",    icon: "List"        },
      { id: "email-sends",          label: "Send History",   href: "/docs/email/sends",          icon: "Inbox"       },
      { id: "email-sends-get",      label: "Send Detail",    href: "/docs/email/sends-get",      icon: "FileText"    },
      { id: "email-ip-allowlist",   label: "IP Allowlist",   href: "/docs/email/ip-allowlist",   icon: "Shield"      },
      { id: "email-webhook-config", label: "Webhook Config", href: "/docs/email/webhook-config", icon: "Settings"    },
    ],
  },
  {
    section: "More",
    items: [
      { id: "changelog", label: "Changelog", href: "/docs/changelog", icon: "History", badge: "v1.4" },
    ],
  },
];

export const ALL_NAV_ITEMS = NAV_STRUCTURE.flatMap(s =>
  s.items.map(item => ({ ...item, section: s.section }))
);

export const METHOD_META: Record<string, { bg: string; text: string; border: string }> = {
  GET:    { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  POST:   { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/30"    },
  PUT:    { bg: "bg-orange-500/10",  text: "text-orange-400",  border: "border-orange-500/30"  },
  PATCH:  { bg: "bg-purple-500/10",  text: "text-purple-400",  border: "border-purple-500/30"  },
  DELETE: { bg: "bg-red-500/10",     text: "text-red-400",     border: "border-red-500/30"     },
};

export const CODE_TABS = ["curl", "nodejs", "python", "java", "php", "go"] as const;
export const CODE_TAB_LABELS: Record<string, string> = {
  curl: "cURL", nodejs: "Node.js", python: "Python", java: "Java", php: "PHP", go: "Go",
};
export const CODE_TAB_LANG: Record<string, string> = {
  curl: "bash", nodejs: "typescript", python: "python", java: "java", php: "php", go: "go",
};
