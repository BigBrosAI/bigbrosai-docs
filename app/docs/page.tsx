import type { Metadata } from "next";
import { BookOpen, MessageSquare, Megaphone, BarChart2, Users, Zap, Webhook, Code2, Mail, MessageCircle, Smartphone, Instagram } from "lucide-react";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocSection, DocCallout } from "@/components/docs/DocSection";

export const metadata: Metadata = { title: "Introduction" };

const CHANNELS = [
  { icon: MessageSquare, title: "WhatsApp",  desc: "Send text, media, and template messages via official WhatsApp Business API",    color: "#25d366", status: "live"    },
  { icon: Mail,          title: "Email",     desc: "Transactional and marketing emails with HTML templates and tracking",           color: "#388bfd", status: "live"    },
  { icon: MessageCircle, title: "SMS",       desc: "Global SMS delivery to 190+ countries with delivery receipts",                  color: "#f0883e", status: "soon"    },
  { icon: Smartphone,    title: "RCS",       desc: "Rich Communication Services — interactive messages on Android",                 color: "#d2a8ff", status: "soon"    },
  { icon: Instagram,     title: "Instagram", desc: "Instagram Direct Message automation for business accounts",                     color: "#e1306c", status: "soon"    },
];

const CAPABILITIES = [
  { icon: Megaphone, title: "Campaigns",    desc: "Broadcast to thousands with targeting and scheduling"        },
  { icon: Users,     title: "Contacts",     desc: "Full CRM with tagging, segments, and custom fields"         },
  { icon: Zap,       title: "Automation",   desc: "Build conversational flows with trigger-based logic"        },
  { icon: BarChart2, title: "Analytics",    desc: "Real-time delivery, open rates, and engagement metrics"     },
  { icon: Webhook,   title: "Webhooks",     desc: "Real-time event notifications pushed to your server"        },
  { icon: Code2,     title: "SDKs",         desc: "Official SDKs for Node.js, Python, Java, Go, and PHP"      },
];

export default function IntroductionPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-green-500/10"><BookOpen size={20} className="text-green-500" /></div>
          <h1 className="text-2xl font-bold dark:text-[#e1e4e8] text-gray-800">Introduction</h1>
        </div>
        <p className="dark:text-[#6a737d] text-gray-500 text-base">Welcome to the BigBrosAI Developer Platform</p>
      </div>

      <p className="dark:text-[#8b949e] text-gray-600 leading-relaxed mb-8">
        BigBrosAI is a unified communication platform that lets you reach customers across
        WhatsApp, Email, SMS, RCS, and Instagram from a single API. Send individual messages,
        run broadcast campaigns, automate conversations, and track every interaction in real time.
      </p>

      <DocSection title="Communication Channels">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CHANNELS.map(c => (
            <div key={c.title} className="dark:bg-[#161b22] bg-gray-50 border dark:border-[#21262d] border-gray-200 rounded-lg p-4 relative overflow-hidden">
              <div className="flex items-center gap-2.5 mb-2">
                <c.icon size={16} style={{ color: c.color }} />
                <span className="font-semibold dark:text-[#e1e4e8] text-gray-800 text-sm">{c.title}</span>
                {c.status === "live"
                  ? <span className="ml-auto text-[0.6rem] font-bold bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded-full">LIVE</span>
                  : <span className="ml-auto text-[0.6rem] font-bold bg-gray-500/10 text-gray-400 border border-gray-500/30 px-1.5 py-0.5 rounded-full">SOON</span>
                }
              </div>
              <p className="dark:text-[#8b949e] text-gray-500 text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Platform Capabilities">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CAPABILITIES.map(f => (
            <div key={f.title} className="dark:bg-[#161b22] bg-gray-50 border dark:border-[#21262d] border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2.5 mb-2">
                <f.icon size={15} className="text-green-500" />
                <span className="font-semibold dark:text-[#e1e4e8] text-gray-800 text-sm">{f.title}</span>
              </div>
              <p className="dark:text-[#8b949e] text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Base URL">
        <CodeBlock code="https://api.bigbrosai.com/api/v1" lang="bash" showLineNumbers={false} />
        <p className="dark:text-[#8b949e] text-gray-600 text-sm mt-3 leading-relaxed">
          All endpoints are relative to this base URL. Current stable version:{" "}
          <code className="dark:text-[#79c0ff] text-blue-600 dark:bg-[#161b22] bg-gray-100 px-1.5 py-0.5 rounded text-xs border dark:border-[#21262d] border-gray-200 font-mono">v1</code>
        </p>
      </DocSection>

      <DocCallout type="info" title="Channel Availability">
        WhatsApp and Email are fully available today. SMS, RCS, and Instagram channels are launching soon — sign up for early access at <strong>dashboard.bigbrosai.com</strong>.
      </DocCallout>
    </div>
  );
}
