import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  ArrowDownLeft,
  Calendar,
  CreditCard,
} from "lucide-react";

export default function AccountsReceivablePage() {
  const placeholderReceivables = [
    {
      invoiceNo: "INV-2026-8091",
      customer: "Steam (Valve Corp)",
      issueDate: "2026-10-15",
      dueDate: "2026-11-14",
      amount: "$124,500.00",
      balanceDue: "$124,500.00",
      aging: "Current",
      status: "Unpaid",
    },
    {
      invoiceNo: "INV-2026-8092",
      customer: "Apex Precision Engineering",
      issueDate: "2026-10-01",
      dueDate: "2026-10-31",
      amount: "$42,300.00",
      balanceDue: "$14,800.00",
      aging: "1-30 Days Overdue",
      status: "Partially Paid",
    },
    {
      invoiceNo: "INV-2026-8093",
      customer: "Mustafiz LTD",
      issueDate: "2026-09-20",
      dueDate: "2026-10-20",
      amount: "$68,900.00",
      balanceDue: "$68,900.00",
      aging: "31-60 Days Overdue",
      status: "Overdue",
    },
    {
      invoiceNo: "INV-2026-8094",
      customer: "Global Logistics Network",
      issueDate: "2026-11-01",
      dueDate: "2026-12-01",
      amount: "$19,250.00",
      balanceDue: "$19,250.00",
      aging: "Current",
      status: "Unpaid",
    },
    {
      invoiceNo: "INV-2026-8095",
      customer: "Horizon Retail Distributors",
      issueDate: "2026-10-10",
      dueDate: "2026-11-10",
      amount: "$8,400.00",
      balanceDue: "$0.00",
      aging: "Settled",
      status: "Paid",
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
              Accounts Receivable
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
                  <ArrowDownLeft className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
                    Accounts Receivable
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    Manage client billing, payment receipts, aging balances, and customer credit exposure.
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
                <span>Receive Payment</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ New Sales Invoice</span>
              </button>
            </div>
          </div>

          {/* Search & Aging Controls Bar */}
          <div className="p-4 bg-slate-50/70 dark:bg-[#161616] border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search invoice #, customer name..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#93032E]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 dark:text-gray-400">Total Outstanding:</span>
              <span className="text-xs font-mono font-bold text-[#93032E] dark:text-[#ff4d79] px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60">
                $227,450.00
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-200 dark:border-white/10 rounded-lg bg-white dark:bg-[#121212] text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Aging Buckets</span>
              </button>
            </div>
          </div>

          {/* Data Table Placeholder */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#141414] border-b border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-gray-300 uppercase tracking-wider">
                  <th className="py-2.5 px-4">Invoice #</th>
                  <th className="py-2.5 px-4">Customer</th>
                  <th className="py-2.5 px-4">Issue Date</th>
                  <th className="py-2.5 px-4">Due Date</th>
                  <th className="py-2.5 px-4 text-right">Invoice Amount</th>
                  <th className="py-2.5 px-4 text-right">Balance Due</th>
                  <th className="py-2.5 px-4 text-center">Aging</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {placeholderReceivables.map((row) => (
                  <tr
                    key={row.invoiceNo}
                    className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-2.5 px-4 font-mono font-semibold text-[#93032E] dark:text-[#ff4d79]">
                      {row.invoiceNo}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">
                      {row.customer}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400 whitespace-nowrap">
                      {row.issueDate}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 dark:text-gray-400 whitespace-nowrap">
                      {row.dueDate}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-900 dark:text-white">
                      {row.amount}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                      {row.balanceDue}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="font-mono text-[10px] text-slate-600 dark:text-gray-400">
                        {row.aging}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          row.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : row.status === "Partially Paid"
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                            : row.status === "Overdue"
                            ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
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

          {/* Table Footer */}
          <div className="p-3 bg-slate-50/50 dark:bg-[#161616] border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-gray-400">
            <span>Showing 5 client invoices</span>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              <span>Page 1 of 18</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
