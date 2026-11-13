import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Scale,
  Calendar,
  CreditCard,
  Percent,
} from "lucide-react";

export default function LoanManagementPage() {
  const placeholderLoans = [
    {
      loanId: "LN-2024-001",
      lender: "Eastern Bank Ltd. (EBL)",
      facilityType: "Long-Term Project Financing",
      principal: "$500,000.00",
      interestRate: "8.50%",
      repaid: "$150,000.00",
      outstanding: "$350,000.00",
      maturity: "2029-12-31",
      status: "Active / Current",
    },
    {
      loanId: "LN-2025-004",
      lender: "City Bank PLC",
      facilityType: "Revolving Working Capital Line",
      principal: "$250,000.00",
      interestRate: "9.25%",
      repaid: "$100,000.00",
      outstanding: "$150,000.00",
      maturity: "2027-06-30",
      status: "Active / Current",
    },
    {
      loanId: "LN-2023-009",
      lender: "Standard Chartered Bank",
      facilityType: "Machinery Import Term Loan",
      principal: "$180,000.00",
      interestRate: "7.75%",
      repaid: "$120,000.00",
      outstanding: "$60,000.00",
      maturity: "2026-12-15",
      status: "Active / Current",
    },
    {
      loanId: "LN-2022-002",
      lender: "BRAC Bank Ltd.",
      facilityType: "SME Commercial Expansion",
      principal: "$80,000.00",
      interestRate: "9.00%",
      repaid: "$80,000.00",
      outstanding: "$0.00",
      maturity: "2025-09-30",
      status: "Fully Settled",
    },
    {
      loanId: "LN-2026-008",
      lender: "HSBC Bangladesh",
      facilityType: "Trade Export Credit Line",
      principal: "$300,000.00",
      interestRate: "8.10%",
      repaid: "$0.00",
      outstanding: "$300,000.00",
      maturity: "2028-03-31",
      status: "Disbursed",
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
              Loan Management
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
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
                    Loan Management
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    Corporate credit agreements, amortization schedules, debt servicing, and interest accruals.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-white/15 bg-white dark:bg-[#161616] text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-white/5 shadow-xs transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                <span>Record Loan Repayment</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ New Loan Facility</span>
              </button>
            </div>
          </div>

          {/* Search & Debt Exposure Controls Bar */}
          <div className="p-4 bg-slate-50/70 dark:bg-[#161616] border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search loan ID, lender institution..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#93032E]"
              />
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 dark:text-gray-400">Total Debt Exposure:</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
                  $860,000.00
                </span>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#121212] text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <Filter className="w-3 h-3 text-slate-400" />
                <span>Lender Filter</span>
              </button>
            </div>
          </div>

          {/* Data Table Placeholder */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#141414] border-b border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-gray-300 uppercase tracking-wider">
                  <th className="py-2.5 px-4">Loan ID</th>
                  <th className="py-2.5 px-4">Lending Institution</th>
                  <th className="py-2.5 px-4">Facility Type</th>
                  <th className="py-2.5 px-4 text-right">Principal</th>
                  <th className="py-2.5 px-4 text-center">Interest Rate</th>
                  <th className="py-2.5 px-4 text-right">Repaid Principal</th>
                  <th className="py-2.5 px-4 text-right">Outstanding</th>
                  <th className="py-2.5 px-4 text-center">Maturity Date</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {placeholderLoans.map((row) => (
                  <tr
                    key={row.loanId}
                    className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-2.5 px-4 font-mono font-semibold text-[#93032E] dark:text-[#ff4d79]">
                      {row.loanId}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">
                      {row.lender}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 dark:text-gray-300">
                      {row.facilityType}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-900 dark:text-white">
                      {row.principal}
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono font-semibold text-slate-700 dark:text-gray-300">
                      {row.interestRate}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-emerald-600 dark:text-emerald-400">
                      {row.repaid}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                      {row.outstanding}
                    </td>
                    <td className="py-2.5 px-4 text-center text-slate-500 dark:text-gray-400 whitespace-nowrap">
                      {row.maturity}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          row.status === "Fully Settled"
                            ? "bg-slate-100 text-slate-700 dark:bg-[#222222] dark:text-gray-300 border border-slate-200 dark:border-white/10"
                            : row.status === "Active / Current"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
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
            <span>Showing 5 corporate credit facilities</span>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <span>Page 1 of 5</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
