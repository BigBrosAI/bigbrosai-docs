"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageSquare, Megaphone, BarChart2, Zap, Users, Code2, Sun, Moon, Mail, MessageCircle, Smartphone, Instagram, ChevronRight } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const CHANNELS = [
  { icon: MessageSquare, label: "WhatsApp",  color: "#25d366", live: true  },
  { icon: Mail,          label: "Email",     color: "#388bfd", live: true  },
  { icon: MessageCircle, label: "SMS",       color: "#f0883e", live: false },
  { icon: Smartphone,    label: "RCS",       color: "#d2a8ff", live: false },
  { icon: Instagram,     label: "Instagram", color: "#e1306c", live: false },
];

const FEATURES = [
  { icon: MessageSquare, title: "Messaging APIs",      desc: "Send text, media, and template messages across all channels from a single unified API.",  color: "#25d366" },
  { icon: Megaphone,     title: "Campaign Automation", desc: "Broadcast to thousands with advanced scheduling, audience targeting, and A/B testing.",    color: "#388bfd" },
  { icon: BarChart2,     title: "Analytics",           desc: "Track delivery rates, read receipts, and campaign performance in real time.",              color: "#d2a8ff" },
  { icon: Zap,           title: "Webhooks",            desc: "Receive instant event notifications for delivery, reads, replies and status changes.",     color: "#f0883e" },
  { icon: Users,         title: "Contact Management",  desc: "Full CRM with custom fields, tags, segments, and bulk import/export.",                    color: "#3fb950" },
  { icon: Code2,         title: "SDKs & Libraries",    desc: "Official SDKs for Node.js, Python, Java, Go, and PHP with full TypeScript support.",      color: "#f97583" },
];

const QUICK_EXAMPLE = `# Send a WhatsApp template message
curl -X POST https://api.bigbrosai.com/api/v1/campaign/api-campaign \\
  -H "bigbrosai-api-key: live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "campaignName": "Hello", "destination": "+919876543210", "templateId": "YOUR_TEMPLATE_ID" }'

# Send a transactional email
curl -X POST https://api.bigbrosai.com/api/v1/email/send \\
  -H "bigbrosai-api-key: live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "from": "hello@yourdomain.com", "to": "user@example.com", "subject": "Hello!", "body_html": "<h1>Hi there</h1>" }'`;

