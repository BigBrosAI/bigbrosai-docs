import type { ApiEndpoint } from "@/types";

export const EMAIL_ENDPOINTS: Record<string, ApiEndpoint> = {

  // ─── Public: Send Email ──────────────────────────────────────────────────────

  "email-send": {
    id: "email-send",
    title: "Send Email",
    method: "POST",
    endpoint: "/api/v1/email/send",
    subtitle: "Send a transactional email using your project API key",
    description:
      "Public endpoint — authenticated via API key only. Pass your project API key in the `bigbrosai-api-key` header. The `from` domain must be verified in your project before sending. Rate limit: 10 requests/second per project.",
    params: [
      { field: "from",                       type: 'string | { email: string, name?: string }', required: true,  description: "Sender address. Must be from a verified domain on your project.", example: "hello@yourdomain.com" },
      { field: "to",                         type: 'string | { email: string, name?: string } | array', required: true,  description: "Recipient(s). Can be a string, an address object, or an array of either.", example: "user@example.com" },
      { field: "cc",                         type: 'string | { email: string, name?: string } | array', required: false, description: "CC recipients. Same format as `to`.", example: "cc@example.com" },
      { field: "bcc",                        type: 'string | { email: string, name?: string } | array', required: false, description: "BCC recipients. Same format as `to`.", example: "bcc@example.com" },
      { field: "subject",                    type: "string",       required: false, description: "Email subject line.", example: "Welcome to BigBros AI" },
      { field: "body_html",                  type: "string",       required: false, description: "HTML body content.", example: "<h1>Hello!</h1>" },
      { field: "body_text",                  type: "string",       required: false, description: "Plain text body (fallback for clients that don't render HTML).", example: "Hello!" },
      { field: "attachments",                type: "Attachment[]", required: false, description: "Array of file attachments.", example: "see fields below" },
      { field: "attachments[].content",      type: "string (base64)", required: true,  description: "Base64-encoded file content.", example: "JVBERi0x..." },
      { field: "attachments[].name",         type: "string",       required: false, description: "File name.", example: "invoice.pdf" },
      { field: "attachments[].content_type", type: "string",       required: false, description: "MIME type of the attachment.", example: "application/pdf" },
      { field: "idempotencyKey",             type: "string",       required: false, description: "Unique key to prevent duplicate sends on retry.", example: "order-confirm-abc123" },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/email/send \\
  -H "bigbrosai-api-key: live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "hello@yourdomain.com",
    "to": "user@example.com",
    "subject": "Welcome to BigBros AI",
    "body_html": "<h1>Hello!</h1><p>Thanks for signing up.</p>"
  }'`,
      nodejs: `const res = await fetch('https://api.bigbrosai.com/api/v1/email/send', {
  method: 'POST',
  headers: {
    'bigbrosai-api-key': 'live_YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'hello@yourdomain.com',
    to: 'user@example.com',
    subject: 'Welcome to BigBros AI',
    body_html: '<h1>Hello!</h1><p>Thanks for signing up.</p>',
  }),
});
const data = await res.json();`,
      python: `import requests

res = requests.post(
    "https://api.bigbrosai.com/api/v1/email/send",
    headers={"bigbrosai-api-key": "live_YOUR_API_KEY"},
    json={
        "from": "hello@yourdomain.com",
        "to": "user@example.com",
        "subject": "Welcome to BigBros AI",
        "body_html": "<h1>Hello!</h1><p>Thanks for signing up.</p>",
    },
)
print(res.json())`,
      go: `package main

import (
  "bytes"
  "encoding/json"
  "net/http"
)

func main() {
  body, _ := json.Marshal(map[string]string{
    "from":      "hello@yourdomain.com",
    "to":        "user@example.com",
    "subject":   "Welcome to BigBros AI",
    "body_html": "<h1>Hello!</h1>",
  })
  req, _ := http.NewRequest("POST", "https://api.bigbrosai.com/api/v1/email/send", bytes.NewBuffer(body))
  req.Header.Set("bigbrosai-api-key", "live_YOUR_API_KEY")
  req.Header.Set("Content-Type", "application/json")
  (&http.Client{}).Do(req)
}`,
    },
    successResponse: `{
  "data": {
    "id": 19,
    "message_id": "22ef6d06-bd67-420a-94d5-d02d0cb091c0"
  },
  "message": "Email queued successfully"
}`,
    errorResponse: `{
  "success": false,
  "message": "Request failed",
  "error": ["API key is required in bigbrosai-api-key header"],
  "timestamp": "2026-03-22T10:00:00.000Z",
  "path": "/api/v1/email/send"
}`,
  },

  // ─── Domain Management ───────────────────────────────────────────────────────

  "email-domain-add": {
    id: "email-domain-add",
    title: "Add Domain",
    method: "POST",
    endpoint: "/api/v1/email/domains/add",
    subtitle: "Register a sending domain and get DNS records to configure",
    description:
      "Registers a domain for email sending. Returns DKIM, SPF, and DMARC DNS records that you must add to your DNS provider. The domain must be verified before you can send from it. Requires dashboard authentication.",
    params: [
      { field: "domain",    type: "string", required: true,  description: "Domain name to add.",  example: "yourdomain.com" },
      { field: "projectId", type: "string", required: true,  description: "Project ID.",           example: "6789abc123"     },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/email/domains/add \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "x-org-id: YOUR_ORG_ID" \\
  -H "Content-Type: application/json" \\
  -d '{ "domain": "yourdomain.com", "projectId": "6789abc123" }'`,
      nodejs: `const res = await fetch('https://api.bigbrosai.com/api/v1/email/domains/add', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'x-org-id': 'YOUR_ORG_ID',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ domain: 'yourdomain.com', projectId: '6789abc123' }),
});`,
      python: `res = requests.post(
    "https://api.bigbrosai.com/api/v1/email/domains/add",
    headers={"Authorization": "Bearer YOUR_JWT_TOKEN", "x-org-id": "YOUR_ORG_ID"},
    json={"domain": "yourdomain.com", "projectId": "6789abc123"},
)`,
    },
    successResponse: `{
  "data": {
    "domain": "yourdomain.com",
    "isVerified": false,
    "records": {
      "dkim":  { "host": "relay._domainkey.yourdomain.com", "value": "v=DKIM1; k=rsa; p=...", "type": "TXT", "status": "PENDING" },
      "spf":   { "host": "yourdomain.com", "value": "v=spf1 include:relay.bigbrosai.com ~all", "type": "TXT", "status": "PENDING" },
      "dmarc": { "host": "_dmarc.yourdomain.com", "value": "v=DMARC1; p=none;", "type": "TXT", "status": "PENDING" }
    }
  },
  "message": "Domain added. Add the DNS records to your provider."
}`,
    errorResponse: `{
  "success": false,
  "message": "Request failed",
  "error": ["Domain already exists"],
  "timestamp": "2026-03-22T10:00:00.000Z",
  "path": "/api/v1/email/domains/add"
}`,
  },

  "email-domain-verify": {
    id: "email-domain-verify",
    title: "Verify Domain",
    method: "POST",
    endpoint: "/api/v1/email/domains/verify",
    subtitle: "Check DNS records and verify your sending domain",
    description:
      "Checks DKIM, SPF, and DMARC via live DNS lookups. Updates each record status (VERIFIED / FAILED) and the overall isVerified flag. Call this after adding DNS records to your provider.",
    params: [
      { field: "domain", type: "string", required: true, description: "Domain name to verify.", example: "yourdomain.com" },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/email/domains/verify \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "x-org-id: YOUR_ORG_ID" \\
  -H "Content-Type: application/json" \\
  -d '{ "domain": "yourdomain.com" }'`,
      nodejs: `const res = await fetch('https://api.bigbrosai.com/api/v1/email/domains/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'x-org-id': 'YOUR_ORG_ID',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ domain: 'yourdomain.com' }),
});`,
      python: `res = requests.post(
    "https://api.bigbrosai.com/api/v1/email/domains/verify",
    headers={"Authorization": "Bearer YOUR_JWT_TOKEN", "x-org-id": "YOUR_ORG_ID"},
    json={"domain": "yourdomain.com"},
)`,
    },
    successResponse: `{
  "data": {
    "domain": "yourdomain.com",
    "isVerified": true,
    "verifiedCount": 3,
    "dkim":  { "status": "VERIFIED" },
    "spf":   { "status": "VERIFIED" },
    "dmarc": { "status": "VERIFIED" },
    "lastCheckedAt": "2026-03-22T10:00:00Z"
  },
  "message": "Domain verification completed"
}`,
    errorResponse: `{
  "success": false,
  "message": "Request failed",
  "error": ["Domain not found"],
  "timestamp": "2026-03-22T10:00:00.000Z",
  "path": "/api/v1/email/domains/verify"
}`,
  },

  "email-domain-list": {
    id: "email-domain-list",
    title: "List Domains",
    method: "POST",
    endpoint: "/api/v1/email/domains",
    subtitle: "Get all email sending domains for your project",
    description:
      "Returns all domains registered for email sending. Pass projectId to filter by a specific project.",
    params: [
      { field: "projectId", type: "string", required: false, description: "Filter by project ID.", example: "6789abc123" },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/email/domains \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "x-org-id: YOUR_ORG_ID" \\
  -H "Content-Type: application/json" \\
  -d '{ "projectId": "6789abc123" }'`,
      nodejs: `const res = await fetch('https://api.bigbrosai.com/api/v1/email/domains', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'x-org-id': 'YOUR_ORG_ID',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ projectId: '6789abc123' }),
});`,
      python: `res = requests.post(
    "https://api.bigbrosai.com/api/v1/email/domains",
    headers={"Authorization": "Bearer YOUR_JWT_TOKEN", "x-org-id": "YOUR_ORG_ID"},
    json={"projectId": "6789abc123"},
)`,
    },
    successResponse: `{
  "data": [
    {
      "domain": "yourdomain.com",
      "isVerified": true,
      "dkim": { "status": "VERIFIED" },
      "spf":  { "status": "VERIFIED" },
      "dmarc": { "status": "VERIFIED" }
    }
  ]
}`,
    errorResponse: `{
  "success": false,
  "message": "Request failed",
  "error": ["Unauthorized"],
  "timestamp": "2026-03-22T10:00:00.000Z",
  "path": "/api/v1/email/domains"
}`,
  },

  // ─── Sends ───────────────────────────────────────────────────────────────────

  "email-sends": {
    id: "email-sends",
    title: "List Sends",
    method: "GET",
    endpoint: "/api/v1/email/sends",
    subtitle: "Retrieve a list of sent emails with filtering and pagination",
    description:
      "Returns a list of sent emails for your project. Supports pagination, status filtering, and address search.",
    queryParams: [
      { field: "projectId",   type: "string",  required: true,  description: "Project ID.",                                                                example: "6789abc123" },
      { field: "limit",       type: "integer", required: false, description: "Max results to return (default: 50).",                                       example: "50"         },
      { field: "before_id",   type: "integer", required: false, description: "Pagination: ID of last send in current page.",                               example: "98765"      },
      { field: "status",      type: "string",  required: false, description: "Filter by status: queued | processing | accepted | bounced | complained.",   example: "accepted"   },
      { field: "from_search", type: "string",  required: false, description: "Search by from address.",                                                   example: "hello@"     },
      { field: "to_search",   type: "string",  required: false, description: "Search by to address.",                                                     example: "user@"      },
    ],
    codeExamples: {
      curl: `curl -G "https://api.bigbrosai.com/api/v1/email/sends" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "x-org-id: YOUR_ORG_ID" \\
  --data-urlencode "projectId=6789abc123" \\
  --data-urlencode "status=accepted" \\
  --data-urlencode "limit=50"`,
      nodejs: `const params = new URLSearchParams({ projectId: '6789abc123', status: 'accepted', limit: '50' });
