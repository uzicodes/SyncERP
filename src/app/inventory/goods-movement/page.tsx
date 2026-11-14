import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  ArrowRightLeft,
  Plus,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  PackagePlus,
  PackageMinus,
  RotateCcw,
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

export default function GoodsMovementPage() {
  const movements = [
    {
      docNo: "GRN-2026-0819",
      type: "Goods Receipt (GRN)",
      date: "2026-11-14",
      source: "Vendor: Once Human Materials Co.",
      destination: "North Manufacturing Depot (Zone A)",
      sku: "RM-STEEL-001",
      itemName: "Cold-Rolled Steel Sheet 2mm",
      qty: "1,200 KG",
      ref: "PO-44819",
      authorizedBy: "Receiving Inspector",
      status: "Received & Cleared",
    },
    {
      docNo: "TRF-2026-0421",
      type: "Inter-Warehouse Transfer",
      date: "2026-11-13",
      source: "Main Corporate Central",
      destination: "European Regional Hub - Rotterdam",
      sku: "FG-VALVE-220",
      itemName: "Industrial High-Pressure Gate Valve 4\"",
      qty: "50 PCS",
      ref: "TRF-ORD-902",
      authorizedBy: "Logistics Controller",
      status: "In-Transit Ocean Freight",
    },
    {
      docNo: "ISS-2026-1102",
      type: "Material Issue to Production",
      date: "2026-11-13",
      source: "North Manufacturing Depot",
      destination: "Assembly Line #3 (Work Center 02)",
      sku: "CHEM-RESIN-55",
      itemName: "Epoxy Polymer Resin (55 Gal Drum)",
      qty: "8 DRUMS",
      ref: "WO-2026-7781",
      authorizedBy: "Shopfloor Supervisor",
      status: "Issued",
    },
    {
      docNo: "DISP-2026-2091",
      type: "Outward Sales Dispatch",
      date: "2026-11-12",
      source: "Main Corporate Central",
      destination: "Customer: Steam (Valve Corp)",
      sku: "PKG-BOX-L",
      itemName: "Heavy-Duty Corrugated Shipping Crate",
      qty: "400 PCS",
      ref: "SO-VALVE-8841",
      authorizedBy: "Shipping Lead",
      status: "Dispatched",
    },
    {
      docNo: "ADJ-2026-0044",
      type: "Physical Count Adjustment",
      date: "2026-11-11",
      source: "Singapore Transshipment",
      destination: "Inventory Variance Clearing",
      sku: "FAST-BOLT-M12",
      itemName: "Stainless Steel Hex Bolt M12 x 50mm",
      qty: "+150 PCS",
      ref: "AUDIT-VAR-991",
      authorizedBy: "Internal Auditor",
      status: "Approved & Posted",
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
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">Goods Movement</span>
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
              INV-MOVEMENTS
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#93032E]/10 dark:bg-[#93032E]/20 flex items-center justify-center text-[#93032E]">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Goods Movement & Stock Transfers
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              Perpetual movement ledger for receipts, production work order issues, and inter-depot freight logistics.
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
              Export Movement Log
            </Button>
            <Button
              type="button"
              size="xs"
              className="h-8 px-3 text-xs font-semibold bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Initiate Stock Transfer
            </Button>
          </div>
        </div>

        {/* Movement Table */}
        <div className="bg-white dark:bg-[#191919] rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xs">
          <div className="p-3.5 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <Input
                placeholder="Search by Movement Doc #, PO ref, or Item..."
                className="h-8 pl-8 text-xs bg-slate-50 dark:bg-[#121212]"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <select
                aria-label="Filter Type"
                className="h-8 px-2 text-xs bg-slate-50 dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white"
              >
                <option>All Movement Types</option>
                <option>Goods Receipts (GRN)</option>
                <option>Material Issues</option>
                <option>Inter-Warehouse Transfers</option>
                <option>Cycle Count Adjustments</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full text-xs">
              <TableHeader className="bg-slate-50 dark:bg-[#161616]">
                <TableRow className="h-8 text-[11px] border-b border-slate-200 dark:border-white/10">
                  <TableHead className="font-bold">Movement # & Date</TableHead>
                  <TableHead className="font-bold">Movement Type</TableHead>
                  <TableHead className="font-bold">Source & Destination Logistics</TableHead>
                  <TableHead className="font-bold">Item Description & Qty</TableHead>
                  <TableHead className="font-bold">Reference / Auth</TableHead>
                  <TableHead className="font-bold text-center w-36">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movements.map((m) => (
                  <TableRow
                    key={m.docNo}
                    className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="py-3">
                      <div className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                        {m.docNo}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {m.date}
                      </div>
                    </TableCell>

                    <TableCell className="py-3">
                      <span className="font-semibold text-slate-800 dark:text-gray-200 text-xs">
                        {m.type}
                      </span>
                    </TableCell>

                    <TableCell className="py-3">
                      <div className="text-xs text-slate-700 dark:text-gray-300">
                        <span className="text-slate-400 text-[10px] block">From:</span>
                        {m.source}
                      </div>
                      <div className="text-xs text-slate-700 dark:text-gray-300 mt-1">
                        <span className="text-slate-400 text-[10px] block">To:</span>
                        {m.destination}
                      </div>
                    </TableCell>

                    <TableCell className="py-3">
                      <div className="font-mono text-xs font-bold text-[#93032E] dark:text-rose-400">
                        {m.qty}
                      </div>
                      <div className="text-[11px] text-slate-700 dark:text-gray-300 font-medium">
                        [{m.sku}] {m.itemName}
                      </div>
                    </TableCell>

                    <TableCell className="py-3">
                      <div className="font-mono text-xs text-slate-800 dark:text-gray-200">
                        {m.ref}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        By: {m.authorizedBy}
                      </div>
                    </TableCell>

                    <TableCell className="text-center py-3">
                      {m.status.includes("Received") || m.status.includes("Posted") ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {m.status}
                        </span>
                      ) : m.status.includes("In-Transit") ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          <Truck className="w-3 h-3 text-blue-600" /> {m.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                          {m.status}
                        </span>
                      )}
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
