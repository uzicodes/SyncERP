import Link from "next/link";
import {
  Layers,
  Landmark,
  Truck,
  Network,
  Users,
  UserCheck,
  Factory,
  ChevronRight,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Database,
  BarChart3,
} from "lucide-react";

export interface SubModule {
  name: string;
  href: string;
}

export interface ERPModule {
  id: string;
  title: string;
  description: string;
  category: "admin" | "finance" | "operations" | "people";
  iconName: string;
  subModules: SubModule[];
}

const MODULES_DATA: ERPModule[] = [
  {
    id: "commons",
    title: "Commons",
    description: "System infrastructure, organizational hierarchy, master data, and audit tracking.",
    category: "admin",
    iconName: "Layers",
    subModules: [
      { name: "System Administration", href: "/commons/system-admin" },
      { name: "Company Setup & Entities", href: "/commons/company-setup" },
      { name: "User Management & Security", href: "/commons/user-management" },
      { name: "Role-Based Access Control", href: "/commons/roles" },
      { name: "Master Data Definition", href: "/commons/master-data" },
      { name: "Audit Trail & Logs", href: "/commons/audit-logs" },
    ],
  },
  {
    id: "accounts",
    title: "Accounts",
    description: "Financial ledgers, automated payables, receivables, and statutory statements.",
    category: "finance",
    iconName: "Landmark",
    subModules: [
      { name: "General Ledger", href: "/general-ledger" },
      { name: "Accounts Payable", href: "/accounts-payable" },
      { name: "Accounts Receivable", href: "/accounts-receivable" },
      { name: "Chart of Accounts", href: "/chart-of-accounts" },
      { name: "Cash & Bank Management", href: "/cash-bank" },
      { name: "Taxation & Compliance", href: "/taxation" },
      { name: "Financial Statements", href: "/financial-statements" },
    ],
  },
  {
    id: "distribution",
    title: "Distribution",
    description: "Omnichannel fulfillment, dynamic inventory, multi-facility warehouse management.",
    category: "operations",
    iconName: "Truck",
    subModules: [
      { name: "Sales Orders", href: "/sales-orders" },
      { name: "Purchase Orders", href: "/purchase-orders" },
      { name: "Warehouse Management", href: "/warehouse-management" },
      { name: "Inventory Tracking", href: "/inventory-tracking" },
      { name: "Shipping & Delivery", href: "/shipping-delivery" },
      { name: "Billing & Invoicing", href: "/billing-invoicing" },
    ],
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    description: "Vendor procurement lifecycle, freight logistics, demand forecasting, and SLA metrics.",
    category: "operations",
    iconName: "Network",
    subModules: [
      { name: "Strategic Procurement", href: "/procurement" },
      { name: "Vendor Management", href: "/vendor-management" },
      { name: "Demand Forecasting", href: "/demand-forecasting" },
      { name: "Logistics & Freight", href: "/logistics" },
      { name: "Quality Inspection", href: "/quality-inspection" },
      { name: "Contract Management", href: "/contracts" },
    ],
  },
  {
    id: "crm",
    title: "CRM",
    description: "Customer lifecycle, sales pipeline stages, instant quotation generation, and support tickets.",
    category: "operations",
    iconName: "Users",
    subModules: [
      { name: "Leads & Opportunities", href: "/leads-opportunities" },
      { name: "Customer Directory", href: "/customer-directory" },
      { name: "Sales Pipeline", href: "/sales-pipeline" },
      { name: "Quotations & Proposals", href: "/quotations" },
      { name: "Support Tickets", href: "/support-tickets" },
      { name: "Campaigns & Marketing", href: "/campaigns" },
    ],
  },
  {
    id: "human-resources",
    title: "Human Resources",
    description: "Workforce directory, automated payroll calculations, time & shift records, talent acquisition.",
    category: "people",
    iconName: "UserCheck",
    subModules: [
      { name: "Employee Directory", href: "/employee-directory" },
      { name: "Payroll Management", href: "/payroll" },
      { name: "Time & Attendance", href: "/attendance" },
      { name: "Leave Management", href: "/leave-management" },
      { name: "Recruitment & Onboarding", href: "/recruitment" },
      { name: "Performance Reviews", href: "/performance-reviews" },
    ],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Multi-level Bills of Materials, production work order execution, routing, and cost accounting.",
    category: "operations",
    iconName: "Factory",
    subModules: [
      { name: "Bill of Materials (BOM)", href: "/bill-of-materials" },
      { name: "Production Work Orders", href: "/work-orders" },
      { name: "Master Production Schedule", href: "/production-planning" },
      { name: "Shop Floor Tracking", href: "/shop-floor" },
      { name: "Equipment Maintenance", href: "/equipment-maintenance" },
      { name: "Cost Accounting", href: "/cost-accounting" },
    ],
  },
];

