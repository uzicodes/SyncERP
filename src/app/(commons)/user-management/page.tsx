import Link from "next/link";
import Header from "@/components/Header";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Shield,
  UserCheck,
  UserX,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Mail,
  User,
} from "lucide-react";

interface PlaceholderUser {
  id: string;
  name: string;
  email: string;
  role: string;
  roleType: "admin" | "finance" | "operations" | "standard";
  status: "Active" | "Pending" | "Suspended";
  lastActive: string;
  avatarInitials: string;
}

const PLACEHOLDER_USERS: PlaceholderUser[] = [
  {
    id: "usr-01",
    name: "Alexander Morgan",
    email: "alexander.morgan@syncerp.internal",
    role: "System Administrator",
    roleType: "admin",
    status: "Active",
    lastActive: "Just now",
    avatarInitials: "AM",
  },
  {
    id: "usr-02",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@syncerp.internal",
    role: "Financial Controller",
    roleType: "finance",
    status: "Active",
    lastActive: "15 mins ago",
    avatarInitials: "SJ",
  },
  {
    id: "usr-03",
    name: "David Chen",
    email: "david.chen@syncerp.internal",
    role: "Supply Chain Manager",
    roleType: "operations",
    status: "Active",
    lastActive: "2 hours ago",
    avatarInitials: "DC",
  },
  {
    id: "usr-04",
    name: "Elena Rostova",
    email: "elena.rostova@syncerp.internal",
    role: "Human Resources Lead",
    roleType: "standard",
    status: "Pending",
    lastActive: "Invitation sent",
    avatarInitials: "ER",
  },
  {
    id: "usr-05",
    name: "Marcus Sterling",
    email: "marcus.sterling@syncerp.internal",
    role: "Inventory Supervisor",
    roleType: "operations",
    status: "Suspended",
    lastActive: "3 days ago",
    avatarInitials: "MS",
  },
];

export default function UserManagementPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Application Navigation Header */}
      <Header />

      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="hover:text-[#93032E] transition-colors"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Commons</span>
            <span>/</span>
            <span className="text-[#93032E] font-semibold">User Management</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span>Module:</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] border border-slate-200">
              COMMONS-v1.0
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area (Clean Enterprise Style with White Background) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          {/* Page Header Area */}
          <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#93032E] tracking-tight">
                  User Management
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {PLACEHOLDER_USERS.length} Total Users
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Manage enterprise identity, role assignments, security permissions, and workspace access.
              </p>
            </div>

            {/* + Add New User Button */}
            <div>
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#93032E] hover:bg-[#a80e3b] active:bg-[#780225] text-white text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#93032E]/40"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add New User</span>
              </button>
            </div>
          </div>

          {/* Search, Filter, and Controls Bar */}
          <div className="p-4 sm:px-8 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, email, or role..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#93032E]/30 focus:border-[#93032E]"
                readOnly
              />
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>Filters</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span>Sort by: Name</span>
              </button>
            </div>
          </div>

          {/* Placeholder Table Structure */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3.5">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 bg-white text-sm">
                {PLACEHOLDER_USERS.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Name Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#93032E]/10 text-[#93032E] font-bold text-xs flex items-center justify-center shrink-0 border border-[#93032E]/20">
                          {user.avatarInitials}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-[#93032E] transition-colors">
                            {user.name}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-600 font-mono text-xs">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{user.email}</span>
                      </div>
                    </td>

                    {/* Role Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                          user.roleType === "admin"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : user.roleType === "finance"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : user.roleType === "operations"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <Shield className="w-3 h-3" />
                        {user.role}
                      </span>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.status === "Active" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </span>
                      ) : user.status === "Pending" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-500" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-300">
                          <UserX className="w-3 h-3 text-slate-400" />
                          Suspended
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 hover:text-[#93032E] hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          aria-label={`Options for ${user.name}`}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination & Summary Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div>
              Showing <span className="font-semibold text-slate-800">1</span> to{" "}
              <span className="font-semibold text-slate-800">{PLACEHOLDER_USERS.length}</span> of{" "}
              <span className="font-semibold text-slate-800">{PLACEHOLDER_USERS.length}</span> entries
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-200 bg-white text-slate-400 cursor-not-allowed text-xs font-medium"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded bg-[#93032E] text-white text-xs font-semibold shadow-xs"
              >
                1
              </button>
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-200 bg-white text-slate-400 cursor-not-allowed text-xs font-medium"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

