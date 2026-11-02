import Link from "next/link";
import Header from "@/components/Header";
import UserManagementView, { ManagedUser } from "./UserManagementView";

const INITIAL_USERS: ManagedUser[] = [
  {
    id: "usr-01",
    name: "Alexander Morgan",
    email: "alexander.morgan@syncerp.internal",
    phone: "+1 (555) 019-2834",
    role: "System Administrator",
    roleType: "admin",
    address: "Executive Suite 400, HQ San Jose, CA",
    passwordHint: "First high school name",
    status: "Active",
    lastActive: "Just now",
    avatarInitials: "AM",
  },
  {
    id: "usr-02",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@syncerp.internal",
    phone: "+1 (555) 018-9213",
    role: "Financial Controller",
    roleType: "finance",
    address: "Finance Wing B, Floor 2, HQ San Jose, CA",
    passwordHint: "Mother's maiden city",
    status: "Active",
    lastActive: "15 mins ago",
    avatarInitials: "SJ",
  },
  {
    id: "usr-03",
    name: "David Chen",
    email: "david.chen@syncerp.internal",
    phone: "+1 (555) 017-4829",
    role: "Supply Chain Manager",
    roleType: "operations",
    address: "Distribution Center 1, Reno, NV",
    passwordHint: "Favorite childhood pet",
    status: "Active",
    lastActive: "2 hours ago",
    avatarInitials: "DC",
  },
  {
    id: "usr-04",
    name: "Elena Rostova",
    email: "elena.rostova@syncerp.internal",
    phone: "+1 (555) 016-3392",
    role: "Human Resources Lead",
    roleType: "standard",
    address: "People & Talent Suite 102, Austin, TX",
    passwordHint: "Graduation year + initials",
    status: "Pending",
    lastActive: "Invitation sent",
    avatarInitials: "ER",
  },
  {
    id: "usr-05",
    name: "Marcus Sterling",
    email: "marcus.sterling@syncerp.internal",
    phone: "+1 (555) 014-8821",
    role: "Inventory Supervisor",
    roleType: "operations",
    address: "West Coast Depot Hub, Seattle, WA",
    passwordHint: "First car model",
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
        <UserManagementView initialUsers={INITIAL_USERS} />
      </main>
    </div>
  );
}
