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
    section: "Messaging",
    items: [
      { id: "send-message",   label: "Send Message",    method: "POST" },
      { id: "send-template",  label: "Send Template",   method: "POST" },
      { id: "send-media",     label: "Send Media",      method: "POST" },
      { id: "bulk-messaging", label: "Bulk Messaging",  method: "POST" },
    ],
  },
  {
    section: "Campaigns",
    items: [
      { id: "create-campaign",   label: "Create Campaign",   method: "POST" },
      { id: "schedule-campaign", label: "Schedule Campaign",  method: "PUT" },
      { id: "campaign-status",   label: "Campaign Status",    method: "GET" },
    ],
  },
  {
    section: "Contacts",
    items: [
      { id: "create-contact", label: "Create Contact", method: "POST" },
      { id: "update-contact", label: "Update Contact", method: "PUT" },
      { id: "get-contact",    label: "Get Contact",    method: "GET" },
      { id: "list-contacts",  label: "List Contacts",  method: "GET" },
    ],
  },
  {
    section: "Automation",
    items: [
      { id: "create-automation", label: "Create Automation", method: "POST" },
      { id: "trigger-workflow",  label: "Trigger Workflow",  method: "POST" },
    ],
  },
  {
    section: "Analytics",
    items: [
      { id: "campaign-analytics", label: "Campaign Analytics", method: "GET" },
      { id: "message-status",     label: "Message Status",     method: "GET" },
      { id: "delivery-reports",   label: "Delivery Reports",   method: "GET" },
    ],
  },
  {
    section: "Webhooks",
    items: [
      { id: "webhook-setup",  label: "Webhook Setup" },
      { id: "webhook-events", label: "Webhook Events" },
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
  Overview:   "BookOpen",
  Messaging:  "MessageSquare",
  Campaigns:  "Megaphone",
  Contacts:   "Users",
  Automation: "Zap",
  Analytics:  "BarChart2",
  Webhooks:   "Webhook",
  More:       "MoreHorizontal",
};
