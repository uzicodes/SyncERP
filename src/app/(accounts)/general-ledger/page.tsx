import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  BookOpen,
  Calendar,
  FileSpreadsheet,
} from "lucide-react";

export default function GeneralLedgerPage() {
  const placeholderVouchers = [
    {
      voucherNo: "JV-2026-00101",
      date: "2026-11-10",
      account: "1010 - Operating Cash / Bank",
      narration: "Monthly payroll disbursement transfer",
      debit: "$45,000.00",
      credit: "-",
      reference: "PAY-NOV-26",
      status: "Posted",
    },
    {
      voucherNo: "JV-2026-00102",
      date: "2026-11-09",
      account: "2010 - Trade Accounts Payable",
      narration: "Vendor invoice settlement - SU--1 LTD",
      debit: "$12,450.00",
      credit: "-",
      reference: "INV-SU1-8841",
      status: "Posted",
    },
    {
      voucherNo: "JV-2026-00103",
      date: "2026-11-08",
      account: "4010 - Product Sales Revenue",
      narration: "Commercial sales recognition - Steam Corp",
      debit: "-",
      credit: "$78,200.00",
      reference: "SO-99201",
      status: "Posted",
    },
    {
      voucherNo: "JV-2026-00104",
      date: "2026-11-07",
      account: "1200 - Inventory Raw Materials",
      narration: "Goods receipt note batch absorption",
      debit: "$34,100.00",
      credit: "-",
      reference: "GRN-2026-304",
      status: "Pending Audit",
    },
    {
      voucherNo: "JV-2026-00105",
      date: "2026-11-06",
      account: "5020 - Factory Utility Expenses",
      narration: "Electricity & power grid utility bill",
      debit: "$6,800.00",
      credit: "-",
      reference: "UTIL-OCT-02",
      status: "Draft",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#151515] dark:text-white flex flex-col font-sans transition-colors duration-150">
      <Header />

      {/* Breadcrumb Navigation & Back to Accounts Link */}
      <div className="bg-white border-b border-slate-200 dark:bg-[#181818] dark:border-white/10 transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-slate-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="hover:text-[#93032E] dark:hover:text-[#ff4d79] transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <Link
              href="/accounts"
              className="hover:text-[#93032E] dark:hover:text-[#ff4d79] transition-colors"
            >
              Accounts
            </Link>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">
              General Ledger
            </span>
          </div>

          <Link
            href="/accounts"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#93032E] dark:text-[#ff4d79] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Accounts</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white dark:bg-[#191919] rounded-xl shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col transition-colors duration-150">
          {/* Page Header */}
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#93032E]/10 dark:bg-[#93032E]/20 flex items-center justify-center text-[#93032E] dark:text-[#ff4d79]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
                    General Ledger
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    Maintain chart of accounts, journal entries, and real-time trial balance reporting.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#161616] text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Ledger</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ New Journal Entry</span>
              </button>
            </div>
          </div>

          {/* Search, Date Filter & Controls Bar */}
          <div className="p-4 bg-slate-50/70 dark:bg-[#161616] border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search voucher #, account, or reference..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#93032E]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-lg text-xs text-slate-600 dark:text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Current Fiscal Period (FY2026-Q4)</span>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#121212] text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Data Table Placeholder */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#141414] border-b border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-gray-300 uppercase tracking-wider">
                  <th className="py-2.5 px-4">Voucher #</th>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Account &amp; Description</th>
                  <th className="py-2.5 px-4">Reference</th>
                  <th className="py-2.5 px-4 text-right">Debit ($)</th>
                  <th className="py-2.5 px-4 text-right">Credit ($)</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {placeholderVouchers.map((row) => (
                  <tr
                    key={row.voucherNo}
                    className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-2.5 px-4 font-mono font-semibold text-[#93032E] dark:text-[#ff4d79]">
                      {row.voucherNo}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400 whitespace-nowrap">
                      {row.date}
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {row.account}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-gray-400 truncate max-w-xs">
                        {row.narration}
                      </div>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-600 dark:text-gray-300">
                      {row.reference}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-900 dark:text-white">
                      {row.debit}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-900 dark:text-white">
                      {row.credit}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          row.status === "Posted"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : row.status === "Pending Audit"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                            : "bg-slate-100 text-slate-700 dark:bg-[#222222] dark:text-gray-300 border border-slate-200 dark:border-white/10"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-3 bg-slate-50/50 dark:bg-[#161616] border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-gray-400">
            <span>Showing 5 recent journal postings</span>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <span>Page 1 of 42</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
