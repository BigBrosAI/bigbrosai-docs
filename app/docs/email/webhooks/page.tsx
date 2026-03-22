import type { Metadata } from "next";
import { Webhook } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Email Webhooks" };

const EVENTS = [
  { event: "email.delivered", desc: "Email was accepted and delivered to the recipient's mail server." },
  { event: "email.bounced",   desc: "Permanent delivery failure — the address is invalid or the server rejected it." },
  { event: "email.complained",desc: "Recipient marked the email as spam." },
  { event: "email.deferred",  desc: "Temporary delivery failure — the platform will retry automatically." },
];

const PAYLOAD_EXAMPLE = `{
  "event": "email.delivered",
  "data": {
    "from_address": "hello@yourdomain.com",
    "to": "user@example.com",
    "subject": "Welcome to BigBros AI",
    "timestamp": "2026-03-22T10:00:01Z"
  }
}`;

const VERIFY_NODE = `import crypto from 'crypto';
import express from 'express';

const app = express();
app.use(express.json());

app.post('/webhooks/email', (req, res) => {
  const signature = req.headers['x-bigbrosai-signature']; // "sha256=<hex>"
  const secret    = process.env.WEBHOOK_SECRET;            // stored from setup

  // Recompute HMAC-SHA256 over the raw JSON body
  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  // Use timing-safe comparison to prevent timing attacks
  const sigBuffer = Buffer.from(signature ?? '');
  const expBuffer = Buffer.from(expected);

  if (
    sigBuffer.length !== expBuffer.length ||
    !crypto.timingSafeEqual(sigBuffer, expBuffer)
  ) {
    return res.status(401).send('Invalid signature');
  }

  const { event, data } = req.body;
  console.log('Received email event:', event, data);

  // Always respond 200 quickly — process async if needed
  res.status(200).send({ received: true });
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

    body = request.get_data()  # raw bytes
    expected = 'sha256=' + hmac.new(secret, body, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(signature, expected):
        return 'Invalid signature', 401

    payload = request.get_json()
    print('Email event:', payload['event'])

    return jsonify(received=True), 200`;

const VERIFY_GO = `package main

import (
  "crypto/hmac"
  "crypto/sha256"
  "encoding/hex"
  "fmt"
  "io"
  "net/http"
  "os"
)

func emailWebhook(w http.ResponseWriter, r *http.Request) {
  sig    := r.Header.Get("X-Bigbrosai-Signature") // "sha256=<hex>"
  secret := []byte(os.Getenv("WEBHOOK_SECRET"))

  body, _ := io.ReadAll(r.Body)

  mac := hmac.New(sha256.New, secret)
  mac.Write(body)
  expected := "sha256=" + hex.EncodeToString(mac.Sum(nil))

  if !hmac.Equal([]byte(sig), []byte(expected)) {
    http.Error(w, "Invalid signature", http.StatusUnauthorized)
    return
  }

  fmt.Println("Verified webhook:", string(body))
  w.WriteHeader(http.StatusOK)
}`;

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
            "Configure a webhook for your domain via the dashboard (Settings → Email → Webhooks).",
            "Store the signing secret returned — it is shown only once.",
            "BigBrosAI receives a delivery event from the email relay.",
            "We sign the forwarded payload with your secret and POST it to your callback URL.",
            "Your server verifies the signature and processes the event.",
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
                ["X-Bigbrosai-Signature", "sha256=<hex>",    "HMAC-SHA256 of the raw JSON body, prefixed with sha256="],
                ["X-Bigbrosai-Event",     "email.delivered", "The event type string"],
                ["Content-Type",          "application/json","Always JSON"],
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
        <CodeBlock lang="json" code={PAYLOAD_EXAMPLE} />
      </DocSection>

      <DocSection title="Verifying the Signature">
        <p className="dark:text-[#8b949e] text-gray-600 text-sm mb-4">
          The signature is an HMAC-SHA256 of the raw JSON body, prefixed with{" "}
          <code className="dark:text-[#79c0ff] text-blue-600">sha256=</code>. Always use a timing-safe comparison
          to prevent timing attacks.
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
          <div>
            <p className="text-xs dark:text-[#8b949e] text-gray-500 mb-2 font-medium uppercase tracking-wider">Go</p>
            <CodeBlock lang="go" code={VERIFY_GO} />
          </div>
        </div>
      </DocSection>

      <DocCallout type="warning" title="Respond quickly">
        Your endpoint must return a <code>200</code> response within <strong>10 seconds</strong>.
        If it times out or returns a non-2xx status, the event is not retried — process heavy work
        asynchronously after acknowledging receipt.
      </DocCallout>

      <DocCallout type="info" title="Secret rotation">
        To rotate your webhook secret, reconfigure the webhook from the dashboard. The new secret
        takes effect immediately — update your server before rotating.
      </DocCallout>
    </div>
  );
}
