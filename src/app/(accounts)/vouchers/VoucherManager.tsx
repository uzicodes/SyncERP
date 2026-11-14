"use client";

import { useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Calendar,
  DollarSign,
  Landmark,
  FileText,
  ShieldCheck,
  Building2,
  CreditCard,
  Clock,
  Printer,
  Download,
  Paperclip,
  Check,
  Filter,
  ArrowRightLeft,
  Receipt,
  FileCheck2,
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
// ZOD SCHEMA & TYPES
// ============================================================================

export const voucherLineSchema = z.object({
  id: z.string(),
  accountId: z.string().min(1, "Account is required"),
  accountName: z.string().default(""),
  particulars: z.string().default(""),
  costCenter: z.string().default("Operations & Admin"),
  debit: z.coerce.number().min(0).default(0),
  credit: z.coerce.number().min(0).default(0),
});

export const voucherSchema = z.object({
  voucherNo: z.string().min(1, "Voucher number is required"),
  voucherType: z.enum([
    "Journal Voucher",
    "Payment Voucher",
    "Receipt Voucher",
    "Contra Voucher",
  ]).default("Journal Voucher"),
  voucherDate: z.string().min(1, "Voucher date is required"),
  postingDate: z.string().min(1, "Posting date is required"),
  referenceNo: z.string().default(""),
  currency: z.string().default("USD"),
  exchangeRate: z.coerce.number().min(0.0001).default(1.0),
  branch: z.string().default("Main Corporate HQ"),
  costCenter: z.string().default("Operations & Admin"),
  narration: z.string().min(1, "Narration / description is required"),
  status: z.enum(["Draft", "Submitted", "Verified", "Approved", "Posted"]).default("Draft"),
  paymentMode: z.string().default("Bank Wire / EFT"),
  bankName: z.string().default("JPMorgan Chase Operational"),
  bankAccount: z.string().default("AC-98421098-USD"),
  chequeNumber: z.string().default(""),
  chequeDate: z.string().default(""),
  payeeName: z.string().default(""),
  isCrossed: z.boolean().default(true),
  preparedBy: z.string().default("Accounts Officer"),
  verifiedBy: z.string().default("Senior Accountant"),
  approvedBy: z.string().default("Financial Controller"),
  notes: z.string().default(""),
  lines: z.array(voucherLineSchema).min(2, "Voucher must contain at least 2 ledger lines"),
});

export type VoucherFormValues = z.infer<typeof voucherSchema>;
export type VoucherLineValues = z.infer<typeof voucherLineSchema>;

// Available Standard Chart of Accounts for fast selection
const CHART_OF_ACCOUNTS = [
  { code: "1010", name: "1010 - Cash at Bank (Operational)" },
  { code: "1020", name: "1020 - Petty Cash Reserve" },
  { code: "1030", name: "1030 - Treasury Liquidity Fund" },
  { code: "1110", name: "1110 - Trade Accounts Receivable" },
  { code: "1120", name: "1120 - Notes Receivable" },
  { code: "1410", name: "1410 - Raw Material Inventory" },
  { code: "1420", name: "1420 - Finished Goods Inventory" },
  { code: "1510", name: "1510 - Prepaid Insurance & Taxes" },
  { code: "2010", name: "2010 - Accounts Payable Trade" },
  { code: "2020", name: "2020 - Accrued Payroll & Benefits" },
  { code: "2030", name: "2030 - Sales Tax / VAT Payable" },
  { code: "2040", name: "2040 - Short-term Bank Overdraft" },
  { code: "3010", name: "3010 - Common Stock Equity" },
  { code: "3020", name: "3020 - Retained Earnings" },
  { code: "4010", name: "4010 - Product Sales Revenue" },
  { code: "4020", name: "4020 - Service & Support Income" },
  { code: "5010", name: "5010 - Office Supplies & Consumables" },
  { code: "5020", name: "5020 - Rent & Facility Utilities" },
  { code: "5030", name: "5030 - Freight & Shipping Expense" },
  { code: "5040", name: "5040 - Bank Service & Wire Charges" },
];

// ============================================================================
// MOCK DATA: REAL-WORLD ERP VOUCHERS
// ============================================================================

const INITIAL_VOUCHERS: VoucherFormValues[] = [
  {
    voucherNo: "VC-2026-0101",
    voucherType: "Journal Voucher",
    voucherDate: "2026-11-14",
    postingDate: "2026-11-14",
    referenceNo: "TRF-CORP-9921",
    currency: "USD",
    exchangeRate: 1.0,
    branch: "Main Corporate HQ",
    costCenter: "Operations & Admin",
    narration: "Monthly interbank liquidity transfer from treasury fund to operational clearing.",
    status: "Posted",
    paymentMode: "Bank Wire / EFT",
    bankName: "JPMorgan Chase Operational",
    bankAccount: "AC-98421098-USD",
    chequeNumber: "",
    chequeDate: "",
    payeeName: "SyncERP Treasury Clearing",
    isCrossed: true,
    preparedBy: "Accounts Officer",
    verifiedBy: "Senior Accountant",
    approvedBy: "Financial Controller",
    notes: "Treasury board approved transaction ID #8921. Executed via Fedwire.",
    lines: [
      {
        id: "line-101-1",
        accountId: "1010 - Cash at Bank (Operational)",
        accountName: "Cash at Bank (Operational)",
        particulars: "Liquidity deposit to primary checking account",
        costCenter: "Operations & Admin",
        debit: 35000,
        credit: 0,
      },
      {
        id: "line-101-2",
        accountId: "1030 - Treasury Liquidity Fund",
        accountName: "Treasury Liquidity Fund",
        particulars: "Disbursement from high-yield reserve holding",
        costCenter: "Operations & Admin",
        debit: 0,
        credit: 35000,
      },
    ],
  },
  {
    voucherNo: "VC-2026-0102",
    voucherType: "Payment Voucher",
    voucherDate: "2026-11-13",
    postingDate: "2026-11-13",
    referenceNo: "INV-OH-2026-884",
    currency: "USD",
    exchangeRate: 1.0,
    branch: "North Plant Facility",
    costCenter: "Direct Manufacturing",
    narration: "Vendor invoice settlement - Once Human Materials Industrial Supply Co.",
    status: "Approved",
    paymentMode: "Bank Wire / EFT",
    bankName: "JPMorgan Chase Operational",
    bankAccount: "AC-98421098-USD",
    chequeNumber: "CHK-009412",
    chequeDate: "2026-11-13",
    payeeName: "Once Human Materials Co.",
    isCrossed: true,
    preparedBy: "Accounts Officer",
    verifiedBy: "Senior Accountant",
    approvedBy: "Chief Financial Officer",
    notes: "Payment approved under 3-way PO matching rule against PO-44819.",
    lines: [
      {
        id: "line-102-1",
        accountId: "2010 - Accounts Payable Trade",
        accountName: "Accounts Payable Trade",
        particulars: "Invoice settlement INV-OH-2026-884",
        costCenter: "Direct Manufacturing",
        debit: 18500,
        credit: 0,
      },
      {
        id: "line-102-2",
        accountId: "1010 - Cash at Bank (Operational)",
        accountName: "Cash at Bank (Operational)",
        particulars: "Wire transfer payment from Chase operational checking",
        costCenter: "Operations & Admin",
        debit: 0,
        credit: 18500,
      },
    ],
  },
  {
    voucherNo: "VC-2026-0103",
    voucherType: "Receipt Voucher",
    voucherDate: "2026-11-12",
    postingDate: "2026-11-12",
    referenceNo: "REMIT-VALVE-771",
    currency: "USD",
    exchangeRate: 1.0,
    branch: "Main Corporate HQ",
    costCenter: "Sales & Marketing",
    narration: "Customer remittance - Steam (Valve Corp) digital distribution billing.",
    status: "Verified",
    paymentMode: "Bank Wire / EFT",
    bankName: "Citibank NY Commercial",
    bankAccount: "AC-11029344-USD",
    chequeNumber: "",
    chequeDate: "",
    payeeName: "SyncERP Inc.",
    isCrossed: true,
    preparedBy: "Credit Controller",
    verifiedBy: "Senior Accountant",
    approvedBy: "Financial Controller",
    notes: "Direct ACH remittance reference Valve Corp Bill #44189.",
    lines: [
      {
        id: "line-103-1",
        accountId: "1010 - Cash at Bank (Operational)",
        accountName: "Cash at Bank (Operational)",
        particulars: "ACH deposit received from Valve Corporation",
        costCenter: "Sales & Marketing",
        debit: 72000,
        credit: 0,
      },
      {
        id: "line-103-2",
        accountId: "1110 - Trade Accounts Receivable",
        accountName: "Trade Accounts Receivable",
        particulars: "Clearance of AR invoice INV-STM-0912",
        costCenter: "Sales & Marketing",
        debit: 0,
        credit: 72000,
      },
    ],
  },
  {
    voucherNo: "VC-2026-0104",
    voucherType: "Journal Voucher",
    voucherDate: "2026-11-11",
    postingDate: "2026-11-11",
    referenceNo: "PAYROLL-NOV-01",
    currency: "USD",
    exchangeRate: 1.0,
    branch: "Main Corporate HQ",
    costCenter: "Operations & Admin",
    narration: "Bi-weekly corporate payroll accrued liabilities and statutory deductions.",
    status: "Submitted",
    paymentMode: "Intercompany Transfer",
    bankName: "JPMorgan Chase Operational",
    bankAccount: "AC-98421098-USD",
    chequeNumber: "",
    chequeDate: "",
    payeeName: "SyncERP Payroll Service",
    isCrossed: true,
    preparedBy: "HR Payroll Specialist",
    verifiedBy: "Senior Accountant",
    approvedBy: "Financial Controller",
    notes: "Payroll run batch #NOV-A audited by external compliance officer.",
    lines: [
      {
        id: "line-104-1",
        accountId: "5010 - Office Supplies & Consumables",
        accountName: "Operations Expense",
        particulars: "Gross salaries and compensation expense",
        costCenter: "Operations & Admin",
        debit: 120000,
        credit: 0,
      },
      {
        id: "line-104-2",
        accountId: "2030 - Sales Tax / VAT Payable",
        accountName: "Payroll Taxes Withheld",
        particulars: "FICA and state income withholding tax payable",
        costCenter: "Operations & Admin",
        debit: 0,
        credit: 30000,
      },
      {
        id: "line-104-3",
        accountId: "2020 - Accrued Payroll & Benefits",
        accountName: "Net Salaries Payable",
        particulars: "Net direct deposit payable to employees",
        costCenter: "Operations & Admin",
        debit: 0,
        credit: 90000,
      },
    ],
  },
  {
    voucherNo: "VC-2026-0105",
    voucherType: "Contra Voucher",
    voucherDate: "2026-11-10",
    postingDate: "2026-11-10",
    referenceNo: "PETTY-REPLEN-08",
    currency: "USD",
    exchangeRate: 1.0,
    branch: "North Plant Facility",
    costCenter: "Direct Manufacturing",
    narration: "Plant floor petty cash float replenishment against cash receipts.",
    status: "Draft",
    paymentMode: "Cash",
    bankName: "JPMorgan Chase Operational",
    bankAccount: "AC-98421098-USD",
    chequeNumber: "CHK-009413",
    chequeDate: "2026-11-10",
    payeeName: "Factory Petty Cash Custodian",
    isCrossed: false,
    preparedBy: "Accounts Officer",
    verifiedBy: "Senior Accountant",
    approvedBy: "Plant Controller",
    notes: "Reimbursement of minor hardware expenses under receipt bundle #902.",
    lines: [
      {
        id: "line-105-1",
        accountId: "1020 - Petty Cash Reserve",
        accountName: "Petty Cash Reserve",
        particulars: "Replenish manufacturing workshop petty float",
        costCenter: "Direct Manufacturing",
        debit: 4500,
        credit: 0,
      },
      {
        id: "line-105-2",
        accountId: "1010 - Cash at Bank (Operational)",
        accountName: "Cash at Bank (Operational)",
        particulars: "Cash withdrawal from main checking account",
        costCenter: "Direct Manufacturing",
        debit: 0,
        credit: 4500,
      },
    ],
  },
];

const EMPTY_VOUCHER: VoucherFormValues = {
  voucherNo: "VC-2026-0106",
  voucherType: "Journal Voucher",
  voucherDate: "2026-11-14",
  postingDate: "2026-11-14",
  referenceNo: "",
  currency: "USD",
  exchangeRate: 1.0,
  branch: "Main Corporate HQ",
  costCenter: "Operations & Admin",
  narration: "",
  status: "Draft",
  paymentMode: "Bank Wire / EFT",
  bankName: "JPMorgan Chase Operational",
  bankAccount: "AC-98421098-USD",
  chequeNumber: "",
  chequeDate: "",
  payeeName: "",
  isCrossed: true,
  preparedBy: "Accounts Officer",
  verifiedBy: "Senior Accountant",
  approvedBy: "Financial Controller",
  notes: "",
  lines: [
    {
      id: "line-new-1",
      accountId: "1010 - Cash at Bank (Operational)",
      accountName: "Cash at Bank (Operational)",
      particulars: "",
      costCenter: "Operations & Admin",
      debit: 0,
      credit: 0,
    },
    {
      id: "line-new-2",
      accountId: "2010 - Accounts Payable Trade",
      accountName: "Accounts Payable Trade",
      particulars: "",
      costCenter: "Operations & Admin",
      debit: 0,
      credit: 0,
    },
  ],
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function VoucherManager() {
  const [vouchers, setVouchers] = useState<VoucherFormValues[]>(INITIAL_VOUCHERS);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  // Active Voucher
  const currentVoucher = vouchers[selectedIndex] || EMPTY_VOUCHER;

  // React Hook Form
  const form = useForm<VoucherFormValues>({
    resolver: zodResolver(voucherSchema) as any,
    defaultValues: currentVoucher,
    mode: "onChange",
  });

  // Dynamic Line Items Array
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lines",
  });

  // Real-time Debit & Credit Totals
  const watchedLines = form.watch("lines") || [];
  const { totalDebit, totalCredit, difference, isBalanced } = useMemo(() => {
    let d = 0;
    let c = 0;
    for (const line of watchedLines) {
      d += Number(line.debit) || 0;
      c += Number(line.credit) || 0;
    }
    const diff = Math.abs(d - c);
    return {
      totalDebit: d,
      totalCredit: c,
      difference: diff,
      isBalanced: diff < 0.001 && d > 0,
    };
  }, [watchedLines]);

  // Navigate to Record Index
  const selectVoucherAtIndex = (index: number) => {
    if (index >= 0 && index < vouchers.length) {
      setSelectedIndex(index);
      form.reset(vouchers[index]);
    }
  };

  // Action Bar Handlers
  const handleTop = () => {
    if (vouchers.length > 0) {
      selectVoucherAtIndex(0);
      setFeedback({ type: "info", message: "Navigated to top voucher record." });
    }
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      selectVoucherAtIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < vouchers.length - 1) {
      selectVoucherAtIndex(selectedIndex + 1);
    }
  };

  const handleBottom = () => {
    if (vouchers.length > 0) {
      selectVoucherAtIndex(vouchers.length - 1);
      setFeedback({ type: "info", message: "Navigated to bottom voucher record." });
    }
  };

  const handleClear = () => {
    const nextNumber = `VC-2026-0${String(vouchers.length + 101).padStart(3, "0")}`;
    const freshRecord: VoucherFormValues = {
      ...EMPTY_VOUCHER,
      voucherNo: nextNumber,
      voucherDate: new Date().toISOString().split("T")[0],
      postingDate: new Date().toISOString().split("T")[0],
    };
    form.reset(freshRecord);
    setFeedback({
      type: "info",
      message: `Form cleared. Ready to create new voucher [${nextNumber}].`,
    });
  };

  const handleShow = () => {
    const val = form.getValues();
    setFeedback({
      type: "info",
      message: `Viewing [${val.voucherNo}] • ${val.voucherType} • Amount: $${totalDebit.toLocaleString(
        undefined,
        { minimumFractionDigits: 2 }
      )} • Status: ${val.status}`,
    });
  };

  const handleAddVoucher = (values: VoucherFormValues) => {
    // Check if voucher number exists
    const exists = vouchers.some((v) => v.voucherNo.toLowerCase() === values.voucherNo.toLowerCase());
    if (exists) {
      setFeedback({
        type: "error",
        message: `Voucher "${values.voucherNo}" already exists. Click "Update" to modify it.`,
      });
      return;
    }

    if (!isBalanced) {
      setFeedback({
        type: "error",
        message: `Voucher is unbalanced! Total Debit ($${totalDebit.toFixed(2)}) must equal Total Credit ($${totalCredit.toFixed(2)}). Difference: $${difference.toFixed(2)}`,
      });
      return;
    }

    setVouchers((prev) => [values, ...prev]);
    setSelectedIndex(0);
    setFeedback({
      type: "success",
      message: `Voucher [${values.voucherNo}] created successfully with balanced amount $${totalDebit.toFixed(2)}!`,
    });
  };

  const handleUpdateVoucher = () => {
    form.handleSubmit((values) => {
      if (!isBalanced) {
        setFeedback({
          type: "error",
          message: `Cannot update: Total Debit ($${totalDebit.toFixed(2)}) must match Total Credit ($${totalCredit.toFixed(2)}).`,
        });
        return;
      }

      setVouchers((prev) =>
        prev.map((v, idx) => (idx === selectedIndex ? { ...values } : v))
      );
      setFeedback({
        type: "success",
        message: `Voucher [${values.voucherNo}] updated successfully!`,
      });
    })();
  };

  const handleDeleteVoucher = () => {
    if (vouchers.length === 0) return;
    const target = vouchers[selectedIndex];
    if (
      confirm(
        `Are you sure you want to permanently delete Voucher [${target.voucherNo}] (${target.voucherType})?`
      )
    ) {
      const remaining = vouchers.filter((_, idx) => idx !== selectedIndex);
      setVouchers(remaining);
      const nextIdx = Math.max(0, selectedIndex - 1);
      setSelectedIndex(nextIdx);
      if (remaining.length > 0) {
        form.reset(remaining[nextIdx]);
      } else {
        form.reset(EMPTY_VOUCHER);
      }
      setFeedback({
        type: "success",
        message: `Voucher [${target.voucherNo}] has been deleted.`,
      });
    }
  };

  const handlePostVoucher = () => {
    const current = form.getValues();
    if (current.status === "Posted") {
      setFeedback({
        type: "info",
        message: `Voucher [${current.voucherNo}] is already posted to the General Ledger.`,
      });
      return;
    }
    if (!isBalanced) {
      setFeedback({
        type: "error",
        message: `Cannot post unbalanced voucher! Difference: $${difference.toFixed(2)}`,
      });
      return;
    }

    form.setValue("status", "Posted");
    handleUpdateVoucher();
    setFeedback({
      type: "success",
      message: `Voucher [${current.voucherNo}] successfully posted to the General Ledger!`,
    });
  };

  // Add a new ledger line
  const handleAddLine = () => {
    append({
      id: `line-${Date.now()}`,
      accountId: "1010 - Cash at Bank (Operational)",
      accountName: "Cash at Bank",
      particulars: "",
      costCenter: form.getValues("costCenter") || "Operations & Admin",
      debit: 0,
      credit: 0,
    });
  };

  // Filtered Register
  const filteredVouchers = useMemo(() => {
    const q = searchFilter.toLowerCase().trim();
    return vouchers.filter((v) => {
      const matchesSearch =
        !q ||
        v.voucherNo.toLowerCase().includes(q) ||
        v.narration.toLowerCase().includes(q) ||
        v.referenceNo.toLowerCase().includes(q) ||
        v.lines.some((l) => l.accountId.toLowerCase().includes(l.accountId.toLowerCase()));

      const matchesType =
        typeFilter === "All" ||
        v.voucherType.toLowerCase().includes(typeFilter.toLowerCase()) ||
        (typeFilter === "JV" && v.voucherType === "Journal Voucher") ||
        (typeFilter === "PV" && v.voucherType === "Payment Voucher") ||
        (typeFilter === "RV" && v.voucherType === "Receipt Voucher") ||
        (typeFilter === "CV" && v.voucherType === "Contra Voucher");

      const matchesStatus =
        statusFilter === "All" || v.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [vouchers, searchFilter, typeFilter, statusFilter]);

  // Status Badge Helper
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Posted":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3" /> Posted
          </span>
        );
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            <ShieldCheck className="w-3 h-3" /> Approved
          </span>
        );
      case "Verified":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
            <FileCheck2 className="w-3 h-3" /> Verified
          </span>
        );
      case "Submitted":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <Clock className="w-3 h-3" /> Submitted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            Draft
          </span>
        );
    }
  };

  // Voucher Type Badge Helper
  const renderTypeBadge = (type: string) => {
    let colorClass = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    let code = "JV";
    if (type.includes("Payment")) {
      colorClass = "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      code = "PV";
    } else if (type.includes("Receipt")) {
      colorClass = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      code = "RV";
    } else if (type.includes("Contra")) {
      colorClass = "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      code = "CV";
    } else if (type.includes("Journal")) {
      colorClass = "bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border-sky-200 dark:border-sky-800";
      code = "JV";
    }

    return (
      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${colorClass}`} title={type}>
        {code}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-[#191919] rounded-xl shadow-sm dark:shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col transition-colors duration-150">
      {/* ==================================================================== */}
      {/* TOP ACTION BAR                                                       */}
      {/* ==================================================================== */}
      <div className="px-4 sm:px-6 py-2.5 bg-slate-50 dark:bg-[#161616] border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Action Buttons: Show, Clear */}
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
            disabled={selectedIndex === 0 || vouchers.length === 0}
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
            disabled={selectedIndex === 0 || vouchers.length === 0}
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
            disabled={selectedIndex >= vouchers.length - 1}
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
            disabled={selectedIndex >= vouchers.length - 1}
            className="h-7 px-2 text-xs font-semibold border-slate-300 dark:border-white/15 bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 shadow-2xs disabled:opacity-40"
            title="Last Record"
          >
            <ChevronsDown className="w-3.5 h-3.5" />
            <span>Bottom</span>
          </Button>

          <div className="h-4 w-px bg-slate-300 dark:bg-white/15 mx-1" />

          {/* Mutation Buttons: Add, Update, Delete, Post */}
          <Button
            type="button"
            size="xs"
            onClick={form.handleSubmit(handleAddVoucher)}
            className="h-7 px-2.5 text-xs font-semibold bg-[#93032E] hover:bg-[#a80e3b] text-white shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleUpdateVoucher}
            className="h-7 px-2.5 text-xs font-semibold border-emerald-600/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 shadow-2xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Update</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handleDeleteVoucher}
            className="h-7 px-2.5 text-xs font-semibold border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 shadow-2xs cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={handlePostVoucher}
            className="h-7 px-2.5 text-xs font-semibold border-purple-500/50 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 shadow-2xs cursor-pointer"
            title="Post to General Ledger"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Post</span>
          </Button>
        </div>

        {/* Record Counter & Real-time Balance Pill */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400">
          {/* Balance status pill */}
          {isBalanced ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
              <Check className="w-3 h-3 text-emerald-600" />
              Balanced (${totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2 })})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300">
              <AlertCircle className="w-3 h-3 text-rose-600" />
              Unbalanced Diff: ${difference.toFixed(2)}
            </span>
          )}

          <span className="font-mono bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-800 dark:text-gray-200">
            {vouchers.length > 0 ? `${selectedIndex + 1} of ${vouchers.length}` : "0 records"}
          </span>

          <span className="hidden sm:inline-block font-mono text-slate-400">
            [{currentVoucher.voucherNo}]
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
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold text-sm ml-4 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SPLIT PANE: FORM (65%) & REGISTER TABLE (35%)                        */}
      {/* ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[720px] divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-white/10">
        {/* ------------------------------------------------------------------ */}
        {/* LEFT PANE: VOUCHER FORM & LINE ITEMS GRID (~68% = col-span-8)      */}
        {/* ------------------------------------------------------------------ */}
        <div className="lg:col-span-8 flex flex-col p-4 sm:p-5 bg-white dark:bg-[#191919]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddVoucher)} className="flex flex-col h-full space-y-4">
              <Tabs defaultValue="entry" className="w-full flex-1 flex flex-col">
                {/* Tabs Bar */}
                <TabsList className="h-9 w-full justify-start border-b border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-[#161616] p-0.5 rounded-lg mb-4 gap-1 overflow-x-auto">
                  <TabsTrigger
                    value="entry"
                    className="h-8 px-3 text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-[#222222] data-[state=active]:text-[#93032E] dark:data-[state=active]:text-rose-400 data-[state=active]:shadow-xs rounded-md transition-all flex items-center gap-1.5"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Voucher Entry</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="splits"
                    className="h-8 px-3 text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-[#222222] data-[state=active]:text-[#93032E] dark:data-[state=active]:text-rose-400 data-[state=active]:shadow-xs rounded-md transition-all flex items-center gap-1.5"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>Line Allocations</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="banking"
                    className="h-8 px-3 text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-[#222222] data-[state=active]:text-[#93032E] dark:data-[state=active]:text-rose-400 data-[state=active]:shadow-xs rounded-md transition-all flex items-center gap-1.5"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Cheque & Banking</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="attachments"
                    className="h-8 px-3 text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-[#222222] data-[state=active]:text-[#93032E] dark:data-[state=active]:text-rose-400 data-[state=active]:shadow-xs rounded-md transition-all flex items-center gap-1.5"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>Docs & Notes</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="audit"
                    className="h-8 px-3 text-xs font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-[#222222] data-[state=active]:text-[#93032E] dark:data-[state=active]:text-rose-400 data-[state=active]:shadow-xs rounded-md transition-all flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Audit Trail</span>
                  </TabsTrigger>
                </TabsList>

                {/* ------------------------------------------------------------ */}
                {/* TAB 1: VOUCHER ENTRY (HEADER METADATA + DOUBLE ENTRY GRID)  */}
                {/* ------------------------------------------------------------ */}
                <TabsContent value="entry" className="m-0 space-y-4 focus-visible:outline-none flex-1 flex flex-col">
                  {/* Voucher Header Card */}
                  <div className="bg-slate-50/70 dark:bg-[#1e1e1e]/60 border border-slate-200 dark:border-white/10 rounded-lg p-3.5 shadow-2xs">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200/70 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-gray-200">
                      <div className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-[#93032E]" />
                        <span>Header Particulars</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-normal">Status:</span>
                        {renderStatusBadge(form.watch("status"))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      {/* Voucher Number */}
                      <FormField
                        control={form.control}
                        name="voucherNo"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">
                              Voucher No <span className="text-[#93032E]">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="VC-2026-0101"
                                className="h-8 text-xs font-mono font-bold bg-white dark:bg-[#121212]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Voucher Type */}
                      <FormField
                        control={form.control}
                        name="voucherType"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">
                              Voucher Type <span className="text-[#93032E]">*</span>
                            </FormLabel>
                            <FormControl>
                              <select
                                aria-label="Voucher Type"
                                value={field.value}
                                onChange={field.onChange}
                                className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                              >
                                <option value="Journal Voucher">Journal Voucher (JV)</option>
                                <option value="Payment Voucher">Payment Voucher (PV)</option>
                                <option value="Receipt Voucher">Receipt Voucher (RV)</option>
                                <option value="Contra Voucher">Contra Voucher (CV)</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Voucher Date */}
                      <FormField
                        control={form.control}
                        name="voucherDate"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">
                              Voucher Date <span className="text-[#93032E]">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="h-8 text-xs bg-white dark:bg-[#121212]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Posting Date */}
                      <FormField
                        control={form.control}
                        name="postingDate"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">
                              Posting Date <span className="text-[#93032E]">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="h-8 text-xs bg-white dark:bg-[#121212]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Reference Number */}
                      <FormField
                        control={form.control}
                        name="referenceNo"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">Ref / Cheque / Bill #</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="INV-2026-9921"
                                className="h-8 text-xs bg-white dark:bg-[#121212]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Currency */}
                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">Currency</FormLabel>
                            <FormControl>
                              <select
                                aria-label="Currency"
                                value={field.value}
                                onChange={field.onChange}
                                className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                              >
                                <option value="USD">USD ($) - US Dollar</option>
                                <option value="EUR">EUR (€) - Euro</option>
                                <option value="GBP">GBP (£) - British Pound</option>
                                <option value="BDT">BDT (৳) - Bangladeshi Taka</option>
                                <option value="SGD">SGD (S$) - Singapore Dollar</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Branch */}
                      <FormField
                        control={form.control}
                        name="branch"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">Branch / Entity</FormLabel>
                            <FormControl>
                              <select
                                aria-label="Branch"
                                value={field.value}
                                onChange={field.onChange}
                                className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                              >
                                <option value="Main Corporate HQ">Main Corporate HQ</option>
                                <option value="North Plant Facility">North Plant Facility</option>
                                <option value="European Distribution Hub">European Distribution Hub</option>
                                <option value="Singapore Regional Center">Singapore Regional Center</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Cost Center */}
                      <FormField
                        control={form.control}
                        name="costCenter"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">Cost Center</FormLabel>
                            <FormControl>
                              <select
                                aria-label="Cost Center"
                                value={field.value}
                                onChange={field.onChange}
                                className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#93032E]/30"
                              >
                                <option value="Operations & Admin">Operations & Admin</option>
                                <option value="Direct Manufacturing">Direct Manufacturing</option>
                                <option value="Sales & Marketing">Sales & Marketing</option>
                                <option value="IT & Infrastructure">IT & Infrastructure</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Narration Description across all columns */}
                      <div className="col-span-1 sm:col-span-2 md:col-span-4">
                        <FormField
                          control={form.control}
                          name="narration"
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <FormLabel className="text-[11px] font-semibold">
                                Narration / General Memo <span className="text-[#93032E]">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter complete accounting narration and business justification..."
                                  className="h-8 text-xs bg-white dark:bg-[#121212]"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ---------------------------------------------------------- */}
                  {/* DOUBLE-ENTRY LINE ITEMS GRID                               */}
                  {/* ---------------------------------------------------------- */}
                  <div className="flex-1 flex flex-col border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden bg-white dark:bg-[#191919] shadow-2xs">
                    {/* Grid Title Bar */}
                    <div className="px-3.5 py-2 bg-slate-50 dark:bg-[#171717] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-gray-200">
                          Ledger Line Items ({fields.length})
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-gray-400">
                          Debit & Credit distribution
                        </span>
                      </div>
                      <Button
                        type="button"
                        size="xs"
                        variant="outline"
                        onClick={handleAddLine}
                        className="h-6 px-2 text-[11px] font-semibold border-slate-300 dark:border-white/15 bg-white dark:bg-[#202020] text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3 h-3 text-[#93032E]" />
                        <span>Add Row</span>
                      </Button>
                    </div>

                    {/* Interactive Table of Lines */}
                    <div className="flex-1 overflow-x-auto min-h-[220px]">
                      <Table className="w-full text-xs">
                        <TableHeader className="bg-slate-50/80 dark:bg-[#1c1c1c] sticky top-0">
                          <TableRow className="border-b border-slate-200 dark:border-white/10 h-7 text-[11px]">
                            <TableHead className="w-10 text-center font-bold">#</TableHead>
                            <TableHead className="w-56 font-bold">Account Code & Title</TableHead>
                            <TableHead className="min-w-[140px] font-bold">Particulars / Memo</TableHead>
                            <TableHead className="w-36 font-bold">Cost Center</TableHead>
                            <TableHead className="w-28 text-right font-bold text-emerald-700 dark:text-emerald-400">Debit ($)</TableHead>
                            <TableHead className="w-28 text-right font-bold text-blue-700 dark:text-blue-400">Credit ($)</TableHead>
                            <TableHead className="w-10 text-center"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {fields.map((fieldItem, idx) => (
                            <TableRow
                              key={fieldItem.id}
                              className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors"
                            >
                              {/* Line Number */}
                              <TableCell className="text-center font-mono text-[11px] text-slate-500 py-1.5">
                                {idx + 1}
                              </TableCell>

                              {/* Account Code & Title Dropdown */}
                              <TableCell className="py-1.5">
                                <FormField
                                  control={form.control}
                                  name={`lines.${idx}.accountId`}
                                  render={({ field }) => (
                                    <select
                                      aria-label={`Account for line ${idx + 1}`}
                                      value={field.value}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        const found = CHART_OF_ACCOUNTS.find((a) => a.name === e.target.value);
                                        if (found) {
                                          form.setValue(`lines.${idx}.accountName`, found.name);
                                        }
                                      }}
                                      className="w-full h-7 px-2 text-[11px] bg-white dark:bg-[#141414] border border-input rounded text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                    >
                                      {CHART_OF_ACCOUNTS.map((acc) => (
                                        <option key={acc.code} value={acc.name}>
                                          {acc.name}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                />
                              </TableCell>

                              {/* Particulars / Memo */}
                              <TableCell className="py-1.5">
                                <FormField
                                  control={form.control}
                                  name={`lines.${idx}.particulars`}
                                  render={({ field }) => (
                                    <Input
                                      {...field}
                                      placeholder="Memo note..."
                                      className="h-7 text-[11px] bg-white dark:bg-[#141414]"
                                    />
                                  )}
                                />
                              </TableCell>

                              {/* Cost Center */}
                              <TableCell className="py-1.5">
                                <FormField
                                  control={form.control}
                                  name={`lines.${idx}.costCenter`}
                                  render={({ field }) => (
                                    <select
                                      aria-label={`Cost Center for line ${idx + 1}`}
                                      value={field.value}
                                      onChange={field.onChange}
                                      className="w-full h-7 px-1.5 text-[11px] bg-white dark:bg-[#141414] border border-input rounded text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#93032E]"
                                    >
                                      <option value="Operations & Admin">Operations & Admin</option>
                                      <option value="Direct Manufacturing">Direct Manufacturing</option>
                                      <option value="Sales & Marketing">Sales & Marketing</option>
                                      <option value="IT & Infrastructure">IT & Infrastructure</option>
                                    </select>
                                  )}
                                />
                              </TableCell>

                              {/* Debit Input */}
                              <TableCell className="py-1.5">
                                <FormField
                                  control={form.control}
                                  name={`lines.${idx}.debit`}
                                  render={({ field }) => (
                                    <Input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={field.value ?? ""}
                                      onChange={(e) => {
                                        const v = parseFloat(e.target.value) || 0;
                                        field.onChange(v);
                                        // Auto clear credit if debit entered
                                        if (v > 0) {
                                          form.setValue(`lines.${idx}.credit`, 0);
                                        }
                                      }}
                                      className="h-7 text-[11px] text-right font-mono font-medium text-emerald-800 dark:text-emerald-300 bg-white dark:bg-[#141414]"
                                    />
                                  )}
                                />
                              </TableCell>

                              {/* Credit Input */}
                              <TableCell className="py-1.5">
                                <FormField
                                  control={form.control}
                                  name={`lines.${idx}.credit`}
                                  render={({ field }) => (
                                    <Input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={field.value ?? ""}
                                      onChange={(e) => {
                                        const v = parseFloat(e.target.value) || 0;
                                        field.onChange(v);
                                        // Auto clear debit if credit entered
                                        if (v > 0) {
                                          form.setValue(`lines.${idx}.debit`, 0);
                                        }
                                      }}
                                      className="h-7 text-[11px] text-right font-mono font-medium text-blue-800 dark:text-blue-300 bg-white dark:bg-[#141414]"
                                    />
                                  )}
                                />
                              </TableCell>

                              {/* Remove Line Button */}
                              <TableCell className="text-center py-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (fields.length > 2) {
                                      remove(idx);
                                    } else {
                                      setFeedback({
                                        type: "error",
                                        message: "A double-entry voucher must contain at least 2 lines.",
                                      });
                                    }
                                  }}
                                  className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer p-1"
                                  title="Delete line"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* -------------------------------------------------------- */}
                    {/* REAL-TIME BALANCING FOOTER BAR                           */}
                    {/* -------------------------------------------------------- */}
                    <div className="bg-slate-50 dark:bg-[#151515] border-t border-slate-200 dark:border-white/10 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          onClick={handleAddLine}
                          className="h-7 px-2 text-xs text-slate-600 dark:text-gray-300 hover:text-[#93032E]"
                        >
                          <Plus className="w-3.5 h-3.5 mr-1" />
                          Add Ledger Line
                        </Button>
                        <span className="text-[11px] text-slate-400 hidden sm:inline">
                          Tip: Entering a Debit automatically zeroes out Credit on the same row.
                        </span>
                      </div>

                      {/* Total Calculations */}
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500 font-sans text-[11px]">Total Debit:</span>
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">
                            ${totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>

                        <div className="h-4 w-px bg-slate-300 dark:bg-white/15" />

                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500 font-sans text-[11px]">Total Credit:</span>
                          <span className="font-bold text-blue-700 dark:text-blue-400">
                            ${totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>

                        <div className="h-4 w-px bg-slate-300 dark:bg-white/15" />

                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500 font-sans text-[11px]">Diff:</span>
                          <span
                            className={`font-bold ${
                              isBalanced ? "text-emerald-600" : "text-rose-600"
                            }`}
                          >
                            ${difference.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* ------------------------------------------------------------ */}
                {/* TAB 2: LINE ALLOCATIONS (PROJECT / TAX / SUB-LEDGER)         */}
                {/* ------------------------------------------------------------ */}
                <TabsContent value="splits" className="m-0 space-y-4 focus-visible:outline-none">
                  <div className="bg-slate-50/70 dark:bg-[#1e1e1e]/60 border border-slate-200 dark:border-white/10 rounded-lg p-4">
                    <h3 className="text-xs font-bold text-slate-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                      <ArrowRightLeft className="w-4 h-4 text-[#93032E]" />
                      Advanced Sub-Ledger & Analytical Allocation
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mb-4">
                      Configure multi-dimensional cost assignment, tax handling, and analytical split for financial statements.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg space-y-2">
                        <Label className="text-[11px] font-semibold text-slate-700 dark:text-gray-300">
                          Statutory Tax Scope
                        </Label>
                        <select
                          aria-label="Statutory Tax Scope"
                          className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white"
                          defaultValue="Standard Rate Taxable (15%)"
                        >
                          <option>Standard Rate Taxable (15%)</option>
                          <option>Exempt / Non-Taxable Supply</option>
                          <option>Zero-Rated Export Distribution</option>
                          <option>Reverse Charge Mechanism</option>
                        </select>
                        <span className="text-[10px] text-slate-400 block">
                          Applied automatically to sales and purchasing line items.
                        </span>
                      </div>

                      <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg space-y-2">
                        <Label className="text-[11px] font-semibold text-slate-700 dark:text-gray-300">
                          Project Allocation Code
                        </Label>
                        <select
                          aria-label="Project Allocation Code"
                          className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white"
                          defaultValue="PRJ-2026-HQ-EXPANSION"
                        >
                          <option>PRJ-2026-HQ-EXPANSION</option>
                          <option>PRJ-NORTH-AUTOMATION</option>
                          <option>PRJ-ERP-UPGRADE-CORE</option>
                          <option>General Corporate Overhead (Unallocated)</option>
                        </select>
                        <span className="text-[10px] text-slate-400 block">
                          Tracks CAPEX and OPEX against corporate capital projects.
                        </span>
                      </div>

                      <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg space-y-2">
                        <Label className="text-[11px] font-semibold text-slate-700 dark:text-gray-300">
                          Intercompany Counterparty
                        </Label>
                        <select
                          aria-label="Intercompany Counterparty"
                          className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white"
                          defaultValue="None (Direct Third-Party)"
                        >
                          <option>None (Direct Third-Party)</option>
                          <option>SyncERP Europe BV (Subsidiary 20)</option>
                          <option>SyncERP Asia Pacific Pte (Subsidiary 30)</option>
                          <option>SyncERP Manufacturing Ltd (Subsidiary 10)</option>
                        </select>
                        <span className="text-[10px] text-slate-400 block">
                          Eliminated in consolidated monthly balance sheet closing.
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* ------------------------------------------------------------ */}
                {/* TAB 3: CHEQUE & BANK DETAILS                                 */}
                {/* ------------------------------------------------------------ */}
                <TabsContent value="banking" className="m-0 space-y-4 focus-visible:outline-none">
                  <div className="bg-slate-50/70 dark:bg-[#1e1e1e]/60 border border-slate-200 dark:border-white/10 rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-gray-200">
                      <CreditCard className="w-4 h-4 text-[#93032E]" />
                      <span>Cheque, Wire & Banking Clearance Record</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      {/* Payment Mode */}
                      <FormField
                        control={form.control}
                        name="paymentMode"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">Payment / Transfer Instrument</FormLabel>
                            <FormControl>
                              <select
                                aria-label="Payment Mode"
                                value={field.value}
                                onChange={field.onChange}
                                className="w-full h-8 px-2 text-xs bg-white dark:bg-[#121212] border border-input rounded-md text-slate-900 dark:text-white"
                              >
                                <option value="Bank Wire / EFT">Bank Wire / Electronic Funds (EFT)</option>
                                <option value="Cheque">Physical Cheque</option>
                                <option value="Cash">Cash / Petty Reserve</option>
                                <option value="Online Payment">Online Merchant Gateway</option>
                                <option value="Intercompany Transfer">Intercompany Settlement</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Bank Name */}
                      <FormField
                        control={form.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">Bank Institution</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-8 text-xs bg-white dark:bg-[#121212]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Bank Account */}
                      <FormField
                        control={form.control}
                        name="bankAccount"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">Bank Account Number</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-8 text-xs font-mono bg-white dark:bg-[#121212]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Cheque Number */}
                      <FormField
                        control={form.control}
                        name="chequeNumber"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">Cheque / Leaflet Number</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="CHK-000000" className="h-8 text-xs bg-white dark:bg-[#121212]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Cheque Date */}
                      <FormField
                        control={form.control}
                        name="chequeDate"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">Cheque Issue / Maturity Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} className="h-8 text-xs bg-white dark:bg-[#121212]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Payee Name */}
                      <FormField
                        control={form.control}
                        name="payeeName"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-[11px] font-semibold">Beneficiary / Payee Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Recipient Legal Entity" className="h-8 text-xs bg-white dark:bg-[#121212]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* ------------------------------------------------------------ */}
                {/* TAB 4: DOCS & NOTES                                          */}
                {/* ------------------------------------------------------------ */}
                <TabsContent value="attachments" className="m-0 space-y-4 focus-visible:outline-none">
                  <div className="bg-slate-50/70 dark:bg-[#1e1e1e]/60 border border-slate-200 dark:border-white/10 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-gray-200">
                        <Paperclip className="w-4 h-4 text-[#93032E]" />
                        <span>Supporting Vouchers & Uploaded Invoices</span>
                      </div>
                      <Button
                        type="button"
                        size="xs"
                        variant="outline"
                        onClick={() =>
                          setFeedback({
                            type: "info",
                            message: "Attachment upload dialog simulated. Document link recorded.",
                          })
                        }
                        className="h-6 text-[11px] border-slate-300 dark:border-white/15"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Attach Document
                      </Button>
                    </div>

                    {/* Mock Attachment List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-5 h-5 text-rose-600 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-800 dark:text-gray-200">
                              Vendor_Tax_Invoice_INV-884.pdf
                            </div>
                            <div className="text-[10px] text-slate-400">
                              1.4 MB • Uploaded by Accounts Officer
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          className="h-6 text-[11px] text-slate-500 hover:text-[#93032E]"
                          onClick={() =>
                            setFeedback({ type: "info", message: "Downloading Vendor_Tax_Invoice_INV-884.pdf..." })
                          }
                        >
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                      </div>

                      <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <FileCheck2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <div>
                            <div className="font-semibold text-slate-800 dark:text-gray-200">
                              Bank_Electronic_Advice_Slip.png
                            </div>
                            <div className="text-[10px] text-slate-400">
                              420 KB • Fedwire confirmation verified
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          className="h-6 text-[11px] text-slate-500 hover:text-[#93032E]"
                          onClick={() =>
                            setFeedback({ type: "info", message: "Downloading Bank_Electronic_Advice_Slip.png..." })
                          }
                        >
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Internal Notes */}
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-[11px] font-semibold">Internal Audit Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={3}
                              placeholder="Add special notes, auditor queries, or clearance instructions..."
                              className="text-xs bg-white dark:bg-[#121212]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* ------------------------------------------------------------ */}
                {/* TAB 5: AUDIT TRAIL & APPROVALS                               */}
                {/* ------------------------------------------------------------ */}
                <TabsContent value="audit" className="m-0 space-y-4 focus-visible:outline-none">
                  <div className="bg-slate-50/70 dark:bg-[#1e1e1e]/60 border border-slate-200 dark:border-white/10 rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-gray-200">
                      <ShieldCheck className="w-4 h-4 text-[#93032E]" />
                      <span>Governance, Sign-Offs & Ledger Audit Trail</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      {/* Prepared By */}
                      <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-600 dark:text-gray-300">1. Prepared By</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <div className="font-bold text-slate-800 dark:text-white">
                          {form.watch("preparedBy") || "Accounts Officer"}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Timestamp: {form.watch("voucherDate")} 09:30 AM
                        </div>
                      </div>

                      {/* Verified By */}
                      <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-600 dark:text-gray-300">2. Verified By</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                        <div className="font-bold text-slate-800 dark:text-white">
                          {form.watch("verifiedBy") || "Senior Accountant"}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Review Code: VRF-2026-OK
                        </div>
                      </div>

                      {/* Approved By */}
                      <div className="p-3 bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/10 rounded-lg space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-slate-600 dark:text-gray-300">3. Approved By</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <div className="font-bold text-slate-800 dark:text-white">
                          {form.watch("approvedBy") || "Financial Controller"}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Auth Level: Executive Tier 1
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg text-xs space-y-1">
                      <div className="font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        General Ledger Journal Integration
                      </div>
                      <div className="text-blue-800 dark:text-blue-300 text-[11px]">
                        When this voucher is <span className="font-bold">Posted</span>, double-entry rows automatically synchronize into the General Ledger Master Journal and update Trial Balance balances.
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* RIGHT PANE: VOUCHER REGISTER TABLE (~32% = col-span-4)             */}
        {/* ------------------------------------------------------------------ */}
        <div className="lg:col-span-4 flex flex-col bg-slate-50/50 dark:bg-[#171717] min-h-[600px]">
          {/* Header & Filter Controls */}
          <div className="p-3.5 border-b border-slate-200 dark:border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-gray-200 flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#93032E]" />
                Voucher Register
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400">
                {filteredVouchers.length} of {vouchers.length} listed
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <Input
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search by Voucher #, Narration, Ref..."
                className="h-8 pl-8 text-xs bg-white dark:bg-[#121212] border-slate-200 dark:border-white/10"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={() => setSearchFilter("")}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* Quick Type & Status Filter Badges */}
            <div className="flex flex-wrap items-center gap-1 text-[11px]">
              {["All", "JV", "PV", "RV", "CV"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTypeFilter(type)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                    typeFilter === type
                      ? "bg-[#93032E] text-white shadow-2xs"
                      : "bg-white dark:bg-[#202020] text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100"
                  }`}
                >
                  {type}
                </button>
              ))}

              <div className="h-3 w-px bg-slate-300 dark:bg-white/15 mx-0.5" />

              <select
                aria-label="Status Filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-5 px-1 text-[10px] bg-white dark:bg-[#202020] border border-slate-200 dark:border-white/10 rounded text-slate-700 dark:text-gray-300"
              >
                <option value="All">All Status</option>
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
                <option value="Verified">Verified</option>
                <option value="Approved">Approved</option>
                <option value="Posted">Posted</option>
              </select>
            </div>
          </div>

          {/* Table of Vouchers */}
          <div className="flex-1 overflow-y-auto max-h-[580px]">
            <Table className="w-full text-xs">
              <TableHeader className="bg-slate-100/80 dark:bg-[#191919] sticky top-0 border-b border-slate-200 dark:border-white/10">
                <TableRow className="h-7 text-[11px]">
                  <TableHead className="font-bold py-1">Voucher / Narration</TableHead>
                  <TableHead className="font-bold text-right py-1">Debit ($)</TableHead>
                  <TableHead className="font-bold text-center w-16 py-1">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVouchers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-slate-400 text-xs">
                      No matching vouchers found in the register.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVouchers.map((v) => {
                    const originalIdx = vouchers.findIndex((orig) => orig.voucherNo === v.voucherNo);
                    const isSelected = originalIdx === selectedIndex;
                    const totalVoucherAmount = v.lines.reduce((acc, l) => acc + (Number(l.debit) || 0), 0);

                    return (
                      <TableRow
                        key={v.voucherNo}
                        onClick={() => selectVoucherAtIndex(originalIdx)}
                        className={`cursor-pointer border-b border-slate-200/60 dark:border-white/5 transition-colors ${
                          isSelected
                            ? "bg-[#93032E]/10 dark:bg-[#93032E]/20 border-l-4 border-l-[#93032E]"
                            : "hover:bg-slate-100/70 dark:hover:bg-white/5"
                        }`}
                      >
                        {/* Voucher Info */}
                        <TableCell className="py-2.5">
                          <div className="flex items-center gap-1.5 mb-1">
                            {renderTypeBadge(v.voucherType)}
                            <span className="font-mono font-bold text-slate-800 dark:text-gray-100 text-[11px]">
                              {v.voucherNo}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-gray-300 font-medium line-clamp-1">
                            {v.narration || "No narration"}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                            <span>{v.voucherDate}</span>
                            <span>•</span>
                            <span className="truncate max-w-[120px]">{v.branch}</span>
                          </div>
                        </TableCell>

                        {/* Amount */}
                        <TableCell className="py-2.5 text-right font-mono font-bold text-slate-800 dark:text-gray-100">
                          ${totalVoucherAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>

                        {/* Status */}
                        <TableCell className="py-2.5 text-center">
                          {renderStatusBadge(v.status)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Bottom Summary Bar */}
          <div className="p-3 bg-white dark:bg-[#151515] border-t border-slate-200 dark:border-white/10 text-xs flex items-center justify-between font-mono">
            <span className="text-slate-500 font-sans text-[11px]">Total Debit Volume:</span>
            <span className="font-bold text-[#93032E] dark:text-rose-400">
              ${vouchers
                .reduce(
                  (sum, v) => sum + v.lines.reduce((s, l) => s + (Number(l.debit) || 0), 0),
                  0
                )
                .toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
