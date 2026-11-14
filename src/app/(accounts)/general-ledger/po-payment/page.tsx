import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  ReceiptText,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function POPaymentDashboardPage() {
  const placeholderPOPayments = [
    {
      poNumber: "PO-2026-9041",
      supplier: "Once Human",
      poDate: "2026-10-25",
      orderValue: "$75,000.00",
      invoiced: "$75,000.00",
      paid: "$50,000.00",
      remaining: "$25,000.00",
      paymentStage: "Milestone 2 Pending",
      status: "In Progress",
    },
    {
      poNumber: "PO-2026-9042",
      supplier: "SU--1 LTD",
      poDate: "2026-10-18",
      orderValue: "$180,000.00",
      invoiced: "$180,000.00",
      paid: "$0.00",
      remaining: "$180,000.00",
      paymentStage: "Full Payment Due Net-30",
      status: "Due for Payment",
    },
    {
      poNumber: "PO-2026-9043",
      supplier: "MuffinTech Solutions Ltd.",
      poDate: "2026-11-01",
      orderValue: "$32,400.00",
      invoiced: "$0.00",
      paid: "$0.00",
      remaining: "$32,400.00",
      paymentStage: "Awaiting Goods Receipt (GRN)",
      status: "Unfulfilled",
    },
    {
      poNumber: "PO-2026-9044",
      supplier: "MistakeFree Operations Group",
      poDate: "2026-09-15",
      orderValue: "$45,000.00",
      invoiced: "$45,000.00",
      paid: "$45,000.00",
      remaining: "$0.00",
      paymentStage: "Completed",
      status: "Settled",
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
              PO Payment Dashboard
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
                  <ReceiptText className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
                    PO Payment Dashboard
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    End-to-end purchase order procurement settlement pipeline, GRN matching, and payment milestones.
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
                <span>Export PO Pipeline</span>
              </button>
            </div>
          </div>

          {/* Search & Metrics Bar */}
          <div className="p-4 bg-slate-50/70 dark:bg-[#161616] border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search PO # or supplier name..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#93032E]"
              />
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 dark:text-gray-400">Total Pipeline Value:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">$332,400.00</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 dark:text-gray-400">Due for Payment:</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
                  $205,000.00
                </span>
              </div>
            </div>
          </div>

          {/* Generic Placeholder for PO Dashboard Grid & Pipeline Form */}
          <div className="p-6">
            <div className="border border-dashed border-slate-300 dark:border-white/15 rounded-xl p-6 bg-slate-50/30 dark:bg-[#151515]">
              <div className="text-center py-6">
                <ReceiptText className="w-10 h-10 mx-auto text-[#93032E] dark:text-[#ff4d79] opacity-75 mb-2" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  PO Payment Lifecycle &amp; Disbursement Tracking Grid
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-lg mx-auto">
                  Automated three-way invoice matching against Purchase Orders and Goods Received Notes (GRN), retaining tax withholdings, and tracking partial release payments.
                </p>
              </div>

              {/* Table of PO payments */}
              <div className="overflow-x-auto mt-4 border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#191919]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#141414] border-b border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-gray-300 uppercase">
                      <th className="py-2.5 px-4">PO #</th>
                      <th className="py-2.5 px-4">Supplier</th>
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4 text-right">Order Value</th>
                      <th className="py-2.5 px-4 text-right">Invoiced</th>
                      <th className="py-2.5 px-4 text-right">Paid</th>
                      <th className="py-2.5 px-4 text-right">Remaining</th>
                      <th className="py-2.5 px-4">Milestone</th>
                      <th className="py-2.5 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {placeholderPOPayments.map((row) => (
                      <tr key={row.poNumber} className="hover:bg-slate-50/80 dark:hover:bg-white/5">
                        <td className="py-2.5 px-4 font-mono font-semibold text-[#93032E] dark:text-[#ff4d79]">
                          {row.poNumber}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">{row.supplier}</td>
                        <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400">{row.poDate}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-slate-900 dark:text-white">{row.orderValue}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-slate-600 dark:text-gray-300">{row.invoiced}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-emerald-600 dark:text-emerald-400">{row.paid}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">{row.remaining}</td>
                        <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400 text-[11px]">{row.paymentStage}</td>
                        <td className="py-2.5 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              row.status === "Settled"
                                ? "bg-slate-100 text-slate-700 dark:bg-[#222] dark:text-gray-300 border border-slate-200 dark:border-white/10"
                                : row.status === "Due for Payment"
                                ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                                : row.status === "In Progress"
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
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
