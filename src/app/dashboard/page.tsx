import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { Layers, ChevronRight, ArrowUpRight } from "lucide-react";

const erpModules = [
  {
    title: "Commons",
    links: [
      { name: "User Management", href: "/user-management" },
      { name: "Cross Application", href: "/cross-application" },
    ],
  }
];

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
            Focusing on core administrative configuration, security policies, and user governance in Commons.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {erpModules.map((module) => (
            <div
              key={module.title}
              className="bg-[#191919] border border-[#93032E]/30 rounded-xl shadow-lg overflow-hidden flex flex-col transition-all hover:border-[#93032E]/60 hover:shadow-xl"
            >
              {/* Accent colored top bar #93032E */}
              <div className="h-1.5 bg-[#93032E] w-full" />

              {/* Module Card Header */}
              <div className="p-5 pb-4 border-b border-[#93032E]/20 bg-[#161616]">
                <div className="w-10 h-10 rounded-lg bg-[#121212] border border-[#93032E]/40 flex items-center justify-center shadow-xs mb-3 text-[#93032E]">
                  <Layers className="w-5 h-5" />
                </div>

                <h2 className="font-heading text-lg font-bold text-[#93032E] tracking-wide">
                  {module.title}
                </h2>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  System administration, user security, organizational entities, and audit tracking.
                </p>
              </div>

              {/* Sub-modules List */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <ul className="space-y-1.5">
                  {module.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group/link flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-[#93032E] font-bold text-xs group-hover/link:translate-x-0.5 transition-transform">
                            ›
                          </span>
                          <span className="truncate text-white group-hover/link:text-white font-medium">
                            {link.name}
                          </span>
                        </div>

                        <ChevronRight className="w-3.5 h-3.5 text-[#93032E] group-hover/link:translate-x-0.5 transition-all opacity-0 group-hover/link:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Card footer link */}
                <div className="mt-6 pt-3 border-t border-[#93032E]/20 flex items-center justify-between text-xs text-gray-400">
                  <span>Enter {module.title}</span>
                  <Link
                    href={module.links[0]?.href || "#"}
                    className="inline-flex items-center gap-1 text-[#93032E] hover:underline font-semibold"
                  >
                    Open <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
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
            <p>© 2026 <span className="font-brand font-medium">SYNC-ERP</span> Global Enterprise Solutions. All rights reserved.</p>
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
