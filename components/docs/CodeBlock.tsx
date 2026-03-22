"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

// Token types for safe, non-regex-chained highlighting
type Token = { type: "keyword" | "string" | "comment" | "number" | "key" | "value-str" | "value-bool" | "value-num" | "plain"; text: string };

function tokenizeCode(code: string, lang: string): Token[][] {
  const lines = code.split("\n");
  return lines.map(line => tokenizeLine(line, lang));
}

function tokenizeLine(line: string, lang: string): Token[] {
  if (lang === "json") return tokenizeJsonLine(line);
  return tokenizeGenericLine(line, lang);
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// JSON tokenizer: handles "key": value pairs safely
function tokenizeJsonLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = line.length;

  while (i < len) {
    // Whitespace
    if (/\s/.test(line[i])) {
      let ws = "";
      while (i < len && /\s/.test(line[i])) ws += line[i++];
      tokens.push({ type: "plain", text: ws });
      continue;
    }
    // JSON key: "key":
    if (line[i] === '"') {
      let str = '"';
      i++;
      while (i < len && line[i] !== '"') {
        if (line[i] === '\\') { str += line[i++]; }
        str += line[i++];
      }
      str += '"';
      i++;
      // Check if followed by colon (it's a key)
      let ws = "";
      while (i < len && line[i] === " ") { ws += line[i++]; }
      if (i < len && line[i] === ":") {
        tokens.push({ type: "key", text: str });
        tokens.push({ type: "plain", text: ws + ":" });
        i++;
        continue;
      } else {
        // It's a string value
        tokens.push({ type: "value-str", text: str + ws });
        continue;
      }
    }
    // true / false / null
    if (line.slice(i, i+4) === "true")  { tokens.push({ type: "value-bool", text: "true"  }); i += 4; continue; }
    if (line.slice(i, i+5) === "false") { tokens.push({ type: "value-bool", text: "false" }); i += 5; continue; }
    if (line.slice(i, i+4) === "null")  { tokens.push({ type: "value-bool", text: "null"  }); i += 4; continue; }
    // Numbers
    if (/[-\d]/.test(line[i]) && (tokens.length === 0 || tokens[tokens.length-1].text.endsWith(":"))) {
      let num = "";
      while (i < len && /[-\d.eE+]/.test(line[i])) num += line[i++];
      tokens.push({ type: "value-num", text: num });
      continue;
    }
    // Everything else (brackets, commas, etc.)
    tokens.push({ type: "plain", text: line[i++] });
  }
  return tokens;
}

const KEYWORDS: Record<string, string[]> = {
  javascript: ["const","let","var","import","from","export","default","await","async","return","function","class","new","if","else","for","while","do","switch","case","break","typeof","instanceof","void","null","undefined","true","false","of","in","try","catch","finally","throw"],
  typescript: ["const","let","var","import","from","export","default","await","async","return","function","class","new","if","else","for","while","do","switch","case","break","typeof","instanceof","void","null","undefined","true","false","of","in","try","catch","finally","throw","interface","type","enum","extends","implements","declare","namespace","as","keyof","readonly","any","string","number","boolean","never","unknown","object"],
  python: ["def","import","from","return","class","if","elif","else","for","while","with","as","in","is","not","and","or","pass","break","continue","try","except","finally","raise","lambda","True","False","None","print","self","async","await","yield"],
  java: ["public","private","protected","static","final","class","interface","extends","implements","new","return","void","int","String","boolean","if","else","for","while","do","try","catch","finally","throw","throws","import","package","this","super","null","true","false"],
  php: ["echo","print","function","class","extends","implements","new","return","if","else","elseif","for","foreach","while","do","try","catch","finally","throw","namespace","use","require","include","true","false","null","public","private","protected","static","abstract","interface"],
  go: ["package","import","func","var","const","type","struct","interface","map","chan","go","defer","select","case","return","if","else","for","range","break","continue","switch","fallthrough","goto","nil","true","false","iota","new","make","len","cap","append","copy","close","delete","panic","recover"],
  bash: ["curl","export","echo","cd","ls","mkdir","npm","pip","node","python","git","sudo"],
};