export default function HomePage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <div className="min-h-screen dark:bg-[#0d1117] bg-white dark:text-[#e1e4e8] text-gray-800 font-sans transition-colors">
      {/* Ambient glow — dark only */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden dark:block hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-green-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b dark:border-[#21262d] border-gray-200 dark:bg-[#0d1117]/90 bg-white/95 backdrop-blur-sm transition-colors">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link href="/">
            <Image src={isDark ? "/logo-black.png" : "/logo.png"} alt="bigbrosai logo" width={150} height={40} className="h-8 w-auto" priority />
          </Link>
          <div className="flex-1" />
          <Link href="/docs" className="dark:text-[#8b949e] text-gray-500 text-sm hover:dark:text-[#e1e4e8] hover:text-gray-800 transition-colors hidden sm:block">Docs</Link>
          <Link href="/docs/messages/send" className="dark:text-[#8b949e] text-gray-500 text-sm hover:dark:text-[#e1e4e8] hover:text-gray-800 transition-colors hidden sm:block">API Reference</Link>
          <button onClick={toggle} className="w-8 h-8 flex items-center justify-center rounded-lg dark:bg-[#161b22] bg-gray-100 dark:border-[#30363d] border border-gray-200 dark:text-[#8b949e] text-gray-500 hover:dark:text-[#e1e4e8] hover:text-gray-800 transition-colors" aria-label="Toggle theme">
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <Link href="/docs" className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-3xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 dark:bg-green-500/10 bg-green-50 border border-green-500/30 rounded-full px-4 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-600 dark:text-green-400 text-xs font-medium">API v1 — Generally Available</span>
        </div>

        <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-6 dark:text-[#e1e4e8] text-gray-900">
          One API for all your<br />
          <span className="text-green-500">customer messaging</span>
        </h1>

        <p className="dark:text-[#8b949e] text-gray-500 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
          BigBrosAI unifies WhatsApp, Email, SMS, RCS, and Instagram messaging into a single developer-friendly API. Send, automate, and analyze every customer interaction from one platform.
        </p>

        {/* Channel pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {CHANNELS.map(c => (
            <div key={c.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${c.live ? "dark:bg-[#161b22] bg-gray-50 dark:border-[#30363d] border-gray-200 dark:text-[#e1e4e8] text-gray-700" : "dark:bg-[#0d1117] bg-white dark:border-[#21262d] border-gray-100 dark:text-[#6a737d] text-gray-400 opacity-70"}`}>
              <c.icon size={12} style={{ color: c.color }} />
              {c.label}
              {c.live ? <span className="text-green-500 text-[0.58rem] font-bold">LIVE</span> : <span className="text-gray-400 text-[0.58rem]">SOON</span>}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 justify-center flex-wrap">
          <Link href="/docs/getting-started" className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-green-500/20">
            Get API Key <ArrowRight size={16} />
          </Link>
          <Link href="/docs" className="flex items-center gap-2 dark:border-[#30363d] border-gray-200 border dark:text-[#e1e4e8] text-gray-700 font-medium px-6 py-3 rounded-lg hover:dark:border-green-500/40 hover:border-green-500/40 hover:dark:bg-[#161b22] hover:bg-gray-50 transition-all">
            Read Docs <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800 mb-3">Everything you need</h2>
          <p className="dark:text-[#6a737d] text-gray-500">One platform, every messaging use case</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title}
              className="dark:bg-[#161b22] bg-gray-50 border dark:border-[#21262d] border-gray-200 rounded-xl p-6 hover:-translate-y-0.5 transition-all duration-200"
              onMouseEnter={e => (e.currentTarget.style.borderColor = f.color + "55")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "")}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: f.color + "18" }}>
                <f.icon size={20} style={{ color: f.color }} />
              </div>
              <h3 className="font-semibold dark:text-[#e1e4e8] text-gray-800 mb-2">{f.title}</h3>
              <p className="dark:text-[#8b949e] text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section className="border-t border-b dark:border-[#21262d] border-gray-200 dark:bg-[#161b22] bg-gray-50 transition-colors">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800 mb-3">Start in 3 steps</h2>
            <p className="dark:text-[#6a737d] text-gray-500">From zero to first message in under 5 minutes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { n: "01", title: "Get API Key",      desc: "Sign up at dashboard.bigbrosai.com and generate your key" },
              { n: "02", title: "Send Message",     desc: "Make your first API call with one simple HTTP request"    },
              { n: "03", title: "Monitor Delivery", desc: "Get real-time notifications via webhooks"                 },
            ].map(s => (
              <div key={s.n} className="flex gap-4 items-start">
                <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-green-500/10 border border-green-500/30 rounded-lg font-bold font-mono text-green-600 dark:text-green-400">{s.n}</div>
                <div>
                  <h3 className="font-semibold dark:text-[#e1e4e8] text-gray-800 mb-1">{s.title}</h3>
                  <p className="dark:text-[#8b949e] text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <CodeBlock code={QUICK_EXAMPLE} lang="bash" />
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm dark:text-[#6a737d] text-gray-400">
        <div className="flex items-center gap-2">
          <Image src={isDark ? "/logo-black.png" : "/logo.png"} alt="bigbrosai logo" width={150} height={40} className="h-8 w-auto opacity-70" />
          <span>© 2026 bigbrosai, Inc.</span>
        </div>
        <div className="flex gap-6">
          {["Docs", "API Reference", "Changelog", "Support"].map(l => (
            <Link key={l} href="/docs" className="hover:dark:text-[#e1e4e8] hover:text-gray-700 transition-colors">{l}</Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