const res = await fetch(\`https://api.bigbrosai.com/api/v1/email/sends?\${params}\`, {
  headers: { 'Authorization': 'Bearer YOUR_JWT_TOKEN', 'x-org-id': 'YOUR_ORG_ID' },
});`,
      python: `res = requests.get(
    "https://api.bigbrosai.com/api/v1/email/sends",
    headers={"Authorization": "Bearer YOUR_JWT_TOKEN", "x-org-id": "YOUR_ORG_ID"},
    params={"projectId": "6789abc123", "status": "accepted", "limit": 50},
)`,
    },
    successResponse: `{
  "data": [
    {
      "id": 98765,
      "from_address": "hello@yourdomain.com",
      "subject": "Welcome to BigBros AI",
      "status": "accepted",
      "recipients": [{ "address": "user@example.com", "type": "to", "status": "accepted" }],
      "created_at": 1711094400
    }
  ]
}`,
    errorResponse: `{
  "success": false,
  "message": "Request failed",
  "error": ["Unauthorized"],
  "timestamp": "2026-03-22T10:00:00.000Z",
  "path": "/api/v1/email/sends"
}`,
  },

  "email-sends-get": {
    id: "email-sends-get",
    title: "Get Send",
    method: "GET",
    endpoint: "/api/v1/email/sends/:id",
    subtitle: "Retrieve full details of a single sent email by ID",
    description:
      "Returns full send details including recipients, delivery status, body preview, and feedback for a specific send ID.",
    queryParams: [
      { field: "id", type: "integer", required: true, description: "Send ID (numeric, in the URL path).", example: "98765" },
    ],
    codeExamples: {
      curl: `curl "https://api.bigbrosai.com/api/v1/email/sends/98765" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "x-org-id: YOUR_ORG_ID"`,
      nodejs: `const res = await fetch('https://api.bigbrosai.com/api/v1/email/sends/98765', {
  headers: { 'Authorization': 'Bearer YOUR_JWT_TOKEN', 'x-org-id': 'YOUR_ORG_ID' },
});`,
      python: `res = requests.get(
    "https://api.bigbrosai.com/api/v1/email/sends/98765",
    headers={"Authorization": "Bearer YOUR_JWT_TOKEN", "x-org-id": "YOUR_ORG_ID"},
)`,
    },
    successResponse: `{
  "data": {
    "id": 98765,
    "uuid": "abc-123-def",
    "from_address": "hello@yourdomain.com",
    "subject": "Welcome to BigBros AI",
    "size_bytes": 2048,
    "created_at": 1711094400,
    "send_after": 1711094400,
    "queued": false,
    "recipients": [
      { "id": 1, "address": "user@example.com", "type": "to", "status": "accepted", "try_count": 1 }
    ],
    "body_html": "<h1>Hello!</h1>",
    "body_text": "Hello!",
    "feedback": []
  }
}`,
    errorResponse: `{
  "success": false,
  "message": "Request failed",
  "error": ["Send not found"],
  "timestamp": "2026-03-22T10:00:00.000Z",
  "path": "/api/v1/email/sends/98765"
}`,
  },

  // ─── IP Allowlist ────────────────────────────────────────────────────────────

  "email-ip-allowlist": {
    id: "email-ip-allowlist",
    title: "IP Allowlist",
    method: "POST",
    endpoint: "/api/v1/email/ip-allowlist",
    subtitle: "Restrict email sending to specific IP addresses",
    description:
      "Sets the IP allowlist for a project. When enabled, only requests from the listed IPs can call the send email API.",
    params: [
      { field: "projectId",  type: "string",   required: true,  description: "Project ID.",                                       example: "6789abc123"      },
      { field: "allowedIps", type: "string[]", required: true,  description: "List of allowed IP addresses or CIDR ranges.",      example: '["203.0.113.5"]' },
      { field: "enabled",    type: "boolean",  required: false, description: "Enable or disable IP restriction (default: true).", example: "true"            },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/email/ip-allowlist \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "x-org-id: YOUR_ORG_ID" \\
  -H "Content-Type: application/json" \\
  -d '{
    "projectId": "6789abc123",
    "allowedIps": ["203.0.113.5", "198.51.100.0/24"],
    "enabled": true
  }'`,
      nodejs: `const res = await fetch('https://api.bigbrosai.com/api/v1/email/ip-allowlist', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'x-org-id': 'YOUR_ORG_ID',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    projectId: '6789abc123',
    allowedIps: ['203.0.113.5', '198.51.100.0/24'],
    enabled: true,
  }),
});`,
      python: `res = requests.post(
    "https://api.bigbrosai.com/api/v1/email/ip-allowlist",
    headers={"Authorization": "Bearer YOUR_JWT_TOKEN", "x-org-id": "YOUR_ORG_ID"},
    json={"projectId": "6789abc123", "allowedIps": ["203.0.113.5"], "enabled": True},
)`,
    },
    successResponse: `{
  "data": {
    "projectId": "6789abc123",
    "allowedIps": ["203.0.113.5", "198.51.100.0/24"],
    "enabled": true
  },
  "message": "IP allowlist updated"
}`,
    errorResponse: `{
  "success": false,
  "message": "Request failed",
  "error": ["Unauthorized"],
  "timestamp": "2026-03-22T10:00:00.000Z",
  "path": "/api/v1/email/ip-allowlist"
}`,
  },

  // ─── Webhook Config ──────────────────────────────────────────────────────────

  "email-webhook-config": {
    id: "email-webhook-config",
    title: "Webhook Config",
    method: "POST",
    endpoint: "/api/v1/email/webhook/config",
    subtitle: "Configure a webhook endpoint to receive email delivery events",
    description:
      "Registers your callback URL to receive email events (delivered, bounced, complained, deferred). A signing secret is returned — store it securely. Use it to verify incoming webhook payloads via HMAC-SHA256 on the X-Bigbrosai-Signature header.",
    params: [
      { field: "projectId",   type: "string",   required: true,  description: "Project ID.",                                                    example: "6789abc123"                        },
      { field: "domain",      type: "string",   required: true,  description: "Domain to scope this webhook to.",                               example: "yourdomain.com"                    },
      { field: "callbackUrl", type: "string",   required: true,  description: "Your HTTPS endpoint that will receive events.",                  example: "https://yourapp.com/webhooks/email" },
      { field: "events",      type: "string[]", required: false, description: "Events to subscribe to (default: all). Valid values: send.recipient.accepted, send.recipient.bounced, send.recipient.complained, send.recipient.deferred, send.recipient.failed, send.recipient.suppressed.", example: '["send.recipient.accepted","send.recipient.bounced"]' },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/email/webhook/config \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "x-org-id: YOUR_ORG_ID" \\
  -H "Content-Type: application/json" \\
  -d '{
    "projectId": "6789abc123",
    "domain": "yourdomain.com",
    "callbackUrl": "https://yourapp.com/webhooks/email",
    "events": ["send.recipient.accepted", "send.recipient.bounced", "send.recipient.complained", "send.recipient.deferred", "send.recipient.failed", "send.recipient.suppressed"]
  }'`,
      nodejs: `const res = await fetch('https://api.bigbrosai.com/api/v1/email/webhook/config', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'x-org-id': 'YOUR_ORG_ID',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    projectId: '6789abc123',
    domain: 'yourdomain.com',
    callbackUrl: 'https://yourapp.com/webhooks/email',
    events: ['send.recipient.accepted', 'send.recipient.bounced', 'send.recipient.complained', 'send.recipient.deferred', 'send.recipient.failed', 'send.recipient.suppressed'],
  }),
});`,
      python: `res = requests.post(
    "https://api.bigbrosai.com/api/v1/email/webhook/config",
    headers={"Authorization": "Bearer YOUR_JWT_TOKEN", "x-org-id": "YOUR_ORG_ID"},
    json={
        "projectId": "6789abc123",
        "domain": "yourdomain.com",
        "callbackUrl": "https://yourapp.com/webhooks/email",
        "events": ["send.recipient.accepted", "send.recipient.bounced"],
    },
)`,
    },
    successResponse: `{
  "data": {
    "domain": "yourdomain.com",
    "callbackUrl": "https://yourapp.com/webhooks/email",
    "secret": "whsec_abc123xyz...",
    "events": ["send.recipient.accepted", "send.recipient.bounced", "send.recipient.complained", "send.recipient.deferred", "send.recipient.failed", "send.recipient.suppressed"],
    "isActive": true
  },
  "message": "Webhook configured. Store the secret — it will not be shown again."
}`,
    errorResponse: `{
  "success": false,
  "message": "Request failed",
  "error": ["callbackUrl must be a URL address"],
  "timestamp": "2026-03-22T10:00:00.000Z",
  "path": "/api/v1/email/webhook/config"
}`,
  },

  // ─── Analytics ───────────────────────────────────────────────────────────────

  "email-analytics-stats": {
    id: "email-analytics-stats",
    title: "Analytics Stats",
    method: "GET",
    endpoint: "/api/v1/email/analytics/stats",
    subtitle: "Get email send stats — sends, bounce rate, complaint rate",
    description: "Returns aggregated stats for your project's email sends over a given period. Scoped to your org's verified domains.",
    queryParams: [
      { field: "projectId", type: "string", required: true,  description: "Project ID.",                                    example: "6789abc123" },
      { field: "period",    type: "string", required: false, description: "Time window: 24h | 7d | 30d (default: 30d).",    example: "7d"         },
    ],
    codeExamples: {
      curl: `curl "https://api.bigbrosai.com/api/v1/email/analytics/stats?projectId=6789abc123&period=7d" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "x-org-id: YOUR_ORG_ID"`,
      nodejs: `const res = await fetch('https://api.bigbrosai.com/api/v1/email/analytics/stats?projectId=6789abc123&period=7d', {
  headers: { 'Authorization': 'Bearer YOUR_JWT_TOKEN', 'x-org-id': 'YOUR_ORG_ID' },
});`,
      python: `res = requests.get(
    "https://api.bigbrosai.com/api/v1/email/analytics/stats",
    headers={"Authorization": "Bearer YOUR_JWT_TOKEN", "x-org-id": "YOUR_ORG_ID"},
    params={"projectId": "6789abc123", "period": "7d"},
)`,
    },
    successResponse: `{
  "data": {
    "sends": 142,
    "bounce_rate": 0.0211,
    "complaint_rate": 0.0014,
    "period": "7d"
  }
}`,
    errorResponse: `{
  "success": false,
  "message": "Request failed",
  "error": ["Unauthorized"],
  "timestamp": "2026-03-22T10:00:00.000Z",
  "path": "/api/v1/email/analytics/stats"
}`,
  },

  "email-analytics-chart": {
    id: "email-analytics-chart",
    title: "Analytics Chart",
    method: "GET",
    endpoint: "/api/v1/email/analytics/chart",
    subtitle: "Get daily bucketed send/bounce/complaint data for charting",
    description: "Returns daily aggregated data for your project's email sends. Useful for rendering time-series charts.",
    queryParams: [
      { field: "projectId", type: "string", required: true,  description: "Project ID.",                                    example: "6789abc123" },
      { field: "period",    type: "string", required: false, description: "Time window: 24h | 7d | 30d (default: 30d).",    example: "30d"        },
    ],
    codeExamples: {
      curl: `curl "https://api.bigbrosai.com/api/v1/email/analytics/chart?projectId=6789abc123&period=30d" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "x-org-id: YOUR_ORG_ID"`,
      nodejs: `const res = await fetch('https://api.bigbrosai.com/api/v1/email/analytics/chart?projectId=6789abc123&period=30d', {
  headers: { 'Authorization': 'Bearer YOUR_JWT_TOKEN', 'x-org-id': 'YOUR_ORG_ID' },
});`,
      python: `res = requests.get(
    "https://api.bigbrosai.com/api/v1/email/analytics/chart",
    headers={"Authorization": "Bearer YOUR_JWT_TOKEN", "x-org-id": "YOUR_ORG_ID"},
    params={"projectId": "6789abc123", "period": "30d"},
)`,
    },
    successResponse: `{
  "data": [
    { "date": "2026-03-01", "sends": 18, "bounced": 1, "complained": 0 },
    { "date": "2026-03-02", "sends": 24, "bounced": 0, "complained": 0 },
    { "date": "2026-03-03", "sends": 31, "bounced": 2, "complained": 1 }
  ]
}`,
    errorResponse: `{
  "success": false,
  "message": "Request failed",
  "error": ["Unauthorized"],
  "timestamp": "2026-03-22T10:00:00.000Z",
  "path": "/api/v1/email/analytics/chart"
}`,
  },
};
