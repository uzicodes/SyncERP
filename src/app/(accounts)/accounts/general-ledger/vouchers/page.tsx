import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  FileSpreadsheet,
  Calendar,
} from "lucide-react";

export default function GLVouchersPage() {
  const placeholderVouchers = [
    {
      voucherNo: "JV-2026-0001",
      date: "2026-11-13",
      account: "1010 - Cash at Bank (Operational)",
      narration: "Vendor payment settlement transfer",
      debit: "$28,500.00",
      credit: "-",
      preparedBy: "Accounts Officer",
      status: "Draft",
    },
    {
      voucherNo: "JV-2026-0002",
      date: "2026-11-12",
      account: "2010 - Accounts Payable Trade",
      narration: "Supplier raw materials settlement",
      debit: "-",
      credit: "$28,500.00",
      preparedBy: "Accounts Officer",
      status: "Submitted",
    },
    {
      voucherNo: "JV-2026-0003",
      date: "2026-11-11",
      account: "4010 - Product Sales Revenue",
      narration: "Commercial dispatch recognition",
      debit: "-",
      credit: "$64,200.00",
      preparedBy: "Billing Specialist",
      status: "Verified",
    },
    {
      voucherNo: "JV-2026-0004",
      date: "2026-11-10",
      account: "5010 - Factory Consumables Expense",
      narration: "Maintenance shop supply replenishment",
      debit: "$3,140.00",
      credit: "-",
      preparedBy: "Plant Accountant",
      status: "Approved",
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
              GL Vouchers
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
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
                    GL Vouchers
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    Create, view, and manage double-entry journal vouchers and account allocations.
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
                <span>Export Vouchers</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Create Voucher</span>
              </button>
            </div>
          </div>

          {/* Search, Date Filter & Controls */}
          <div className="p-4 bg-slate-50/70 dark:bg-[#161616] border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search voucher #, account, or narration..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#93032E]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-lg text-xs text-slate-600 dark:text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Fiscal Month: November 2026</span>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#121212] text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Generic Placeholder Container for Data Table or Form */}
          <div className="p-6">
            <div className="border border-dashed border-slate-300 dark:border-white/15 rounded-xl p-6 bg-slate-50/30 dark:bg-[#151515]">
              <div className="text-center py-6">
                <FileSpreadsheet className="w-10 h-10 mx-auto text-[#93032E] dark:text-[#ff4d79] opacity-75 mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  GL Vouchers Data Table &amp; Entry Form Placeholder
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-lg mx-auto">
                  Interactive voucher line-item grids, debit/credit balancing calculators, cost-center tags, and supporting document attachments will be rendered in this area.
                </p>
              </div>

              {/* Sample Voucher Records Table */}
              <div className="overflow-x-auto mt-4 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#191919]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#141414] border-b border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-gray-300 uppercase">
                      <th className="py-2.5 px-4">Voucher #</th>
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Account</th>
                      <th className="py-2.5 px-4">Narration</th>
                      <th className="py-2.5 px-4 text-right">Debit ($)</th>
                      <th className="py-2.5 px-4 text-right">Credit ($)</th>
                      <th className="py-2.5 px-4">Prepared By</th>
                      <th className="py-2.5 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {placeholderVouchers.map((row) => (
                      <tr key={row.voucherNo} className="hover:bg-slate-50/80 dark:hover:bg-white/5">
                        <td className="py-2.5 px-4 font-mono font-semibold text-[#93032E] dark:text-[#ff4d79]">
                          {row.voucherNo}
                        </td>
                        <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400">{row.date}</td>
                        <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">{row.account}</td>
                        <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400 truncate max-w-xs">{row.narration}</td>
                        <td className="py-2.5 px-4 text-right font-mono">{row.debit}</td>
                        <td className="py-2.5 px-4 text-right font-mono">{row.credit}</td>
                        <td className="py-2.5 px-4 text-slate-600 dark:text-gray-300">{row.preparedBy}</td>
                        <td className="py-2.5 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 dark:bg-[#222] dark:text-gray-300 border border-slate-200 dark:border-white/10">
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
