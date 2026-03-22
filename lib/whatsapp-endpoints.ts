import type { ApiEndpoint } from "@/types";

export const WHATSAPP_ENDPOINTS: Record<string, ApiEndpoint> = {
  "wa-api-campaign": {
    id: "wa-api-campaign",
    title: "API Campaign",
    method: "POST",
    endpoint: "/api/v1/campaign/api-campaign",
    subtitle: "Send a WhatsApp template message using your project API key",
    description:
      "Public endpoint — authenticated via API key only. Pass your project API key in the `bigbrosai-api-key` header. Use this for server-to-server integrations to send approved WhatsApp template messages to a single recipient.",
    params: [
      {
        field: "campaignName",
        type: "string",
        required: true,
        description: "A name for this campaign send (used for tracking).",
        example: "Order Confirmation",
      },
      {
        field: "destination",
        type: "string",
        required: true,
        description: "Recipient phone number with country code.",
        example: "+919876543210",
      },
      {
        field: "templateId",
        type: "string",
        required: false,
        description: "Template ID to use for this send.",
        example: "tmpl_01HXYZ",
      },
      {
        field: "campaignId",
        type: "string",
        required: false,
        description: "Campaign ID (alternative to `templateId` — looks up the template and project from the campaign).",
        example: "cmp_01HXYZ",
      },
      {
        field: "userName",
        type: "string",
        required: false,
        description: "Recipient name.",
        example: "Rahul Sharma",
      },
      {
        field: "templateParams",
        type: "string[]",
        required: false,
        description: "Template body variable values in order (maps to {{1}}, {{2}}, ...).",
        example: '["Rahul", "#12345"]',
      },
      {
        field: "mediaLink",
        type: "string",
        required: false,
        description: "Publicly accessible URL for the template header media (image, video, or document).",
        example: "https://cdn.example.com/invoice.pdf",
      },
      {
        field: "buttons",
        type: "object[]",
        required: false,
        description: "Button payload overrides for interactive templates.",
        example: "[]",
      },
      {
        field: "attributes",
        type: "object",
        required: false,
        description: "Custom key-value attributes attached to this send.",
        example: '{ "orderId": "ORD-001" }',
      },
      {
        field: "paramsFallbackValue",
        type: "object",
        required: false,
        description: "Fallback values for template parameters if `templateParams` is not provided.",
        example: '{ "1": "Customer" }',
      },
      {
        field: "media",
        type: "object",
        required: false,
        description: "Media object for the template header (alternative to `mediaLink`).",
        example: '{ "link": "https://cdn.example.com/img.jpg" }',
      },
      {
        field: "carousel",
        type: "object",
        required: false,
        description: "Carousel configuration for carousel template messages.",
        example: "{}",
      },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/campaign/api-campaign \\
  -H "bigbrosai-api-key: live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "campaignName": "Order Confirmation",
    "destination": "+919876543210",
    "templateId": "tmpl_01HXYZ",
    "templateParams": ["Rahul", "#12345"]
  }'`,
      nodejs: `const res = await fetch('https://api.bigbrosai.com/api/v1/campaign/api-campaign', {
  method: 'POST',
  headers: {
    'bigbrosai-api-key': 'live_YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    campaignName: 'Order Confirmation',
    destination: '+919876543210',
    templateId: 'tmpl_01HXYZ',
    templateParams: ['Rahul', '#12345'],
  }),
});
const data = await res.json();`,
      python: `import requests

res = requests.post(
    "https://api.bigbrosai.com/api/v1/campaign/api-campaign",
    headers={"bigbrosai-api-key": "live_YOUR_API_KEY"},
    json={
        "campaignName": "Order Confirmation",
        "destination": "+919876543210",
        "templateId": "tmpl_01HXYZ",
        "templateParams": ["Rahul", "#12345"],
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
  body, _ := json.Marshal(map[string]any{
    "campaignName":   "Order Confirmation",
    "destination":    "+919876543210",
    "templateId":     "tmpl_01HXYZ",
    "templateParams": []string{"Rahul", "#12345"},
  })
  req, _ := http.NewRequest("POST", "https://api.bigbrosai.com/api/v1/campaign/api-campaign", bytes.NewBuffer(body))
  req.Header.Set("bigbrosai-api-key", "live_YOUR_API_KEY")
  req.Header.Set("Content-Type", "application/json")
  (&http.Client{}).Do(req)
}`,
    },
    successResponse: `{
  "data": {
    "messaging_product": "whatsapp",
    "contacts": [{ "input": "+919876543210", "wa_id": "919876543210" }],
    "messages": [{ "id": "wamid.HBgM..." }]
  },
  "message": "Template message sent successfully to 919876543210 (ID: wamid.HBgM...)"
}`,
    errorResponse: `{
  "statusCode": 401,
  "message": "API key is required in bigbrosai-api-key header"
}`,
  },
};
