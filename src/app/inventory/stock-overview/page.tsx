import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  Boxes,
  Search,
  Filter,
  Download,
  Plus,
  AlertTriangle,
  CheckCircle2,
  PackageCheck,
  RefreshCw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function StockOverviewPage() {
  const stockItems = [
    {
      sku: "RM-STEEL-001",
      name: "Cold-Rolled Steel Sheet 2mm",
      category: "Raw Materials",
      warehouse: "North Manufacturing Depot",
      location: "Aisle A • Rack 03 • Bin 12",
      onHand: 4200,
      allocated: 800,
      available: 3400,
      uom: "KG",
      reorderPoint: 1500,
      unitCost: 3.45,
      totalValue: 14490,
      status: "In Stock",
    },
    {
      sku: "FG-VALVE-220",
      name: "Industrial High-Pressure Gate Valve 4\"",
      category: "Finished Goods",
      warehouse: "Main Corporate Central",
      location: "Zone B • Rack 08 • Bin 02",
      onHand: 180,
      allocated: 140,
      available: 40,
      uom: "PCS",
      reorderPoint: 75,
      unitCost: 145.0,
      totalValue: 26100,
      status: "Low Stock",
    },
    {
      sku: "CHEM-RESIN-55",
      name: "Epoxy Polymer Resin (55 Gal Drum)",
      category: "Chemicals",
      warehouse: "North Manufacturing Depot",
      location: "Hazmat Zone • Rack 01 • Bin 04",
      onHand: 64,
      allocated: 20,
      available: 44,
      uom: "DRUM",
      reorderPoint: 30,
      unitCost: 480.0,
      totalValue: 30720,
      status: "In Stock",
    },
    {
      sku: "ELEC-CTRL-901",
      name: "PLC Logic Control Module v4",
      category: "Electronics",
      warehouse: "European Regional Hub",
      location: "Cleanroom • Bin C-14",
      onHand: 24,
      allocated: 22,
      available: 2,
      uom: "PCS",
      reorderPoint: 20,
      unitCost: 890.0,
      totalValue: 21360,
      status: "Critical Reorder",
    },
    {
      sku: "PKG-BOX-L",
      name: "Heavy-Duty Corrugated Shipping Crate",
      category: "Packaging",
      warehouse: "Main Corporate Central",
      location: "Zone P • Floor Bay 01",
      onHand: 5400,
      allocated: 600,
      available: 4800,
      uom: "PCS",
      reorderPoint: 2000,
      unitCost: 2.15,
      totalValue: 11610,
      status: "In Stock",
    },
    {
      sku: "FAST-BOLT-M12",
      name: "Stainless Steel Hex Bolt M12 x 50mm",
      category: "Hardware & Fasteners",
      warehouse: "Singapore Transshipment",
      location: "Aisle S • Shelf 04 • Bin 88",
      onHand: 18500,
      allocated: 2500,
      available: 16000,
      uom: "PCS",
      reorderPoint: 5000,
      unitCost: 0.38,
      totalValue: 7030,
      status: "In Stock",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#151515] dark:text-white flex flex-col font-sans transition-colors duration-150">
      <Header />

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-slate-200 dark:bg-[#181818] dark:border-white/10 transition-colors duration-150">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="hover:text-[#93032E] dark:hover:text-[#ff4d79] transition-colors">
              Dashboard
            </Link>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <Link href="/inventory" className="hover:text-[#93032E] dark:hover:text-[#ff4d79] transition-colors">
              Inventory Management
            </Link>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">Stock Overview</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 dark:text-gray-500 text-xs">
            <Link
              href="/inventory"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-[#93032E] transition-colors mr-2"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to Inventory Hub
            </Link>
            <span>Module:</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-gray-300 font-mono text-[11px] border border-slate-200 dark:border-white/10">
              INV-STOCK
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-4">
        {/* Header Title & Actions */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#93032E]/10 dark:bg-[#93032E]/20 flex items-center justify-center text-[#93032E]">
                <Boxes className="w-4 h-4" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Stock Overview & Balances
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              Live multi-warehouse perpetual stock balances, reserved allocations, and replenishment triggers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="xs"
              className="h-8 px-2.5 text-xs font-semibold border-slate-300 dark:border-white/15"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              Export CSV
            </Button>
            <Button
              type="button"
              size="xs"
              className="h-8 px-3 text-xs font-semibold bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              New Stock Inward
            </Button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white dark:bg-[#191919] rounded-xl border border-slate-200 dark:border-white/10 p-3.5 mb-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[260px] max-w-md">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <Input
                placeholder="Filter by SKU code, item title, or location..."
                className="h-8 pl-8 text-xs bg-slate-50 dark:bg-[#121212]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <select
              aria-label="Filter by Warehouse"
              className="h-8 px-2 text-xs bg-slate-50 dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white"
            >
              <option value="All">All Warehouses (4)</option>
              <option value="Main">Main Corporate Central</option>
              <option value="North">North Manufacturing Depot</option>
              <option value="Rotterdam">European Regional Hub</option>
              <option value="Singapore">Singapore Transshipment</option>
            </select>

            <select
              aria-label="Filter by Category"
              className="h-8 px-2 text-xs bg-slate-50 dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white"
            >
              <option value="All">All Categories</option>
              <option value="Raw">Raw Materials</option>
              <option value="Finished">Finished Goods</option>
              <option value="Chemicals">Chemicals</option>
              <option value="Electronics">Electronics</option>
              <option value="Hardware">Hardware & Fasteners</option>
            </select>

            <select
              aria-label="Filter by Stock Status"
              className="h-8 px-2 text-xs bg-slate-50 dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white"
            >
              <option value="All">All Stock Levels</option>
              <option value="InStock">In Stock Normal</option>
              <option value="LowStock">Low Stock Buffer</option>
              <option value="Critical">Critical Reorder</option>
            </select>
          </div>
        </div>

        {/* Stock Ledger Table */}
        <div className="bg-white dark:bg-[#191919] rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <Table className="w-full text-xs">
              <TableHeader className="bg-slate-50 dark:bg-[#161616]">
                <TableRow className="h-8 text-[11px] border-b border-slate-200 dark:border-white/10">
                  <TableHead className="font-bold">Item SKU & Description</TableHead>
                  <TableHead className="font-bold">Warehouse & Bin Location</TableHead>
                  <TableHead className="font-bold text-right">On-Hand</TableHead>
                  <TableHead className="font-bold text-right">Allocated</TableHead>
                  <TableHead className="font-bold text-right text-emerald-700 dark:text-emerald-400">Available</TableHead>
                  <TableHead className="font-bold text-right">Unit Cost</TableHead>
                  <TableHead className="font-bold text-right font-mono">Total Value</TableHead>
                  <TableHead className="font-bold text-center w-28">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockItems.map((item) => (
                  <TableRow
                    key={item.sku}
                    className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="py-3">
                      <div className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                        {item.sku}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-gray-300 font-medium">
                        {item.name}
                      </div>
                      <span className="inline-block mt-0.5 text-[10px] text-slate-400 bg-slate-100 dark:bg-[#202020] px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </TableCell>

                    <TableCell className="py-3">
                      <div className="font-medium text-slate-800 dark:text-gray-200 text-xs">
                        {item.warehouse}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {item.location}
                      </div>
                    </TableCell>

                    <TableCell className="text-right font-mono font-bold py-3 text-slate-800 dark:text-gray-100">
                      {item.onHand.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">{item.uom}</span>
                    </TableCell>

                    <TableCell className="text-right font-mono text-amber-700 dark:text-amber-400 py-3">
                      {item.allocated.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">{item.uom}</span>
                    </TableCell>

                    <TableCell className="text-right font-mono font-bold text-emerald-700 dark:text-emerald-400 py-3">
                      {item.available.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">{item.uom}</span>
                    </TableCell>

                    <TableCell className="text-right font-mono text-slate-600 dark:text-gray-400 py-3">
                      ${item.unitCost.toFixed(2)}
                    </TableCell>

                    <TableCell className="text-right font-mono font-bold text-slate-900 dark:text-white py-3">
                      ${item.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </TableCell>

                    <TableCell className="text-center py-3">
                      {item.status === "In Stock" && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> In Stock
                        </span>
                      )}
                      {item.status === "Low Stock" && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          <AlertTriangle className="w-3 h-3 text-amber-600" /> Low Buffer
                        </span>
                      )}
                      {item.status === "Critical Reorder" && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                          <AlertTriangle className="w-3 h-3 text-rose-600" /> Reorder Now
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer Total Summary Bar */}
          <div className="p-3.5 bg-slate-50 dark:bg-[#161616] border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between text-xs gap-3">
            <span className="text-slate-500 dark:text-gray-400">
              Showing 6 of 1,480 catalog inventory records
            </span>
            <div className="flex items-center gap-4 font-mono font-bold">
              <span className="text-slate-500 font-sans font-normal text-[11px]">Cumulative Asset Value:</span>
              <span className="text-[#93032E] dark:text-rose-400 text-sm">
                ${stockItems.reduce((acc, i) => acc + i.totalValue, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
