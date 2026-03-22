import type { ApiEndpoint, ChangelogEntry, WebhookEvent } from "@/types";

// ─── Endpoint Docs ────────────────────────────────────────────────────────────

export const ENDPOINT_DOCS: Record<string, ApiEndpoint> = {
  "send-message": {
    id: "send-message",
    title: "Send Message",
    subtitle: "Send a WhatsApp message to any contact instantly",
    method: "POST",
    endpoint: "/v1/messages/send",
    description:
      "Send a WhatsApp message to a specific contact using BigBrosAI's global delivery infrastructure. Supports plain text, rich formatting, and optional scheduling.",
    params: [
      { field: "phone",       type: "string",  required: true,  description: "Recipient phone number in E.164 format", example: "+919876543210" },
      { field: "message",     type: "string",  required: true,  description: "Text content of the message (max 4096 chars)", example: "Hello from BigBrosAI!" },
      { field: "template_id", type: "string",  required: false, description: "Pre-approved WhatsApp template identifier" },
      { field: "variables",   type: "object",  required: false, description: "Dynamic variables for template substitution" },
      { field: "schedule_at", type: "string",  required: false, description: "ISO 8601 datetime for scheduled delivery" },
      { field: "metadata",    type: "object",  required: false, description: "Arbitrary key-value pairs attached to the message" },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/messages/send \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "message": "Hello from BigBrosAI! 👋"
  }'`,
      nodejs: `const response = await fetch('https://api.bigbrosai.com/api/v1/messages/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + process.env.BIGBROSAI_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    phone: '+919876543210',
    message: 'Hello from BigBrosAI! 👋',
  })
});

const data = await response.json();
console.log(data.data.message_id); // msg_01HXYZ9876ABC`,
      python: `import requests
import os

url = "https://api.bigbrosai.com/api/v1/messages/send"
headers = {
    "Authorization": f"Bearer {os.environ.get('BIGBROSAI_API_KEY')}",
    "Content-Type": "application/json"
}
payload = {
    "phone": "+919876543210",
    "message": "Hello from BigBrosAI! 👋"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json()["data"]["message_id"])  # msg_01HXYZ9876ABC`,
      java: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        String json = "{\"phone\":\"+919876543210\",\"message\":\"Hello from BigBrosAI! 👋\"}";
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.bigbrosai.com/api/v1/messages/send"))
            .header("Authorization", "Bearer " + System.getenv("BIGBROSAI_API_KEY"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();
            
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      php: `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.bigbrosai.com/api/v1/messages/send",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode([
    'phone' => '+919876543210',
    'message' => 'Hello from BigBrosAI! 👋'
  ]),
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer " . getenv('BIGBROSAI_API_KEY'),
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`,
      go: `package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	url := "https://api.bigbrosai.com/api/v1/messages/send"
	payload := []byte(\`{"phone":"+919876543210","message":"Hello from BigBrosAI! 👋"}\`)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(payload))
	req.Header.Add("Authorization", "Bearer "+os.Getenv("BIGBROSAI_API_KEY"))
	req.Header.Add("Content-Type", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)
	fmt.Println(string(body))
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
    "message": "The phone number '+91987654' is not in valid E.164 format.",
    "field": "phone",
    "docs": "https://docs.bigbrosai.com/errors#INVALID_PHONE_NUMBER"
  }
}`,
  },

  "create-campaign": {
    id: "create-campaign",
    title: "Create Campaign",
    subtitle: "Create and launch broadcast messaging campaigns",
    method: "POST",
    endpoint: "/v1/campaigns",
    description:
      "Create a broadcast campaign to send a WhatsApp template message to multiple recipients simultaneously. Supports scheduling, audience segments, and real-time delivery tracking.",
    params: [
      { field: "name",        type: "string",   required: true,  description: "Unique campaign name for identification", example: "Q1 Product Launch" },
      { field: "template_id", type: "string",   required: true,  description: "Approved WhatsApp template ID to broadcast" },
      { field: "audience",    type: "string[]", required: true,  description: "Array of contact IDs or phone numbers" },
      { field: "schedule_at", type: "string",   required: false, description: "ISO 8601 scheduled send time (omit for immediate)" },
      { field: "tags",        type: "string[]", required: false, description: "Organizational tags for filtering and reporting" },
      { field: "test_mode",   type: "boolean",  required: false, description: "Run in dry-run mode without sending real messages", default: "false" },
    ],
    codeExamples: {
      curl: `curl -X POST https://api.bigbrosai.com/api/v1/campaigns \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Q1 Product Launch",
    "template_id": "tmpl_abc123",
    "audience": ["+919876543210", "+919812345678"],
    "schedule_at": "2026-03-15T09:00:00Z",
    "tags": ["product", "q1"]
  }'`,
      nodejs: `const response = await fetch('https://api.bigbrosai.com/api/v1/campaigns', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + process.env.BIGBROSAI_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Q1 Product Launch',
    template_id: 'tmpl_abc123',
    audience: ['+919876543210', '+919812345678'],
    schedule_at: '2026-03-15T09:00:00Z',
    tags: ['product', 'q1']
  })
});

const data = await response.json();
console.log(data.data.campaign_id);`,
      python: `import requests
import os

url = "https://api.bigbrosai.com/api/v1/campaigns"
headers = {
    "Authorization": f"Bearer {os.environ.get('BIGBROSAI_API_KEY')}",
    "Content-Type": "application/json"
}
payload = {
    "name": "Q1 Product Launch",
    "template_id": "tmpl_abc123",
    "audience": ["+919876543210", "+919812345678"],
    "schedule_at": "2026-03-15T09:00:00Z",
    "tags": ["product", "q1"]
}

response = requests.post(url, json=payload, headers=headers)
print(response.json()["data"]["campaign_id"])`,
      java: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        String json = "{\"name\":\"Q1 Product Launch\",\"template_id\":\"tmpl_abc123\",\"audience\":[\"+919876543210\",\"+919812345678\"],\"schedule_at\":\"2026-03-15T09:00:00Z\",\"tags\":[\"product\",\"q1\"]}";
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.bigbrosai.com/api/v1/campaigns"))
            .header("Authorization", "Bearer " + System.getenv("BIGBROSAI_API_KEY"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();
            
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      php: `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.bigbrosai.com/api/v1/campaigns",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode([
    'name' => 'Q1 Product Launch',
    'template_id' => 'tmpl_abc123',
    'audience' => ['+919876543210', '+919812345678'],
    'schedule_at' => '2026-03-15T09:00:00Z',
    'tags' => ['product', 'q1']
  ]),
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer " . getenv('BIGBROSAI_API_KEY'),
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`,
      go: `package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	url := "https://api.bigbrosai.com/api/v1/campaigns"
	payload := []byte(\`{"name":"Q1 Product Launch","template_id":"tmpl_abc123","audience":["+919876543210","+919812345678"],"schedule_at":"2026-03-15T09:00:00Z","tags":["product","q1"]}\`)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(payload))
	req.Header.Add("Authorization", "Bearer "+os.Getenv("BIGBROSAI_API_KEY"))
	req.Header.Add("Content-Type", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)
	fmt.Println(string(body))
}`,
    },
    successResponse: `{
  "success": true,
  "data": {
    "campaign_id": "cmp_01HXYZ1234DEF",
    "name": "Q1 Product Launch",
    "status": "scheduled",
    "recipient_count": 2,
    "template_id": "tmpl_abc123",
    "scheduled_at": "2026-03-15T09:00:00Z",
    "created_at": "2026-03-09T10:30:00Z"
  }
}`,
    errorResponse: `{
  "success": false,
  "error": {
    "code": "TEMPLATE_NOT_APPROVED",
    "message": "Template 'tmpl_abc123' has not been approved by WhatsApp yet.",
    "docs": "https://docs.bigbrosai.com/errors#TEMPLATE_NOT_APPROVED"
  }
}`,
  },

  "list-contacts": {
    id: "list-contacts",
    title: "List Contacts",
    subtitle: "Retrieve a paginated list of your contacts",
    method: "GET",
    endpoint: "/v1/contacts",
    description:
      "Returns a paginated list of all contacts in your account. Supports full-text search, tag filtering, and custom sort order.",
    params: [
      { field: "page",   type: "integer", required: false, description: "Page number (default: 1)", default: "1" },
      { field: "limit",  type: "integer", required: false, description: "Results per page, max 100", default: "20" },
      { field: "search", type: "string",  required: false, description: "Search by name or phone number" },
      { field: "tag",    type: "string",  required: false, description: "Filter by contact tag" },
      { field: "sort",   type: "string",  required: false, description: "Sort by: created_at, name, phone", default: "created_at" },
      { field: "order",  type: "string",  required: false, description: "asc or desc", default: "desc" },
    ],
    codeExamples: {
      curl: `curl -G https://api.bigbrosai.com/api/v1/contacts \
  -H "Authorization: Bearer YOUR_API_KEY" \
  --data-urlencode "page=1" \
  --data-urlencode "limit=20" \
  --data-urlencode "tag=vip" `,
      nodejs: `const response = await fetch('https://api.bigbrosai.com/api/v1/contacts?page=1&limit=20&tag=vip', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + process.env.BIGBROSAI_API_KEY
  }
});

const data = await response.json();
for (const contact of data.data.contacts) {
  console.log(contact.name, contact.phone);
}`,
      python: `import requests
import os

url = "https://api.bigbrosai.com/api/v1/contacts"
params = {"page": 1, "limit": 20, "tag": "vip"}
headers = {"Authorization": f"Bearer {os.environ.get('BIGBROSAI_API_KEY')}"}

response = requests.get(url, params=params, headers=headers)
data = response.json()

for contact in data["data"]["contacts"]:
    print(contact["name"], contact["phone"])`,
      java: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.bigbrosai.com/api/v1/contacts?page=1&limit=20&tag=vip"))
            .header("Authorization", "Bearer " + System.getenv("BIGBROSAI_API_KEY"))
            .GET()
            .build();
            
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
      php: `<?php

$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.bigbrosai.com/api/v1/contacts?page=1&limit=20&tag=vip",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => [
    "Authorization: Bearer " . getenv('BIGBROSAI_API_KEY')
  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}`,
      go: `package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	url := "https://api.bigbrosai.com/api/v1/contacts?page=1&limit=20&tag=vip"

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("Authorization", "Bearer "+os.Getenv("BIGBROSAI_API_KEY"))

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer res.Body.Close()

	body, _ := io.ReadAll(res.Body)
	fmt.Println(string(body))
}`,
    },
    successResponse: `{
  "success": true,
  "data": {
    "contacts": [
      {
        "id": "cnt_01HXYZ",
        "name": "Rahul Sharma",
        "phone": "+919876543210",
        "email": "rahul@example.com",
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
      "has_more": true
    }
  }
}`,
    errorResponse: `{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "The API key provided is invalid or has been revoked.",
    "docs": "https://docs.bigbrosai.com/errors#UNAUTHORIZED"
  }
}`,
  },
};

// ─── Webhook Events ───────────────────────────────────────────────────────────

export const WEBHOOK_EVENTS: WebhookEvent[] = [
  {
    event: "message.delivered",
    description: "Fired when a message is confirmed delivered to the recipient's device.",
    color: "#3FB950",
    payload: `{
  "event": "message.delivered",
  "timestamp": "2026-03-09T10:30:05Z",
  "data": {
    "message_id": "msg_01HXYZ9876ABC",
    "phone": "+919876543210",
    "delivered_at": "2026-03-09T10:30:04Z"
  },
  "signature": "sha256=abc123..."
}`,
  },
  {
    event: "message.read",
    description: "Fired when the recipient opens and reads the message.",
    color: "#58A6FF",
    payload: `{
  "event": "message.read",
  "timestamp": "2026-03-09T10:31:00Z",
  "data": {
    "message_id": "msg_01HXYZ9876ABC",
    "phone": "+919876543210",
    "read_at": "2026-03-09T10:30:58Z"
  },
  "signature": "sha256=def456..."
}`,
  },
  {
    event: "message.failed",
    description: "Fired when message delivery permanently fails after all retries.",
    color: "#F85149",
    payload: `{
  "event": "message.failed",
  "timestamp": "2026-03-09T10:35:00Z",
  "data": {
    "message_id": "msg_01HXYZ9876ABC",
    "phone": "+919876543210",
    "reason": "UNREGISTERED_PHONE",
    "failed_at": "2026-03-09T10:34:58Z"
  },
  "signature": "sha256=ghi789..."
}`,
  },
  {
    event: "campaign.started",
    description: "Fired when a campaign broadcast begins processing.",
    color: "#D2A8FF",
    payload: `{
  "event": "campaign.started",
  "timestamp": "2026-03-15T09:00:01Z",
  "data": {
    "campaign_id": "cmp_01HXYZ1234DEF",
    "name": "Q1 Product Launch",
    "recipient_count": 2,
    "started_at": "2026-03-15T09:00:01Z"
  },
  "signature": "sha256=jkl012..."
}`,
  },
  {
    event: "campaign.completed",
    description: "Fired when all campaign messages have been processed.",
    color: "#3FB950",
    payload: `{
  "event": "campaign.completed",
  "timestamp": "2026-03-15T09:02:34Z",
  "data": {
    "campaign_id": "cmp_01HXYZ1234DEF",
    "name": "Q1 Product Launch",
    "sent": 1998,
    "failed": 2,
    "completed_at": "2026-03-15T09:02:34Z"
  },
  "signature": "sha256=mno345..."
}`,
  },
];

// ─── Changelog ────────────────────────────────────────────────────────────────

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v1.4.0",
    date: "March 2026",
    type: "minor",
    changes: [
      { type: "feat",    text: "Added bulk messaging endpoint supporting up to 10,000 recipients per call" },
      { type: "feat",    text: "New campaign analytics API with per-message breakdown" },
      { type: "improve", text: "Improved webhook delivery reliability to 99.99% uptime SLA" },
      { type: "fix",     text: "Fixed race condition in campaign scheduler for simultaneous triggers" },
    ],
  },
  {
    version: "v1.3.0",
    date: "January 2026",
    type: "minor",
    changes: [
      { type: "feat",    text: "Contact tagging API with up to 50 tags per contact" },
      { type: "feat",    text: "Automation workflow triggers with conditional branching" },
      { type: "improve", text: "Rate limit headers now included on all responses" },
      { type: "fix",     text: "Fixed template variable validation edge cases" },
    ],
  },
  {
    version: "v1.2.0",
    date: "November 2025",
    type: "minor",
    changes: [
      { type: "feat",    text: "Template message variables with named and positional substitution" },
      { type: "feat",    text: "Delivery receipt webhooks for all message types" },
      { type: "feat",    text: "Official Python SDK released (v0.1.0)" },
      { type: "improve", text: "Reduced median message delivery latency by 40%" },
    ],
  },
  {
    version: "v1.0.0",
    date: "September 2025",
    type: "major",
    changes: [
      { type: "feat", text: "Initial public API release" },
      { type: "feat", text: "Core messaging endpoints: send, template, media" },
      { type: "feat", text: "Campaign management with scheduling support" },
      { type: "feat", text: "Contact CRUD operations with pagination" },
    ],
  },
];
