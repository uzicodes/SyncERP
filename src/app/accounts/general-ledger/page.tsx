import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  FileSpreadsheet,
  FileCheck,
  ShieldCheck,
  CreditCard,
  ReceiptText,
  Landmark,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";

interface GLProcessCard {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const GL_PROCESSES: GLProcessCard[] = [
  {
    title: "GL Vouchers",
    href: "/accounts/general-ledger/vouchers",
    icon: FileSpreadsheet,
  },
  {
    title: "GL Vouchers Verify",
    href: "/accounts/general-ledger/vouchers-verify",
    icon: FileCheck,
  },
  {
    title: "GL Vouchers Approve",
    href: "/accounts/general-ledger/vouchers-approve",
    icon: ShieldCheck,
  },
  {
    title: "GL Advance Payment",
    href: "/accounts/general-ledger/advance-payment",
    icon: CreditCard,
  },
  {
    title: "PO Payment Dashboard",
    href: "/accounts/general-ledger/po-payment",
    icon: ReceiptText,
  },
  {
    title: "Bank Reconciliation",
    href: "/accounts/general-ledger/bank-reconciliation",
    icon: Landmark,
  },
  {
    title: "Year End Processing",
    href: "/accounts/general-ledger/year-end",
    icon: CalendarCheck,
  },
];

export default function GeneralLedgerHubPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#151515] dark:text-white flex flex-col font-sans transition-colors duration-150">
      {/* Top Application Navigation Header */}
      <Header />

      {/* Breadcrumb Navigation Bar & Back to Accounts Button */}
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

          {/* Subtle Back to Accounts Button */}
          <Link
            href="/accounts"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#141414] hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-300 hover:text-[#93032E] dark:hover:text-[#ff4d79] transition-all font-medium text-xs shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Accounts</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white dark:bg-[#191919] rounded-xl shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col transition-colors duration-150">
          {/* Header Section */}
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-white/10 flex items-center justify-center text-center bg-slate-50/50 dark:bg-[#161616]">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
              General Ledger
            </h1>
          </div>

          {/* Sub-Modules Grid */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GL_PROCESSES.map((card) => {
                const IconComponent = card.icon;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group relative flex items-center justify-between bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-[#93032E]/60 dark:hover:border-[#93032E]/60 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-[#1f1f1f] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white group-hover:bg-[#93032E]/10 dark:group-hover:bg-[#93032E]/20 group-hover:text-[#93032E] dark:group-hover:text-[#ff4d79] group-hover:border-[#93032E]/30 transition-all shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h2 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#93032E] dark:group-hover:text-[#ff4d79] transition-colors">
                        {card.title}
                      </h2>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#93032E] dark:group-hover:text-[#ff4d79] group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
