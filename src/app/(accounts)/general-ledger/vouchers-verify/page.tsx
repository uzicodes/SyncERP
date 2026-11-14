import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  FileCheck,
  Check,
  X,
  Calendar,
} from "lucide-react";

export default function GLVouchersVerifyPage() {
  const pendingVerifications = [
    {
      voucherNo: "JV-2026-0089",
      date: "2026-11-13",
      sourceModule: "Accounts Payable",
      submittedBy: "Kamal Hasan (AP Officer)",
      amount: "$18,400.00",
      description: "Supplier bill settlement batch clearance",
      lines: 4,
      verificationStatus: "Pending Audit",
    },
    {
      voucherNo: "JV-2026-0090",
      date: "2026-11-12",
      sourceModule: "Petty Cash",
      submittedBy: "Rafiqul Islam (Admin)",
      amount: "$510.50",
      description: "Consolidated November petty cash reimbursement",
      lines: 6,
      verificationStatus: "Pending Audit",
    },
    {
      voucherNo: "JV-2026-0091",
      date: "2026-11-12",
      sourceModule: "General Ledger",
      submittedBy: "Tanvir Ahmed (Senior Accountant)",
      amount: "$125,000.00",
      description: "Intercompany fund reclassification - Chittagong Branch",
      lines: 2,
      verificationStatus: "Under Review",
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
              GL Vouchers Verify
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
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
                    GL Vouchers Verify
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    Internal audit review queue for draft vouchers prior to final executive approval.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Verify Selected</span>
              </button>
            </div>
          </div>

          {/* Search & Status Bar */}
          <div className="p-4 bg-slate-50/70 dark:bg-[#161616] border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search voucher # or submitter..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#93032E]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-gray-400">Awaiting Verification:</span>
              <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60">
                3 Vouchers
              </span>
            </div>
          </div>

          {/* Generic Placeholder for Verification Queue & Form */}
          <div className="p-6">
            <div className="border border-dashed border-slate-300 dark:border-white/15 rounded-xl p-6 bg-slate-50/30 dark:bg-[#151515]">
              <div className="text-center py-6">
                <FileCheck className="w-10 h-10 mx-auto text-[#93032E] dark:text-[#ff4d79] opacity-75 mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Voucher Verification Queue &amp; Audit Log Placeholder
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-lg mx-auto">
                  Supporting document preview, account head reconciliation checks, discrepancy notes, and audit sign-off workflows will be managed here.
                </p>
              </div>

              {/* Table of pending verification items */}
              <div className="overflow-x-auto mt-4 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#191919]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#141414] border-b border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-gray-300 uppercase">
                      <th className="py-2.5 px-4">Voucher #</th>
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Module</th>
                      <th className="py-2.5 px-4">Submitted By</th>
                      <th className="py-2.5 px-4">Description</th>
                      <th className="py-2.5 px-4 text-right">Amount</th>
                      <th className="py-2.5 px-4 text-center">Status</th>
                      <th className="py-2.5 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {pendingVerifications.map((row) => (
                      <tr key={row.voucherNo} className="hover:bg-slate-50/80 dark:hover:bg-white/5">
                        <td className="py-2.5 px-4 font-mono font-semibold text-[#93032E] dark:text-[#ff4d79]">
                          {row.voucherNo}
                        </td>
                        <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400">{row.date}</td>
                        <td className="py-2.5 px-4 font-medium text-slate-800 dark:text-gray-200">{row.sourceModule}</td>
                        <td className="py-2.5 px-4 text-slate-600 dark:text-gray-300">{row.submittedBy}</td>
                        <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400 truncate max-w-xs">{row.description}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">{row.amount}</td>
                        <td className="py-2.5 px-4 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            {row.verificationStatus}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              className="px-2 py-0.5 text-[11px] font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                            >
                              Verify
                            </button>
                            <button
                              type="button"
                              className="px-2 py-0.5 text-[11px] font-semibold rounded bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
                            >
                              Reject
                            </button>
                          </div>
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
