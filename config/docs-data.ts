// config/docs-data.ts
import type { DocPage } from "@/types/docs";

export const DOCS_DATA: Record<string, DocPage> = {
  /* ─────────────────────── OVERVIEW ─────────────────────── */
  introduction: {
    id: "introduction",
    title: "Introduction",
    subtitle: "Welcome to the BigBrosAI Developer Platform",
    content: "intro",
  },
  "getting-started": {
    id: "getting-started",
    title: "Getting Started",
    subtitle: "Go from zero to your first WhatsApp message in 5 minutes",
    content: "getting-started",
  },
  authentication: {
    id: "authentication",
    title: "Authentication",
    subtitle: "Secure every request with Bearer token authentication",
    content: "authentication",
  },
  "rate-limits": {
    id: "rate-limits",
    title: "Rate Limits",
    subtitle: "Understand usage quotas and how to handle 429 responses",
    content: "rate-limits",
  },
  errors: {
    id: "errors",
    title: "Error Codes",
    subtitle: "Comprehensive reference for all API error responses",
    content: "errors",
  },

  /* ──────────────────────── MESSAGING ───────────────────── */
  "send-message": {
    id: "send-message",
    title: "Send Message",
    subtitle: "Send a WhatsApp message to any contact instantly",
    method: "POST",
    endpoint: "/v1/messages/send",
    version: "v1",
    content: "send-message",
    params: [
      { field: "phone",       type: "string",  required: true,  description: "Recipient number in E.164 format",      example: "+919876543210" },
      { field: "message",     type: "string",  required: true,  description: "Text content (max 4096 characters)",     example: "Hello!" },
      { field: "template_id", type: "string",  required: false, description: "Pre-approved WhatsApp template ID",      example: "tmpl_abc123" },
      { field: "variables",   type: "object",  required: false, description: "Key-value pairs for template variables", example: '{"name":"Rahul"}' },
      { field: "schedule_at", type: "string",  required: false, description: "ISO 8601 datetime for scheduled send",   example: "2026-04-01T09:00:00Z" },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/messages/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phone": "+919876543210",
    "message": "Hello from BigBrosAI! 👋"
  }'`,
      nodejs: `import axios from 'axios';

const response = await axios.post(
  'https://api.bigbrosai.com/api/v1/messages/send',
  {
    phone: '+919876543210',
    message: 'Hello from BigBrosAI! 👋',
  },
  {
    headers: {
      Authorization: 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
    },
  }
);

console.log(response.data);
// { success: true, data: { message_id: 'msg_01H...', status: 'queued' } }`,
      python: `import requests

response = requests.post(
    "https://api.bigbrosai.com/api/v1/messages/send",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json",
    },
    json={
        "phone": "+919876543210",
        "message": "Hello from BigBrosAI! 👋",
    },
)

data = response.json()
print(data["data"]["message_id"])`,
      java: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

HttpClient client = HttpClient.newHttpClient();

String body = """
    {
        "phone": "+919876543210",
        "message": "Hello from BigBrosAI! 👋"
    }
    """;

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.bigbrosai.com/api/v1/messages/send"))
    .header("Authorization", "Bearer YOUR_API_KEY")
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(body))
    .build();

HttpResponse<String> resp = client.send(
    request, HttpResponse.BodyHandlers.ofString()
);
System.out.println(resp.body());`,
      php: `<?php

use GuzzleHttp\\Client;

$client = new Client();

$response = $client->post('https://api.bigbrosai.com/api/v1/messages/send', [
    'headers' => [
        'Authorization' => 'Bearer YOUR_API_KEY',
        'Content-Type'  => 'application/json',
    ],
    'json' => [
        'phone'   => '+919876543210',
        'message' => 'Hello from BigBrosAI! 👋',
    ],
]);

echo $response->getBody();`,
      go: `package main

import (
  "bytes"
  "encoding/json"
  "fmt"
  "net/http"
)

func main() {
  payload, _ := json.Marshal(map[string]string{
    "phone":   "+919876543210",
    "message": "Hello from BigBrosAI! 👋",
  })

  req, _ := http.NewRequest("POST",
    "https://api.bigbrosai.com/api/v1/messages/send",
    bytes.NewBuffer(payload))

  req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
  req.Header.Set("Content-Type", "application/json")

  resp, _ := (&http.Client{}).Do(req)
  defer resp.Body.Close()
  fmt.Println(resp.Status)
}`,
    },
    successResponse: `{
  "success": true,
  "data": {
    "message_id": "msg_01HXYZ9876ABCDEF",
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
    "message": "The phone number '+91987654' is not in valid E.164 format",
    "docs": "https://docs.bigbrosai.com/errors#INVALID_PHONE_NUMBER"
  }
}`,
  },

  /* ─────────────────────── CAMPAIGNS ────────────────────── */
  "create-campaign": {
    id: "create-campaign",
    title: "Create Campaign",
    subtitle: "Launch a broadcast campaign to multiple recipients",
    method: "POST",
    endpoint: "/v1/campaigns",
    version: "v1",
    content: "create-campaign",
    params: [
      { field: "name",        type: "string",   required: true,  description: "Human-readable campaign name",               example: "Q1 Launch" },
      { field: "template_id", type: "string",   required: true,  description: "Approved WhatsApp template identifier",       example: "tmpl_abc123" },
      { field: "audience",    type: "string[]", required: true,  description: "Array of phone numbers or contact IDs",       example: '["+919876543210"]' },
      { field: "schedule_at", type: "string",   required: false, description: "ISO 8601 datetime (omit for immediate send)", example: "2026-04-01T09:00:00Z" },
      { field: "tags",        type: "string[]", required: false, description: "Organisational labels for the campaign",      example: '["spring","promo"]' },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/campaigns \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Q1 Product Launch",
    "template_id": "tmpl_abc123",
    "audience": ["+919876543210", "+919812345678"],
    "schedule_at": "2026-04-01T09:00:00Z",
    "tags": ["q1", "product"]
  }'`,
      nodejs: `const response = await axios.post(
  'https://api.bigbrosai.com/api/v1/campaigns',
  {
    name: 'Q1 Product Launch',
    template_id: 'tmpl_abc123',
    audience: ['+919876543210', '+919812345678'],
    schedule_at: '2026-04-01T09:00:00Z',
    tags: ['q1', 'product'],
  },
  { headers: { Authorization: 'Bearer YOUR_API_KEY' } }
);`,
      python: `response = requests.post(
    "https://api.bigbrosai.com/api/v1/campaigns",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "name": "Q1 Product Launch",
        "template_id": "tmpl_abc123",
        "audience": ["+919876543210", "+919812345678"],
        "schedule_at": "2026-04-01T09:00:00Z",
    },
)`,
      go: `// See Node.js or cURL example for the full pattern`,
      java: `// See Node.js or cURL example for the full pattern`,
      php: `// See Node.js or cURL example for the full pattern`,
    },
    successResponse: `{
  "success": true,
  "data": {
    "campaign_id": "cmp_01HXYZ1234DEFGHI",
    "name": "Q1 Product Launch",
    "status": "scheduled",
    "recipient_count": 2,
    "scheduled_at": "2026-04-01T09:00:00Z",
    "created_at": "2026-03-09T10:30:00Z"
  }
}`,
    errorResponse: `{
  "success": false,
  "error": {
    "code": "TEMPLATE_NOT_APPROVED",
    "message": "Template 'tmpl_abc123' has not been approved by Meta",
    "docs": "https://docs.bigbrosai.com/errors#TEMPLATE_NOT_APPROVED"
  }
}`,
  },

  /* ─────────────────────── CONTACTS ─────────────────────── */
  "list-contacts": {
    id: "list-contacts",
    title: "List Contacts",
    subtitle: "Retrieve a paginated list of all contacts in your account",
    method: "GET",
    endpoint: "/v1/contacts",
    version: "v1",
    content: "list-contacts",
    params: [
      { field: "page",   type: "integer", required: false, description: "Page number, starting at 1 (default: 1)",    example: "1" },
      { field: "limit",  type: "integer", required: false, description: "Results per page, max 100 (default: 20)",     example: "20" },
      { field: "search", type: "string",  required: false, description: "Filter by name or phone number substring",    example: "Rahul" },
      { field: "tag",    type: "string",  required: false, description: "Filter contacts by a single tag",             example: "vip" },
    ],
    codeExamples: {
      curl: `curl -X GET "https://api.bigbrosai.com/api/v1/contacts?page=1&limit=20&tag=vip" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      nodejs: `const { data } = await axios.get(
  'https://api.bigbrosai.com/api/v1/contacts',
  {
    params: { page: 1, limit: 20, tag: 'vip' },
    headers: { Authorization: 'Bearer YOUR_API_KEY' },
  }
);`,
      python: `response = requests.get(
    "https://api.bigbrosai.com/api/v1/contacts",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    params={"page": 1, "limit": 20, "tag": "vip"},
)`,
      go: `req, _ := http.NewRequest("GET",
  "https://api.bigbrosai.com/api/v1/contacts?page=1&limit=20", nil)
req.Header.Set("Authorization", "Bearer YOUR_API_KEY")`,
      java: `// See cURL or Node.js examples`,
      php: `// See cURL or Node.js examples`,
    },
    successResponse: `{
  "success": true,
  "data": {
    "contacts": [
      {
        "id": "cnt_01HXYZABC",
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
      "pages": 73
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
};

export default DOCS_DATA;
