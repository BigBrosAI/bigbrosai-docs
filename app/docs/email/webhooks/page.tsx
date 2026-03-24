import type { Metadata } from "next";
import { Webhook } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Email Webhooks" };

const EVENTS = [
  { event: "send.recipient.accepted",   desc: "Email accepted by the recipient's mail server. Billing is charged at this point." },
  { event: "send.recipient.deferred",   desc: "Temporary delivery failure — the relay will retry automatically." },
  { event: "send.recipient.bounced",    desc: "Permanent delivery failure — the address is invalid or the server rejected it." },
  { event: "send.recipient.complained", desc: "Recipient marked the email as spam." },
  { event: "send.recipient.failed",     desc: "Email failed to send (non-bounce error)." },
  { event: "send.recipient.suppressed", desc: "Recipient is on the suppression list — email was not sent." },
];

const PAYLOAD_EXAMPLE = `{
  "event": "send.recipient.accepted",
  "payload": {
    "send": {
      "id": 19,
      "uuid": "22ef6d06-bd67-420a-94d5-d02d0cb091c0",
      "from_address": "hello@yourdomain.com",
      "subject": "Welcome to BigBros AI"
    },
    "recipient": {
      "id": 21,
      "type": "to",
      "address": "user@example.com",
      "status": "accepted",
      "try_count": 1
    },
    "attempt": {
      "id": 22,
      "status": "accepted",
      "try_count": 1,
      "domain": "gmail.com"
    }
  }
}`;

const VERIFY_NODE = `import crypto from 'crypto';
import express from 'express';

const app = express();
app.use(express.raw({ type: 'application/json' })); // keep raw body for signature check

app.post('/webhooks/email', (req, res) => {
  const signature = req.headers['x-bigbrosai-signature'] as string; // "sha256=<hex>"
  const secret    = process.env.WEBHOOK_SECRET!;                     // stored from setup

  // Recompute HMAC-SHA256 over the raw body
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(req.body)   // raw Buffer
    .digest('hex');

  // Timing-safe comparison
  const sigBuf = Buffer.from(signature ?? '');
  const expBuf = Buffer.from(expected);

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return res.status(401).send('Invalid signature');
  }

  const payload = JSON.parse(req.body.toString());
  const { event, payload: data } = payload;

  console.log('Email event:', event);
  console.log('Send ID:', data?.send?.id);
  console.log('Recipient:', data?.recipient?.address, '->', data?.recipient?.status);

  // Always respond 200 quickly — process async if needed
  res.status(200).json({ received: true });
});`;

const VERIFY_PYTHON = `import hmac
import hashlib
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhooks/email', methods=['POST'])
def email_webhook():
    signature = request.headers.get('X-Bigbrosai-Signature', '')  # "sha256=<hex>"
    secret    = os.environ['WEBHOOK_SECRET'].encode()

    raw_body = request.get_data()  # raw bytes — important for signature check
    expected = 'sha256=' + hmac.new(secret, raw_body, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(signature, expected):
        return 'Invalid signature', 401

    payload = request.get_json()
    event   = payload['event']
    send    = payload['payload']['send']
    recipient = payload['payload']['recipient']

    print(f"Event: {event}, Send ID: {send['id']}, Recipient: {recipient['address']}")

    return jsonify(received=True), 200`;

