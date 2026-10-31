import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import Header from "@/components/Header";
import ModuleDirectory from "@/components/ModuleDirectory";
import { User, Sparkles, Building2 } from "lucide-react";

async function UserBadge() {
  const user = await currentUser();
  const userEmail =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses?.[0]?.emailAddress ??
    "Guest";

  return (
    <div className="flex items-center gap-3 bg-[#444850] border border-white/10 px-4 py-2 rounded-xl shadow-xs">
      <div className="w-8 h-8 rounded-full bg-[#353940] border border-white/10 flex items-center justify-center text-[#C4D64D]">
        <User className="w-4 h-4" />
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] text-gray-300 font-medium">Logged in session</span>
        <span className="text-xs font-semibold text-white tracking-wide truncate max-w-[200px]">
          {userEmail}
        </span>
      </div>
    </div>
  );
}

function UserBadgeSkeleton() {
  return (
    <div className="flex items-center gap-3 bg-[#444850] border border-white/10 px-4 py-2 rounded-xl shadow-xs animate-pulse">
      <div className="w-8 h-8 rounded-full bg-white/10" />
      <div className="flex flex-col gap-1">
        <div className="w-16 h-2 bg-white/10 rounded" />
        <div className="w-28 h-3 bg-white/20 rounded" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#575B61] via-[#4D5157] to-[#42464C] text-gray-100 flex flex-col font-sans">
      {/* Header */}
      <Header />

      {/* Main Dashboard Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero & Identity Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-white/10 mb-8">
          <div>
            
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Select the Module You Want to Work with Now!
            </h1>
            
            <p className="text-sm text-gray-300 mt-2 max-w-2xl leading-relaxed">
              Seamlessly orchestrate general accounting, distribution pipelines, global supply networks, human resources, and smart manufacturing operations.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <Suspense fallback={<UserBadgeSkeleton />}>
              <UserBadge />
            </Suspense>
          </div>
        </div>

        {/* Interactive Module Directory with live search, categories, and balanced 3-column layout */}
        <ModuleDirectory />
      </main>

      {/* Modern ERP Footer */}
      <footer className="border-t border-white/10 bg-[#363A40]/80 py-6 mt-12 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 SyncERP Global Enterprise Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="hover:text-white cursor-pointer">Security Compliance</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">ERP Documentation</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">System Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