function getModuleIcon(name: string) {
  switch (name) {
    case "Layers":
      return <Layers className="w-5 h-5 text-[#C4D64D]" />;
    case "Landmark":
      return <Landmark className="w-5 h-5 text-[#C4D64D]" />;
    case "Truck":
      return <Truck className="w-5 h-5 text-[#C4D64D]" />;
    case "Network":
      return <Network className="w-5 h-5 text-[#C4D64D]" />;
    case "Users":
      return <Users className="w-5 h-5 text-[#C4D64D]" />;
    case "UserCheck":
      return <UserCheck className="w-5 h-5 text-[#C4D64D]" />;
    case "Factory":
      return <Factory className="w-5 h-5 text-[#C4D64D]" />;
    default:
      return <Layers className="w-5 h-5 text-[#C4D64D]" />;
  }
}

export default function ModuleDirectory() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MODULES_DATA.map((module) => (
        <div
          key={module.id}
          className="group bg-[#484D55] hover:bg-[#4E535C] border border-white/10 hover:border-white/20 rounded-xl shadow-lg transition-all duration-200 flex flex-col overflow-hidden hover:-translate-y-0.5"
        >
          {/* Accent colored top bar #C4D64D */}
          <div className="h-1.5 bg-[#C4D64D] w-full" />

          {/* Module Card Header */}
          <div className="p-5 pb-4 border-b border-white/10 bg-[#3F444C]">
            <div className="w-10 h-10 rounded-lg bg-[#32363D] border border-white/10 flex items-center justify-center shadow-xs mb-3">
              {getModuleIcon(module.iconName)}
            </div>

            <h2 className="font-heading text-lg font-bold text-white tracking-wide group-hover:text-white">
              {module.title}
            </h2>
            <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
              {module.description}
            </p>
          </div>

          {/* Sub-modules List */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
            <ul className="space-y-1.5">
              {module.subModules.map((sub) => (
                <li key={sub.href}>
                  <Link
                    href={sub.href}
                    className="group/link flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[#C4D64D] font-bold text-xs group-hover/link:translate-x-0.5 transition-transform">
                        ›
                      </span>
                      <span className="truncate">{sub.name}</span>
                    </div>

                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover/link:text-white group-hover/link:translate-x-0.5 transition-all opacity-0 group-hover/link:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Card footer link */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
              <span>Enter {module.title}</span>
              <Link
                href={module.subModules[0]?.href || "#"}
                className="inline-flex items-center gap-1 text-[#C4D64D] hover:underline font-semibold"
              >
                Open <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* 8th Card: Enterprise System Health & Quick Telemetry to complete and balance the 3-column grid cleanly */}
      <div className="bg-gradient-to-br from-[#3D4249] to-[#34383F] border border-white/10 rounded-xl shadow-lg p-5 flex flex-col justify-between overflow-hidden relative">
        <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-[#C4D64D] absolute top-0 left-0 right-0" />
        
        <div>
          <div className="flex items-center justify-between mb-3 mt-1">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </span>
          </div>

          <h3 className="font-heading text-base font-bold text-white tracking-wide">
            Enterprise System Telemetry
          </h3>
          <p className="text-xs text-gray-300 mt-1 leading-relaxed">
            Real-time status of connected ERP databases, automated background synchronizers, and API services.
          </p>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/20 border border-white/5 text-xs">
              <span className="text-gray-300 flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-blue-400" /> PostgreSQL Node
              </span>
              <span className="text-emerald-400 font-medium">99.99% Online</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/20 border border-white/5 text-xs">
              <span className="text-gray-300 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C4D64D]" /> Clerk RBAC
              </span>
              <span className="text-white font-medium">Enforced</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/20 border border-white/5 text-xs">
              <span className="text-gray-300 flex items-center gap-2">
                <BarChart3 className="w-3.5 h-3.5 text-amber-400" /> Sync Latency
              </span>
              <span className="text-white font-medium">18 ms</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>SyncERP Cloud Infrastructure</span>
          <span className="text-[#C4D64D] font-mono font-medium">v2.5.0-prod</span>
        </div>
      </div>
    </div>
  );
}
