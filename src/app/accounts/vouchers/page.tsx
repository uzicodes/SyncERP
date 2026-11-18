import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import VoucherManager from "./VoucherManager";
import { ArrowLeft, FileSpreadsheet, ShieldCheck, Loader2 } from "lucide-react";

export default function VouchersPage() {
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
            <Link
              href="/accounts/general-ledger"
              className="hover:text-[#93032E] dark:hover:text-[#ff4d79] transition-colors"
            >
              Accounts
            </Link>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">Vouchers</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 dark:text-gray-500 text-xs">
            <Link
              href="/accounts/general-ledger"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#93032E] transition-colors mr-2"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to General Ledger
            </Link>
            <span>Module:</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-gray-300 font-mono text-[11px] border border-slate-200 dark:border-white/10">
              ACC-VOUCHERS
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-4">
        {/* Page Title & Context Header */}
        <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#93032E]/10 dark:bg-[#93032E]/20 flex items-center justify-center text-[#93032E]">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Voucher Master & Management
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              Double-entry financial voucher entries (JV, PV, RV, CV), ledger allocations, and real-time GL balancing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Double-Entry Integrity Active
            </span>
          </div>
        </div>

        {/* Voucher Manager Client Component wrapped in Suspense for PPR */}
        <Suspense
          fallback={
            <div className="bg-white dark:bg-[#191919] rounded-xl border border-slate-200 dark:border-white/10 p-12 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#93032E]" />
              <span className="text-xs text-slate-500">Loading Voucher Master...</span>
            </div>
          }
        >
          <VoucherManager />
        </Suspense>
      </main>
    </div>
  );
}
