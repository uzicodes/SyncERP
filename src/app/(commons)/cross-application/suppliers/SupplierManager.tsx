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
  Search,
  Building2,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  Percent,
  Users2,
  ShoppingCart,
  DollarSign,
  Tag,
  ShieldCheck,
  Calendar,
  Layers,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

// ============================================================================
// TASK 2: ZOD SCHEMA & REACT HOOK FORM
// ============================================================================

export const supplierSchema = z.object({
  // Identification
  supplierNumber: z.string().min(1, "Supplier number is required"),
  shortName: z.string().min(1, "Short name is required"),
  company: z.string().min(1, "Company name is required"),

  // Address
  address1: z.string().default(""),
  address2: z.string().default(""),
  city: z.string().default(""),
  state: z.string().default(""),
  zip: z.string().default(""),
  country: z.string().default("Bangladesh"),

  // Contact Person
  salutation: z.enum(["Dr", "Mr", "Mrs", "Ms", "Prof"]).default("Mr"),
  firstName: z.string().default(""),
  middleName: z.string().default(""),
  lastName: z.string().default(""),
  title: z.string().default(""),

  // Contact Info (Required: phone*, mobile*, email*)
  phone: z.string().min(1, "Phone number is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  url: z.string().default(""),
  id: z.string().default(""),
  fax: z.string().default(""),
  taxNumber: z.string().default(""),

  // Financial & Categorization (Required: controlAccountAP*, supplierGroup*, controlAccountAdvance*, taxScope*)
  controlAccountAP: z.string().min(1, "Control account (AP) is required"),
  supplierGroup: z.string().min(1, "Supplier group is required"),
  supplierType: z.string().default("Direct Supplier"),
  priceGroup: z.string().default("Standard Tier"),
  controlAccountAdvance: z.string().min(1, "Control account advance is required"),
  taxScope: z.string().min(1, "Tax scope is required"),

  // Attributes
  supplierStatus: z.enum(["1-Open", "6-Held"]).default("1-Open"),
  creditLimit: z.coerce.number().default(0),
  creditAvailable: z.coerce.number().default(0),
  creditTerms: z.coerce.number().default(30),
  discountPercentage: z.coerce.number().min(0).max(100).default(0),
  agent: z.string().default(""),
  commissionPercentage: z.coerce.number().min(0).max(100).default(0),
  currency: z.string().min(1, "Currency is required").default("BDT"),
  location: z.string().default("Dhaka Central"),
  license: z.string().default(""),
  expirationDate: z.string().default(""),
  permitApproval: z.enum(["1-Automatic", "2-Manual"]).default("1-Automatic"),
  buyer: z.string().default("Procurement Lead"),
  deliveryZone: z.string().default("Zone A - Urban Central"),
  timeSlot: z.string().default("09:00 - 13:00"),
  paymentInstructions: z.string().default(""),
});

export type SupplierFormValues = z.infer<typeof supplierSchema>;

// ============================================================================
// MOCK DATA (As requested by user)
// ============================================================================

const INITIAL_SUPPLIERS: SupplierFormValues[] = [
  {
    supplierNumber: "HAS-000001",
    shortName: "Once Human",
    company: "Once Human",
    address1: "Plot 42, Road 11, Banani",
    address2: "Level 7, Venture Tower",
    city: "Dhaka",
    state: "Dhaka",
    zip: "1213",
    country: "Bangladesh",
    salutation: "Mr",
    firstName: "Tanvir",
    middleName: "H.",
    lastName: "Chowdhury",
    title: "Chief Commercial Officer",
    phone: "+880 2 988-1122",
    mobile: "+880 1711-000001",
    email: "contact@oncehuman.io",
    url: "https://oncehuman.io",
    id: "NID-8829104821",
    fax: "+880 2 988-1123",
    taxNumber: "TIN-9920194827",
    controlAccountAP: "2010 - Trade Payables",
    supplierGroup: "Technology & Software",
    supplierType: "SaaS & Cloud Provider",
    priceGroup: "Enterprise Tier A",
    controlAccountAdvance: "1050 - Advance to Suppliers",
    taxScope: "Domestic Taxable (15%)",
    supplierStatus: "1-Open",
    creditLimit: 250000,
    creditAvailable: 195000,
    creditTerms: 30,
    discountPercentage: 5,
    agent: "Kamal Hasan",
    commissionPercentage: 2,
    currency: "BDT",
    location: "Dhaka Central",
    license: "TRAD/DNCC/029104/2024",
    expirationDate: "2027-12-31",
    permitApproval: "1-Automatic",
    buyer: "Syed Rafiq",
    deliveryZone: "Zone A - Urban Central",
    timeSlot: "09:00 - 13:00",
    paymentInstructions: "Electronic Fund Transfer (EFT) to City Bank A/C 2201948201.",
  },
  {
    supplierNumber: "SU--000001",
    shortName: "SU--1",
    company: "SU--1 LTD",
    address1: "Industrial Area 4, Block C",
    address2: "Sadarghat Terminal Road",
    city: "Chittagong",
    state: "Chittagong",
    zip: "4000",
    country: "Bangladesh",
    salutation: "Mr",
    firstName: "Shafique",
    middleName: "A.",
    lastName: "Rahman",
    title: "Operations Director",
    phone: "+880 31 712-401",
    mobile: "+880 1811-000002",
    email: "procure@su1ltd.com",
    url: "https://su1ltd.com.bd",
    id: "BIN-00291039401",
    fax: "+880 31 712-402",
    taxNumber: "TIN-4482910293",
    controlAccountAP: "2010 - Trade Payables",
    supplierGroup: "Manufacturing Equipment",
    supplierType: "Heavy Machinery Vendor",
    priceGroup: "Standard Tier",
    controlAccountAdvance: "1050 - Advance to Suppliers",
    taxScope: "Standard VAT 15%",
    supplierStatus: "1-Open",
    creditLimit: 500000,
    creditAvailable: 420000,
    creditTerms: 45,
    discountPercentage: 8,
    agent: "Nusrat Jahan",
    commissionPercentage: 3.5,
    currency: "BDT",
    location: "Chittagong Port Zone",
    license: "EXP-REG-CH-99401",
    expirationDate: "2026-06-30",
    permitApproval: "1-Automatic",
    buyer: "Tariqul Islam",
    deliveryZone: "Zone B - Port & Industrial",
    timeSlot: "14:00 - 18:00",
    paymentInstructions: "Letter of Credit (LC) at sight or 45-day deferred payment.",
  },
  {
    supplierNumber: "SU--000002",
    shortName: "MuffinTech",
    company: "MuffinTech Solutions Ltd.",
    address1: "House 18, Road 4, Sector 3, Uttara",
    address2: "Muffin Tower 4th Floor",
    city: "Dhaka",
    state: "Dhaka",
    zip: "1230",
    country: "Bangladesh",
    salutation: "Ms",
    firstName: "Farzana",
    middleName: "K.",
    lastName: "Ahmed",
    title: "Managing Director",
    phone: "+880 2 895-3344",
    mobile: "+880 1711-000003",
    email: "orders@muffintech.bd",
    url: "https://muffintech.bd",
    id: "NID-9948201948",
    fax: "+880 2 895-3345",
    taxNumber: "TIN-1192840291",
    controlAccountAP: "2010 - Trade Payables",
    supplierGroup: "Electronics Components",
    supplierType: "Authorized Distributor",
    priceGroup: "Wholesale Tier B",
    controlAccountAdvance: "1050 - Advance to Suppliers",
    taxScope: "Standard VAT 15%",
    supplierStatus: "1-Open",
    creditLimit: 300000,
    creditAvailable: 280000,
    creditTerms: 30,
    discountPercentage: 10,
    agent: "Rezaul Karim",
    commissionPercentage: 1.5,
    currency: "BDT",
    location: "Uttara Sub-Hub",
    license: "TRAD/DSCC/011928/2023",
    expirationDate: "2028-10-15",
    permitApproval: "1-Automatic",
    buyer: "Syed Rafiq",
    deliveryZone: "Zone A - Urban Central",
    timeSlot: "09:00 - 13:00",
    paymentInstructions: "BEFTN transfer to Eastern Bank Ltd. Account No. 1042008819.",
  },
  {
    supplierNumber: "SU--000003",
    shortName: "MonkeyLedger",
    company: "MonkeyLedger Business Systems Inc.",
    address1: "74 Mohakhali C/A",
    address2: "Floor 11, Green Delta Aspin",
    city: "Dhaka",
    state: "Dhaka",
    zip: "1212",
    country: "Bangladesh",
    salutation: "Dr",
    firstName: "Mahbubur",
    middleName: "S.",
    lastName: "Dewan",
    title: "Lead Systems Architect",
    phone: "+880 2 984-5500",
    mobile: "+880 1911-000004",
    email: "finance@monkeyledger.org",
    url: "https://monkeyledger.org",
    id: "BIN-0099482103",
    fax: "+880 2 984-5501",
    taxNumber: "TIN-5501928301",
    controlAccountAP: "2020 - Subcontractor Payables",
    supplierGroup: "Consulting & Services",
    supplierType: "Professional Enterprise",
    priceGroup: "Fixed Retainer",
    controlAccountAdvance: "1050 - Advance to Suppliers",
    taxScope: "Zero Rated (0%)",
    supplierStatus: "6-Held",
    creditLimit: 150000,
    creditAvailable: 0,
    creditTerms: 15,
    discountPercentage: 0,
    agent: "None Assigned",
    commissionPercentage: 0,
    currency: "BDT",
    location: "Mohakhali Tech Hub",
    license: "TRAD/DNCC/088271/2022",
    expirationDate: "2025-04-10",
    permitApproval: "2-Manual",
    buyer: "Tariqul Islam",
    deliveryZone: "Zone C - Suburban North",
    timeSlot: "14:00 - 18:00",
    paymentInstructions: "Account currently flagged as Held pending audit verification.",
  },
  {
    supplierNumber: "SU--000004",
    shortName: "MistakeFree",
    company: "MistakeFree Operations Group",
    address1: "EPZ Gate 2 Road, CEPZ",
    address2: "Logistics Terminal Bay 9",
    city: "Chittagong",
    state: "Chittagong",
    zip: "4223",
    country: "Bangladesh",
    salutation: "Mr",
    firstName: "Anisur",
    middleName: "Z.",
    lastName: "Miah",
    title: "Fleet & Logistics Manager",
    phone: "+880 31 251-8890",
    mobile: "+880 1611-000005",
    email: "support@mistakefreeops.com",
    url: "https://mistakefreeops.com",
    id: "NID-7728104829",
    fax: "+880 31 251-8891",
    taxNumber: "TIN-8820194820",
    controlAccountAP: "2010 - Trade Payables",
    supplierGroup: "Logistics & Supply Chain",
    supplierType: "Freight & Transport",
    priceGroup: "Standard Tier",
    controlAccountAdvance: "1050 - Advance to Suppliers",
    taxScope: "Domestic Taxable (15%)",
    supplierStatus: "1-Open",
    creditLimit: 400000,
    creditAvailable: 310000,
    creditTerms: 30,
    discountPercentage: 6.5,
    agent: "Mustafizur Rahman",
    commissionPercentage: 2.5,
    currency: "BDT",
    location: "Chittagong EPZ Hub",
    license: "TRAD/CEPZ/099182/2024",
    expirationDate: "2029-01-31",
    permitApproval: "1-Automatic",
    buyer: "Syed Rafiq",
    deliveryZone: "Zone B - Port & Industrial",
    timeSlot: "09:00 - 13:00",
    paymentInstructions: "Weekly consolidated invoice settlement via corporate check or RTGS.",
  },
];

const EMPTY_SUPPLIER: SupplierFormValues = {
  supplierNumber: "",
  shortName: "",
  company: "",
  address1: "",
  address2: "",
  city: "Dhaka",
  state: "Dhaka",
  zip: "",
  country: "Bangladesh",
  salutation: "Mr",
  firstName: "",
  middleName: "",
  lastName: "",
  title: "",
  phone: "",
  mobile: "",
  email: "",
  url: "",
  id: "",
  fax: "",
  taxNumber: "",
  controlAccountAP: "2010 - Trade Payables",
  supplierGroup: "Technology & Software",
  supplierType: "Direct Supplier",
  priceGroup: "Standard Tier",
  controlAccountAdvance: "1050 - Advance to Suppliers",
  taxScope: "Standard VAT 15%",
  supplierStatus: "1-Open",
  creditLimit: 0,
  creditAvailable: 0,
  creditTerms: 30,
  discountPercentage: 0,
  agent: "",
  commissionPercentage: 0,
  currency: "BDT",
  location: "Dhaka Central",
  license: "",
  expirationDate: "",
  permitApproval: "1-Automatic",
  buyer: "Procurement Lead",
  deliveryZone: "Zone A - Urban Central",
  timeSlot: "09:00 - 13:00",
  paymentInstructions: "",
};

const ALPHABET = [
  "ALL", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
];

// ============================================================================
// SUPPLIER MANAGER COMPONENT
// ============================================================================

export default function SupplierManager() {
  const [suppliers, setSuppliers] = useState<SupplierFormValues[]>(INITIAL_SUPPLIERS);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");
  const [tableSearch, setTableSearch] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("supplier");
  const [feedback, setFeedback] = useState<{
    type: "success" | "info" | "error";
    message: string;
  } | null>(null);

  const currentSupplier = suppliers[selectedIndex] || EMPTY_SUPPLIER;

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema) as any,
    defaultValues: currentSupplier,
    mode: "onBlur",
  });

  // Select supplier handler
  const selectSupplierAtIndex = (index: number) => {
    if (index >= 0 && index < suppliers.length) {
      setSelectedIndex(index);
      form.reset(suppliers[index]);
      setFeedback(null);
    }
  };

  // Action Bar Handlers
  const handleTop = () => {
    if (suppliers.length > 0) {
      selectSupplierAtIndex(0);
      setFeedback({ type: "info", message: "Jumped to first supplier record." });
    }
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      selectSupplierAtIndex(selectedIndex - 1);
    } else {
      setFeedback({ type: "info", message: "Already at the first supplier record." });
    }
  };

  const handleNext = () => {
    if (selectedIndex < suppliers.length - 1) {
      selectSupplierAtIndex(selectedIndex + 1);
    } else {
      setFeedback({ type: "info", message: "Already at the last supplier record." });
    }
  };

  const handleBottom = () => {
    if (suppliers.length > 0) {
      selectSupplierAtIndex(suppliers.length - 1);
      setFeedback({ type: "info", message: "Jumped to last supplier record." });
    }
  };

  const handleClear = () => {
    form.reset(EMPTY_SUPPLIER);
    setFeedback({ type: "info", message: "Form cleared. Ready for input." });
  };

  const handlePlus = () => {
    const nextSeq = suppliers.length + 1;
    const newNumber = `SU--00000${nextSeq}`;
    form.reset({
      ...EMPTY_SUPPLIER,
      supplierNumber: newNumber,
    });
    setFeedback({
      type: "info",
      message: `Initialized new blank supplier draft (${newNumber}).`,
    });
  };

  const handleShow = () => {
    const vals = form.getValues();
    setFeedback({
      type: "info",
      message: `Viewing record #${vals.supplierNumber || "N/A"}: ${vals.company || "Unnamed Company"} (${vals.supplierStatus})`,
    });
  };

  const handleUpdate = () => {
    form.handleSubmit(
      (validData) => {
        setSuppliers((prev) => {
          const exists = prev.findIndex(
            (s) => s.supplierNumber === validData.supplierNumber
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
          message: `Supplier "${validData.company}" updated successfully.`,
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

  const handleAdd = () => {
    form.handleSubmit(
      (validData) => {
        const exists = suppliers.some(
          (s) => s.supplierNumber.toLowerCase() === validData.supplierNumber.toLowerCase()
        );
        if (exists) {
          setFeedback({
            type: "error",
            message: `Supplier number "${validData.supplierNumber}" already exists!`,
          });
          return;
        }

        setSuppliers((prev) => [...prev, validData]);
        setSelectedIndex(suppliers.length);
        setFeedback({
          type: "success",
          message: `New supplier "${validData.company}" added successfully.`,
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

  const handleDelete = () => {
    if (suppliers.length === 0) return;
    const toDelete = suppliers[selectedIndex];
    if (!toDelete) return;

    const remaining = suppliers.filter((_, idx) => idx !== selectedIndex);
    setSuppliers(remaining);
    const newIdx = Math.max(0, selectedIndex - 1);
    setSelectedIndex(newIdx);
    if (remaining.length > 0) {
      form.reset(remaining[newIdx]);
    } else {
      form.reset(EMPTY_SUPPLIER);
    }
    setFeedback({
      type: "info",
      message: `Supplier "${toDelete.company}" (${toDelete.supplierNumber}) has been deleted.`,
    });
  };

  // Filter right table by alphabet & search query
  const filteredSuppliers = suppliers.filter((s) => {
    const matchesLetter =
      selectedLetter === "ALL" ||
      s.company.toUpperCase().startsWith(selectedLetter) ||
      s.supplierNumber.toUpperCase().startsWith(selectedLetter);

    const matchesSearch =
      tableSearch === "" ||
      s.supplierNumber.toLowerCase().includes(tableSearch.toLowerCase()) ||
      s.company.toLowerCase().includes(tableSearch.toLowerCase()) ||
      s.shortName.toLowerCase().includes(tableSearch.toLowerCase());

    return matchesLetter && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col font-sans space-y-3">
      {/* ==================================================================== */}
      {/* PAGE TITLE (Centered at top)                                        */}
      {/* ==================================================================== */}
      <div className="w-full text-center py-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-white uppercase font-heading">
          Supplier Master
        </h1>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
          Global Enterprise Vendor Directory &amp; Procurement Parameter Control
        </p>
      </div>

      {/* ==================================================================== */}
      {/* TASK 1: TOP ACTION BAR                                               */}
      {/* Buttons: Show, Clear, Top, Previous, Next, Bottom, Add, Update,      */}
      {/* Delete, +                                                            */}
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

          {/* Record Steppers */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTop}
            disabled={suppliers.length === 0 || selectedIndex === 0}
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
            disabled={suppliers.length === 0 || selectedIndex === 0}
            title="Previous record"
            className="h-7 px-2 text-xs font-semibold border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-200 disabled:opacity-40"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span className="hidden md:inline ml-1">Previous</span>
          </Button>

          <div className="px-2 py-0.5 text-[11px] font-mono text-slate-500 dark:text-gray-400 bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded">
            {suppliers.length > 0 ? `${selectedIndex + 1} / ${suppliers.length}` : "0 / 0"}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={suppliers.length === 0 || selectedIndex >= suppliers.length - 1}
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
            disabled={suppliers.length === 0 || selectedIndex >= suppliers.length - 1}
            title="Bottom (Last record)"
            className="h-7 px-2 text-xs font-semibold border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-gray-200 disabled:opacity-40"
          >
            <ChevronsDown className="w-3.5 h-3.5" />
            <span className="hidden md:inline ml-1">Bottom</span>
          </Button>
        </div>

        {/* Mutation Actions: Add, Update, Delete, + */}
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
            disabled={suppliers.length === 0}
            className="h-7 px-2.5 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/80 gap-1 disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </Button>

          {/* Quick Add Shortcut (+) */}
          <Button
            type="button"
            size="sm"
            onClick={handlePlus}
            title="Create New Blank Supplier (+)"
            className="h-7 w-7 p-0 rounded bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-sm flex items-center justify-center font-bold text-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
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
      {/* TABS CONTAINER & SPLIT PANE                                          */}
      {/* Triggers: Supplier (default), Prices, Discounts, Contacts,           */}
      {/* Credit Limit, Docs, POs                                              */}
      {/* ==================================================================== */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full flex-1 flex flex-col"
      >
        {/* Dense Tabs Navigation List */}
        <div className="border-b border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#161616] px-2 pt-1 overflow-x-auto scrollbar-none">
          <TabsList className="bg-transparent p-0 h-8 gap-1 flex items-center">
            <TabsTrigger
              value="supplier"
              className="px-3 py-1 text-xs font-semibold rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <Building2 className="w-3 h-3 mr-1.5 inline-block" />
              Supplier
            </TabsTrigger>
            <TabsTrigger
              value="prices"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <DollarSign className="w-3 h-3 mr-1.5 inline-block" />
              Prices
            </TabsTrigger>
            <TabsTrigger
              value="discounts"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <Percent className="w-3 h-3 mr-1.5 inline-block" />
              Discounts
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <Users2 className="w-3 h-3 mr-1.5 inline-block" />
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="credit-limit"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <CreditCard className="w-3 h-3 mr-1.5 inline-block" />
              Credit Limit
            </TabsTrigger>
            <TabsTrigger
              value="docs"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <FileText className="w-3 h-3 mr-1.5 inline-block" />
              Docs
            </TabsTrigger>
            <TabsTrigger
              value="pos"
              className="px-3 py-1 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              <ShoppingCart className="w-3 h-3 mr-1.5 inline-block" />
              POs
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ================================================================== */}
        {/* SPLIT PANE CONTAINER: LEFT FORM (68%) | RIGHT TABLE (32%)          */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-3 items-start">
          {/* ================================================================ */}
          {/* LEFT PANE: ~68% WIDTH (col-span-8)                               */}
          {/* ================================================================ */}
          <div className="lg:col-span-8 flex flex-col bg-white dark:bg-[#181818] rounded-lg border border-slate-200 dark:border-white/10 p-3 shadow-xs">
            <TabsContent value="supplier" className="mt-0 outline-none">
              <Form {...form}>
                <form className="space-y-3">
                  <ScrollArea className="h-[calc(100vh-270px)] pr-3">
                    <div className="space-y-3 pb-4">
                      {/* 1. Identification Panel */}
                      <div className="border border-slate-200 dark:border-white/10 rounded-md p-2.5 bg-slate-50/50 dark:bg-[#151515]">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2 pb-1 border-b border-slate-200 dark:border-white/10">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Identification</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <FormField
                            control={form.control}
                            name="supplierNumber"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">
                                  Supplier # <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. SU--000001"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="shortName"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">
                                  Short Name <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. SU--1"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">
                                  Company Name <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Full Legal Company Name"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* 2. Contact Information Panel */}
                      <div className="border border-slate-200 dark:border-white/10 rounded-md p-2.5 bg-slate-50/50 dark:bg-[#151515]">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2 pb-1 border-b border-slate-200 dark:border-white/10">
                          <Users2 className="w-3.5 h-3.5" />
                          <span>Contact Information</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">
                                  Phone <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="+880 2 000-0000"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">
                                  Mobile <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="+880 1700-000000"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">
                                  Official Email <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="supplier@vendor.com"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Website URL</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://vendor.com"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="id"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">ID / BIN / National ID</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. BIN-00291039401"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="fax"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Fax Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="+880 2 000-0001"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="taxNumber"
                            render={({ field }) => (
                              <FormItem className="space-y-1 sm:col-span-3">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Tax / TIN Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="TIN-9920194827"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* 3. Address Panel */}
                      <div className="border border-slate-200 dark:border-white/10 rounded-md p-2.5 bg-slate-50/50 dark:bg-[#151515]">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2 pb-1 border-b border-slate-200 dark:border-white/10">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Address</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <FormField
                            control={form.control}
                            name="address1"
                            render={({ field }) => (
                              <FormItem className="space-y-1 sm:col-span-2">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Address Line 1</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Street address, building, floor"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="address2"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Address Line 2</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Suite, unit, industrial park"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">City</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. Dhaka"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">State / Division</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. Dhaka Division"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="zip"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Zip / Postal Code</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. 1212"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem className="space-y-1 sm:col-span-3">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Country (Select)</FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Country"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="Bangladesh">Bangladesh (BGD)</option>
                                    <option value="India">India (IND)</option>
                                    <option value="China">China (CHN)</option>
                                    <option value="Singapore">Singapore (SGP)</option>
                                    <option value="United States">United States (USA)</option>
                                    <option value="United Kingdom">United Kingdom (GBR)</option>
                                    <option value="Germany">Germany (DEU)</option>
                                    <option value="Japan">Japan (JPN)</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* 4. Contact Person Panel */}
                      <div className="border border-slate-200 dark:border-white/10 rounded-md p-2.5 bg-slate-50/50 dark:bg-[#151515]">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2 pb-1 border-b border-slate-200 dark:border-white/10">
                          <Users2 className="w-3.5 h-3.5" />
                          <span>Contact Person</span>
                        </div>

                        {/* Salutation Radio Group */}
                        <div className="mb-2">
                          <FormField
                            control={form.control}
                            name="salutation"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Salutation</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-wrap items-center gap-4 text-xs pt-1"
                                  >
                                    {(["Dr", "Mr", "Mrs", "Ms", "Prof"] as const).map((sal) => (
                                      <div key={sal} className="flex items-center space-x-1.5">
                                        <RadioGroupItem value={sal} id={`sal-${sal}`} />
                                        <Label htmlFor={`sal-${sal}`} className="cursor-pointer text-xs">
                                          {sal}
                                        </Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="First Name" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="middleName"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Middle Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Middle" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Last Name" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Job Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Procurement Lead" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* 5. Financial & Categorization Panel */}
                      <div className="border border-slate-200 dark:border-white/10 rounded-md p-2.5 bg-slate-50/50 dark:bg-[#151515]">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2 pb-1 border-b border-slate-200 dark:border-white/10">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>Financial &amp; Categorization</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <FormField
                            control={form.control}
                            name="controlAccountAP"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">
                                  Control Account AP <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Control Account AP"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="2010 - Trade Payables">2010 - Trade Payables</option>
                                    <option value="2020 - Subcontractor Payables">2020 - Subcontractor Payables</option>
                                    <option value="2030 - Intercompany Payables">2030 - Intercompany Payables</option>
                                    <option value="2040 - Foreign Currency AP">2040 - Foreign Currency AP</option>
                                  </select>
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="controlAccountAdvance"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">
                                  Control Account Advance <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. 1050 - Advance to Suppliers"
                                    className="h-8 text-sm bg-white dark:bg-[#121212]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="supplierGroup"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">
                                  Supplier Group <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Supplier Group"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="Technology & Software">Technology &amp; Software</option>
                                    <option value="Manufacturing Equipment">Manufacturing Equipment</option>
                                    <option value="Electronics Components">Electronics Components</option>
                                    <option value="Logistics & Supply Chain">Logistics &amp; Supply Chain</option>
                                    <option value="Consulting & Services">Consulting &amp; Services</option>
                                    <option value="Raw Materials & Metals">Raw Materials &amp; Metals</option>
                                  </select>
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="supplierType"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Supplier Type</FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Supplier Type"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="Direct Supplier">Direct Supplier</option>
                                    <option value="SaaS & Cloud Provider">SaaS &amp; Cloud Provider</option>
                                    <option value="Heavy Machinery Vendor">Heavy Machinery Vendor</option>
                                    <option value="Authorized Distributor">Authorized Distributor</option>
                                    <option value="Professional Enterprise">Professional Enterprise</option>
                                    <option value="Freight & Transport">Freight &amp; Transport</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="priceGroup"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Price Group</FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Price Group"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="Standard Tier">Standard Tier</option>
                                    <option value="Enterprise Tier A">Enterprise Tier A</option>
                                    <option value="Wholesale Tier B">Wholesale Tier B</option>
                                    <option value="Fixed Retainer">Fixed Retainer</option>
                                    <option value="Spot Purchase">Spot Purchase</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="taxScope"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">
                                  Tax Scope <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Tax Scope"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="Domestic Taxable (15%)">Domestic Taxable (15%)</option>
                                    <option value="Standard VAT 15%">Standard VAT 15%</option>
                                    <option value="Zero Rated (0%)">Zero Rated (0%)</option>
                                    <option value="Tax Exempt (Import)">Tax Exempt (Import)</option>
                                    <option value="Withholding Tax At Source">Withholding Tax At Source</option>
                                  </select>
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* 6. Attributes & Commercial Parameters */}
                      <div className="border border-slate-200 dark:border-white/10 rounded-md p-2.5 bg-slate-50/50 dark:bg-[#151515]">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2 pb-1 border-b border-slate-200 dark:border-white/10">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Attributes &amp; Operational Controls</span>
                        </div>

                        {/* Status & Permit Approval Radios */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5 p-2 bg-white dark:bg-[#121212] rounded border border-slate-200 dark:border-white/10">
                          <FormField
                            control={form.control}
                            name="supplierStatus"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                                  Supplier Status
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex items-center space-x-4 pt-1"
                                  >
                                    <div className="flex items-center space-x-1.5">
                                      <RadioGroupItem value="1-Open" id="stat-1-Open" />
                                      <Label htmlFor="stat-1-Open" className="cursor-pointer text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                        1-Open
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                      <RadioGroupItem value="6-Held" id="stat-6-Held" />
                                      <Label htmlFor="stat-6-Held" className="cursor-pointer text-xs font-medium text-rose-700 dark:text-rose-400">
                                        6-Held
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="permitApproval"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                                  Permit Approval
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex items-center space-x-4 pt-1"
                                  >
                                    <div className="flex items-center space-x-1.5">
                                      <RadioGroupItem value="1-Automatic" id="permit-1-Automatic" />
                                      <Label htmlFor="permit-1-Automatic" className="cursor-pointer text-xs font-medium text-slate-700 dark:text-gray-300">
                                        1-Automatic
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                      <RadioGroupItem value="2-Manual" id="permit-2-Manual" />
                                      <Label htmlFor="permit-2-Manual" className="cursor-pointer text-xs font-medium text-slate-700 dark:text-gray-300">
                                        2-Manual
                                      </Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Numeric & Selection Parameters */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">
                                  Currency <span className="text-[#93032E] dark:text-[#ff4d79]">*</span>
                                </FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Currency"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="BDT">BDT - Bangladeshi Taka (৳)</option>
                                    <option value="USD">USD - US Dollar ($)</option>
                                    <option value="EUR">EUR - Euro (€)</option>
                                    <option value="GBP">GBP - British Pound (£)</option>
                                    <option value="CNY">CNY - Chinese Yuan (¥)</option>
                                    <option value="INR">INR - Indian Rupee (₹)</option>
                                  </select>
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="creditLimit"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Credit Limit</FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="creditAvailable"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Credit Available</FormLabel>
                                <FormControl>
                                  <Input type="number" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="creditTerms"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Credit Terms (Days)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 30" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="discountPercentage"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Discount %</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="commissionPercentage"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Commission %</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="agent"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Agent</FormLabel>
                                <FormControl>
                                  <Input placeholder="Assigning Agent" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Location (Select)</FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Location"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="Dhaka Central">Dhaka Central</option>
                                    <option value="Chittagong Port Zone">Chittagong Port Zone</option>
                                    <option value="Uttara Sub-Hub">Uttara Sub-Hub</option>
                                    <option value="Mohakhali Tech Hub">Mohakhali Tech Hub</option>
                                    <option value="Chittagong EPZ Hub">Chittagong EPZ Hub</option>
                                    <option value="Gazipur Industrial Area">Gazipur Industrial Area</option>
                                    <option value="Narayanganj Terminal">Narayanganj Terminal</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="buyer"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Buyer (Select)</FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Buyer"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="Procurement Lead">Procurement Lead</option>
                                    <option value="Syed Rafiq">Syed Rafiq</option>
                                    <option value="Tariqul Islam">Tariqul Islam</option>
                                    <option value="Kamrul Hasan">Kamrul Hasan</option>
                                    <option value="Corporate Purchasing Dept">Corporate Purchasing Dept</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="deliveryZone"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Delivery Zone (Select)</FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Delivery Zone"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="Zone A - Urban Central">Zone A - Urban Central</option>
                                    <option value="Zone B - Port & Industrial">Zone B - Port &amp; Industrial</option>
                                    <option value="Zone C - Suburban North">Zone C - Suburban North</option>
                                    <option value="Zone D - Nationwide Interstate">Zone D - Nationwide Interstate</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="timeSlot"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Time Slot (Select)</FormLabel>
                                <FormControl>
                                  <select
                                    aria-label="Time Slot"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                  >
                                    <option value="09:00 - 13:00">09:00 - 13:00 (Morning Shift)</option>
                                    <option value="14:00 - 18:00">14:00 - 18:00 (Afternoon Shift)</option>
                                    <option value="19:00 - 23:00">19:00 - 23:00 (Evening / Night)</option>
                                    <option value="24 Hours Open">24 Hours Open</option>
                                  </select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="expirationDate"
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Expiration Date</FormLabel>
                                <FormControl>
                                  <Input type="date" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="license"
                            render={({ field }) => (
                              <FormItem className="space-y-1 sm:col-span-3">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Trade License / Registration</FormLabel>
                                <FormControl>
                                  <Input placeholder="TRAD/DNCC/029104/2024" className="h-8 text-sm bg-white dark:bg-[#121212]" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="paymentInstructions"
                            render={({ field }) => (
                              <FormItem className="space-y-1 sm:col-span-3">
                                <FormLabel className="text-xs text-gray-600 dark:text-gray-400">Payment Instructions</FormLabel>
                                <FormControl>
                                  <Textarea
                                    rows={2}
                                    placeholder="Enter bank wire details, remittance protocols, or special billing terms..."
                                    className="text-xs bg-white dark:bg-[#121212] resize-none"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </form>
              </Form>
            </TabsContent>

            {/* Other Tabs Placeholders */}
            <TabsContent value="prices" className="mt-0 outline-none p-4 text-center">
              <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
                <DollarSign className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Supplier Price Lists &amp; Contracts</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                  Negotiated purchase rates, tiered catalogue matrices, and contract schedules for {currentSupplier.company || "selected supplier"}.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="discounts" className="mt-0 outline-none p-4 text-center">
              <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
                <Percent className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Volume &amp; Promotional Discounts</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                  Volume purchase discounts, seasonal rebates, and prompt payment concessions.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="mt-0 outline-none p-4 text-center">
              <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
                <Users2 className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Supplier Contacts Directory</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                  Sales representatives, escalation managers, dispatch coordinators, and technical personnel.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="credit-limit" className="mt-0 outline-none p-4 text-center">
              <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
                <CreditCard className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Credit Terms &amp; Exposure Audit</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                  Trade credit allocation, revolving line utilization, payment aging curves, and risk rating.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="docs" className="mt-0 outline-none p-4 text-center">
              <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
                <FileText className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Compliance &amp; Legal Documents</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                  NDAs, master supply agreements, tax exemptions, ISO certifications, and vendor questionnaires.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="pos" className="mt-0 outline-none p-4 text-center">
              <div className="py-12 border border-dashed border-slate-300 dark:border-white/10 rounded-lg">
                <ShoppingCart className="w-8 h-8 mx-auto text-[#93032E] dark:text-[#ff4d79] mb-2 opacity-70" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Purchase Orders History</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
                  Historical PO logs, fulfillment status, delivery receipts, and pending requisition matching.
                </p>
              </div>
            </TabsContent>
          </div>

          {/* ================================================================ */}
          {/* RIGHT PANE: ~32% WIDTH (col-span-4)                              */}
          {/* Alphabet filter row + Supplier Number & Company Table            */}
          {/* ================================================================ */}
          <div className="lg:col-span-4 flex flex-col bg-white dark:bg-[#181818] rounded-lg border border-slate-200 dark:border-white/10 p-3 shadow-xs">
            {/* Search Box */}
            <div className="relative mb-2">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search supplier # or company..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                className="pl-8 h-7 text-xs bg-slate-50 dark:bg-[#141414] border-slate-200 dark:border-white/10"
              />
            </div>

            {/* Alphabet Filter Row (A-Z + ALL) */}
            <div className="mb-2 p-1.5 bg-slate-50 dark:bg-[#141414] rounded-md border border-slate-200 dark:border-white/10">
              <div className="text-[10px] font-semibold text-slate-500 dark:text-gray-400 mb-1 flex items-center justify-between">
                <span>Filter by Letter:</span>
                <span className="font-mono text-[#93032E] dark:text-[#ff4d79]">{selectedLetter}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {ALPHABET.map((letter) => {
                  const isSelected = selectedLetter === letter;
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => setSelectedLetter(letter)}
                      className={`text-[10px] font-mono px-1 py-0.5 rounded cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#93032E] text-white font-bold"
                          : "text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/10"
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Supplier List Summary Bar */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-gray-400 mb-1 px-1">
              <span>Showing: {filteredSuppliers.length} of {suppliers.length} records</span>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                ● Live Directory
              </span>
            </div>

            {/* Scrollable Data Table: Supplier Number & Company */}
            <div className="border border-slate-200 dark:border-white/10 rounded-md overflow-hidden bg-white dark:bg-[#151515]">
              <ScrollArea className="h-[calc(100vh-370px)]">
                <Table className="text-xs">
                  <TableHeader className="bg-slate-50 dark:bg-[#141414] sticky top-0 z-10 border-b border-slate-200 dark:border-white/10">
                    <TableRow className="h-7 hover:bg-transparent">
                      <TableHead className="h-7 text-[10px] font-bold uppercase py-1 px-2.5 text-slate-700 dark:text-gray-300">
                        Supplier Number
                      </TableHead>
                      <TableHead className="h-7 text-[10px] font-bold uppercase py-1 px-2.5 text-slate-700 dark:text-gray-300">
                        Company
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-8 text-slate-400 text-xs">
                          No matching suppliers found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSuppliers.map((sup) => {
                        const originalIndex = suppliers.findIndex(
                          (s) => s.supplierNumber === sup.supplierNumber
                        );
                        const isSelected = originalIndex === selectedIndex;
                        return (
                          <TableRow
                            key={sup.supplierNumber}
                            onClick={() => selectSupplierAtIndex(originalIndex)}
                            className={`cursor-pointer transition-colors border-b border-slate-100 dark:border-white/5 h-8 ${
                              isSelected
                                ? "bg-[#93032E]/10 dark:bg-[#93032E]/25 text-[#93032E] dark:text-[#ff4d79] font-semibold border-l-2 border-l-[#93032E]"
                                : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-gray-300"
                            }`}
                          >
                            <TableCell className="py-1 px-2.5 font-mono text-[11px] whitespace-nowrap">
                              {sup.supplierNumber}
                            </TableCell>
                            <TableCell className="py-1 px-2.5 font-medium truncate max-w-[170px]" title={sup.company}>
                              {sup.company}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

