export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type CodeLanguage = "curl" | "nodejs" | "python" | "java" | "php" | "go";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  method?: HttpMethod;
  icon?: string;
  badge?: string;
}

export interface NavSection {
  section: string;
  items: NavItem[];
}

export interface ApiParameter {
  field: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
  default?: string;
}

export interface ApiEndpoint {
  id: string;
  title: string;
  method: HttpMethod;
  endpoint: string;
  subtitle: string;
  description?: string;
  params?: ApiParameter[];
  queryParams?: ApiParameter[];
  codeExamples: Partial<Record<CodeLanguage, string>>;
  successResponse: string;
  errorResponse: string;
}

export interface PlaygroundResponse {
  status: number;
  data: unknown;
  elapsed: number;
}

export interface SearchResult {
  id: string;
  title: string;
  section: string;
  href: string;
  method?: HttpMethod;
}

export interface ChangelogEntry {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  changes: { type: "new" | "improved" | "fixed" | "deprecated" | "feat" | "improve" | "fix"; text: string; }[];
}

export interface WebhookEvent {
  event: string;
  description: string;
  color: string;
  payload: string;
}
