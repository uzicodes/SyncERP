"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Eye,
  RotateCcw,
  ChevronsUp,
  ChevronUp,
  ChevronDown,
  ChevronsDown,
  Plus,
  Save,
  Trash2,
  Minus,
  Package,
  Layers,
  Boxes,
  Tag,
  DollarSign,
  Barcode,
  Archive,
  Truck,
  FileText,
  Hash,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Percent,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

// ============================================================================
// TASK 2: ZOD SCHEMA FOR "ITEM" TAB
// ============================================================================

export const itemSchema = z.object({
  // --- Top Left Fields (Text/Descriptions) ---
  itemCode: z.string().min(1, "Item Code is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().default(""),
  notes: z.string().default(""),
  links: z.string().default(""),
  barcodeNo: z.string().default(""),
  alias: z.string().default(""),

  // --- Top Right Fields (Settings/Toggles) ---
  hideItem: z.boolean().default(false),
  stopOrder: z.boolean().default(false),
  cutPieces: z.boolean().default(false),
  dimensionType: z.enum(["None", "Linear", "Square", "Cubic"]).default("None"),
  mandatoryBatchNo: z.boolean().default(false),
  matrix: z.boolean().default(false),
  serialNumberType: z.enum(["No Serial", "Unique", "Batch Unique"]).default("No Serial"),
  stockType: z.enum(["Stocked", "Non-Stocked", "Service", "Labor"]),
  fulfillmentCategory: z.enum(["Physical", "Digital", "Drop-ship", "Consignment"]),

  // --- Bottom Grid Required Fields ---
  itemGroup: z.string().min(1, "Item Group is required"),
  taxCategory: z.string().min(1, "Tax Category is required"),

  // --- Bottom Grid Selects ---
  warehouse: z.string().default("WH-01 Main Central"),
  issueUnit: z.string().default("EA"),
  priceCategory: z.string().default("Standard Commercial"),
  grade: z.string().default("Grade A"),
  division: z.string().default("Electronics & Tech"),
  stockingUnit: z.string().default("EA"),
  packingUnit: z.string().default("BOX"),
  itemClass: z.string().default("Raw Materials"),
  importDuty: z.string().default("Standard Duty (5%)"),
  unitOfWeight: z.string().default("KG"),
  team: z.string().default("Operations Alpha"),
  alternateUnit: z.string().default("PCS"),
  statisticalUnit: z.string().default("UOM-STAT"),
  itemCategory: z.string().default("Manufactured Assemblies"),
  supportCategory: z.string().default("Tier 1 Support"),
  countryOfOrigin: z.string().default("Bangladesh"),
  supercessionCode: z.string().default("None"),
  unitOfLength: z.string().default("MM"),

  // --- Bottom Grid Numbers ---
  convFactorIssue: z.coerce.number().default(1),
  netWeightPerUnit: z.coerce.number().default(0.25),
  minimumOrderQty: z.coerce.number().default(10),
  yieldPercentage: z.coerce.number().default(98),
  leadTimeFixed: z.coerce.number().default(14),
  length: z.coerce.number().default(120),
  minimumPrice: z.coerce.number().default(45),
  convFactorPacking: z.coerce.number().default(24),
  minimumOrderValue: z.coerce.number().default(500),
  demandTimeFence: z.coerce.number().default(7),
  leadTimeVariable: z.coerce.number().default(2),
  width: z.coerce.number().default(85),
  standardCost: z.coerce.number().default(38.5),
  multiplierSelling: z.coerce.number().default(1.35),
  convFactorStatistical: z.coerce.number().default(1),
  weightPerUnit: z.coerce.number().default(0.3),
  shelfLife: z.coerce.number().default(365),
  orderMultiple: z.coerce.number().default(5),
  planningTimeFence: z.coerce.number().default(30),
  leadTimeTransport: z.coerce.number().default(3),
  height: z.coerce.number().default(15),
  standardPrice: z.coerce.number().default(52),
  multiplierPurchasing: z.coerce.number().default(1.0),
  strip: z.coerce.number().default(0),

  // --- Bottom Grid Strings/Dates ---
  supercededBy: z.string().default(""),
  drawingNumber: z.string().default("DWG-99201-REV-C"),
  brand: z.string().default("SyncTech Industrial"),
  effectivityDate: z.string().default("2025-01-01"),
  binLocations: z.string().default("A-04-RACK-12"),
  supplierNumber: z.string().default("SU--000001"),
  supercedes: z.string().default(""),
  abcCode: z.string().default("A - High Value"),
  expirationDate: z.string().default("2028-12-31"),
});

export type ItemFormValues = z.infer<typeof itemSchema>;

// ============================================================================
// INITIAL MOCK ITEMS (For Steppers & CRUD verification)
// ============================================================================

const INITIAL_ITEMS: ItemFormValues[] = [
  {
    itemCode: "ITM-3001",
    description: "Industrial Core Microprocessor X4",
    longDescription: "High-performance embedded 64-bit multi-core processing unit designed for critical automation controllers.",
    notes: "Requires ESD safe packaging. Check revision firmware compatibility prior to batch release.",
    links: "https://docs.syncerp.internal/specs/cpu-x4-ind.pdf",
    barcodeNo: "8801948201948",
    alias: "CPU-X4-IND",
    hideItem: false,
    stopOrder: false,
    cutPieces: false,
    dimensionType: "Square",
    mandatoryBatchNo: true,
    matrix: false,
    serialNumberType: "Unique",
    stockType: "Stocked",
    fulfillmentCategory: "Physical",
    itemGroup: "Semiconductors & Processors",
    taxCategory: "Standard VAT (15%)",
    warehouse: "WH-01 Main Central",
    issueUnit: "EA",
    priceCategory: "Standard Commercial",
    grade: "Grade A Industrial",
    division: "Electronics & Tech",
    stockingUnit: "EA",
    packingUnit: "TRAY-24",
    itemClass: "High-Tech Components",
    importDuty: "Duty Free (0%)",
    unitOfWeight: "KG",
    team: "Silicon Operations",
    alternateUnit: "PCS",
    statisticalUnit: "UOM-STAT",
    itemCategory: "Semiconductors",
    supportCategory: "Tier 1 Critical",
    countryOfOrigin: "Bangladesh",
    supercessionCode: "Active Current",
    unitOfLength: "MM",
    convFactorIssue: 1,
    netWeightPerUnit: 0.045,
    minimumOrderQty: 25,
    yieldPercentage: 99.2,
    leadTimeFixed: 21,
    length: 37.5,
    minimumPrice: 185,
    convFactorPacking: 24,
    minimumOrderValue: 4625,
    demandTimeFence: 14,
    leadTimeVariable: 3,
    width: 37.5,
    standardCost: 142.5,
    multiplierSelling: 1.45,
    convFactorStatistical: 1,
    weightPerUnit: 0.052,
    shelfLife: 730,
    orderMultiple: 24,
    planningTimeFence: 45,
    leadTimeTransport: 5,
    height: 4.2,
    standardPrice: 210,
    multiplierPurchasing: 1.0,
    strip: 0,
    supercededBy: "",
    drawingNumber: "DWG-CPU-X4-01",
    brand: "CoreMatrix",
    effectivityDate: "2024-01-01",
    binLocations: "SEC-B-BIN-08",
    supplierNumber: "HAS-000001",
    supercedes: "ITM-2990",
    abcCode: "A - High Value",
    expirationDate: "2029-12-31",
  },
  {
    itemCode: "ITM-3002",
    description: "Precision Anodized Aluminum Enclosure",
    longDescription: "CNC milled 6061-T6 aluminum chassis casing with anti-corrosion matte black anodizing finish.",
    notes: "Inspect surface finish for scratch tolerance according to ISO-2768-m.",
    links: "https://specs.syncerp.internal/drawings/enc-alu-08.dwg",
    barcodeNo: "8801948202910",
    alias: "ENC-ALU-08",
    hideItem: false,
    stopOrder: false,
    cutPieces: false,
    dimensionType: "Cubic",
    mandatoryBatchNo: false,
    matrix: false,
    serialNumberType: "No Serial",
    stockType: "Stocked",
    fulfillmentCategory: "Physical",
    itemGroup: "Mechanical & Chassis",
    taxCategory: "Standard VAT (15%)",
    warehouse: "WH-02 Industrial Annex",
    issueUnit: "EA",
    priceCategory: "Standard Commercial",
    grade: "Grade A",
    division: "Mechanical Systems",
    stockingUnit: "EA",
    packingUnit: "BOX-10",
    itemClass: "Fabricated Metals",
    importDuty: "Standard Duty (5%)",
    unitOfWeight: "KG",
    team: "Mechanical Ops",
    alternateUnit: "PCS",
    statisticalUnit: "UOM-STAT",
    itemCategory: "Fabricated Structural",
    supportCategory: "Standard",
    countryOfOrigin: "Bangladesh",
    supercessionCode: "Active Current",
    unitOfLength: "MM",
    convFactorIssue: 1,
    netWeightPerUnit: 1.15,
    minimumOrderQty: 10,
    yieldPercentage: 97.5,
    leadTimeFixed: 14,
    length: 220,
    minimumPrice: 65,
    convFactorPacking: 10,
    minimumOrderValue: 650,
    demandTimeFence: 7,
    leadTimeVariable: 2,
    width: 140,
    standardCost: 48.0,
    multiplierSelling: 1.4,
    convFactorStatistical: 1,
    weightPerUnit: 1.25,
    shelfLife: 1825,
    orderMultiple: 10,
    planningTimeFence: 30,
    leadTimeTransport: 2,
    height: 55,
    standardPrice: 75,
    multiplierPurchasing: 1.0,
    strip: 0,
    supercededBy: "",
    drawingNumber: "DWG-ALU-ENC-R4",
    brand: "ChassisCraft",
    effectivityDate: "2024-03-15",
    binLocations: "RACK-14-SHELF-3",
    supplierNumber: "SU--000001",
    supercedes: "",
    abcCode: "B - Medium Value",
    expirationDate: "2032-01-01",
  },
  {
    itemCode: "ITM-3003",
    description: "Multi-Spectrum LiDAR Optical Sensor",
    longDescription: "Solid-state autonomous navigation sensor module with 360-degree point-cloud scanning capabilities.",
    notes: "Requires factory optical calibration matrix before installation.",
    links: "https://specs.syncerp.internal/calib/lidar-opt-99.json",
    barcodeNo: "8801948203847",
    alias: "SENS-LIDAR-360",
    hideItem: false,
    stopOrder: false,
    cutPieces: false,
    dimensionType: "Cubic",
    mandatoryBatchNo: true,
    matrix: false,
    serialNumberType: "Unique",
    stockType: "Stocked",
    fulfillmentCategory: "Physical",
    itemGroup: "Sensors & Optical Modules",
    taxCategory: "Standard VAT (15%)",
    warehouse: "WH-01 Main Central",
    issueUnit: "EA",
    priceCategory: "Enterprise Tier A",
    grade: "Military / Aerospace Grade",
    division: "Sensor Technologies",
    stockingUnit: "EA",
    packingUnit: "BOX-01",
    itemClass: "Sensitive Optics",
    importDuty: "Duty Free (0%)",
    unitOfWeight: "KG",
    team: "Optics Engineering",
    alternateUnit: "UNIT",
    statisticalUnit: "UOM-STAT",
    itemCategory: "Electro-Optics",
    supportCategory: "Tier 1 Critical",
    countryOfOrigin: "Bangladesh",
    supercessionCode: "Active Current",
    unitOfLength: "MM",
    convFactorIssue: 1,
    netWeightPerUnit: 0.38,
    minimumOrderQty: 5,
    yieldPercentage: 96.0,
    leadTimeFixed: 30,
    length: 88,
    minimumPrice: 420,
    convFactorPacking: 1,
    minimumOrderValue: 2100,
    demandTimeFence: 21,
    leadTimeVariable: 4,
    width: 88,
    standardCost: 310,
    multiplierSelling: 1.5,
    convFactorStatistical: 1,
    weightPerUnit: 0.42,
    shelfLife: 1095,
    orderMultiple: 1,
    planningTimeFence: 60,
    leadTimeTransport: 4,
    height: 72,
    standardPrice: 480,
    multiplierPurchasing: 1.0,
    strip: 0,
    supercededBy: "",
    drawingNumber: "DWG-LIDAR-REV9",
    brand: "ApexOptics",
    effectivityDate: "2024-06-01",
    binLocations: "CLEANROOM-LOCKER-A",
    supplierNumber: "SU--000002",
    supercedes: "",
    abcCode: "A - High Value",
    expirationDate: "2030-06-01",
  },
];

const EMPTY_ITEM: ItemFormValues = {
  itemCode: "",
  description: "",
  longDescription: "",
  notes: "",
  links: "",
  barcodeNo: "",
  alias: "",
  hideItem: false,
  stopOrder: false,
  cutPieces: false,
  dimensionType: "None",
  mandatoryBatchNo: false,
  matrix: false,
  serialNumberType: "No Serial",
  stockType: "Stocked",
  fulfillmentCategory: "Physical",
  itemGroup: "Semiconductors & Processors",
  taxCategory: "Standard VAT (15%)",
  warehouse: "WH-01 Main Central",
  issueUnit: "EA",
  priceCategory: "Standard Commercial",
  grade: "Grade A",
  division: "Electronics & Tech",
  stockingUnit: "EA",
  packingUnit: "BOX",
  itemClass: "Raw Materials",
  importDuty: "Standard Duty (5%)",
  unitOfWeight: "KG",
  team: "Operations Alpha",
  alternateUnit: "PCS",
  statisticalUnit: "UOM-STAT",
  itemCategory: "Manufactured Assemblies",
  supportCategory: "Standard",
  countryOfOrigin: "Bangladesh",
  supercessionCode: "None",
  unitOfLength: "MM",
  convFactorIssue: 1,
  netWeightPerUnit: 0,
  minimumOrderQty: 1,
  yieldPercentage: 100,
  leadTimeFixed: 0,
  length: 0,
  minimumPrice: 0,
  convFactorPacking: 1,
  minimumOrderValue: 0,
  demandTimeFence: 0,
  leadTimeVariable: 0,
  width: 0,
  standardCost: 0,
  multiplierSelling: 1.0,
  convFactorStatistical: 1,
  weightPerUnit: 0,
  shelfLife: 0,
  orderMultiple: 1,
  planningTimeFence: 0,
  leadTimeTransport: 0,
  height: 0,
  standardPrice: 0,
  multiplierPurchasing: 1.0,
  strip: 0,
  supercededBy: "",
  drawingNumber: "",
  brand: "",
  effectivityDate: "",
  binLocations: "",
  supplierNumber: "",
  supercedes: "",
  abcCode: "B - Medium Value",
  expirationDate: "",
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function ItemManager() {
  const [items, setItems] = useState<ItemFormValues[]>(INITIAL_ITEMS);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("item");
  const [feedback, setFeedback] = useState<{
    type: "success" | "info" | "error";
    message: string;
  } | null>(null);

  const currentItem = items[selectedIndex] || EMPTY_ITEM;

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema) as any,
    defaultValues: currentItem,
    mode: "onBlur",
  });

  const selectItemAtIndex = (index: number) => {
    if (index >= 0 && index < items.length) {
      setSelectedIndex(index);
      form.reset(items[index]);
      setFeedback(null);
    }
  };

  // Steppers & Action Bar Handlers
  const handleTop = () => {
    if (items.length > 0) {
      selectItemAtIndex(0);
      setFeedback({ type: "info", message: "Jumped to first item record." });
    }
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      selectItemAtIndex(selectedIndex - 1);
    } else {
      setFeedback({ type: "info", message: "Already at first item record." });
    }
  };

  const handleNext = () => {
    if (selectedIndex < items.length - 1) {
      selectItemAtIndex(selectedIndex + 1);
    } else {
      setFeedback({ type: "info", message: "Already at last item record." });
    }
  };

  const handleBottom = () => {
    if (items.length > 0) {
      selectItemAtIndex(items.length - 1);
      setFeedback({ type: "info", message: "Jumped to last item record." });
    }
  };

  const handleClear = () => {
    form.reset(EMPTY_ITEM);
    setFeedback({ type: "info", message: "Form cleared. Ready for new item entry." });
  };

  const handleShow = () => {
    const vals = form.getValues();
    setFeedback({
      type: "info",
      message: `Item: [${vals.itemCode || "EMPTY"}] ${vals.description || "No description"} | Group: ${vals.itemGroup} | Cost: $${vals.standardCost} | Price: $${vals.standardPrice}`,
    });
  };

  const handleAdd = () => {
    form.handleSubmit(
      (validData) => {
        const exists = items.some(
          (it) => it.itemCode.toLowerCase() === validData.itemCode.toLowerCase()
        );
        if (exists) {
          setFeedback({
            type: "error",
            message: `Item Code "${validData.itemCode}" already exists!`,
          });
          return;
        }

        setItems((prev) => [...prev, validData]);
        setSelectedIndex(items.length);
        setFeedback({
          type: "success",
          message: `New item "${validData.itemCode}" added successfully.`,
        });
      },
      () => {
        setFeedback({
          type: "error",
          message: "Validation failed! Check all required fields (*).",
        });
      }
    )();
  };

  const handleUpdate = () => {
    form.handleSubmit(
      (validData) => {
        setItems((prev) => {
          const exists = prev.findIndex(
            (it) => it.itemCode === validData.itemCode
          );
          if (exists >= 0) {
            const next = [...prev];
            next[exists] = validData;
            return next;
          } else {
            const next = [...prev];
            next[selectedIndex] = validData;
            return next;
          }
        });
        setFeedback({
          type: "success",
          message: `Item "${validData.itemCode}" updated successfully.`,
        });
      },
      () => {
        setFeedback({
          type: "error",
          message: "Please correct the highlighted validation errors.",
        });
      }
    )();
  };

  const handleDelete = () => {
    if (items.length === 0) return;
    const toDelete = items[selectedIndex];
    if (!toDelete) return;

    const remaining = items.filter((_, idx) => idx !== selectedIndex);
    setItems(remaining);
    const newIdx = Math.max(0, selectedIndex - 1);
    setSelectedIndex(newIdx);
    if (remaining.length > 0) {
      form.reset(remaining[newIdx]);
    } else {
      form.reset(EMPTY_ITEM);
    }
    setFeedback({
      type: "info",
      message: `Item "${toDelete.itemCode}" has been deleted.`,
    });
  };

  // Action "-" handler (decrement / remove active record or reset)
  const handleMinus = () => {
    handleDelete();
  };

  return (
    <div className="w-full flex flex-col font-sans space-y-3">
      {/* ==================================================================== */}
      {/* PAGE TITLE (Centered at top)                                        */}
      {/* ==================================================================== */}
      <div className="w-full text-center py-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-white uppercase font-heading">
          Item Master
        </h1>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
          Global Material Master, Engineering Parameters, Dimensions &amp; Financial Controls
        </p>
      </div>

      {/* ==================================================================== */}
      {/* TASK 1: TOP ACTION BAR                                               */}
      {/* Buttons: Show, Clear, Top, Previous, Next, Bottom, Add, Update,      */}
      {/* Delete, -                                                            */}
      {/* ==================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-white/10 shadow-sm">
        {/* Navigation & Inspection Buttons */}
        <div className="flex items-center flex-wrap gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleShow}
            className="h-7 px-2.5 text-xs font-semibold border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/5 gap-1 text-slate-700 dark:text-gray-200"
          >
            <Eye className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Show</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="h-7 px-2.5 text-xs font-semibold border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/5 gap-1 text-slate-700 dark:text-gray-200"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Clear</span>
          </Button>

          <div className="h-4 w-px bg-slate-300 dark:bg-white/20 mx-1 hidden sm:block" />

          {/* Steppers */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTop}
            disabled={items.length === 0 || selectedIndex === 0}
            title="Top (First record)"
            className="h-7 px-2 text-xs font-semibold border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-200 disabled:opacity-40"
          >
            <ChevronsUp className="w-3.5 h-3.5" />
            <span className="hidden md:inline ml-1">Top</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={items.length === 0 || selectedIndex === 0}
            title="Previous record"
            className="h-7 px-2 text-xs font-semibold border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-200 disabled:opacity-40"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span className="hidden md:inline ml-1">Previous</span>
          </Button>

          <div className="px-2 py-0.5 text-[11px] font-mono text-slate-500 dark:text-gray-400 bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded">
            {items.length > 0 ? `${selectedIndex + 1} / ${items.length}` : "0 / 0"}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={items.length === 0 || selectedIndex >= items.length - 1}
            title="Next record"
            className="h-7 px-2 text-xs font-semibold border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-200 disabled:opacity-40"
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <span className="hidden md:inline ml-1">Next</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleBottom}
            disabled={items.length === 0 || selectedIndex >= items.length - 1}
            title="Bottom (Last record)"
            className="h-7 px-2 text-xs font-semibold border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-200 disabled:opacity-40"
          >
            <ChevronsDown className="w-3.5 h-3.5" />
            <span className="hidden md:inline ml-1">Bottom</span>
          </Button>
        </div>

        {/* Mutation Actions: Add, Update, Delete, - */}
        <div className="flex items-center flex-wrap gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAdd}
            className="h-7 px-2.5 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/80 gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUpdate}
            className="h-7 px-2.5 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/80 gap-1"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Update</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={items.length === 0}
            className="h-7 px-2.5 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/80 gap-1 disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </Button>

          {/* Action Button: - */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleMinus}
            title="Delete / Remove Record (-)"
            className="h-7 w-7 p-0 rounded border-slate-300 dark:border-white/15 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-gray-200 font-bold text-sm flex items-center justify-center cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Feedback Alert Toast */}
      {feedback && (
        <div
          className={`flex items-center justify-between px-3 py-1.5 rounded border text-xs animate-in fade-in duration-150 ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
              : feedback.type === "error"
              ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200"
              : "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
            {feedback.type === "error" && <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />}
            {feedback.type === "info" && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
            <span className="font-medium">{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs font-bold px-1"
          >
            ×
          </button>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SHADCN TABS                                                          */}
      {/* Triggers: Item (default), Prices, Kits, Cross References,            */}
      {/* Serial Numbers, Docs, Bar Codes, Inventory, Back Orders              */}
      {/* ==================================================================== */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex flex-col"
      >
        <div className="border-b border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#161616] px-2 pt-1 overflow-x-auto scrollbar-none">
          <TabsList className="bg-transparent p-0 h-8 gap-1 flex items-center">
            <TabsTrigger
              value="item"
              className="px-3 py-1 text-xs font-semibold rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <Package className="w-3 h-3 mr-1.5 inline-block" />
              Item
            </TabsTrigger>
            <TabsTrigger
              value="prices"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <DollarSign className="w-3 h-3 mr-1.5 inline-block" />
              Prices
            </TabsTrigger>
            <TabsTrigger
              value="kits"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <Boxes className="w-3 h-3 mr-1.5 inline-block" />
              Kits
            </TabsTrigger>
            <TabsTrigger
              value="cross-references"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <Layers className="w-3 h-3 mr-1.5 inline-block" />
              Cross References
            </TabsTrigger>
            <TabsTrigger
              value="serial-numbers"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <Hash className="w-3 h-3 mr-1.5 inline-block" />
              Serial Numbers
            </TabsTrigger>
            <TabsTrigger
              value="docs"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <FileText className="w-3 h-3 mr-1.5 inline-block" />
              Docs
            </TabsTrigger>
            <TabsTrigger
              value="bar-codes"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <Barcode className="w-3 h-3 mr-1.5 inline-block" />
              Bar Codes
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <Archive className="w-3 h-3 mr-1.5 inline-block" />
              Inventory
            </TabsTrigger>
            <TabsTrigger
              value="back-orders"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <Truck className="w-3 h-3 mr-1.5 inline-block" />
              Back Orders
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ================================================================== */}
        {/* TASK 3: FULL WIDTH ITEM TAB FORM (Inside ScrollArea)               */}
        {/* ================================================================== */}
        <TabsContent value="item" className="mt-3 outline-none">
          <Form {...form}>
            <form className="space-y-4">
              <ScrollArea className="h-[calc(100vh-270px)] pr-3">
                <div className="space-y-4 pb-6">
                  {/* ========================================================== */}
                  {/* TOP SECTION: SPLIT 50/50                                   */}
                  {/* Left: Text & Descriptions | Right: Green Box Settings      */}
                  {/* ========================================================== */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                    {/* LEFT SIDE: Text Inputs and Textareas */}
                    <div className="border border-slate-200 dark:border-white/10 rounded-md p-3 bg-slate-50/50 dark:bg-[#151515] space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] pb-1 border-b border-slate-200 dark:border-white/10 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Item Identification &amp; Descriptions</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <FormField
                          control={form.control}
                          name="itemCode"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Item Code <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. ITM-3001" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                              </FormControl>
                              <FormMessage className="text-[10px]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="alias"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Alias / Alternate Part #
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. CPU-X4-IND" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5">
                            <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                              Description <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Short commercial description" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                            </FormControl>
                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="longDescription"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5">
                            <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                              Long Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={2}
                                placeholder="Detailed engineering and catalog specification..."
                                className="text-xs bg-white dark:bg-[#121212] resize-none"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="space-y-0.5">
                            <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                              Handling Notes &amp; Instructions
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={2}
                                placeholder="Internal handling precautions, storage criteria, or packaging guidelines..."
                                className="text-xs bg-white dark:bg-[#121212] resize-none"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <FormField
                          control={form.control}
                          name="barcodeNo"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Barcode Number
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="EAN-13 / UPC Code" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="links"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Documentation URL / Link
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="https://docs.spec/item.pdf" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* RIGHT SIDE: Legacy Green Box Settings & Toggles */}
                    <div className="space-y-2">
                      {/* Box 1: Visibility, Cut-pieces, Batch & Matrix */}
                      <div className="bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40 p-2.5 rounded-md space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center justify-between pb-1 border-b border-teal-200/70 dark:border-teal-800/40">
                          <span>Visibility &amp; Tracking Flags</span>
                          <span className="font-mono text-[9px] text-teal-600 dark:text-teal-400">GRP-VTR</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-0.5">
                          <FormField
                            control={form.control}
                            name="hideItem"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-1.5 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-[11px] font-medium text-slate-700 dark:text-gray-300 cursor-pointer">
                                  Hide Item
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="stopOrder"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-1.5 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-[11px] font-medium text-slate-700 dark:text-gray-300 cursor-pointer">
                                  Stop Order
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cutPieces"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-1.5 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-[11px] font-medium text-slate-700 dark:text-gray-300 cursor-pointer">
                                  Cut Pieces
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="mandatoryBatchNo"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-1.5 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-[11px] font-medium text-slate-700 dark:text-gray-300 cursor-pointer">
                                  Mandatory Batch #
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="matrix"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-1.5 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-[11px] font-medium text-slate-700 dark:text-gray-300 cursor-pointer">
                                  Matrix Item
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Box 2: Dimension Type & Serial Number Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Dimension Type */}
                        <div className="bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40 p-2 rounded-md">
                          <FormField
                            control={form.control}
                            name="dimensionType"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                                  Dimension Type
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="grid grid-cols-2 gap-1.5 pt-0.5"
                                  >
                                    {(["None", "Linear", "Square", "Cubic"] as const).map((dim) => (
                                      <div key={dim} className="flex items-center space-x-1.5">
                                        <RadioGroupItem value={dim} id={`dim-${dim}`} />
                                        <Label htmlFor={`dim-${dim}`} className="cursor-pointer text-[11px] text-slate-700 dark:text-gray-300">
                                          {dim}
                                        </Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Serial Number Type */}
                        <div className="bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40 p-2 rounded-md">
                          <FormField
                            control={form.control}
                            name="serialNumberType"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                                  Serial Number Type
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-col gap-1 pt-0.5"
                                  >
                                    {(["No Serial", "Unique", "Batch Unique"] as const).map((ser) => (
                                      <div key={ser} className="flex items-center space-x-1.5">
                                        <RadioGroupItem value={ser} id={`ser-${ser}`} />
                                        <Label htmlFor={`ser-${ser}`} className="cursor-pointer text-[11px] text-slate-700 dark:text-gray-300">
                                          {ser}
                                        </Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Box 3: Stock Type (*) & Fulfillment Category (*) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {/* Stock Type */}
                        <div className="bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40 p-2 rounded-md">
                          <FormField
                            control={form.control}
                            name="stockType"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                                  Stock Type <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="grid grid-cols-2 gap-1.5 pt-0.5"
                                  >
                                    {(["Stocked", "Non-Stocked", "Service", "Labor"] as const).map((stk) => (
                                      <div key={stk} className="flex items-center space-x-1.5">
                                        <RadioGroupItem value={stk} id={`stk-${stk}`} />
                                        <Label htmlFor={`stk-${stk}`} className="cursor-pointer text-[11px] text-slate-700 dark:text-gray-300">
                                          {stk}
                                        </Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Fulfillment Category */}
                        <div className="bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40 p-2 rounded-md">
                          <FormField
                            control={form.control}
                            name="fulfillmentCategory"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
                                  Fulfillment Category <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="grid grid-cols-2 gap-1.5 pt-0.5"
                                  >
                                    {(["Physical", "Digital", "Drop-ship", "Consignment"] as const).map((ful) => (
                                      <div key={ful} className="flex items-center space-x-1.5">
                                        <RadioGroupItem value={ful} id={`ful-${ful}`} />
                                        <Label htmlFor={`ful-${ful}`} className="cursor-pointer text-[11px] text-slate-700 dark:text-gray-300">
                                          {ful}
                                        </Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ========================================================== */}
                  {/* BOTTOM SECTION: DENSE 3-COLUMN GRID                        */}
                  {/* Measurements, Financials, Categories, Quantities, Codes   */}
                  {/* ========================================================== */}
                  <div className="border-t border-slate-200 dark:border-white/10 pt-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Boxes className="w-4 h-4" />
                        <span>Comprehensive Item Parameters (3-Column Dense Architecture)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">
                        Values auto-format for high throughput entry
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2.5">
                      {/* ==================================================== */}
                      {/* COLUMN 1: CLASSIFICATION, UNITS & CONVERSIONS        */}
                      {/* ==================================================== */}
                      <div className="space-y-2 border border-slate-200 dark:border-white/10 p-2.5 rounded-md bg-slate-50/30 dark:bg-[#161616]">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 pb-1 border-b border-slate-200 dark:border-white/10">
                          Classification &amp; Units of Measure
                        </div>

                        {/* Item Group (Required) */}
                        <FormField
                          control={form.control}
                          name="itemGroup"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Item Group <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                              </FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Item Group"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-7 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                >
                                  <option value="Semiconductors & Processors">Semiconductors &amp; Processors</option>
                                  <option value="Mechanical & Chassis">Mechanical &amp; Chassis</option>
                                  <option value="Sensors & Optical Modules">Sensors &amp; Optical Modules</option>
                                  <option value="Power & Energy Systems">Power &amp; Energy Systems</option>
                                  <option value="Packaging & Consumables">Packaging &amp; Consumables</option>
                                </select>
                              </FormControl>
                              <FormMessage className="text-[10px]" />
                            </FormItem>
                          )}
                        />

                        {/* Item Category */}
                        <FormField
                          control={form.control}
                          name="itemCategory"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Item Category (Select)
                              </FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Item Category"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-7 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                >
                                  <option value="Semiconductors">Semiconductors</option>
                                  <option value="Fabricated Structural">Fabricated Structural</option>
                                  <option value="Electro-Optics">Electro-Optics</option>
                                  <option value="Manufactured Assemblies">Manufactured Assemblies</option>
                                  <option value="Standard Off-the-Shelf">Standard Off-the-Shelf</option>
                                </select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Item Class */}
                        <FormField
                          control={form.control}
                          name="itemClass"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Item Class (Select)
                              </FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Item Class"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-7 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                >
                                  <option value="Raw Materials">Raw Materials</option>
                                  <option value="Work in Progress (WIP)">Work in Progress (WIP)</option>
                                  <option value="Finished Goods">Finished Goods</option>
                                  <option value="High-Tech Components">High-Tech Components</option>
                                  <option value="Fabricated Metals">Fabricated Metals</option>
                                  <option value="Sensitive Optics">Sensitive Optics</option>
                                </select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Division & Grade */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="division"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Division
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Division"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1.5 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="Electronics & Tech">Electronics &amp; Tech</option>
                                    <option value="Mechanical Systems">Mechanical Systems</option>
                                    <option value="Sensor Technologies">Sensor Technologies</option>
                                    <option value="Logistics Support">Logistics Support</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="grade"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Grade
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Grade"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1.5 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="Grade A Industrial">Grade A Industrial</option>
                                    <option value="Grade A">Grade A</option>
                                    <option value="Grade B Commercial">Grade B Commercial</option>
                                    <option value="Military / Aerospace Grade">Military / Aerospace</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Price Category */}
                        <FormField
                          control={form.control}
                          name="priceCategory"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Price Category
                              </FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Price Category"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-7 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                >
                                  <option value="Standard Commercial">Standard Commercial</option>
                                  <option value="Enterprise Tier A">Enterprise Tier A</option>
                                  <option value="OEM Contract Rate">OEM Contract Rate</option>
                                  <option value="Distributor Wholesale">Distributor Wholesale</option>
                                </select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Stocking & Packing Units */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="stockingUnit"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Stocking Unit
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Stocking Unit"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1.5 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                  >
                                    <option value="EA">EA - Each</option>
                                    <option value="PCS">PCS - Pieces</option>
                                    <option value="SET">SET - Sets</option>
                                    <option value="MTR">MTR - Meters</option>
                                    <option value="KG">KG - Kilograms</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="packingUnit"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Packing Unit
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Packing Unit"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1.5 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                  >
                                    <option value="BOX">BOX</option>
                                    <option value="BOX-10">BOX-10</option>
                                    <option value="TRAY-24">TRAY-24</option>
                                    <option value="CARTON">CARTON</option>
                                    <option value="PALLET">PALLET</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Issue Unit & Alternate Unit */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="issueUnit"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Issue Unit
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Issue Unit"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1.5 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                  >
                                    <option value="EA">EA</option>
                                    <option value="PCS">PCS</option>
                                    <option value="SET">SET</option>
                                    <option value="UNIT">UNIT</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="alternateUnit"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Alternate Unit
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Alternate Unit"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1.5 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                  >
                                    <option value="PCS">PCS</option>
                                    <option value="UNIT">UNIT</option>
                                    <option value="BOX">BOX</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Statistical Unit & Conversion Factors */}
                        <FormField
                          control={form.control}
                          name="statisticalUnit"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Statistical Unit
                              </FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Statistical Unit"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-7 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                >
                                  <option value="UOM-STAT">UOM-STAT - Customs Standard</option>
                                  <option value="STAT-WEIGHT">STAT-WEIGHT - By Ton</option>
                                  <option value="STAT-VOLUME">STAT-VOLUME - Cubic M</option>
                                </select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-3 gap-1.5">
                          <FormField
                            control={form.control}
                            name="convFactorPacking"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Conv Pack
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="1" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="convFactorIssue"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Conv Issue
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="1" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="convFactorStatistical"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Conv Stat
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="1" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Units of Measure Weight & Length + Country of Origin */}
                        <div className="grid grid-cols-3 gap-1.5">
                          <FormField
                            control={form.control}
                            name="unitOfWeight"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  UOM Weight
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Unit of Weight"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                  >
                                    <option value="KG">KG</option>
                                    <option value="G">G</option>
                                    <option value="LB">LB</option>
                                    <option value="OZ">OZ</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="unitOfLength"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  UOM Length
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Unit of Length"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                  >
                                    <option value="MM">MM</option>
                                    <option value="CM">CM</option>
                                    <option value="M">M</option>
                                    <option value="INCH">INCH</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="countryOfOrigin"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Origin
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Country of Origin"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                  >
                                    <option value="Bangladesh">BGD</option>
                                    <option value="India">IND</option>
                                    <option value="China">CHN</option>
                                    <option value="USA">USA</option>
                                    <option value="Germany">DEU</option>
                                    <option value="Japan">JPN</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* ==================================================== */}
                      {/* COLUMN 2: PRICING, COSTING & PROCUREMENT             */}
                      {/* ==================================================== */}
                      <div className="space-y-2 border border-slate-200 dark:border-white/10 p-2.5 rounded-md bg-slate-50/30 dark:bg-[#161616]">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 pb-1 border-b border-slate-200 dark:border-white/10">
                          Pricing, Costing &amp; Procurement
                        </div>

                        {/* Tax Category (Required) */}
                        <FormField
                          control={form.control}
                          name="taxCategory"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Tax Category <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                              </FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Tax Category"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-7 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                >
                                  <option value="Standard VAT (15%)">Standard VAT (15%)</option>
                                  <option value="Reduced Rate (5%)">Reduced Rate (5%)</option>
                                  <option value="Zero Rated Export (0%)">Zero Rated Export (0%)</option>
                                  <option value="Exempt / Non-Taxable">Exempt / Non-Taxable</option>
                                </select>
                              </FormControl>
                              <FormMessage className="text-[10px]" />
                            </FormItem>
                          )}
                        />

                        {/* Standard Price & Minimum Price */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="standardPrice"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Standard Price ($)
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="minimumPrice"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Minimum Price ($)
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Standard Cost & Multipliers */}
                        <div className="grid grid-cols-3 gap-1.5">
                          <FormField
                            control={form.control}
                            name="standardCost"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Std Cost ($)
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="multiplierSelling"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Mult Sell
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="multiplierPurchasing"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Mult Purch
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Import Duty */}
                        <FormField
                          control={form.control}
                          name="importDuty"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Import Duty Rate
                              </FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Import Duty"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-7 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                >
                                  <option value="Duty Free (0%)">Duty Free (0%)</option>
                                  <option value="Standard Duty (5%)">Standard Duty (5%)</option>
                                  <option value="Heavy Machinery (10%)">Heavy Machinery (10%)</option>
                                  <option value="Regulatory Duty (25%)">Regulatory Duty (25%)</option>
                                </select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Order Quantities: MOQ, Order Multiple, Minimum Value */}
                        <div className="grid grid-cols-3 gap-1.5">
                          <FormField
                            control={form.control}
                            name="minimumOrderQty"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Min Order Qty
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="orderMultiple"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Order Multiple
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="minimumOrderValue"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Min Value ($)
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Yield % & Supplier Number */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="yieldPercentage"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Yield %
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="supplierNumber"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Primary Supplier #
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="SU--000001" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Brand */}
                        <FormField
                          control={form.control}
                          name="brand"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Manufacturer / Brand
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Brand Name" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Lead Times: Fixed, Variable, Transport */}
                        <div className="grid grid-cols-3 gap-1.5">
                          <FormField
                            control={form.control}
                            name="leadTimeFixed"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Lead Fixed (d)
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="leadTimeVariable"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Lead Var (d)
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="leadTimeTransport"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Lead Trans (d)
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Time Fences: Demand & Planning */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="demandTimeFence"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Demand Time Fence (d)
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="planningTimeFence"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Planning Time Fence (d)
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* ==================================================== */}
                      {/* COLUMN 3: PHYSICAL DIMENSIONS, LOGISTICS & LIFECYCLE */}
                      {/* ==================================================== */}
                      <div className="space-y-2 border border-slate-200 dark:border-white/10 p-2.5 rounded-md bg-slate-50/30 dark:bg-[#161616]">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300 pb-1 border-b border-slate-200 dark:border-white/10">
                          Logistics, Dimensions &amp; Life Cycle
                        </div>

                        {/* Warehouse & Bin Locations */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="warehouse"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Default Warehouse
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Warehouse"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1.5 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                  >
                                    <option value="WH-01 Main Central">WH-01 Main</option>
                                    <option value="WH-02 Industrial Annex">WH-02 Annex</option>
                                    <option value="WH-03 EPZ Port Hub">WH-03 Port</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="binLocations"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Bin Location
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. A-04-RACK-12" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* ABC Code & Shelf Life */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="abcCode"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  ABC Code
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="ABC Code"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1.5 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                  >
                                    <option value="A - High Value">A - High Value</option>
                                    <option value="B - Medium Value">B - Medium Value</option>
                                    <option value="C - Low Value">C - Low Value</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="shelfLife"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Shelf Life (Days)
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Weights: Weight Per Unit, Net Weight Per Unit */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="weightPerUnit"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Gross Weight / Unit
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.001" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="netWeightPerUnit"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Net Weight / Unit
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.001" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Physical Dimensions: Length, Width, Height, Strip */}
                        <div className="grid grid-cols-4 gap-1">
                          <FormField
                            control={form.control}
                            name="length"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Length
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="width"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Width
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Height
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="strip"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[9px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Strip
                                </FormLabel>
                                <FormControl>
                                  <Input type="number" step="1" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Drawing Number */}
                        <FormField
                          control={form.control}
                          name="drawingNumber"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Engineering Drawing #
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="DWG-99201-REV-C" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Team & Support Category */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="team"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Engineering Team
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Engineering Team"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1.5 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                  >
                                    <option value="Silicon Operations">Silicon Operations</option>
                                    <option value="Mechanical Ops">Mechanical Ops</option>
                                    <option value="Optics Engineering">Optics Engineering</option>
                                    <option value="Operations Alpha">Operations Alpha</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="supportCategory"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Support Category
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Support Category"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-7 px-1.5 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                  >
                                    <option value="Tier 1 Critical">Tier 1 Critical</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Depot Repair">Depot Repair</option>
                                    <option value="Field Replaceable">Field Replaceable</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Effectivity Date & Expiration Date */}
                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="effectivityDate"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Effectivity Date
                                </FormLabel>
                                <FormControl>
                                  <Input type="date" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="expirationDate"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Expiration Date
                                </FormLabel>
                                <FormControl>
                                  <Input type="date" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Supercession: Supercession Code, Supercedes, Superceded By */}
                        <FormField
                          control={form.control}
                          name="supercessionCode"
                          render={({ field }) => (
                            <FormItem className="space-y-0.5">
                              <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                Supercession Code
                              </FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Supercession Code"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-7 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded text-slate-900 dark:text-white"
                                >
                                  <option value="None">None</option>
                                  <option value="Active Current">Active Current</option>
                                  <option value="Direct Replacement">Direct Replacement</option>
                                  <option value="Conditional Substitution">Conditional Substitution</option>
                                  <option value="Obsolete - Do Not Reorder">Obsolete - Do Not Reorder</option>
                                </select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name="supercedes"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Supercedes Part #
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. ITM-2990" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="supercededBy"
                            render={({ field }) => (
                              <FormItem className="space-y-0.5">
                                <FormLabel className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold">
                                  Superceded By
                                </FormLabel>
                                <FormControl>
                                  <Input placeholder="Future Part #" className="h-7 text-xs bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </form>
          </Form>
        </TabsContent>

        {/* Other Tabs Placeholders */}
        <TabsContent value="prices" className="mt-3 outline-none p-4 text-center">
          <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
            <DollarSign className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Item Pricing &amp; Volume Bands</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
              Catalogue prices, wholesale customer price groups, contract matrices, and promotional price rules.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="kits" className="mt-3 outline-none p-4 text-center">
          <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
            <Boxes className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Bill of Materials (BOM) &amp; Kit Configuration</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
              Component hierarchy, kit assembly recipes, sub-assembly breakdown, and yield scrap allowances.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="cross-references" className="mt-3 outline-none p-4 text-center">
          <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
            <Layers className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Customer &amp; Vendor Cross References</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
              External customer part numbers, manufacturer SKU mappings, interchangeability indexes, and OEM cross-referencing.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="serial-numbers" className="mt-3 outline-none p-4 text-center">
          <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
            <Hash className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Serial Number &amp; Lot Tracking</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
              Genealogy tracking, warranty start dates, manufacturing batch numbers, and serialization ledger.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="docs" className="mt-3 outline-none p-4 text-center">
          <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
            <FileText className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Engineering Documents &amp; Schematics</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
              CAD blueprints, material safety datasheets (MSDS), compliance certificates, and test reports.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="bar-codes" className="mt-3 outline-none p-4 text-center">
          <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
            <Barcode className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Bar Codes &amp; RFID Labels</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
              GS1-128 shipping labels, EAN-13 consumer unit bar codes, QR code assets, and packaging labels.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="mt-3 outline-none p-4 text-center">
          <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
            <Archive className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Multi-Warehouse Inventory Stock Levels</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
              On hand quantities, allocated orders, available to promise (ATP), safety stock thresholds, and replenishment points.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="back-orders" className="mt-3 outline-none p-4 text-center">
          <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
            <Truck className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Back Orders &amp; Fulfillment Queue</h3>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
              Open customer backorders awaiting incoming shipment allocation, priority queue, and estimated ETA.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

