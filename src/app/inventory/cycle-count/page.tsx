import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  ClipboardCheck,
  Plus,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Scale,
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

export default function CycleCountPage() {
  const auditBatches = [
    {
      batchNo: "CC-2026-Q4-01",
      warehouse: "North Manufacturing Raw Depot",
      zone: "Zone A - Heavy Metals",
      scheduledDate: "2026-11-10",
      conductedDate: "2026-11-10",
      countedSKUs: 85,
      systemQty: 14200,
      physicalQty: 14195,
      varianceQty: -5,
      varianceValue: "-$17.25",
      auditor: "Internal Audit Team A",
      status: "Reconciled & Posted",
    },
    {
      batchNo: "CC-2026-Q4-02",
      warehouse: "Main Corporate Central",
      zone: "Zone B - Finished Valves",
      scheduledDate: "2026-11-12",
      conductedDate: "2026-11-13",
      countedSKUs: 42,
      systemQty: 180,
      physicalQty: 180,
      varianceQty: 0,
      varianceValue: "$0.00",
      auditor: "Quality Assurance Lead",
      status: "Perfect Match (100%)",
    },
    {
      batchNo: "CC-2026-Q4-03",
      warehouse: "Singapore Transshipment",
      zone: "Aisle S - Hardware Fasteners",
      scheduledDate: "2026-11-14",
      conductedDate: "2026-11-14",
      countedSKUs: 120,
      systemQty: 18500,
      physicalQty: 18650,
      varianceQty: 150,
      varianceValue: "+$57.00",
      auditor: "Warehouse Supervisor",
      status: "Pending Supervisor Approval",
    },
    {
      batchNo: "CC-2026-Q4-04",
      warehouse: "European Regional Hub",
      zone: "Cleanroom Electronics C",
      scheduledDate: "2026-11-15",
      conductedDate: "-",
      countedSKUs: 24,
      systemQty: 320,
      physicalQty: 0,
      varianceQty: 0,
      varianceValue: "$0.00",
      auditor: "Regional Compliance",
      status: "Scheduled Tomorrow",
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
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">Physical Cycle Count</span>
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
              INV-AUDIT
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#93032E]/10 dark:bg-[#93032E]/20 flex items-center justify-center text-[#93032E]">
                <ClipboardCheck className="w-4 h-4" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Physical Cycle Count & Stocktaking Audits
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              Blind count sheets, barcode-assisted scanning, variance approvals, and GL write-off journal synchronization.
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
              Print Count Sheets
            </Button>
            <Button
              type="button"
              size="xs"
              className="h-8 px-3 text-xs font-semibold bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Create Audit Batch
            </Button>
          </div>
        </div>

        {/* Audit Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="p-3 bg-white dark:bg-[#191919] border border-slate-200 dark:border-white/10 rounded-xl">
            <span className="text-[11px] text-slate-400">Overall Accuracy Rate</span>
            <div className="text-lg font-bold font-mono text-emerald-600 mt-0.5">99.42%</div>
          </div>
          <div className="p-3 bg-white dark:bg-[#191919] border border-slate-200 dark:border-white/10 rounded-xl">
            <span className="text-[11px] text-slate-400">Total Count Batches</span>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">24 YTD</div>
          </div>
          <div className="p-3 bg-white dark:bg-[#191919] border border-slate-200 dark:border-white/10 rounded-xl">
            <span className="text-[11px] text-slate-400">Net Variance Value</span>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">+$39.75</div>
          </div>
          <div className="p-3 bg-white dark:bg-[#191919] border border-slate-200 dark:border-white/10 rounded-xl">
            <span className="text-[11px] text-slate-400">Pending Review</span>
            <div className="text-lg font-bold font-mono text-amber-600 mt-0.5">1 Batch</div>
          </div>
        </div>

        {/* Audit Batches Table */}
        <div className="bg-white dark:bg-[#191919] rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xs">
          <div className="p-3.5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-gray-200">
              Audit Count Batches
            </span>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full text-xs">
              <TableHeader className="bg-slate-50 dark:bg-[#161616]">
                <TableRow className="h-8 text-[11px] border-b border-slate-200 dark:border-white/10">
                  <TableHead className="font-bold">Batch ID & Scheduled Date</TableHead>
                  <TableHead className="font-bold">Warehouse & Target Zone</TableHead>
                  <TableHead className="font-bold text-center">Counted SKUs</TableHead>
                  <TableHead className="font-bold text-right">System Qty</TableHead>
                  <TableHead className="font-bold text-right">Physical Count</TableHead>
                  <TableHead className="font-bold text-right">Variance</TableHead>
                  <TableHead className="font-bold">Auditor Sign-off</TableHead>
                  <TableHead className="font-bold text-center w-36">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditBatches.map((b) => (
                  <TableRow
                    key={b.batchNo}
                    className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="py-3">
                      <div className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                        {b.batchNo}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {b.scheduledDate}
                      </div>
                    </TableCell>

                    <TableCell className="py-3">
                      <div className="font-semibold text-slate-800 dark:text-gray-200 text-xs">
                        {b.warehouse}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {b.zone}
                      </div>
                    </TableCell>

                    <TableCell className="text-center font-mono py-3 text-slate-700 dark:text-gray-300">
                      {b.countedSKUs}
                    </TableCell>

                    <TableCell className="text-right font-mono py-3 text-slate-800 dark:text-gray-200">
                      {b.systemQty.toLocaleString()}
                    </TableCell>

                    <TableCell className="text-right font-mono font-bold py-3 text-slate-900 dark:text-white">
                      {b.physicalQty > 0 ? b.physicalQty.toLocaleString() : "-"}
                    </TableCell>

                    <TableCell className="text-right font-mono font-bold py-3">
                      {b.varianceQty === 0 ? (
                        <span className="text-emerald-600">0</span>
                      ) : b.varianceQty > 0 ? (
                        <span className="text-blue-600">+{b.varianceQty}</span>
                      ) : (
                        <span className="text-rose-600">{b.varianceQty}</span>
                      )}
                    </TableCell>

                    <TableCell className="py-3 text-slate-600 dark:text-gray-400 text-xs">
                      {b.auditor}
                    </TableCell>

                    <TableCell className="text-center py-3">
                      {b.status.includes("Reconciled") || b.status.includes("Perfect") ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {b.status}
                        </span>
                      ) : b.status.includes("Pending") ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          <AlertTriangle className="w-3 h-3 text-amber-600" /> Pending Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          <Clock className="w-3 h-3 text-slate-500" /> Scheduled
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
