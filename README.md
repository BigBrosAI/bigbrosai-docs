# BigBrosAI Developer Documentation

Modern API documentation platform for BigBrosAI WhatsApp messaging APIs.

## Stack

- **Next.js 14** (App Router + TypeScript)
- **Tailwind CSS** with custom design tokens
- **Lucide React** icons throughout
- **MDX** for long-form documentation content
- Interactive **API Playground** with live mock responses

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## File Structure

```
bigbrosai-docs/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   └── docs/
│       ├── layout.tsx              # Docs shell (TopNav + Sidebar)
│       ├── page.tsx                # Introduction
│       ├── getting-started/
│       ├── authentication/
│       ├── rate-limits/
│       ├── errors/
│       ├── messages/
│       │   ├── send/               # POST /v1/messages/send
│       │   ├── template/
│       │   ├── media/
│       │   └── bulk/
│       ├── campaigns/
│       │   ├── create/             # POST /v1/campaigns
│       │   ├── schedule/
│       │   └── status/
│       ├── contacts/
│       │   ├── create/
│       │   ├── update/
│       │   ├── get/
│       │   └── list/               # GET /v1/contacts
│       ├── automation/
│       ├── analytics/
│       ├── webhooks/
│       ├── sdks/
│       └── changelog/
├── components/
│   ├── ui/
│   │   └── MethodBadge.tsx         # GET/POST/PUT/DELETE badges
│   ├── docs/
│   │   ├── CodeBlock.tsx           # Syntax-highlighted code + copy
│   │   ├── ApiTabs.tsx             # Multi-language code tabs
│   │   ├── EndpointTable.tsx       # Request parameters table
│   │   ├── EndpointPage.tsx        # Full endpoint page template
│   │   └── DocSection.tsx          # Section wrapper + callouts
│   ├── layout/
│   │   ├── TopNav.tsx              # Header + ⌘K search modal
│   │   └── Sidebar.tsx             # Collapsible nav tree
│   └── playground/
│       └── Playground.tsx          # Interactive API sandbox
├── lib/
│   ├── nav.ts                      # Navigation structure + constants
│   ├── docs-data.ts                # Endpoint definitions + content
│   └── utils.ts                    # cn(), helpers
├── types/
│   └── index.ts                    # TypeScript interfaces
└── content/
    └── docs/                       # MDX files (long-form content)
```

## Adding a New Endpoint

1. Add endpoint data to `lib/docs-data.ts`:
```ts
export const ENDPOINTS = {
  "my-endpoint": {
    id: "my-endpoint",
    title: "My Endpoint",
    method: "POST",
    endpoint: "/v1/my-endpoint",
    subtitle: "...",
    params: [...],
    codeExamples: { curl: "...", nodejs: "..." },
    successResponse: "...",
    errorResponse: "...",
  }
};
```

2. Add navigation entry to `lib/nav.ts`

3. Create the page at `app/docs/<section>/<slug>/page.tsx`:
```tsx
import { EndpointPage } from "@/components/docs/EndpointPage";
import { ENDPOINTS } from "@/lib/docs-data";

export default function Page() {
  return <EndpointPage endpoint={ENDPOINTS["my-endpoint"]} />;
}
```

Done! The page is now live with full code examples, parameter table, and playground.
