import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  Search,
  Filter,
  ShieldCheck,
  CheckCheck,
  Ban,
  Calendar,
} from "lucide-react";

export default function GLVouchersApprovePage() {
  const pendingApprovals = [
    {
      voucherNo: "JV-2026-0085",
      date: "2026-11-13",
      account: "1010 - Bank / 2010 - Accounts Payable",
      verifiedBy: "Internal Auditor 1",
      amount: "$88,250.00",
      notes: "Verified against 3-way PO matching documentation",
      approvalLevel: "CFO / Director Approval",
    },
    {
      voucherNo: "JV-2026-0086",
      date: "2026-11-12",
      account: "1500 - Fixed Assets Capitalized",
      verifiedBy: "Chief Accountant",
      amount: "$145,000.00",
      notes: "Haas VF-4 CNC machining center capitalization entry",
      approvalLevel: "Board / Executive Approval",
    },
    {
      voucherNo: "JV-2026-0087",
      date: "2026-11-11",
      account: "2040 - Foreign Currency AP",
      verifiedBy: "Internal Auditor 2",
      amount: "$34,100.00",
      notes: "Forex currency conversion difference adjustment",
      approvalLevel: "Finance Manager Approval",
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
              GL Vouchers Approve
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
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
                    GL Vouchers Approve
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    Authorized executive sign-off and final general ledger posting approval gateway.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Approve &amp; Post to Ledger</span>
              </button>
            </div>
          </div>

          {/* Search & Statistics Bar */}
          <div className="p-4 bg-slate-50/70 dark:bg-[#161616] border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search voucher # or verified account..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#93032E]"
              />
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-500 dark:text-gray-400">Total Value Pending Approval:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white px-2 py-0.5 rounded bg-slate-100 dark:bg-[#202020] border border-slate-200 dark:border-white/10">
                $267,350.00
              </span>
            </div>
          </div>

          {/* Generic Placeholder for Approval Matrix & Form */}
          <div className="p-6">
            <div className="border border-dashed border-slate-300 dark:border-white/15 rounded-xl p-6 bg-slate-50/30 dark:bg-[#151515]">
              <div className="text-center py-6">
                <ShieldCheck className="w-10 h-10 mx-auto text-[#93032E] dark:text-[#ff4d79] opacity-75 mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Executive Approval Matrix &amp; Ledger Posting Workflow
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-lg mx-auto">
                  Approval thresholds, cryptographic digital signatures, reversal permissions, and direct trial-balance posting triggers will be executed from this module.
                </p>
              </div>

              {/* Table of items awaiting approval */}
              <div className="overflow-x-auto mt-4 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#191919]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#141414] border-b border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-gray-300 uppercase">
                      <th className="py-2.5 px-4">Voucher #</th>
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Account Allocation</th>
                      <th className="py-2.5 px-4">Verified By</th>
                      <th className="py-2.5 px-4">Auditor Notes</th>
                      <th className="py-2.5 px-4 text-right">Amount</th>
                      <th className="py-2.5 px-4 text-center">Required Level</th>
                      <th className="py-2.5 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {pendingApprovals.map((row) => (
                      <tr key={row.voucherNo} className="hover:bg-slate-50/80 dark:hover:bg-white/5">
                        <td className="py-2.5 px-4 font-mono font-semibold text-[#93032E] dark:text-[#ff4d79]">
                          {row.voucherNo}
                        </td>
                        <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400">{row.date}</td>
                        <td className="py-2.5 px-4 font-medium text-slate-800 dark:text-gray-200">{row.account}</td>
                        <td className="py-2.5 px-4 text-slate-600 dark:text-gray-300">{row.verifiedBy}</td>
                        <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400 truncate max-w-xs">{row.notes}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">{row.amount}</td>
                        <td className="py-2.5 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                            {row.approvalLevel}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <button
                            type="button"
                            className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#93032E] text-white hover:bg-[#a80e3b] shadow-2xs cursor-pointer"
                          >
                            Approve
                          </button>
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
