import Link from "next/link";
import Header from "@/components/Header";
import {
  ArrowLeft,
  Warehouse,
  Plus,
  Download,
  Building2,
  MapPin,
  CheckCircle2,
  Layers,
  Search,
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

export default function WarehousesPage() {
  const warehouses = [
    {
      code: "WH-HQ-01",
      name: "Main Corporate Central Distribution",
      location: "Chicago, IL, USA",
      type: "Central Automated Depot",
      capacityUsed: 84,
      floorArea: "12,000 m²",
      binsCount: "3,400 Bins",
      manager: "Marcus Sterling",
      status: "Operational",
    },
    {
      code: "WH-NORTH-02",
      name: "North Manufacturing Raw Depot",
      location: "Detroit, MI, USA",
      type: "Factory Material Storage",
      capacityUsed: 68,
      floorArea: "8,500 m²",
      binsCount: "1,850 Bins",
      manager: "David Kovacs",
      status: "Operational",
    },
    {
      code: "WH-EUR-03",
      name: "European Regional Hub",
      location: "Rotterdam, Netherlands",
      type: "Port Transshipment Center",
      capacityUsed: 92,
      floorArea: "15,000 m²",
      binsCount: "4,600 Bins",
      manager: "Greta Weber",
      status: "Near Capacity",
    },
    {
      code: "WH-APAC-04",
      name: "Singapore Transshipment Center",
      location: "Jurong Island, Singapore",
      type: "Air & Ocean Freight Hub",
      capacityUsed: 45,
      floorArea: "6,000 m²",
      binsCount: "1,200 Bins",
      manager: "Li Wei Chen",
      status: "Operational",
    },
  ];

  const binLocations = [
    { binId: "BIN-A-03-12", warehouse: "North Manufacturing Raw Depot", zone: "Zone A - Heavy Metals", aisle: "03", rack: "04", shelf: "B", type: "Heavy Pallet Rack", occupancy: "100%", status: "Occupied" },
    { binId: "BIN-B-08-02", warehouse: "Main Corporate Central", zone: "Zone B - Finished Assembly", aisle: "08", rack: "02", shelf: "A", type: "Flow Rack", occupancy: "80%", status: "Partially Occupied" },
    { binId: "BIN-HAZ-01-04", warehouse: "North Manufacturing Raw Depot", zone: "Hazmat Containment", aisle: "01", rack: "01", shelf: "A", type: "Spill-Proof Chemical", occupancy: "65%", status: "Occupied" },
    { binId: "BIN-CLR-C-14", warehouse: "European Regional Hub", zone: "Cleanroom Electronics", aisle: "C", rack: "01", shelf: "C", type: "ESD Antistatic Bin", occupancy: "15%", status: "Available" },
    { binId: "BIN-BAY-P-01", warehouse: "Main Corporate Central", zone: "Zone P - Bulk Packaging", aisle: "P", rack: "Floor", shelf: "01", type: "Bulk Floor Stacking", occupancy: "90%", status: "Occupied" },
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
            <span className="text-[#93032E] dark:text-[#ff4d79] font-semibold">Warehouse & Locations</span>
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
              INV-WAREHOUSES
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#93032E]/10 dark:bg-[#93032E]/20 flex items-center justify-center text-[#93032E]">
                <Warehouse className="w-4 h-4" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Multi-Facility Warehouses & Storage Bins
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
              Storage footprint configuration, racking tiers, high-density bins, and spatial volumetric utilization.
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
              Layout Maps
            </Button>
            <Button
              type="button"
              size="xs"
              className="h-8 px-3 text-xs font-semibold bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Facility / Bin
            </Button>
          </div>
        </div>

        {/* 4 Multi-Facility Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {warehouses.map((wh) => (
            <div
              key={wh.code}
              className="bg-white dark:bg-[#191919] border border-slate-200 dark:border-white/10 rounded-xl p-4 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#93032E] dark:text-rose-400">
                    {wh.code}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      wh.status === "Near Capacity"
                        ? "bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200"
                        : "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200"
                    }`}
                  >
                    {wh.status}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {wh.name}
                </h3>
                <div className="text-[11px] text-slate-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{wh.location}</span>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Utilization</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-white">{wh.capacityUsed}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-[#252525] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        wh.capacityUsed > 90 ? "bg-rose-500" : wh.capacityUsed > 75 ? "bg-[#93032E]" : "bg-emerald-500"
                      }`}
                      style={{ width: `${wh.capacityUsed}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                <span>{wh.floorArea}</span>
                <span>{wh.binsCount}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Master Bin Locations Table */}
        <div className="bg-white dark:bg-[#191919] rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-xs">
          <div className="p-3.5 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-800 dark:text-gray-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#93032E]" />
              Active Bin & Location Master Directory
            </span>

            <div className="relative w-full max-w-xs">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <Input
                placeholder="Search Bin ID, Zone, Rack..."
                className="h-8 pl-8 text-xs bg-slate-50 dark:bg-[#121212]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table className="w-full text-xs">
              <TableHeader className="bg-slate-50 dark:bg-[#161616]">
                <TableRow className="h-8 text-[11px] border-b border-slate-200 dark:border-white/10">
                  <TableHead className="font-bold">Bin Code</TableHead>
                  <TableHead className="font-bold">Warehouse Facility</TableHead>
                  <TableHead className="font-bold">Zone / Section</TableHead>
                  <TableHead className="font-bold text-center">Aisle - Rack - Shelf</TableHead>
                  <TableHead className="font-bold">Storage Type</TableHead>
                  <TableHead className="font-bold text-right">Occupancy</TableHead>
                  <TableHead className="font-bold text-center w-28">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {binLocations.map((bin) => (
                  <TableRow
                    key={bin.binId}
                    className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/70 dark:hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="font-mono font-bold text-slate-900 dark:text-white text-xs py-3">
                      {bin.binId}
                    </TableCell>
                    <TableCell className="py-3 text-slate-800 dark:text-gray-200 font-medium">
                      {bin.warehouse}
                    </TableCell>
                    <TableCell className="py-3 text-slate-600 dark:text-gray-400">
                      {bin.zone}
                    </TableCell>
                    <TableCell className="text-center font-mono py-3 text-slate-700 dark:text-gray-300">
                      {bin.aisle} • {bin.rack} • {bin.shelf}
                    </TableCell>
                    <TableCell className="py-3 text-slate-600 dark:text-gray-400">
                      {bin.type}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold py-3 text-slate-800 dark:text-gray-200">
                      {bin.occupancy}
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-[#202020] text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10">
                        {bin.status}
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
