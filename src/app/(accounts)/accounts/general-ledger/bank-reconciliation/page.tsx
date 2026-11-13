import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Landmark,
  UploadCloud,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export default function BankReconciliationPage() {
  const placeholderReconciliations = [
    {
      recId: "REC-2026-10",
      bankAccount: "Eastern Bank Ltd. - Operating (A/C: ...8201)",
      statementDate: "2026-10-31",
      bankBalance: "$342,150.00",
      bookBalance: "$338,400.00",
      difference: "$3,750.00",
      unclearedDeposits: "$5,200.00",
      unpresentedCheques: "$1,450.00",
      status: "Reconciled",
    },
    {
      recId: "REC-2026-11",
      bankAccount: "Eastern Bank Ltd. - Operating (A/C: ...8201)",
      statementDate: "2026-11-13 (Interim)",
      bankBalance: "$298,400.00",
      bookBalance: "$291,200.00",
      difference: "$7,200.00",
      unclearedDeposits: "$9,800.00",
      unpresentedCheques: "$2,600.00",
      status: "In Progress",
    },
    {
      recId: "REC-2026-09",
      bankAccount: "City Bank PLC - Capex & Facilities (A/C: ...4410)",
      statementDate: "2026-10-31",
      bankBalance: "$115,000.00",
      bookBalance: "$115,000.00",
      difference: "$0.00",
      unclearedDeposits: "$0.00",
      unpresentedCheques: "$0.00",
      status: "Balanced / Closed",
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
              Bank Reconciliation
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
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
                    Bank Reconciliation
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    Match internal cash book entries with electronic bank feeds and statement clearing runs.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#161616] text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 shadow-xs transition-colors"
              >
                <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
                <span>Import Statement</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ New Reconciliation Run</span>
              </button>
            </div>
          </div>

          {/* Search & Account Selection Controls */}
          <div className="p-4 bg-slate-50/70 dark:bg-[#161616] border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search bank account or reconciliation ID..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#93032E]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-gray-400">Selected Account:</span>
              <select className="h-7 px-2 text-xs bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white">
                <option>Eastern Bank Ltd. - Operating (...8201)</option>
                <option>City Bank PLC - Capex &amp; Facilities (...4410)</option>
                <option>Standard Chartered - USD Trade (...0912)</option>
              </select>
            </div>
          </div>

          {/* Generic Placeholder for Bank Reconciliation Workspace */}
          <div className="p-6">
            <div className="border border-dashed border-slate-300 dark:border-white/15 rounded-xl p-6 bg-slate-50/30 dark:bg-[#151515]">
              <div className="text-center py-6">
                <Landmark className="w-10 h-10 mx-auto text-[#93032E] dark:text-[#ff4d79] opacity-75 mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Bank Reconciliation Workspace &amp; Statement Clearing Form
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-lg mx-auto">
                  Automated CSV/MT940 bank statement parsers, unpresented cheque listings, uncleared deposits in transit, and automatic journal balancing adjustments will be managed here.
                </p>
              </div>

              {/* Table of reconciliation runs */}
              <div className="overflow-x-auto mt-4 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#191919]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#141414] border-b border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-gray-300 uppercase">
                      <th className="py-2.5 px-4">Run #</th>
                      <th className="py-2.5 px-4">Bank Account</th>
                      <th className="py-2.5 px-4">Period Date</th>
                      <th className="py-2.5 px-4 text-right">Statement Balance</th>
                      <th className="py-2.5 px-4 text-right">Book Balance</th>
                      <th className="py-2.5 px-4 text-right">Difference</th>
                      <th className="py-2.5 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {placeholderReconciliations.map((row) => (
                      <tr key={row.recId} className="hover:bg-slate-50/80 dark:hover:bg-white/5">
                        <td className="py-2.5 px-4 font-mono font-semibold text-[#93032E] dark:text-[#ff4d79]">
                          {row.recId}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">{row.bankAccount}</td>
                        <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400">{row.statementDate}</td>
                        <td className="py-2.5 px-4 text-right font-mono">{row.bankBalance}</td>
                        <td className="py-2.5 px-4 text-right font-mono">{row.bookBalance}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">{row.difference}</td>
                        <td className="py-2.5 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              row.status.includes("Closed") || row.status.includes("Reconciled")
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                                : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
