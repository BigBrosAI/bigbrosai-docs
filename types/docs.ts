// types/docs.ts

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type CodeLang = "curl" | "nodejs" | "python" | "java" | "php" | "go";

export interface NavItem {
  id: string;
  label: string;
  method?: HttpMethod;
  href?: string;
  badge?: string;
}

export interface NavSection {
  section: string;
  icon?: string;
  items: NavItem[];
}

export interface ParamRow {
  field: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

export interface DocPage {
  id: string;
  title: string;
  subtitle: string;
  method?: HttpMethod;
  endpoint?: string;
  version?: string;
  params?: ParamRow[];
  codeExamples?: Partial<Record<CodeLang, string>>;
  successResponse?: string;
  errorResponse?: string;
  content: string;
}

export interface WebhookEvent {
  event: string;
  description: string;
  payload: string;
  retryPolicy?: string;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  changes: string[];
}
