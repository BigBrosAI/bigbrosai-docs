import type { Metadata } from "next";
import { Webhook } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "WhatsApp Webhooks" };

// Meta sends a single "messages" field in the webhook entry.
// The type of event is determined by the content of the value object.
const EVENTS = [
  { event: "messages (inbound)",    desc: "An inbound message was received from a WhatsApp user. value.messages[] is populated." },
  { event: "statuses (sent)",       desc: "Message sent to Meta's servers. value.statuses[].status === 'sent'." },
  { event: "statuses (delivered)",  desc: "Message delivered to the recipient's device. value.statuses[].status === 'delivered'." },
  { event: "statuses (read)",       desc: "Recipient opened and read the message (blue ticks). value.statuses[].status === 'read'." },
  { event: "statuses (failed)",     desc: "Permanent delivery failure. value.statuses[].status === 'failed'." },
];

const PAYLOAD_EXAMPLE = `// Inbound message
{
  "object": "whatsapp_business_account",
  "entry": [{
    "id": "WHATSAPP_BUSINESS_ACCOUNT_ID",
    "changes": [{
      "value": {
        "messaging_product": "whatsapp",
        "metadata": {
          "display_phone_number": "919876543210",
          "phone_number_id": "PHONE_NUMBER_ID"
        },
        "contacts": [{ "profile": { "name": "Rahul Sharma" }, "wa_id": "919876543210" }],
        "messages": [{
          "from": "919876543210",
          "id": "wamid.HBgM...",
          "timestamp": "1711094400",
          "type": "text",
          "text": { "body": "Hello!" }
        }]
      },
      "field": "messages"
    }]
  }]
}`;

const STATUS_PAYLOAD = `// Delivery status update
{
  "object": "whatsapp_business_account",
  "entry": [{
    "changes": [{
      "value": {
        "statuses": [{
          "id": "wamid.HBgM...",
          "status": "delivered",
          "timestamp": "1711094405",
          "recipient_id": "919876543210"
        }]
      },
      "field": "messages"
    }]
  }]
}`;

const HANDLER_NODE = `import express from 'express';

const app = express();
app.use(express.json());

// Meta webhook verification (GET)
app.get('/webhooks/whatsapp', (req, res) => {
  const mode      = req.query['hub.mode'];
  const token     = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === process.env.WA_VERIFY_TOKEN) {
    return res.status(200).send(challenge); // echo back the challenge
  }
  res.sendStatus(403);
});

// Receive events (POST)
app.post('/webhooks/whatsapp', (req, res) => {
  // Acknowledge immediately — Meta expects 200 within 5 seconds
  res.sendStatus(200);

  const entry = req.body?.entry?.[0];
  const changes = entry?.changes?.[0]?.value;

  if (!changes) return;

  // Inbound messages
  const messages = changes.messages ?? [];
  for (const msg of messages) {
    console.log('Inbound from', msg.from, ':', msg.text?.body ?? msg.type);
  }

  // Delivery status updates
  const statuses = changes.statuses ?? [];
  for (const status of statuses) {
    console.log('Status update:', status.id, '->', status.status);
  }
});`;

const HANDLER_PYTHON = `from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Meta webhook verification (GET)
@app.route('/webhooks/whatsapp', methods=['GET'])
def verify():
    mode      = request.args.get('hub.mode')
    token     = request.args.get('hub.verify_token')
    challenge = request.args.get('hub.challenge')

    if mode == 'subscribe' and token == os.environ['WA_VERIFY_TOKEN']:
        return challenge, 200
    return 'Forbidden', 403

# Receive events (POST)
@app.route('/webhooks/whatsapp', methods=['POST'])
def webhook():
    # Acknowledge immediately
    payload = request.get_json()

    changes = payload.get('entry', [{}])[0].get('changes', [{}])[0].get('value', {})

    for msg in changes.get('messages', []):
        print('Inbound from', msg['from'], ':', msg.get('text', {}).get('body'))

    for status in changes.get('statuses', []):
        print('Status:', status['id'], '->', status['status'])

    return jsonify(received=True), 200`;

