import type { ApiEndpoint } from "@/types";
import { WHATSAPP_ENDPOINTS } from "./whatsapp-endpoints";
import { EMAIL_ENDPOINTS } from "./email-endpoints";

export const ENDPOINTS: Record<string, ApiEndpoint> = {
  ...WHATSAPP_ENDPOINTS,
  ...EMAIL_ENDPOINTS,
};

export const CHANGELOG = [
  {
    version: "v1.4.0",
    date: "March 2026",
    type: "minor" as const,
    changes: [
      { type: "new"      as const, text: "Bulk messaging endpoint with up to 1,000 recipients per request" },
      { type: "new"      as const, text: "Contact import via CSV — up to 50,000 rows in one upload"        },
      { type: "improved" as const, text: "Webhook delivery reliability improved to 99.97% SLA"             },
      { type: "improved" as const, text: "Campaign analytics now supports hourly breakdown dimension"       },
      { type: "fixed"    as const, text: "Fixed race condition in concurrent campaign scheduling"           },
    ],
  },
  {
    version: "v1.3.0",
    date: "January 2026",
    type: "minor" as const,
    changes: [
      { type: "new"      as const, text: "Contact tagging & segmentation API"                              },
      { type: "new"      as const, text: "Automation workflow trigger endpoint"                            },
      { type: "improved" as const, text: "Rate limit headers now include Retry-After for 429 responses"    },
      { type: "fixed"    as const, text: "Template variable substitution edge case with special characters" },
    ],
  },
  {
    version: "v1.2.0",
    date: "November 2025",
    type: "minor" as const,
    changes: [
      { type: "new"      as const, text: "Template message variables with dynamic substitution"            },
      { type: "new"      as const, text: "Delivery receipt and read webhooks"                              },
      { type: "new"      as const, text: "Official Python SDK (pip install bigbrosai)"                     },
    ],
  },
  {
    version: "v1.0.0",
    date: "September 2025",
    type: "major" as const,
    changes: [
      { type: "new" as const, text: "Initial public API release"              },
      { type: "new" as const, text: "Core messaging endpoints"                },
      { type: "new" as const, text: "Campaign management APIs"                },
      { type: "new" as const, text: "Node.js SDK (npm install bigbrosai)"     },
    ],
  },
];

export const WEBHOOK_EVENTS = [
  // ── WhatsApp (Meta) events ──────────────────────────────────────────────────
  { event: "messages",          description: "Inbound WhatsApp message received from a user.",                    color: "blue"   },
  { event: "statuses.sent",     description: "Message sent to WhatsApp servers.",                                 color: "blue"   },
  { event: "statuses.delivered",description: "Message delivered to the recipient's device.",                      color: "green"  },
  { event: "statuses.read",     description: "Recipient has read the message (blue ticks).",                      color: "green"  },
  { event: "statuses.failed",   description: "Message delivery failed permanently.",                              color: "red"    },
  // ── Email (Hyvor Relay) events ──────────────────────────────────────────────
  { event: "send.recipient.accepted",   description: "Email accepted by the recipient's mail server. Billing is charged at this point.", color: "green"  },
  { event: "send.recipient.deferred",   description: "Delivery temporarily deferred — will be retried.",          color: "orange" },
  { event: "send.recipient.bounced",    description: "Email hard-bounced — permanent delivery failure.",          color: "red"    },
  { event: "send.recipient.complained", description: "Recipient marked the email as spam.",                       color: "red"    },
  { event: "send.recipient.failed",     description: "Email failed to send (non-bounce error).",                  color: "red"    },
  { event: "send.recipient.suppressed", description: "Recipient is on the suppression list — email not sent.",    color: "yellow" },
];
