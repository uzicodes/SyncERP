import Link from "next/link";
import Header from "@/components/Header";
import {
  Users,
  Building2,
  Package,
  ListFilter,
  ChevronRight,
} from "lucide-react";

interface HubCard {
  title: string;
  href: string;
  icon: typeof Users;
}

const HUB_CARDS: HubCard[] = [
  {
    title: "Customers",
    href: "/cross-application/customers",
    icon: Users,
  },
  {
    title: "Suppliers",
    href: "/cross-application/suppliers",
    icon: Building2,
  },
  {
    title: "Items",
    href: "/cross-application/items",
    icon: Package,
  },
];

export default function CrossApplicationHubPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#151515] dark:text-white flex flex-col font-sans transition-colors duration-150">
      {/* Top Application Navigation Header */}
      <Header />

      {/* Breadcrumb Navigation Bar */}
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
            <span className="text-slate-700 dark:text-gray-300 font-medium">Commons</span>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">
              Cross Application
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 dark:text-gray-500 text-xs">
            <span>Module:</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-gray-300 font-mono text-[11px] border border-slate-200 dark:border-white/10">
              COMMONS-XAPP
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white dark:bg-[#191919] rounded-xl shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col transition-colors duration-150">
          {/* Hub Header Section */}
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-white/10 flex items-center justify-center text-center bg-slate-50/50 dark:bg-[#161616]">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight text-center">
              Cross Application Management
            </h1>
          </div>

          {/* Sub-Modules Grid */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HUB_CARDS.map((card) => {
                const IconComponent = card.icon;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group relative flex items-center justify-between bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-[#93032E]/60 dark:hover:border-[#93032E]/60 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-[#1f1f1f] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white group-hover:bg-[#93032E]/10 dark:group-hover:bg-[#93032E]/20 group-hover:text-[#93032E] dark:group-hover:text-[#ff4d79] group-hover:border-[#93032E]/30 transition-all">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#93032E] dark:group-hover:text-[#ff4d79] transition-colors">
                        {card.title}
                      </h2>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#93032E] dark:group-hover:text-[#ff4d79] group-hover:translate-x-1 transition-all" />
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