export default function WhatsAppWebhooksPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-[#25d366]/10"><Webhook size={20} className="text-[#25d366]" /></div>
          <h1 className="text-2xl font-bold text-[#e1e4e8]">WhatsApp Webhooks</h1>
        </div>
        <p className="text-[#6a737d]">Receive inbound messages and delivery status updates in real time</p>
      </div>

      <p className="text-[#8b949e] leading-relaxed mb-6">
        BigBrosAI forwards WhatsApp events from Meta to your configured callback URL. You receive
        inbound messages from users, delivery receipts, and template status updates — all as JSON
        POST requests to your server.
      </p>

      {/* How it works */}
      <DocSection title="How It Works">
        <ol className="space-y-3 text-sm text-[#8b949e]">
          {[
            "Configure your callback URL in the dashboard (Settings → WhatsApp → Webhooks).",
            "Meta sends a GET request to verify your URL — your server must echo back the challenge.",
            "Once verified, Meta POSTs events to your URL whenever a message is sent or received.",
            "BigBrosAI forwards these events to your callback URL.",
            "Respond with HTTP 200 within 5 seconds to acknowledge receipt.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] text-xs font-bold font-mono">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      {/* Event types */}
      <DocSection title="Event Types">
        <div className="overflow-x-auto border border-[#21262d] rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#21262d]">
                {["Event", "Description"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold text-[#8b949e] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EVENTS.map(({ event, desc }) => (
                <tr key={event} className="border-b border-[#161b22] last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[#79c0ff] text-xs whitespace-nowrap">{event}</td>
                  <td className="px-4 py-2.5 text-[#8b949e] text-sm">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      {/* Payload examples */}
      <DocSection title="Inbound Message Payload">
        <CodeBlock lang="json" code={PAYLOAD_EXAMPLE} />
      </DocSection>

      <DocSection title="Delivery Status Payload">
        <CodeBlock lang="json" code={STATUS_PAYLOAD} />
      </DocSection>

      {/* Webhook handler */}
      <DocSection title="Handling Webhooks">
        <p className="text-[#8b949e] text-sm mb-4">
          Your endpoint must handle both a <code className="text-[#79c0ff]">GET</code> (verification) and a{" "}
          <code className="text-[#79c0ff]">POST</code> (events) at the same path.
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-[#8b949e] mb-2 font-medium uppercase tracking-wider">Node.js</p>
            <CodeBlock lang="typescript" code={HANDLER_NODE} />
          </div>
          <div>
            <p className="text-xs text-[#8b949e] mb-2 font-medium uppercase tracking-wider">Python</p>
            <CodeBlock lang="python" code={HANDLER_PYTHON} />
          </div>
        </div>
      </DocSection>

      {/* Message types */}
      <DocSection title="Supported Inbound Message Types">
        <div className="overflow-x-auto border border-[#21262d] rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#21262d]">
                {["type", "Description"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold text-[#8b949e] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["text",     "Plain text message — body in msg.text.body"],
                ["image",    "Image — URL in msg.image.link or msg.image.id"],
                ["audio",    "Audio/voice note — msg.audio.id"],
                ["video",    "Video — msg.video.id"],
                ["document", "File attachment — msg.document.id + filename"],
                ["location", "GPS coordinates — msg.location.latitude / longitude"],
                ["button",   "Quick-reply button tap — msg.button.text + payload"],
                ["interactive", "List reply or button reply — msg.interactive.type"],
              ].map(([type, desc]) => (
                <tr key={type} className="border-b border-[#161b22] last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[#79c0ff] text-xs">{type}</td>
                  <td className="px-4 py-2.5 text-[#8b949e] text-sm">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocCallout type="warning" title="Respond within 5 seconds">
        Meta requires a <code>200</code> response within 5 seconds. If your server is slow, acknowledge
        immediately and process the event asynchronously (queue it, then handle it in a worker).
      </DocCallout>

      <DocCallout type="info" title="Verify token">
        Set a strong random string as your verify token in the dashboard. Meta sends it back during
        the GET verification step — your server must match it exactly before echoing the challenge.
      </DocCallout>
    </div>
  );
}
