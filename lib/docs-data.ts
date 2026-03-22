import type { ApiEndpoint } from "@/types";
import { WHATSAPP_ENDPOINTS } from "./whatsapp-endpoints";
import { EMAIL_ENDPOINTS } from "./email-endpoints";

export const ENDPOINTS: Record<string, ApiEndpoint> = {
  "send-message": {
    id: "send-message",
    title: "Send Message",
    method: "POST",
    endpoint: "/v1/messages/send",
    subtitle: "Send a WhatsApp message to any recipient instantly",
    description:
      "Send a WhatsApp message to a specific contact using BigBrosAI's global messaging infrastructure. Supports plain text, rich formatting, and optional scheduling. All messages are delivered via official WhatsApp Business API channels.",
    params: [
      { field: "phone",       type: "string",  required: true,  description: "Recipient phone in E.164 format",         example: "+919876543210"         },
      { field: "message",     type: "string",  required: true,  description: "Text message content (max 4096 chars)",    example: "Hello from BigBrosAI!" },
      { field: "template_id", type: "string",  required: false, description: "Pre-approved WhatsApp template ID",        example: "tmpl_welcome_01"       },
      { field: "variables",   type: "object",  required: false, description: "Key-value pairs for template substitution" },
      { field: "schedule_at", type: "string",  required: false, description: "ISO 8601 datetime for scheduled delivery", example: "2026-03-15T09:00:00Z"  },
      { field: "priority",    type: "string",  required: false, description: "Delivery priority: normal | high",         example: "normal"                },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/messages/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "+919876543210",
    "message": "Hello from BigBrosAI! 👋"
  }'`,
      nodejs: `import { BigBrosAI } from 'bigbrosai';

const client = new BigBrosAI({ apiKey: process.env.BIGBROSAI_API_KEY });

const message = await client.messages.send({
  phone: '+919876543210',
  message: 'Hello from BigBrosAI! 👋',
});

console.log(message.message_id); // msg_01HXYZ9876ABC`,
      python: `from bigbrosai import BigBrosAI

client = BigBrosAI(api_key=os.environ.get("BIGBROSAI_API_KEY"))

message = client.messages.send(
    phone="+919876543210",
    message="Hello from BigBrosAI! 👋",
)

print(message.message_id)  # msg_01HXYZ9876ABC`,
      java: `import com.bigbrosai.BigBrosAI;
import com.bigbrosai.models.Message;
import com.bigbrosai.params.MessageSendParams;

BigBrosAI client = new BigBrosAI(System.getenv("BIGBROSAI_API_KEY"));

MessageSendParams params = MessageSendParams.builder()
    .phone("+919876543210")
    .message("Hello from BigBrosAI! 👋")
    .build();

Message message = client.messages().send(params);
System.out.println(message.getMessageId());`,
      php: `<?php

use BigBrosAI\\Client;

$client = new Client(['api_key' => getenv('BIGBROSAI_API_KEY')]);

$message = $client->messages->send([
    'phone'   => '+919876543210',
    'message' => 'Hello from BigBrosAI! 👋',
]);

echo $message->message_id;`,
      go: `package main

import (
    "context"
    "fmt"
    "os"

    bigbrosai "github.com/bigbrosai/bigbrosai-go"
)

func main() {
    client := bigbrosai.NewClient(os.Getenv("BIGBROSAI_API_KEY"))

    message, err := client.Messages.Send(context.TODO(), bigbrosai.MessageSendParams{
        Phone:   "+919876543210",
        Message: "Hello from BigBrosAI! 👋",
    })
    if err != nil {
        panic(err)
    }
    fmt.Println(message.MessageID)
}`,
    },
    successResponse: `{
  "success": true,
  "data": {
    "message_id": "msg_01HXYZ9876ABC",
    "status": "queued",
    "phone": "+919876543210",
    "created_at": "2026-03-09T10:30:00Z",
    "estimated_delivery": "2026-03-09T10:30:05Z"
  }
}`,
    errorResponse: `{
  "success": false,
  "error": {
    "code": "INVALID_PHONE_NUMBER",
    "message": "The phone number '+91987654' is not a valid E.164 number",
    "docs": "https://docs.bigbrosai.com/errors#INVALID_PHONE_NUMBER"
  }
}`,
  },

  "create-campaign": {
    id: "create-campaign",
    title: "Create Campaign",
    method: "POST",
    endpoint: "/v1/campaigns",
    subtitle: "Create broadcast messaging campaigns at scale",
    description:
      "Create a new broadcast campaign to send a WhatsApp template message to multiple recipients simultaneously. Supports audience targeting, scheduling, and real-time delivery tracking.",
    params: [
      { field: "name",        type: "string",   required: true,  description: "Unique display name for the campaign",          example: "Q1 Product Launch"          },
      { field: "template_id", type: "string",   required: true,  description: "Approved WhatsApp Business template identifier", example: "tmpl_abc123"                },
      { field: "audience",    type: "string[]", required: true,  description: "Array of contact IDs or E.164 phone numbers"                                         },
      { field: "schedule_at", type: "string",   required: false, description: "ISO 8601 UTC datetime for scheduled broadcast",  example: "2026-03-15T09:00:00Z"       },
      { field: "tags",        type: "string[]", required: false, description: "Organizational labels for filtering"                                                  },
      { field: "variables",   type: "object",   required: false, description: "Default template variable values"                                                    },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/campaigns \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Q1 Product Launch",
    "template_id": "tmpl_abc123",
    "audience": ["+919876543210", "+919812345678"],
    "schedule_at": "2026-03-15T09:00:00Z",
    "tags": ["q1", "product-launch"]
  }'`,
      nodejs: `const campaign = await client.campaigns.create({
  name: 'Q1 Product Launch',
  templateId: 'tmpl_abc123',
  audience: ['+919876543210', '+919812345678'],
  scheduleAt: '2026-03-15T09:00:00Z',
  tags: ['q1', 'product-launch'],
});

console.log(campaign.campaign_id);`,
      python: `campaign = client.campaigns.create(
    name="Q1 Product Launch",
    template_id="tmpl_abc123",
    audience=["+919876543210", "+919812345678"],
    schedule_at="2026-03-15T09:00:00Z",
    tags=["q1", "product-launch"],
)`,
      go: `campaign, err := client.Campaigns.Create(ctx, bigbrosai.CampaignCreateParams{
    Name:       "Q1 Product Launch",
    TemplateID: "tmpl_abc123",
    Audience:   []string{"+919876543210", "+919812345678"},
    ScheduleAt: "2026-03-15T09:00:00Z",
})`,
    },
    successResponse: `{
  "success": true,
  "data": {
    "campaign_id": "cmp_01HXYZ1234DEF",
    "name": "Q1 Product Launch",
    "status": "scheduled",
    "recipient_count": 2,
    "scheduled_at": "2026-03-15T09:00:00Z",
    "created_at": "2026-03-09T10:30:00Z"
  }
}`,
    errorResponse: `{
  "success": false,
  "error": {
    "code": "TEMPLATE_NOT_FOUND",
    "message": "Template 'tmpl_abc123' was not found or has not been approved",
    "docs": "https://docs.bigbrosai.com/errors#TEMPLATE_NOT_FOUND"
  }
}`,
  },

  "list-contacts": {
    id: "list-contacts",
    title: "List Contacts",
    method: "GET",
    endpoint: "/v1/contacts",
    subtitle: "Retrieve a paginated list of all contacts",
    description:
      "Returns a paginated list of contacts in your account. Supports full-text search, tag filtering, and cursor-based pagination for large datasets.",
    queryParams: [
      { field: "page",   type: "integer", required: false, description: "Page number (default: 1)",               example: "1"    },
      { field: "limit",  type: "integer", required: false, description: "Results per page, max 100 (default: 20)", example: "20"   },
      { field: "search", type: "string",  required: false, description: "Search by name or phone number",          example: "Rahul" },
      { field: "tag",    type: "string",  required: false, description: "Filter contacts by tag label",            example: "vip"  },
      { field: "sort",   type: "string",  required: false, description: "Sort field: created_at | name | phone",   example: "created_at" },
    ],
    codeExamples: {
      curl: `curl -G "https://api.bigbrosai.com/api/v1/contacts" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  --data-urlencode "page=1" \\
  --data-urlencode "limit=20" \\
  --data-urlencode "tag=vip"`,
      nodejs: `const contacts = await client.contacts.list({
  page: 1,
  limit: 20,
  tag: 'vip',
});

for (const contact of contacts.data) {
  console.log(contact.phone, contact.name);
}`,
      python: `contacts = client.contacts.list(page=1, limit=20, tag="vip")

for contact in contacts.data:
    print(contact.phone, contact.name)`,
      go: `contacts, err := client.Contacts.List(ctx, bigbrosai.ContactListParams{
    Page:  1,
    Limit: 20,
    Tag:   "vip",
})`,
    },
    successResponse: `{
  "success": true,
  "data": {
    "contacts": [
      {
        "id": "cnt_01HXYZ",
        "name": "Rahul Sharma",
        "phone": "+919876543210",
        "tags": ["vip", "retail"],
        "opt_in": true,
        "created_at": "2026-01-15T08:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1450,
      "pages": 73,
      "next_cursor": "cur_abc123"
    }
  }
}`,
    errorResponse: `{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "The provided API key is invalid or has been revoked",
    "docs": "https://docs.bigbrosai.com/errors#UNAUTHORIZED"
  }
}`,
  },
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
  { event: "message.queued",    description: "Message accepted and queued for delivery",          color: "blue"   },
  { event: "message.delivered", description: "Message confirmed delivered to recipient's device", color: "green"  },
  { event: "message.read",      description: "Recipient has read the message (blue ticks)",       color: "blue"   },
  { event: "message.failed",    description: "Permanent delivery failure — no further retries",   color: "red"    },
  { event: "message.replied",   description: "Recipient replied to a message",                    color: "purple" },
  { event: "campaign.started",  description: "Campaign broadcast has started sending",            color: "orange" },
  { event: "campaign.completed","description": "All campaign messages have been processed",       color: "green"  },
  { event: "campaign.failed",   description: "Campaign encountered a fatal error",                color: "red"    },
  { event: "contact.opted_out", description: "Contact has opted out of messaging",                color: "yellow" },
];
