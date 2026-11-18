import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  CalendarCheck,
  Lock,
  Play,
  RotateCcw,
  AlertTriangle,
  History,
} from "lucide-react";

export default function YearEndProcessingPage() {
  const previousYearClosures = [
    {
      fiscalYear: "FY2025 (Jan 01, 2025 - Dec 31, 2025)",
      closedDate: "2026-01-15",
      closedBy: "CFO (Executive Office)",
      netProfitLoss: "+$842,500.00",
      retainedEarningsTransfer: "$842,500.00 to Account 3010",
      status: "Closed & Locked",
    },
    {
      fiscalYear: "FY2024 (Jan 01, 2024 - Dec 31, 2024)",
      closedDate: "2025-01-14",
      closedBy: "Chief Accountant",
      netProfitLoss: "+$615,200.00",
      retainedEarningsTransfer: "$615,200.00 to Account 3010",
      status: "Closed & Locked",
    },
    {
      fiscalYear: "FY2023 (Jan 01, 2023 - Dec 31, 2023)",
      closedDate: "2024-01-20",
      closedBy: "Managing Director",
      netProfitLoss: "+$490,100.00",
      retainedEarningsTransfer: "$490,100.00 to Account 3010",
      status: "Closed & Locked",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#151515] dark:text-white flex flex-col font-sans transition-colors duration-150">
      <Header />

      {/* Breadcrumb Navigation & Back to GL Link */}
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
            <Link
              href="/accounts/general-ledger"
              className="hover:text-[#93032E] dark:hover:text-[#ff4d79] transition-colors"
            >
              General Ledger
            </Link>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">
              Year End Processing
            </span>
          </div>

          <Link
            href="/accounts/general-ledger"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#93032E] dark:text-[#ff4d79] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to General Ledger</span>
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
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
                    Year End Processing
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    Execute fiscal year closing routines, balance roll-forwards, and retained earnings allocations.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Run Year-End Wizard</span>
              </button>
            </div>
          </div>

          {/* Current Fiscal Year Status Banner */}
          <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border-b border-amber-200/70 dark:border-amber-900/40 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                <strong>Active Open Period:</strong> Fiscal Year 2026 (Ending December 31, 2026). Year-end routines require all draft vouchers to be verified and posted.
              </span>
            </div>
            <span className="font-mono font-semibold px-2 py-0.5 rounded bg-white dark:bg-[#121212] border border-amber-300 dark:border-amber-800 text-[11px]">
              Q4 In Progress
            </span>
          </div>

          {/* Generic Placeholder for Year-End Procedures & Form */}
          <div className="p-6">
            <div className="border border-dashed border-slate-300 dark:border-white/15 rounded-xl p-6 bg-slate-50/30 dark:bg-[#151515]">
              <div className="text-center py-6">
                <CalendarCheck className="w-10 h-10 mx-auto text-[#93032E] dark:text-[#ff4d79] opacity-75 mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Fiscal Year Closure &amp; Roll-Forward Processing Workspace
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-lg mx-auto">
                  Step-by-step wizard routines: (1) Pre-closing Trial Balance validation, (2) Profit &amp; Loss expense/revenue account zeroing, (3) Net earnings transfer to Retained Capital, and (4) Opening Balance ledger instantiation for the next fiscal year.
                </p>
              </div>

              {/* Historical Year Closures Table */}
              <div className="overflow-x-auto mt-4 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#191919]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#141414] border-b border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-gray-300 uppercase">
                      <th className="py-2.5 px-4">Fiscal Period</th>
                      <th className="py-2.5 px-4">Date Closed</th>
                      <th className="py-2.5 px-4">Executed By</th>
                      <th className="py-2.5 px-4 text-right">Net P&amp;L Result</th>
                      <th className="py-2.5 px-4">Retained Earnings Destination</th>
                      <th className="py-2.5 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {previousYearClosures.map((row) => (
                      <tr key={row.fiscalYear} className="hover:bg-slate-50/80 dark:hover:bg-white/5">
                        <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">{row.fiscalYear}</td>
                        <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400">{row.closedDate}</td>
                        <td className="py-2.5 px-4 text-slate-600 dark:text-gray-300">{row.closedBy}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">{row.netProfitLoss}</td>
                        <td className="py-2.5 px-4 font-mono text-[11px] text-slate-600 dark:text-gray-300">{row.retainedEarningsTransfer}</td>
                        <td className="py-2.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 dark:bg-[#222] dark:text-gray-300 border border-slate-200 dark:border-white/10">
                            <Lock className="w-3 h-3 text-slate-400" />
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
