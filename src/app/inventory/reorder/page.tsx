import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  TrendingDown,
  Plus,
  Download,
  AlertTriangle,
  ShoppingCart,
  CheckCircle2,
  Clock,
  Sparkles,
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

export default function ReorderPage() {
  const reorderAlerts = [
    {
      sku: "ELEC-CTRL-901",
      name: "PLC Logic Control Module v4",
      warehouse: "European Regional Hub",
      available: 2,
      safetyStock: 10,
      reorderPoint: 20,
      suggestedPO: 25,
      uom: "PCS",
      primarySupplier: "Siemens Automation AG",
      leadTimeDays: "12 Days",
      urgency: "Critical Alert",
    },
    {
      sku: "FG-VALVE-220",
      name: "Industrial High-Pressure Gate Valve 4\"",
      warehouse: "Main Corporate Central",
      available: 40,
      safetyStock: 30,
      reorderPoint: 75,
      suggestedPO: 100,
      uom: "PCS",
      primarySupplier: "Once Human Materials Co.",
      leadTimeDays: "7 Days",
      urgency: "Warning Buffer",
    },
    {
      sku: "PKG-WRAP-IND",
      name: "Industrial Stretch Film Roll 500mm",
      warehouse: "Main Corporate Central",
      available: 15,
      safetyStock: 25,
      reorderPoint: 50,
      suggestedPO: 80,
      uom: "ROLLS",
      primarySupplier: "Global Logistics Packaging",
      leadTimeDays: "3 Days",
      urgency: "Critical Alert",
    },
    {
      sku: "LUB-SYNTH-10",
      name: "Heavy Synthetic Turbine Lubricant (20L)",
      warehouse: "North Manufacturing Raw Depot",
      available: 6,
      safetyStock: 8,
      reorderPoint: 18,
      suggestedPO: 24,
      uom: "PAIL",
      primarySupplier: "Castrol Industrial Lubricants",
      leadTimeDays: "5 Days",
      urgency: "Warning Buffer",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-[#151515] dark:text-white flex flex-col font-sans transition-colors duration-150">
      <Header />

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
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">Reorder & Replenishment</span>
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
              INV-REORDER
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#93032E]/10 dark:bg-[#93032E]/20 flex items-center justify-center text-[#93032E]">
                <TrendingDown className="w-4 h-4" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Reorder Thresholds & Replenishment Engine
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              Automated min/max safety buffer triggers, Economic Order Quantity (EOQ), and direct Purchase Requisition generation.
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
              Export Shortage List
            </Button>
            <Button
              type="button"
              size="xs"
              className="h-8 px-3 text-xs font-semibold bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Auto-Generate All Requisitions
            </Button>
          </div>
        </div>

        {/* Reorder Table */}
        <div className="bg-white dark:bg-[#191919] rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xs">
          <div className="p-3.5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-gray-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              Active Low Stock & Reorder Triggers (14 SKUs System-Wide)
            </span>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full text-xs">
              <TableHeader className="bg-slate-50 dark:bg-[#161616]">
                <TableRow className="h-8 text-[11px] border-b border-slate-200 dark:border-white/10">
                  <TableHead className="font-bold">Item SKU & Name</TableHead>
                  <TableHead className="font-bold">Warehouse Facility</TableHead>
                  <TableHead className="font-bold text-right text-rose-600 dark:text-rose-400">Available Stock</TableHead>
                  <TableHead className="font-bold text-right">Min Safety Buffer</TableHead>
                  <TableHead className="font-bold text-right">Reorder Point (ROP)</TableHead>
                  <TableHead className="font-bold text-right text-emerald-700 dark:text-emerald-400">Suggested PO (EOQ)</TableHead>
                  <TableHead className="font-bold">Primary Vendor & Lead Time</TableHead>
                  <TableHead className="font-bold text-center w-36">Urgency Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reorderAlerts.map((item) => (
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
                    </TableCell>

                    <TableCell className="py-3 text-slate-800 dark:text-gray-200 font-medium">
                      {item.warehouse}
                    </TableCell>

                    <TableCell className="text-right font-mono font-bold text-rose-600 dark:text-rose-400 py-3">
                      {item.available} {item.uom}
                    </TableCell>

                    <TableCell className="text-right font-mono py-3 text-slate-500">
                      {item.safetyStock} {item.uom}
                    </TableCell>

                    <TableCell className="text-right font-mono font-bold py-3 text-slate-800 dark:text-gray-200">
                      {item.reorderPoint} {item.uom}
                    </TableCell>

                    <TableCell className="text-right font-mono font-bold text-emerald-700 dark:text-emerald-400 py-3">
                      +{item.suggestedPO} {item.uom}
                    </TableCell>

                    <TableCell className="py-3">
                      <div className="text-xs text-slate-800 dark:text-gray-200 font-medium">
                        {item.primarySupplier}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>Lead Time: {item.leadTimeDays}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center py-3">
                      <Button
                        type="button"
                        size="xs"
                        className="h-7 px-2 text-[11px] bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-2xs cursor-pointer"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Create PR
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}
