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
  Building,
  CheckCircle2,
  AlertCircle,
  FileText,
  Truck,
  CreditCard,
  DollarSign,
  Percent,
  Users2,
  ShieldAlert,
  Calendar,
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
// TASK 2: ZOD SCHEMA & TYPES
// ============================================================================

export const customerSchema = z.object({
  // Identification
  customerNumber: z.string().min(1, "Customer number is required"),
  shortName: z.string().min(1, "Short name is required"),
  company: z.string().min(1, "Company name is required"),

  // Address
  address1: z.string().default(""),
  address2: z.string().default(""),
  city: z.string().default(""),
  state: z.string().default(""),
  zip: z.string().default(""),
  country: z.string().default("USA"),

  // Contact Person
  salutation: z.enum(["Dr", "Mr", "Mrs", "Ms", "Prof"]).default("Mr"),
  firstName: z.string().default(""),
  middleName: z.string().default(""),
  lastName: z.string().default(""),
  title: z.string().default(""),

  // Contact Info (Required: phone, mobile, email)
  phone: z.string().min(1, "Phone number is required"),
  mobile: z.string().min(1, "Mobile number is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  fax: z.string().default(""),
  url: z.string().default(""),

  // Financial & Categorization (Required: controlAccount, customerGroup, taxScope)
  controlAccount: z.string().min(1, "Control account is required"),
  customerGroup: z.string().min(1, "Customer group is required"),
  customerType: z.string().default("Commercial"),
  taxNumber: z.string().default(""),
  taxScope: z.string().min(1, "Tax scope is required"),
  agent: z.string().default(""),

  // Attributes
  priceGroup: z.string().default("Standard"),
  sicCode: z.string().default(""),
  discountPercentage: z.coerce.number().min(0).max(100).default(0),
  customerStatus: z.enum(["Open", "Held"]).default("Open"),

  // Credit & Dates
  creditLimit: z.coerce.number().min(0).default(50000),
  creditAvailable: z.coerce.number().default(50000),
  creditRating: z.string().default("A+"),
  creditTerms: z.string().default("Net 30"),
  expirationDate: z.string().default(""),
  dateOfCreditApplication: z.string().default(""),
  dateApproved: z.string().default(""),
  dateOfFinancialStatements: z.string().default(""),
  dateIncorporated: z.string().default(""),

  // Misc
  avgPaymentDays: z.coerce.number().default(30),
  paymentInstructions: z.string().default(""),
  remarks: z.string().default(""),
  license: z.string().default(""),
  backorderType: z.string().default("Allow Partial"),
  defaultPaymentMethod: z.string().default("EFT / Wire"),
  pointsOB: z.coerce.number().default(0),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

// ============================================================================
// MOCK DATA (At least 5 customers: "Steam", "CUS2 LTD", "Mustafiz LTD", etc.)
// ============================================================================

const INITIAL_CUSTOMERS: CustomerFormValues[] = [
  {
    customerNumber: "CUST-001",
    company: "Steam (Valve Corp)",
    shortName: "Steam",
    customerGroup: "Enterprise Direct",
    customerType: "Technology & Digital",
    address1: "10400 NE 4th St, Floor 14",
    address2: "Bellevue Place Suite 1400",
    city: "Bellevue",
    state: "WA",
    zip: "98004",
    country: "USA",
    salutation: "Mr",
    firstName: "Gabe",
    middleName: "L.",
    lastName: "Newell",
    title: "Managing Director",
    phone: "+1 (425) 889-9642",
    mobile: "+1 (425) 555-0199",
    email: "billing@valvesoftware.com",
    fax: "+1 (425) 889-9643",
    url: "https://store.steampowered.com",
    controlAccount: "AR-10100 - Trade Receivables",
    taxNumber: "WA-8947291-01",
    taxScope: "Domestic Taxable",
    agent: "Michael Vance",
    priceGroup: "Tier 1 Enterprise",
    sicCode: "7372 - Software Prepackaged",
    discountPercentage: 12,
    customerStatus: "Open",
    creditLimit: 500000,
    creditAvailable: 375500,
    creditRating: "AAA",
    creditTerms: "Net 30",
    expirationDate: "2028-12-31",
    dateOfCreditApplication: "2020-04-15",
    dateApproved: "2020-04-20",
    dateOfFinancialStatements: "2025-12-31",
    dateIncorporated: "1996-08-24",
    avgPaymentDays: 14,
    paymentInstructions: "Electronic wire to Chase NY primary account.",
    remarks: "Priority enterprise partner. Direct SLA escalation.",
    license: "LIC-WA-9921",
    backorderType: "Allow Partial",
    defaultPaymentMethod: "EFT / Wire",
    pointsOB: 2500,
  },
  {
    customerNumber: "CUST-002",
    company: "CUS2 LTD",
    shortName: "CUS2",
    customerGroup: "Commercial Wholesale",
    customerType: "Industrial Manufacturing",
    address1: "Unit 8, St. George Industrial Park",
    address2: "Kirkstall Road",
    city: "Leeds",
    state: "West Yorkshire",
    zip: "LS4 2AZ",
    country: "GBR",
    salutation: "Mrs",
    firstName: "Fiona",
    middleName: "M.",
    lastName: "Gallagher",
    title: "Head of Procurement",
    phone: "+44 113 496 0122",
    mobile: "+44 770 090 0411",
    email: "accounts@cus2ltd.co.uk",
    fax: "+44 113 496 0123",
    url: "https://cus2ltd.example.co.uk",
    controlAccount: "AR-10200 - Foreign Trade Receivables",
    taxNumber: "GB-992184712",
    taxScope: "Export Zero-Rated",
    agent: "Sarah Jenkins",
    priceGroup: "Wholesale Standard",
    sicCode: "3499 - Fabricated Metal",
    discountPercentage: 8,
    customerStatus: "Open",
    creditLimit: 150000,
    creditAvailable: 92400,
    creditRating: "A",
    creditTerms: "Net 45",
    expirationDate: "2027-06-30",
    dateOfCreditApplication: "2021-08-10",
    dateApproved: "2021-08-15",
    dateOfFinancialStatements: "2025-09-30",
    dateIncorporated: "2010-03-12",
    avgPaymentDays: 28,
    paymentInstructions: "SWIFT GBP settlement with Lloyds Bank.",
    remarks: "Quarterly audits on chemical raw material shipments.",
    license: "UK-VAT-99218",
    backorderType: "Ship Complete",
    defaultPaymentMethod: "SWIFT Wire",
    pointsOB: 1120,
  },
  {
    customerNumber: "CUST-003",
    company: "Mustafiz LTD",
    shortName: "Mustafiz",
    customerGroup: "Strategic Partner",
    customerType: "Retail Distribution",
    address1: "Plot 42, Gulshan Commercial Zone",
    address2: "Road 11, Avenue 4",
    city: "Dhaka",
    state: "Dhaka Division",
    zip: "1212",
    country: "BGD",
    salutation: "Mr",
    firstName: "Mustafizur",
    middleName: "R.",
    lastName: "Rahman",
    title: "Executive Director",
    phone: "+880 2 988 4123",
    mobile: "+880 171 100 4821",
    email: "contact@mustafizltd.com",
    fax: "+880 2 988 4124",
    url: "https://mustafizltd.com",
    controlAccount: "AR-10100 - Trade Receivables",
    taxNumber: "TIN-984210984",
    taxScope: "Domestic Taxable",
    agent: "David Chen",
    priceGroup: "Strategic Distributor",
    sicCode: "5099 - Wholesale Goods",
    discountPercentage: 15,
    customerStatus: "Open",
    creditLimit: 300000,
    creditAvailable: 184000,
    creditRating: "AA",
    creditTerms: "Net 60",
    expirationDate: "2029-01-31",
    dateOfCreditApplication: "2019-11-05",
    dateApproved: "2019-11-12",
    dateOfFinancialStatements: "2025-11-30",
    dateIncorporated: "2005-07-19",
    avgPaymentDays: 32,
    paymentInstructions: "Standard LC or Bank Transfer via Standard Chartered.",
    remarks: "Sole authorized distribution partner across South Asia.",
    license: "TR-DH-84920",
    backorderType: "Allow Partial",
    defaultPaymentMethod: "Letter of Credit",
    pointsOB: 4800,
  },
  {
    customerNumber: "CUST-004",
    company: "Apex Engineering Solutions",
    shortName: "Apex",
    customerGroup: "Key Accounts",
    customerType: "Industrial Automation",
    address1: "7400 Technology Way",
    address2: "Building B, Suite 210",
    city: "Denver",
    state: "CO",
    zip: "80237",
    country: "USA",
    salutation: "Dr",
    firstName: "Arun",
    middleName: "K.",
    lastName: "Gupta",
    title: "Chief Technical Officer",
    phone: "+1 (303) 555-0182",
    mobile: "+1 (303) 555-0193",
    email: "procurement@apexengineering.com",
    fax: "+1 (303) 555-0183",
    url: "https://apexengineering.com",
    controlAccount: "AR-10100 - Trade Receivables",
    taxNumber: "CO-8837192",
    taxScope: "Domestic Taxable",
    agent: "Elena Rostova",
    priceGroup: "Standard Tier",
    sicCode: "3823 - Industrial Instruments",
    discountPercentage: 5,
    customerStatus: "Held",
    creditLimit: 75000,
    creditAvailable: 4200,
    creditRating: "B+",
    creditTerms: "Net 30",
    expirationDate: "2026-12-31",
    dateOfCreditApplication: "2022-03-14",
    dateApproved: "2022-03-20",
    dateOfFinancialStatements: "2025-06-30",
    dateIncorporated: "2015-09-01",
    avgPaymentDays: 52,
    paymentInstructions: "ACH direct debit authorized on file.",
    remarks: "Account placed on temporary hold pending credit review.",
    license: "CO-ENG-4921",
    backorderType: "Cancel Backorder",
    defaultPaymentMethod: "ACH Debit",
    pointsOB: 450,
  },
  {
    customerNumber: "CUST-005",
    company: "Global Logistics Alliance",
    shortName: "GLA",
    customerGroup: "Corporate Fleet",
    customerType: "Freight & Forwarding",
    address1: "Speicherstadt Block D",
    address2: "Am Sandtorkai 48",
    city: "Hamburg",
    state: "Hamburg",
    zip: "20457",
    country: "DEU",
    salutation: "Ms",
    firstName: "Greta",
    middleName: "A.",
    lastName: "Weber",
    title: "Supply Director",
    phone: "+49 40 380 9100",
    mobile: "+49 171 892 4410",
    email: "fleet.accounts@gla-logistics.de",
    fax: "+49 40 380 9101",
    url: "https://gla-logistics.de",
    controlAccount: "AR-10200 - Foreign Trade Receivables",
    taxNumber: "DE-814920194",
    taxScope: "Export Zero-Rated",
    agent: "Marcus Sterling",
    priceGroup: "Logistics Partner",
    sicCode: "4731 - Freight Transportation",
    discountPercentage: 10,
    customerStatus: "Open",
    creditLimit: 250000,
    creditAvailable: 198000,
    creditRating: "AA-",
    creditTerms: "Net 30",
    expirationDate: "2028-09-30",
    dateOfCreditApplication: "2020-01-18",
    dateApproved: "2020-01-25",
    dateOfFinancialStatements: "2025-10-31",
    dateIncorporated: "2002-11-15",
    avgPaymentDays: 22,
    paymentInstructions: "SEPA B2B Direct Debit in EUR.",
    remarks: "Main logistics partner for European container consolidation.",
    license: "HAM-FLT-8411",
    backorderType: "Allow Partial",
    defaultPaymentMethod: "SEPA B2B",
    pointsOB: 3200,
  },
];

const EMPTY_CUSTOMER: CustomerFormValues = {
  customerNumber: "CUST-006",
  company: "",
  shortName: "",
  customerGroup: "Commercial Wholesale",
  customerType: "Commercial",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "USA",
  salutation: "Mr",
  firstName: "",
  middleName: "",
  lastName: "",
  title: "",
  phone: "",
  mobile: "",
  email: "",
  fax: "",
  url: "",
  controlAccount: "AR-10100 - Trade Receivables",
  taxNumber: "",
  taxScope: "Domestic Taxable",
  agent: "",
  priceGroup: "Standard Tier",
  sicCode: "",
  discountPercentage: 0,
  customerStatus: "Open",
  creditLimit: 50000,
  creditAvailable: 50000,
  creditRating: "A",
  creditTerms: "Net 30",
  expirationDate: "",
  dateOfCreditApplication: "",
  dateApproved: "",
  dateOfFinancialStatements: "",
  dateIncorporated: "",
  avgPaymentDays: 30,
  paymentInstructions: "",
  remarks: "",
  license: "",
  backorderType: "Allow Partial",
  defaultPaymentMethod: "EFT / Wire",
  pointsOB: 0,
};

export default function CustomerManager() {
  const [customers, setCustomers] = useState<CustomerFormValues[]>(INITIAL_CUSTOMERS);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [feedback, setFeedback] = useState<{
    type: "success" | "info" | "error";
    message: string;
  } | null>(null);

  const currentCustomer = customers[selectedIndex] || EMPTY_CUSTOMER;

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema) as any,
    defaultValues: currentCustomer,
    mode: "onBlur",
  });

  // Keep form in sync when changing selected row
  const selectCustomerAtIndex = (index: number) => {
    if (index >= 0 && index < customers.length) {
      setSelectedIndex(index);
      form.reset(customers[index]);
    }
  };

  // Action Bar Handlers
  const handleTop = () => {
    if (customers.length > 0) {
      selectCustomerAtIndex(0);
      setFeedback({ type: "info", message: "Navigated to top customer record." });
    }
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      selectCustomerAtIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < customers.length - 1) {
      selectCustomerAtIndex(selectedIndex + 1);
    }
  };

  const handleBottom = () => {
    if (customers.length > 0) {
      selectCustomerAtIndex(customers.length - 1);
      setFeedback({ type: "info", message: "Navigated to bottom customer record." });
    }
  };

  const handleClear = () => {
    const nextId = `CUST-${String(customers.length + 1).padStart(3, "0")}`;
    const freshRecord = { ...EMPTY_CUSTOMER, customerNumber: nextId };
    form.reset(freshRecord);
    setFeedback({
      type: "info",
      message: `Form cleared. Ready to add customer #${nextId}.`,
    });
  };

  const handleShow = () => {
    setFeedback({
      type: "info",
      message: `Currently viewing [${form.getValues("customerNumber")}] ${form.getValues("company") || "Unnamed"}`,
    });
  };

  const handleAddCustomer = (values: CustomerFormValues) => {
    // Check if customer already exists
    const exists = customers.some((c) => c.customerNumber === values.customerNumber);
    if (exists) {
      setFeedback({
        type: "error",
        message: `Customer ${values.customerNumber} already exists. Click Update to edit.`,
      });
      return;
    }

    setCustomers((prev) => [values, ...prev]);
    setSelectedIndex(0);
    setFeedback({
      type: "success",
      message: `Customer "${values.company}" [${values.customerNumber}] successfully created!`,
    });
  };

  const handleUpdateCustomer = () => {
    form.handleSubmit((values) => {
      setCustomers((prev) =>
        prev.map((c, idx) => (idx === selectedIndex ? { ...values } : c))
      );
      setFeedback({
        type: "success",
        message: `Customer "${values.company}" updated successfully!`,
      });
    })();
  };

  const handleDelete = () => {
    if (customers.length === 0) return;
    const target = customers[selectedIndex];
    if (confirm(`Are you sure you want to delete customer [${target.customerNumber}] ${target.company}?`)) {
      const remaining = customers.filter((_, idx) => idx !== selectedIndex);
      setCustomers(remaining);
      const nextIdx = Math.max(0, selectedIndex - 1);
      setSelectedIndex(nextIdx);
      if (remaining.length > 0) {
        form.reset(remaining[nextIdx]);
      } else {
        form.reset(EMPTY_CUSTOMER);
      }
      setFeedback({
        type: "success",
        message: `Customer [${target.customerNumber}] has been removed.`,
      });
    }
  };

  // Filtered customer list for the right pane table
  const filteredCustomers = customers.filter((c) => {
    const q = searchFilter.toLowerCase();
    return (
      c.customerNumber.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q) ||
      c.customerGroup.toLowerCase().includes(q) ||
      c.customerType.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white dark:bg-[#191919] rounded-xl shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col transition-colors duration-150">
      {/* ==================================================================== */}
      {/* TASK 1: TOP ACTION BAR                                               */}
      {/* ==================================================================== */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-50 dark:bg-[#161616] border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Action Buttons: Show, Clear, Top, Previous, Next, Bottom, Add, Update, Delete */}
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleShow}
            className="h-7 px-2.5 text-xs font-semibold border-slate-300 dark:border-white/15 bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Show</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleClear}
            className="h-7 px-2.5 text-xs font-semibold border-slate-300 dark:border-white/15 bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Clear</span>
          </Button>

          <div className="h-4 w-px bg-slate-300 dark:bg-white/15 mx-1" />

          {/* Navigation Buttons: Top, Previous, Next, Bottom */}
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleTop}
            disabled={selectedIndex === 0 || customers.length === 0}
            className="h-7 px-2 text-xs font-semibold border-slate-300 dark:border-white/15 bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-2xs disabled:opacity-40"
            title="First Record"
          >
            <ChevronsUp className="w-3.5 h-3.5" />
            <span>Top</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handlePrevious}
            disabled={selectedIndex === 0 || customers.length === 0}
            className="h-7 px-2 text-xs font-semibold border-slate-300 dark:border-white/15 bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-2xs disabled:opacity-40"
            title="Previous Record"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span>Previous</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleNext}
            disabled={selectedIndex >= customers.length - 1}
            className="h-7 px-2 text-xs font-semibold border-slate-300 dark:border-white/15 bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-2xs disabled:opacity-40"
            title="Next Record"
          >
            <ChevronDown className="w-3.5 h-3.5" />
            <span>Next</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleBottom}
            disabled={selectedIndex >= customers.length - 1}
            className="h-7 px-2 text-xs font-semibold border-slate-300 dark:border-white/15 bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-2xs disabled:opacity-40"
            title="Last Record"
          >
            <ChevronsDown className="w-3.5 h-3.5" />
            <span>Bottom</span>
          </Button>

          <div className="h-4 w-px bg-slate-300 dark:bg-white/15 mx-1" />

          {/* Mutation Buttons: Add, Update, Delete */}
          <Button
            type="button"
            size="xs"
            onClick={form.handleSubmit(handleAddCustomer)}
            className="h-7 px-2.5 text-xs font-semibold bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleUpdateCustomer}
            className="h-7 px-2.5 text-xs font-semibold border-emerald-600/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 shadow-2xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Update</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleDelete}
            className="h-7 px-2.5 text-xs font-semibold border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 shadow-2xs cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </Button>
        </div>

        {/* Record Counter Badge */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400">
          <span className="font-mono bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-800 dark:text-gray-200">
            {customers.length > 0 ? `${selectedIndex + 1} of ${customers.length}` : "0 records"}
          </span>
          <span className="hidden sm:inline-block font-mono text-slate-400">
            [{currentCustomer.customerNumber}]
          </span>
        </div>
      </div>

      {/* Optional Feedback Alert Banner */}
      {feedback && (
        <div
          className={`px-4 py-2 border-b text-xs flex items-center justify-between transition-all ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
              : feedback.type === "error"
              ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200"
              : "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            ) : feedback.type === "error" ? (
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SHADCN TABS & SPLIT-PANE LAYOUT (65% FORM LEFT / 35% TABLE RIGHT)   */}
      {/* ==================================================================== */}
      <Tabs defaultValue="customer" className="w-full flex-1 flex flex-col">
        {/* Sub-Tabs Navigation */}
        <div className="border-b border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#161616] px-4 sm:px-6 pt-2 overflow-x-auto scrollbar-none">
          <TabsList className="bg-transparent p-0 h-9 gap-1 flex items-center">
            <TabsTrigger
              value="customer"
              className="px-3 py-1.5 text-xs font-semibold rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              Customer
            </TabsTrigger>
            <TabsTrigger
              value="delivery-address"
              className="px-3 py-1.5 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              Delivery Address
            </TabsTrigger>
            <TabsTrigger
              value="prices"
              className="px-3 py-1.5 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              Prices
            </TabsTrigger>
            <TabsTrigger
              value="discounts"
              className="px-3 py-1.5 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              Discounts
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="px-3 py-1.5 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="credit-limit"
              className="px-3 py-1.5 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              Credit Limit
            </TabsTrigger>
            <TabsTrigger
              value="docs"
              className="px-3 py-1.5 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              Docs
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="px-3 py-1.5 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="consignments"
              className="px-3 py-1.5 text-xs font-medium rounded-t-lg border-b-2 data-active:border-[#93032E] data-active:text-[#93032E] dark:data-active:text-[#ff4d79] data-active:bg-white dark:data-active:bg-[#191919] text-slate-600 dark:text-gray-400 hover:text-slate-900 transition-all rounded-b-none"
            >
              Consignments
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ================================================================== */}
        {/* MAIN BODY: SPLIT PANE 65% LEFT / 35% RIGHT                         */}
        {/* ================================================================== */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* ================================================================ */}
          {/* LEFT PANE (65% FORM AREA)                                        */}
          {/* ================================================================ */}
          <div className="lg:col-span-8 border-r border-slate-200 dark:border-white/10 flex flex-col p-4 sm:p-5">
            <TabsContent value="customer" className="mt-0 flex-1 flex flex-col">
              <ScrollArea className="h-[calc(100vh-270px)] pr-3.5">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleAddCustomer)}
                    className="space-y-4"
                  >
                    {/* 1. Identification Panel */}
                    <div className="border border-slate-200 dark:border-white/10 rounded-lg p-3.5 bg-slate-50/40 dark:bg-[#161616]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2.5 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5" />
                        <span>Identification</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <FormField
                          control={form.control}
                          name="customerNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Customer # <span className="text-[#93032E]">*</span></FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. CUST-001"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="shortName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Short Name <span className="text-[#93032E]">*</span></FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Steam"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name <span className="text-[#93032E]">*</span></FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Full Legal Entity Name"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* 2. Contact Information Panel */}
                    <div className="border border-slate-200 dark:border-white/10 rounded-lg p-3.5 bg-slate-50/40 dark:bg-[#161616]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2.5 flex items-center gap-1.5">
                        <Users2 className="w-3.5 h-3.5" />
                        <span>Contact Info</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number <span className="text-[#93032E]">*</span></FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 000-0000"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="mobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Number <span className="text-[#93032E]">*</span></FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 000-0000"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Official Email <span className="text-[#93032E]">*</span></FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="billing@company.com"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="fax"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Fax Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Fax lines..."
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="url"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>Website URL</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://..."
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* 3. Address Panel */}
                    <div className="border border-slate-200 dark:border-white/10 rounded-lg p-3.5 bg-slate-50/40 dark:bg-[#161616]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2.5 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" />
                        <span>Corporate Address</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <FormField
                          control={form.control}
                          name="address1"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel>Street Address Line 1</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Building, street, suite..."
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address Line 2</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Suite, Floor, PO Box..."
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="City"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State / Region</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="State"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="zip"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip / Postal Code</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Zip code"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-3">
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Country"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-8 px-2.5 text-xs bg-white dark:bg-[#121212] border border-input rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                                >
                                  <option value="USA">United States (USA)</option>
                                  <option value="CAN">Canada (CAN)</option>
                                  <option value="GBR">United Kingdom (GBR)</option>
                                  <option value="DEU">Germany (DEU)</option>
                                  <option value="JPN">Japan (JPN)</option>
                                  <option value="AUS">Australia (AUS)</option>
                                  <option value="BGD">Bangladesh (BGD)</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* 4. Contact Person Panel */}
                    <div className="border border-slate-200 dark:border-white/10 rounded-lg p-3.5 bg-slate-50/40 dark:bg-[#161616]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2.5">
                        Contact Person
                      </div>

                      {/* Salutation Radio Group */}
                      <FormField
                        control={form.control}
                        name="salutation"
                        render={({ field }) => (
                          <FormItem className="mb-2.5">
                            <FormLabel className="text-xs">Salutation</FormLabel>
                            <FormControl>
                              <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-wrap items-center gap-4 mt-1"
                              >
                                {["Dr", "Mr", "Mrs", "Ms", "Prof"].map((sal) => (
                                  <div key={sal} className="flex items-center gap-1.5">
                                    <RadioGroupItem value={sal} id={`sal-${sal}`} />
                                    <Label htmlFor={`sal-${sal}`} className="text-xs font-normal cursor-pointer">
                                      {sal}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="First name"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="middleName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Middle Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Middle"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Last name"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Job Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Director"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* 5. Financial & Categorization Panel */}
                    <div className="border border-slate-200 dark:border-white/10 rounded-lg p-3.5 bg-slate-50/40 dark:bg-[#161616]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2.5 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>Financial & Categorization</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <FormField
                          control={form.control}
                          name="controlAccount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Control Account <span className="text-[#93032E]">*</span></FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Control Account"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                                >
                                  <option value="AR-10100 - Trade Receivables">AR-10100 - Trade Receivables</option>
                                  <option value="AR-10200 - Foreign Trade Receivables">AR-10200 - Foreign Trade</option>
                                  <option value="AR-10300 - Intercompany">AR-10300 - Intercompany</option>
                                  <option value="AR-10400 - Government Contracts">AR-10400 - Government</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="customerGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Customer Group <span className="text-[#93032E]">*</span></FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Customer Group"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                                >
                                  <option value="Enterprise Direct">Enterprise Direct</option>
                                  <option value="Commercial Wholesale">Commercial Wholesale</option>
                                  <option value="Strategic Partner">Strategic Partner</option>
                                  <option value="Key Accounts">Key Accounts</option>
                                  <option value="Corporate Fleet">Corporate Fleet</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="customerType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Customer Type</FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Customer Type"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                                >
                                  <option value="Commercial">Commercial</option>
                                  <option value="Technology & Digital">Technology & Digital</option>
                                  <option value="Industrial Manufacturing">Industrial Manufacturing</option>
                                  <option value="Retail Distribution">Retail Distribution</option>
                                  <option value="Freight & Forwarding">Freight & Forwarding</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="taxNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tax ID / VAT Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Tax identifier..."
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="taxScope"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tax Scope <span className="text-[#93032E]">*</span></FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Tax Scope"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                                >
                                  <option value="Domestic Taxable">Domestic Taxable</option>
                                  <option value="Export Zero-Rated">Export Zero-Rated</option>
                                  <option value="Interstate Taxable">Interstate Taxable</option>
                                  <option value="Exempt Entity">Exempt Entity</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="agent"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assigned Sales Agent</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Agent name"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* 6. Attributes Panel */}
                    <div className="border border-slate-200 dark:border-white/10 rounded-lg p-3.5 bg-slate-50/40 dark:bg-[#161616]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2.5 flex items-center gap-1.5">
                        <Percent className="w-3.5 h-3.5" />
                        <span>Attributes & Classification</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                        <FormField
                          control={form.control}
                          name="priceGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price Group</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Tier 1"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="sicCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SIC Code</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. 7372"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="discountPercentage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Discount %</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={0}
                                  max={100}
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Customer Status Radio Group (Open, Held) */}
                        <FormField
                          control={form.control}
                          name="customerStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  value={field.value}
                                  onValueChange={field.onChange}
                                  className="flex items-center gap-4 h-8"
                                >
                                  <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="Open" id="st-open" />
                                    <Label htmlFor="st-open" className="text-xs font-medium text-emerald-700 cursor-pointer">
                                      Open
                                    </Label>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <RadioGroupItem value="Held" id="st-held" />
                                    <Label htmlFor="st-held" className="text-xs font-medium text-amber-700 cursor-pointer">
                                      Held
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* 7. Credit & Dates Panel */}
                    <div className="border border-slate-200 dark:border-white/10 rounded-lg p-3.5 bg-slate-50/40 dark:bg-[#161616]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2.5 flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Credit Parameters & Important Dates</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <FormField
                          control={form.control}
                          name="creditLimit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Credit Limit ($)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="creditAvailable"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Credit Available ($)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="creditRating"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Credit Rating</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. AAA, A+"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="creditTerms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Credit Terms</FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Credit Terms"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                                >
                                  <option value="Net 30">Net 30 Days</option>
                                  <option value="Net 45">Net 45 Days</option>
                                  <option value="Net 60">Net 60 Days</option>
                                  <option value="COD">Cash on Delivery (COD)</option>
                                  <option value="Prepaid">100% Prepayment</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="expirationDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Facility Expiration</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="dateOfCreditApplication"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Application Date</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="dateApproved"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Credit Approval Date</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="dateOfFinancialStatements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Financial Statement Date</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="dateIncorporated"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date Incorporated</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* 8. Misc Panel */}
                    <div className="border border-slate-200 dark:border-white/10 rounded-lg p-3.5 bg-slate-50/40 dark:bg-[#161616]">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#93032E] dark:text-[#ff4d79] mb-2.5 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Miscellaneous & Logistics</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <FormField
                          control={form.control}
                          name="avgPaymentDays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Avg Payment (Days)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="license"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Operating License #</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Trade license..."
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="backorderType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Backorder Type</FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Backorder Type"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                                >
                                  <option value="Allow Partial">Allow Partial Shipments</option>
                                  <option value="Ship Complete">Ship Complete Only</option>
                                  <option value="Cancel Backorder">Cancel Backorders</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="defaultPaymentMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default Payment Method</FormLabel>
                              <FormControl>
                                <select
                                  aria-label="Default Payment Method"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                                >
                                  <option value="EFT / Wire">EFT / Wire Transfer</option>
                                  <option value="ACH Debit">ACH Direct Debit</option>
                                  <option value="Credit Card">Corporate Credit Card</option>
                                  <option value="Letter of Credit">Letter of Credit (LC)</option>
                                  <option value="Check">Check / Draft</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="pointsOB"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reward / Points OB</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="paymentInstructions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Instructions</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Routing / Swift guidelines"
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="remarks"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-3">
                              <FormLabel>Internal Remarks & Notes</FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={2}
                                  placeholder="Special handling, account notes..."
                                  className="text-xs min-h-[56px] bg-white dark:bg-[#121212]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </form>
                </Form>
              </ScrollArea>
            </TabsContent>

            {/* Placeholder Tabs for Other Sub-Systems */}
            {[
              { id: "delivery-address", title: "Delivery Address" },
              { id: "prices", title: "Contract Price Lists" },
              { id: "discounts", title: "Volume Discounts" },
              { id: "contacts", title: "Secondary Contacts & Signatories" },
              { id: "credit-limit", title: "Credit Limits & Insurance" },
              { id: "docs", title: "Compliance Documents & Certificates" },
              { id: "orders", title: "Sales Orders History" },
              { id: "consignments", title: "Consignment Warehousing" },
            ].map((tab) => (
              <TabsContent
                key={tab.id}
                value={tab.id}
                className="mt-0 flex-1 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="max-w-md p-6 rounded-xl border border-dashed border-slate-300 dark:border-white/15 bg-slate-50/50 dark:bg-[#161616]">
                  <h3 className="font-heading text-base font-bold text-slate-800 dark:text-white">
                    {tab.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-2 leading-relaxed">
                    Module configuration linked to customer{" "}
                    <span className="font-mono font-semibold text-[#93032E] dark:text-[#ff4d79]">
                      [{currentCustomer.customerNumber}] {currentCustomer.company || "New Record"}
                    </span>
                    .
                  </p>
                </div>
              </TabsContent>
            ))}
          </div>

          {/* ================================================================ */}
          {/* TASK 4: RIGHT PANE (35% CUSTOMER LIST TABLE)                     */}
          {/* ================================================================ */}
          <div className="lg:col-span-4 flex flex-col bg-slate-50/30 dark:bg-[#151515] p-3 sm:p-4">
            {/* Table Search & Count Bar */}
            <div className="mb-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                  Customer Registry
                </span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400">
                  {filteredCustomers.length} of {customers.length}
                </span>
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Filter by #, company, group..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="h-7 pl-8 text-xs bg-white dark:bg-[#191919]"
                />
              </div>
            </div>

            {/* Scrollable Customer Table */}
            <div className="flex-1 border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden bg-white dark:bg-[#191919]">
              <ScrollArea className="h-[calc(100vh-320px)]">
                <Table className="text-xs">
                  <TableHeader className="bg-slate-50 dark:bg-[#161616] sticky top-0 z-10 border-b border-slate-200 dark:border-white/10">
                    <TableRow className="h-7">
                      <TableHead className="h-7 text-[10px] font-bold uppercase py-1 px-2">Customer #</TableHead>
                      <TableHead className="h-7 text-[10px] font-bold uppercase py-1 px-2">Company</TableHead>
                      <TableHead className="h-7 text-[10px] font-bold uppercase py-1 px-2">Short Name</TableHead>
                      <TableHead className="h-7 text-[10px] font-bold uppercase py-1 px-2">Group</TableHead>
                      <TableHead className="h-7 text-[10px] font-bold uppercase py-1 px-2">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-slate-400 text-xs">
                          No customer records found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCustomers.map((cust) => {
                        const originalIndex = customers.findIndex(
                          (c) => c.customerNumber === cust.customerNumber
                        );
                        const isSelected = originalIndex === selectedIndex;
                        return (
                          <TableRow
                            key={cust.customerNumber}
                            onClick={() => selectCustomerAtIndex(originalIndex)}
                            className={`cursor-pointer transition-colors border-b border-slate-100 dark:border-white/5 h-8 ${
                              isSelected
                                ? "bg-[#93032E]/10 dark:bg-[#93032E]/25 text-[#93032E] dark:text-[#ff4d79] font-semibold border-l-2 border-l-[#93032E]"
                                : "hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-gray-300"
                            }`}
                          >
                            <TableCell className="py-1 px-2 font-mono whitespace-nowrap text-[11px]">
                              {cust.customerNumber}
                            </TableCell>
                            <TableCell className="py-1 px-2 font-medium truncate max-w-[120px]" title={cust.company}>
                              {cust.company}
                            </TableCell>
                            <TableCell className="py-1 px-2 whitespace-nowrap text-slate-500 dark:text-gray-400">
                              {cust.shortName}
                            </TableCell>
                            <TableCell className="py-1 px-2 whitespace-nowrap text-[11px]">
                              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#222222] text-[10px] font-medium border border-slate-200 dark:border-white/10">
                                {cust.customerGroup}
                              </span>
                            </TableCell>
                            <TableCell className="py-1 px-2 whitespace-nowrap text-slate-500 dark:text-gray-400 text-[11px]">
                              {cust.customerType}
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
