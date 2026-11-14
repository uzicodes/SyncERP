import Link from "next/link";
import Header from "@/components/Header";
import {
  Boxes,
  ArrowRightLeft,
  Warehouse,
  ClipboardCheck,
  TrendingDown,
  BadgeDollarSign,
  ChevronRight,
  PackageCheck,
  AlertTriangle,
  Layers,
  ArrowUpRight,
} from "lucide-react";

interface InventoryCard {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  stat: string;
  statLabel: string;
}

const INVENTORY_CARDS: InventoryCard[] = [
  {
    title: "Stock Overview",
    description: "Real-time visibility into on-hand, allocated, and available balances across facilities.",
    href: "/inventory/stock-overview",
    icon: Boxes,
    stat: "1,480 SKUs",
    statLabel: "Total Active Items",
  },
  {
    title: "Goods Movement",
    description: "Receipts (GRN), delivery dispatch, internal bin transfers, and stock adjustments.",
    href: "/inventory/goods-movement",
    icon: ArrowRightLeft,
    stat: "24 Transfers",
    statLabel: "Pending Movements",
  },
  {
    title: "Warehouse & Locations",
    description: "Multi-facility storage zones, aisle corridors, rack tiers, and precision bin mapping.",
    href: "/inventory/warehouses",
    icon: Warehouse,
    stat: "4 Facilities",
    statLabel: "Active Depots",
  },
  {
    title: "Physical Cycle Count",
    description: "Stocktaking count sheets, audit variance approvals, and ledger reconciliations.",
    href: "/inventory/cycle-count",
    icon: ClipboardCheck,
    stat: "99.4%",
    statLabel: "Audit Accuracy",
  },
  {
    title: "Reorder & Replenishment",
    description: "Automated reorder point alerts, safety stock buffers, and purchase requisitions.",
    href: "/inventory/reorder",
    icon: TrendingDown,
    stat: "14 Items",
    statLabel: "Below Min Threshold",
  },
  {
    title: "Inventory Valuation",
    description: "FIFO, Weighted Average Costing, and general ledger inventory asset reconciliations.",
    href: "/inventory/valuation",
    icon: BadgeDollarSign,
    stat: "$4.82M",
    statLabel: "Total Asset Valuation",
  },
];

export default function InventoryHubPage() {
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
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">
              Inventory Management
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 dark:text-gray-500 text-xs">
            <span>Module:</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-gray-300 font-mono text-[11px] border border-slate-200 dark:border-white/10">
              INV-HUB
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white dark:bg-[#191919] rounded-xl shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col transition-colors duration-150">
          {/* Centered Hub Header Section */}
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-[#161616]">
            <div className="w-12 h-12 rounded-xl bg-[#93032E]/10 dark:bg-[#93032E]/20 flex items-center justify-center text-[#93032E] mb-3">
              <Boxes className="w-6 h-6" />
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
              Inventory Management Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 mt-2 max-w-2xl leading-relaxed">
              Enterprise material control, warehouse logistics, perpetual stock ledgers, cycle counts, and real-time valuation.
            </p>

            {/* Quick KPI Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mt-6">
              <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg text-center">
                <div className="text-[11px] text-slate-500 dark:text-gray-400 font-medium">Total SKUs</div>
                <div className="text-base sm:text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">1,480</div>
              </div>
              <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg text-center">
                <div className="text-[11px] text-slate-500 dark:text-gray-400 font-medium">Asset Valuation</div>
                <div className="text-base sm:text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">$4.82M</div>
              </div>
              <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg text-center">
                <div className="text-[11px] text-slate-500 dark:text-gray-400 font-medium">Low Stock Alerts</div>
                <div className="text-base sm:text-lg font-bold font-mono text-rose-600 dark:text-rose-400 mt-0.5">14 SKUs</div>
              </div>
              <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg text-center">
                <div className="text-[11px] text-slate-500 dark:text-gray-400 font-medium">Active Warehouses</div>
                <div className="text-base sm:text-lg font-bold font-mono text-blue-600 dark:text-blue-400 mt-0.5">4 Hubs</div>
              </div>
            </div>
          </div>

          {/* Sub-Modules Grid (6 Styled Enterprise Cards) */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INVENTORY_CARDS.map((card) => {
                const IconComponent = card.icon;
                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group relative flex flex-col justify-between bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-[#93032E]/60 dark:hover:border-[#93032E]/60 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-[#1f1f1f] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white group-hover:bg-[#93032E]/10 dark:group-hover:bg-[#93032E]/20 group-hover:text-[#93032E] dark:group-hover:text-[#ff4d79] group-hover:border-[#93032E]/30 transition-all">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-600 dark:text-gray-300 bg-slate-50 dark:bg-[#202020] px-2 py-1 rounded border border-slate-200 dark:border-white/10">
                          {card.stat}
                        </span>
                      </div>

                      <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#93032E] dark:group-hover:text-[#ff4d79] transition-colors">
                        {card.title}
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-400 group-hover:text-[#93032E] dark:group-hover:text-[#ff4d79] transition-colors">
                      <span className="text-[11px] text-slate-500 dark:text-gray-400 font-medium">{card.statLabel}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
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
