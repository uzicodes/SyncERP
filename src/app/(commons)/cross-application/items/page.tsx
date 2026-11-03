import Link from "next/link";
import Header from "@/components/Header";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Package,
  Layers,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertCircle,
  Tag,
  Boxes,
} from "lucide-react";

interface ItemRecord {
  id: string;
  name: string;
  sku: string;
  category: string;
  plannerContact: string;
  stockLevel: string;
  uom: string;
  status: "Active" | "Low Stock" | "Discontinued";
}

const PLACEHOLDER_ITEMS: ItemRecord[] = [
  {
    id: "ITM-3001",
    name: "Industrial Core Microprocessor X4",
    sku: "CPU-X4-IND",
    category: "Electronics",
    plannerContact: "Kenji Sato (Hardware Lead)",
    stockLevel: "4,250 Units",
    uom: "EA",
    status: "Active",
  },
  {
    id: "ITM-3002",
    name: "Precision Anodized Aluminum Enclosure",
    sku: "ENC-ALU-08",
    category: "Mechanical",
    plannerContact: "Maria Santos (Mech Ops)",
    stockLevel: "1,120 Units",
    uom: "EA",
    status: "Active",
  },
  {
    id: "ITM-3003",
    name: "Heavy-Duty High-Flex Cable Loom",
    sku: "CBL-FLX-2M",
    category: "Cables & Wiring",
    plannerContact: "Liam Wright (Supply Sourcing)",
    stockLevel: "85 Units",
    uom: "Roll",
    status: "Low Stock",
  },
  {
    id: "ITM-3004",
    name: "Thermal Dissipation Gel Matrix 500ml",
    sku: "THM-GEL-500",
    category: "Chemicals & Consumables",
    plannerContact: "Dr. Rachel Bloom (Chemical Safety)",
    stockLevel: "950 Liters",
    uom: "LTR",
    status: "Active",
  },
  {
    id: "ITM-3005",
    name: "Legacy Sensor Interface Board v1",
    sku: "BRD-SEN-01",
    category: "Legacy Assemblies",
    plannerContact: "Engineering Vault",
    stockLevel: "0 Units",
    uom: "EA",
    status: "Discontinued",
  },
];

export default function ItemsManagementPage() {
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
            <Link
              href="/cross-application"
              className="hover:text-[#93032E] dark:hover:text-[#ff4d79] transition-colors"
            >
              Cross Application
            </Link>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">Items</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 dark:text-gray-500 text-xs">
            <span>Module:</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-gray-300 font-mono text-[11px] border border-slate-200 dark:border-white/10">
              COMMONS-ITEM
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white dark:bg-[#191919] rounded-xl shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col transition-colors duration-150">
          {/* Page Header Area */}
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#93032E] dark:text-[#ff4d79] tracking-tight">
                  Items Management
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  {PLACEHOLDER_ITEMS.length} Catalog Items
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
                Maintain global item masters, SKU definitions, inventory categories, and unit classifications.
              </p>
            </div>

            <div>
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#93032E] hover:bg-[#a80e3b] active:bg-[#780225] text-white text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#93032E]/40"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New Item</span>
              </button>
            </div>
          </div>

          {/* Search, Filter, and Controls Bar */}
          <div className="p-4 sm:px-8 bg-slate-50/70 dark:bg-[#161616] border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 dark:text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search items by name, SKU, category..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-[#121212] border border-slate-300 dark:border-white/15 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#93032E]/30 focus:border-[#93032E]"
              />
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-1.5 bg-white dark:bg-[#121212] border border-slate-300 dark:border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-gray-200">
                <Filter className="w-3.5 h-3.5 text-slate-500 dark:text-gray-400" />
                <select
                  aria-label="Filter Items by Category"
                  defaultValue="all"
                  className="bg-transparent text-slate-700 dark:text-gray-200 font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-white dark:bg-[#191919] text-slate-900 dark:text-white">All Categories</option>
                  <option value="electronics" className="bg-white dark:bg-[#191919] text-slate-900 dark:text-white">Electronics</option>
                  <option value="mechanical" className="bg-white dark:bg-[#191919] text-slate-900 dark:text-white">Mechanical</option>
                  <option value="cables" className="bg-white dark:bg-[#191919] text-slate-900 dark:text-white">Cables & Wiring</option>
                  <option value="chemicals" className="bg-white dark:bg-[#191919] text-slate-900 dark:text-white">Chemicals</option>
                </select>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-gray-300 bg-white dark:bg-[#121212] border border-slate-300 dark:border-white/15 rounded-lg">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 dark:text-gray-400" />
                <span>SKU Registry</span>
              </div>
            </div>
          </div>

          {/* Table Structure */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161616] text-[11px] font-semibold text-slate-600 dark:text-gray-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3.5">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-white/10 bg-white dark:bg-[#191919] text-sm">
                {PLACEHOLDER_ITEMS.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors group"
                  >
                    {/* Name Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#93032E]/10 dark:bg-[#93032E]/25 text-[#93032E] dark:text-[#ff4d79] font-bold text-xs flex items-center justify-center shrink-0 border border-[#93032E]/20 dark:border-[#93032E]/40">
                          <Package className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white group-hover:text-[#93032E] dark:group-hover:text-[#ff4d79] transition-colors">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-400 dark:text-gray-400 font-mono">
                            SKU: {item.sku} • {item.category}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-slate-800 dark:text-gray-200 text-xs">
                          {item.plannerContact}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400 text-[11px] mt-0.5">
                          <Boxes className="w-3 h-3 text-slate-400" />
                          <span>On Hand: {item.stockLevel} ({item.uom})</span>
                        </div>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === "Active" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          In Stock
                        </span>
                      ) : item.status === "Low Stock" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60">
                          <Clock className="w-3 h-3 text-amber-500" />
                          Reorder Triggered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-300 dark:bg-[#222222] dark:text-gray-400 dark:border-white/10">
                          <AlertCircle className="w-3 h-3 text-slate-400" />
                          Discontinued
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          aria-label="More actions"
                          className="p-1.5 rounded-md text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Summary Footer */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-[#161616] border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-gray-400">
            <div>
              Showing <span className="font-semibold text-slate-800 dark:text-white">1</span> to{" "}
              <span className="font-semibold text-slate-800 dark:text-white">{PLACEHOLDER_ITEMS.length}</span> of{" "}
              <span className="font-semibold text-slate-800 dark:text-white">{PLACEHOLDER_ITEMS.length}</span> entries
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1e1e1e] text-slate-400 dark:text-gray-600 cursor-not-allowed text-xs font-medium"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded bg-[#93032E] text-white text-xs font-semibold shadow-xs"
              >
                1
              </button>
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1e1e1e] text-slate-400 dark:text-gray-600 cursor-not-allowed text-xs font-medium"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