export default function EmailWebhooksPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-[#1f6feb]/10"><Webhook size={20} className="text-[#58a6ff]" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Email Webhooks</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500">Receive real-time delivery events for every email you send</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-6">
        When you configure a webhook for your domain, BigBrosAI will POST a signed JSON payload to your
        callback URL every time a delivery event occurs. You verify the payload using HMAC-SHA256 with
        the secret returned at setup time.
      </p>

      <DocSection title="How It Works">
        <ol className="space-y-3 text-sm dark:text-[#8b949e] text-gray-600">
          {[
            "Configure a webhook via the Webhook Config API — pass your domain and callback URL.",
            "Store the signing secret returned — it is shown only once.",
            "BigBrosAI receives a delivery event from the email relay (Hyvor).",
            "We sign the forwarded payload with your secret and POST it to your callback URL.",
            "Your server verifies the X-Bigbrosai-Signature header and processes the event.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#1f6feb]/10 border border-[#1f6feb]/30 text-[#58a6ff] text-xs font-bold font-mono">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection title="Event Types">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Event", "Description"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EVENTS.map(({ event, desc }) => (
                <tr key={event} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[#58a6ff] text-xs whitespace-nowrap">{event}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600 text-sm">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Webhook Request Headers">
        <div className="overflow-x-auto border dark:border-[#21262d] border-gray-200 rounded-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b dark:border-[#21262d] border-gray-200">
                {["Header", "Value", "Description"].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[0.7rem] font-semibold dark:text-[#8b949e] text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["X-Bigbrosai-Signature", "sha256=<hex>",                  "HMAC-SHA256 of the raw JSON body, prefixed with sha256="],
                ["X-Bigbrosai-Event",     "send.recipient.accepted",       "The event type string"],
                ["Content-Type",          "application/json",              "Always JSON"],
              ].map(([header, value, desc]) => (
                <tr key={header} className="border-b dark:border-[#161b22] border-gray-100 last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[#58a6ff] text-xs whitespace-nowrap">{header}</td>
                  <td className="px-4 py-2.5 font-mono dark:text-[#8b949e] text-gray-500 text-xs">{value}</td>
                  <td className="px-4 py-2.5 dark:text-[#8b949e] text-gray-600 text-sm">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Payload Shape">
        <p className="text-sm dark:text-[#8b949e] text-gray-600 mb-3">
          The payload is forwarded as-is from the email relay. The top-level keys are{" "}
          <code className="dark:text-[#79c0ff] text-blue-600">event</code> and{" "}
          <code className="dark:text-[#79c0ff] text-blue-600">payload</code>. Inside{" "}
          <code className="dark:text-[#79c0ff] text-blue-600">payload</code> you get{" "}
          <code className="dark:text-[#79c0ff] text-blue-600">send</code>,{" "}
          <code className="dark:text-[#79c0ff] text-blue-600">recipient</code>, and{" "}
          <code className="dark:text-[#79c0ff] text-blue-600">attempt</code>.
        </p>
        <CodeBlock lang="json" code={PAYLOAD_EXAMPLE} />
      </DocSection>

      <DocSection title="Verifying the Signature">
        <p className="dark:text-[#8b949e] text-gray-600 text-sm mb-4">
          The signature is an HMAC-SHA256 of the <strong>raw request body</strong>, prefixed with{" "}
          <code className="dark:text-[#79c0ff] text-blue-600">sha256=</code>. Always use a timing-safe comparison
          and compute the HMAC over the raw bytes — not a re-serialised JSON string.
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-xs dark:text-[#8b949e] text-gray-500 mb-2 font-medium uppercase tracking-wider">Node.js</p>
            <CodeBlock lang="typescript" code={VERIFY_NODE} />
          </div>
          <div>
            <p className="text-xs dark:text-[#8b949e] text-gray-500 mb-2 font-medium uppercase tracking-wider">Python</p>
            <CodeBlock lang="python" code={VERIFY_PYTHON} />
          </div>
        </div>
      </DocSection>

      <DocCallout type="warning" title="Respond quickly">
        Your endpoint must return a <code>200</code> response within <strong>10 seconds</strong>.
        Process heavy work asynchronously after acknowledging receipt.
      </DocCallout>

      <DocCallout type="info" title="Secret rotation">
        To rotate your webhook secret, reconfigure the webhook via the Webhook Config API. The new secret
        takes effect immediately — update your server before rotating.
      </DocCallout>
    </div>
  );
}
