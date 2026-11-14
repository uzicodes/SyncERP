import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  BadgeDollarSign,
  Download,
  Building2,
  PieChart,
  Layers,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function InventoryValuationPage() {
  const valuationCategories = [
    {
      category: "Raw Materials (Metals & Steel)",
      glAccount: "1410 - Raw Material Inventory",
      skusCount: 380,
      totalUnits: "142,500 KG",
      avgCostPerUnit: "$3.45 / KG",
      carryingValue: 1480000,
      costingMethod: "Moving Weighted Average",
      lastValuationDate: "2026-11-14",
    },
    {
      category: "Finished Industrial Valves & Pumps",
      glAccount: "1420 - Finished Goods Inventory",
      skusCount: 220,
      totalUnits: "8,900 PCS",
      avgCostPerUnit: "$165.20 / PCS",
      carryingValue: 1850000,
      costingMethod: "Standard Absorption Cost",
      lastValuationDate: "2026-11-14",
    },
    {
      category: "Bulk Industrial Chemicals & Resins",
      glAccount: "1410 - Raw Material Inventory",
      skusCount: 140,
      totalUnits: "1,240 DRUMS",
      avgCostPerUnit: "$480.00 / DRUM",
      carryingValue: 595200,
      costingMethod: "FIFO (First In, First Out)",
      lastValuationDate: "2026-11-13",
    },
    {
      category: "Electronics, Microcontrollers & PLCs",
      glAccount: "1430 - Sub-Assembly Components",
      skusCount: 420,
      totalUnits: "24,800 PCS",
      avgCostPerUnit: "$28.50 / PCS",
      carryingValue: 706800,
      costingMethod: "FIFO (First In, First Out)",
      lastValuationDate: "2026-11-14",
    },
    {
      category: "Heavy-Duty Packaging & Shipping Crates",
      glAccount: "1440 - Packaging Supplies Asset",
      skusCount: 90,
      totalUnits: "88,000 PCS",
      avgCostPerUnit: "$2.15 / PCS",
      carryingValue: 189200,
      costingMethod: "Moving Weighted Average",
      lastValuationDate: "2026-11-12",
    },
  ];

  const totalCarryingValue = valuationCategories.reduce((acc, c) => acc + c.carryingValue, 0);

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
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">Inventory Valuation</span>
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
              INV-VALUATION
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#93032E]/10 dark:bg-[#93032E]/20 flex items-center justify-center text-[#93032E]">
                <BadgeDollarSign className="w-4 h-4" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Perpetual Inventory Asset Valuation
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              GAAP/IFRS statutory costing methods (FIFO & Weighted Average) synchronized with the General Ledger balance sheet.
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
              Valuation Audit Report (PDF)
            </Button>
            <Button
              type="button"
              size="xs"
              className="h-8 px-3 text-xs font-semibold bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs"
            >
              <Building2 className="w-3.5 h-3.5 mr-1" />
              Post Asset Revaluation to GL
            </Button>
          </div>
        </div>

        {/* Valuation Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="p-3.5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-white/10 rounded-xl">
            <div className="text-[11px] text-slate-400">Total Balance Sheet Asset</div>
            <div className="text-xl font-bold font-mono text-[#93032E] dark:text-rose-400 mt-0.5">
              ${totalCarryingValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="p-3.5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-white/10 rounded-xl">
            <div className="text-[11px] text-slate-400">Raw Materials Carrying</div>
            <div className="text-xl font-bold font-mono text-emerald-600 mt-0.5">$2.07M</div>
          </div>
          <div className="p-3.5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-white/10 rounded-xl">
            <div className="text-[11px] text-slate-400">Finished Goods Carrying</div>
            <div className="text-xl font-bold font-mono text-blue-600 mt-0.5">$1.85M</div>
          </div>
          <div className="p-3.5 bg-white dark:bg-[#191919] border border-slate-200 dark:border-white/10 rounded-xl">
            <div className="text-[11px] text-slate-400">GL Reconciliation Variance</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">$0.00 (Balanced)</div>
          </div>
        </div>

        {/* Valuation Table */}
        <div className="bg-white dark:bg-[#191919] rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xs">
          <div className="p-3.5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-gray-200">
              Inventory Category Carrying Valuation
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Valuation Base Currency: USD ($)
            </span>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full text-xs">
              <TableHeader className="bg-slate-50 dark:bg-[#161616]">
                <TableRow className="h-8 text-[11px] border-b border-slate-200 dark:border-white/10">
                  <TableHead className="font-bold">Inventory Category & Class</TableHead>
                  <TableHead className="font-bold">GL Balance Sheet Account</TableHead>
                  <TableHead className="font-bold text-center">Active SKUs</TableHead>
                  <TableHead className="font-bold text-right">Physical Volume</TableHead>
                  <TableHead className="font-bold text-right">Average Unit Cost</TableHead>
                  <TableHead className="font-bold text-right font-mono text-slate-900 dark:text-white">Carrying Asset Value</TableHead>
                  <TableHead className="font-bold">Costing Model</TableHead>
                  <TableHead className="font-bold text-center w-28">Audited</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {valuationCategories.map((cat) => (
                  <TableRow
                    key={cat.category}
                    className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="py-3 font-semibold text-slate-900 dark:text-white text-xs">
                      {cat.category}
                    </TableCell>

                    <TableCell className="py-3 font-mono text-slate-700 dark:text-gray-300 text-xs">
                      {cat.glAccount}
                    </TableCell>

                    <TableCell className="text-center font-mono py-3 text-slate-600 dark:text-gray-400">
                      {cat.skusCount}
                    </TableCell>

                    <TableCell className="text-right font-mono py-3 text-slate-800 dark:text-gray-200 font-medium">
                      {cat.totalUnits}
                    </TableCell>

                    <TableCell className="text-right font-mono py-3 text-slate-600 dark:text-gray-400">
                      {cat.avgCostPerUnit}
                    </TableCell>

                    <TableCell className="text-right font-mono font-bold py-3 text-emerald-700 dark:text-emerald-400 text-xs">
                      ${cat.carryingValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </TableCell>

                    <TableCell className="py-3 text-slate-600 dark:text-gray-400 text-xs">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-gray-300">
                        {cat.costingMethod}
                      </span>
                    </TableCell>

                    <TableCell className="text-center py-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {cat.lastValuationDate}
                      </span>
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
