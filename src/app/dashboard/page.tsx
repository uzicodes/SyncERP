import Image from "next/image";
import Header from "@/components/Header";
import ModuleDirectory from "@/components/ModuleDirectory";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#151515] text-white flex flex-col font-sans">
      {/* Header */}
      <Header />

      {/* Main Dashboard Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Centered Hero Banner */}
        <div className="flex flex-col items-center justify-center text-center pb-8 border-b border-[#93032E]/25 mb-10 max-w-4xl mx-auto">
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#93032E] tracking-tight">
            Select the Module You Want to Work with Now!
          </h1>
          
          <p className="text-sm sm:text-base text-gray-300 mt-3 max-w-2xl leading-relaxed mx-auto">
            Seamlessly orchestrate general accounting, distribution pipelines, global supply networks, human resources, and smart manufacturing operations.
          </p>
        </div>

        {/* Core ERP Modules Directory */}
        <ModuleDirectory />
      </main>

      {/* Modern ERP Footer */}
      <footer className="border-t border-[#93032E]/20 bg-[#121212] py-6 mt-12 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/Sync-ERP(transparent).webp"
              alt="SyncERP Logo"
              width={18}
              height={18}
              className="w-4 h-4 object-contain"
            />
            <p>© 2026 <span className="font-brand font-medium">SyncERP</span> Global Enterprise Solutions. All rights reserved.</p>
          </div>
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

