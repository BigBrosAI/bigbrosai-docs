// config/navigation.ts
import type { NavSection } from "@/types/docs";

export const NAV_STRUCTURE: NavSection[] = [
  {
    section: "Overview",
    items: [
      { id: "introduction",    label: "Introduction" },
      { id: "getting-started", label: "Getting Started", badge: "Start here" },
      { id: "authentication",  label: "Authentication" },
      { id: "rate-limits",     label: "Rate Limits" },
      { id: "errors",          label: "Error Codes" },
    ],
  },
  {
    section: "WhatsApp",
    items: [
      { id: "wa-api-campaign",           label: "Send Template Message",   method: "POST" },
      { id: "wa-template-create",        label: "Create Template",         method: "POST" },
      { id: "wa-template-list",          label: "List Templates",          method: "GET"  },
      { id: "wa-template-send",          label: "Send Template (JWT)",     method: "POST" },
      { id: "wa-profile",                label: "Get Business Profile",    method: "GET"  },
      { id: "wa-profile-update",         label: "Update Business Profile", method: "POST" },
      { id: "wa-business-verification",  label: "Business Verification",   method: "GET"  },
      { id: "wa-display-name-request",   label: "Display Name Request",    method: "POST" },
      { id: "wa-display-name-status",    label: "Display Name Status",     method: "GET"  },
      { id: "wa-webhooks",               label: "WhatsApp Webhooks",                      },
    ],
  },
  {
    section: "Email",
    items: [
      { id: "email-send",           label: "Send Email",        method: "POST" },
      { id: "email-domain-add",     label: "Add Domain",        method: "POST" },
      { id: "email-domain-verify",  label: "Verify Domain",     method: "POST" },
      { id: "email-domain-list",    label: "List Domains",      method: "POST" },
      { id: "email-sends",          label: "List Sends",        method: "GET"  },
      { id: "email-sends-get",      label: "Get Send",          method: "GET"  },
      { id: "email-ip-allowlist",   label: "IP Allowlist",      method: "POST" },
      { id: "email-webhook-config", label: "Webhook Config",    method: "POST" },
      { id: "email-analytics-stats",label: "Analytics Stats",   method: "GET"  },
      { id: "email-analytics-chart",label: "Analytics Chart",   method: "GET"  },
      { id: "email-webhooks",       label: "Email Webhooks",                   },
    ],
  },
  {
    section: "More",
    items: [
      { id: "changelog", label: "Changelog" },
    ],
  },
];

export const SECTION_ICONS: Record<string, string> = {
  Overview:  "BookOpen",
  WhatsApp:  "MessageSquare",
  Email:     "Mail",
  More:      "MoreHorizontal",
};