function tokenizeGenericLine(line: string, lang: string): Token[] {
  const tokens: Token[] = [];
  const kws = new Set(KEYWORDS[lang] ?? KEYWORDS.javascript);
  let i = 0;
  const len = line.length;

  // Check for full-line comment
  const trimmed = line.trimStart();
  if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
    return [{ type: "comment", text: line }];
  }

  while (i < len) {
    // Inline comment
    if (line[i] === "/" && line[i+1] === "/") {
      tokens.push({ type: "comment", text: line.slice(i) });
      break;
    }
    if (line[i] === "#") {
      tokens.push({ type: "comment", text: line.slice(i) });
      break;
    }
    // String literals: single, double, backtick
    if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
      const quote = line[i];
      let str = quote;
      i++;
      while (i < len && line[i] !== quote) {
        if (line[i] === "\\") { str += line[i++]; if (i < len) str += line[i++]; continue; }
        str += line[i++];
      }
      str += quote;
      i++;
      tokens.push({ type: "string", text: str });
      continue;
    }
    // Word / keyword / boolean / null
    if (/[a-zA-Z_$]/.test(line[i])) {
      let word = "";
      while (i < len && /[\w$]/.test(line[i])) word += line[i++];
      if (kws.has(word)) tokens.push({ type: "keyword", text: word });
      else if (word === "true" || word === "false" || word === "null" || word === "nil" || word === "None" || word === "True" || word === "False") tokens.push({ type: "value-bool", text: word });
      else tokens.push({ type: "plain", text: word });
      continue;
    }
    // Numbers
    if (/\d/.test(line[i])) {
      let num = "";
      while (i < len && /[\d.xXa-fA-F]/.test(line[i])) num += line[i++];
      tokens.push({ type: "number", text: num });
      continue;
    }
    // Everything else
    tokens.push({ type: "plain", text: line[i++] });
  }
  return tokens;
}

// Color map for dark theme
const DARK_COLORS: Record<string, string> = {
  keyword:    "#f97583",
  string:     "#a5d6ff",
  comment:    "#6a737d",
  number:     "#f97583",
  key:        "#79c0ff",
  "value-str":"#a5d6ff",
  "value-bool":"#79c0ff",
  "value-num": "#f97583",
  plain:      "#e1e4e8",
};

// Color map for light theme
const LIGHT_COLORS: Record<string, string> = {
  keyword:    "#d73a49",
  string:     "#032f62",
  comment:    "#6a737d",
  number:     "#005cc5",
  key:        "#0550ae",
  "value-str":"#032f62",
  "value-bool":"#005cc5",
  "value-num": "#005cc5",
  plain:      "#24292e",
};

function renderTokens(lines: Token[][], isDark: boolean): string {
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;
  return lines.map(lineTokens =>
    lineTokens.map(t => {
      const color = colors[t.type] ?? colors.plain;
      const escaped = escHtml(t.text);
      if (t.type === "plain") return escaped;
      return `<span style="color:${color}">${escaped}</span>`;
    }).join("")
  ).join("\n");
}

export function CodeBlock({ code, lang = "bash", filename, showLineNumbers = true, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };

  const tokenLines = tokenizeCode(code, lang);
  const highlighted = renderTokens(tokenLines, isDark);
  const rawLines = code.split("\n");

  return (
    <div className={cn(
      "relative rounded-lg overflow-hidden border",
      isDark ? "bg-[#0d1117] border-[#21262d]" : "bg-[#f6f8fa] border-gray-200",
      className
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between px-4 py-2 border-b",
        isDark ? "bg-[#161b22] border-[#21262d]" : "bg-[#eaeef2] border-gray-200"
      )}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          {filename
            ? <span className={cn("text-xs font-mono", isDark ? "text-[#8b949e]" : "text-gray-500")}>{filename}</span>
            : <span className={cn("text-[0.68rem] font-mono uppercase tracking-widest", isDark ? "text-[#6a737d]" : "text-gray-400")}>{lang}</span>
          }
        </div>
        <button onClick={handleCopy} className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all duration-200 border",
          copied
            ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/30"
            : isDark
              ? "bg-white/5 text-[#8b949e] border-[#30363d] hover:text-[#e1e4e8]"
              : "bg-white text-gray-500 border-gray-300 hover:text-gray-800"
        )}>
          {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
        </button>
      </div>

      {/* Code */}
      <pre className={cn(
        "overflow-x-auto p-4 text-[0.8rem] leading-relaxed font-mono m-0",
        isDark ? "text-[#e1e4e8]" : "text-[#24292e]"
      )}>
        {showLineNumbers ? (
          <table className="w-full border-collapse" style={{ borderSpacing: 0 }}>
            <tbody>
              {rawLines.map((_, i) => (
                <tr key={i}>
                  <td className={cn(
                    "select-none text-right pr-4 text-[0.72rem] align-top pt-0.5",
                    isDark ? "text-[#4a5568]" : "text-gray-400"
                  )} style={{ width: "2rem", minWidth: "2rem" }}>
                    {i + 1}
                  </td>
                  <td
                    dangerouslySetInnerHTML={{ __html: highlighted.split("\n")[i] || "&nbsp;" }}
                    style={{ whiteSpace: "pre" }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <code dangerouslySetInnerHTML={{ __html: highlighted }} style={{ whiteSpace: "pre" }} />
        )}
      </pre>
    </div>
  );
}
