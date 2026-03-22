"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Search, X, Command, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALL_NAV_ITEMS } from "@/lib/nav";
import { MethodBadge } from "@/components/ui/MethodBadge";
import { useTheme } from "next-themes";
import type { HttpMethod } from "@/types";

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const results = query.trim()
    ? ALL_NAV_ITEMS.filter(i =>
        i.label.toLowerCase().includes(query.toLowerCase()) ||
        i.id.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4" onClick={onClose}>
      <div className="w-full max-w-xl rounded-xl shadow-2xl overflow-hidden dark:bg-[#161b22] bg-white border dark:border-[#30363d] border-gray-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b dark:border-[#21262d] border-gray-200">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search documentation…"
            className="flex-1 bg-transparent dark:text-[#e1e4e8] text-gray-800 text-sm outline-none placeholder:text-gray-400" />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-[#e1e4e8]"><X size={15} /></button>
        </div>
        {results.length > 0 ? (
          <ul className="py-2 max-h-80 overflow-y-auto">
            {results.map(item => (
              <li key={item.id}>
                <Link href={item.href} onClick={onClose}
                  className="flex items-center gap-3 px-4 py-2.5 dark:hover:bg-[#21262d] hover:bg-gray-50 transition-colors">
                  {item.method ? <MethodBadge method={item.method as HttpMethod} size="sm" /> : <span className="w-8" />}
                  <div className="flex-1 min-w-0">
                    <p className="dark:text-[#e1e4e8] text-gray-800 text-sm truncate">{item.label}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : query ? (
          <div className="px-4 py-8 text-center text-gray-400 text-sm">No results for &quot;{query}&quot;</div>
        ) : (
          <div className="px-4 py-6 text-center text-gray-400 text-xs">Start typing to search docs…</div>
        )}
      </div>
    </div>
  );
}

export function TopNav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 h-14 flex items-center gap-4 px-5 dark:bg-[#0d1117]/95 bg-white/95 backdrop-blur-sm border-b dark:border-[#21262d] border-gray-200 transition-colors">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo-black.png"
            alt="bigbrosai logo"
            width={150}
            height={40}
            className="h-8 w-auto dark:block hidden"
            priority
          />
          <Image
            src="/logo.png"
            alt="bigbrosai logo"
            width={150}
            height={40}
            className="h-8 w-auto dark:hidden block"
            priority
          />
        </Link>

        <div className="flex-1" />

        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 dark:bg-[#161b22] bg-gray-100 border dark:border-[#30363d] border-gray-200 rounded-lg dark:text-[#6a737d] text-gray-500 text-sm hover:dark:border-[#58a6ff]/40 hover:border-[#22c55e]/60 transition-colors min-w-[180px]"
        >
          <Search size={13} />
          <span className="flex-1 text-left text-xs">Search docs…</span>
          <span className="flex items-center gap-0.5 text-[0.65rem] font-mono dark:bg-[#21262d] bg-gray-200 px-1.5 py-0.5 rounded border dark:border-[#30363d] border-gray-300 dark:text-[#6a737d] text-gray-400">
            <Command size={9} />K
          </span>
        </button>

        {/* Version */}
        <span className="hidden sm:inline-block text-[0.7rem] font-mono text-[#22c55e] bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded-full">
          v1
        </span>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-8 h-8 flex items-center justify-center rounded-lg dark:bg-[#161b22] bg-gray-100 dark:border-[#30363d] border border-gray-200 dark:text-[#8b949e] text-gray-500 hover:dark:text-[#e1e4e8] hover:text-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
