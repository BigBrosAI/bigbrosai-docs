import { TopNav } from "@/components/layout/TopNav";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark:bg-[#0d1117] bg-white dark:text-[#e1e4e8] text-gray-800 transition-colors">
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 max-w-4xl px-8 py-10 pb-24">
          {children}
        </main>
      </div>
    </div>
  );
}
