import Link from "next/link";
import Header from "@/components/Header";
import ItemManager from "./ItemManager";

export default function ItemsPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#151515] dark:text-white flex flex-col font-sans transition-colors duration-150">
      {/* Top Application Navigation Header */}
      <Header />

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-slate-200 dark:bg-[#181818] dark:border-white/10 transition-colors duration-150">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="hover:text-[#93032E] dark:hover:text-[#ff4d79] transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <span className="text-slate-700 dark:text-gray-300 font-medium">Commons</span>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <Link
              href="/cross-application"
              className="hover:text-[#93032E] dark:hover:text-[#ff4d79] transition-colors"
            >
              Cross Application
            </Link>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">Items</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 dark:text-gray-500 text-xs">
            <span>Module:</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-gray-300 font-mono text-[11px] border border-slate-200 dark:border-white/10">
              COMMONS-ITEM
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-4">
        <div className="bg-white dark:bg-[#191919] rounded-xl shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10 p-4 transition-colors duration-150">
          <ItemManager />
        </div>
      </main>
    </div>
  );
}
