import { Suspense } from "react";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import ModulesDropdown from "@/components/ModulesDropdown";
import {
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  TrendingUp,
  Boxes,
  Lock,
  BookOpen,
} from "lucide-react";

async function AuthRedirect() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }
  return null;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#575B61] text-white flex flex-col font-sans relative selection:bg-[#93032E] selection:text-white">
      {/* Grey Dotted Background covering the entire landing page */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-[radial-gradient(#ffffff_1.25px,transparent_1.25px)] [background-size:24px_24px]"
      />

      {/* Dynamic Auth Verification & Instant Redirect for Logged-In Users */}
      <Suspense fallback={null}>
        <AuthRedirect />
      </Suspense>

      {/* Public Landing Navigation Bar */}
      <nav className="w-full border-b border-white/15 bg-[#575B61]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/Sync-ERP(transparent).webp"
              alt="SyncERP Logo"
              width={48}
              height={48}
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain drop-shadow-sm"
              priority
            />
            <span
              className="font-brand font-bold text-2xl tracking-wider text-white select-none"
              style={{ fontFamily: "'Mazegin', var(--font-mazegin), sans-serif" }}
            >
              SyncERP<span className="text-[#93032E] font-black">+</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ModulesDropdown />
            <a
              href="#documentation"
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-white shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-rose-300" />
              <span>Documentation</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* Hero Section */}
        <section className="text-white pt-8 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs sm:text-sm font-medium tracking-wide mb-5 backdrop-blur-xs text-white">
              <Cpu className="w-4 h-4 text-white" />
              <span className="text-white">Enterprise Automation Platform</span>
            </div>

            {/* Bold Headline with Solid White Text and Crimson Red 3D Extrusion */}
            <h1
              className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black not-italic tracking-tight leading-[1.3] pb-4 text-white retro-3d-block"
              style={{
                color: "#ffffff",
                textDecoration: "none",
                textShadow:
                  "1px 1px 0 #93032E, 2px 2px 0 #93032E, 3px 3px 0 #93032E, 4px 4px 0 #93032E, 5px 5px 0 #93032E, 6px 6px 0 #750225, 7px 7px 0 #57011b",
              }}
            >
              <span
                className="text-white"
                style={{
                  color: "#ffffff",
                  textShadow:
                    "1px 1px 0 #93032E, 2px 2px 0 #93032E, 3px 3px 0 #93032E, 4px 4px 0 #93032E, 5px 5px 0 #93032E, 6px 6px 0 #750225, 7px 7px 0 #57011b",
                }}
              >
                Automate Your Entire Enterprise Operations with Intelligent Precision
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg sm:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed font-normal">
              Unified orchestration for accounting, global distribution networks,
              smart manufacturing, human resources, and real-time compliance—all in
              one high-performance system.
            </p>

            {/* Prominent Call to Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              {/* Solid Blue Button for Sign In */}
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer text-base inline-flex items-center justify-center gap-2"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignInButton>

              {/* Outlined White Button for Sign Up */}
              <SignUpButton mode="modal">
                <button
                  type="button"
                  className="w-full sm:w-auto px-8 py-3.5 border-2 border-white hover:bg-white hover:text-slate-900 active:bg-slate-100 text-white font-semibold rounded-lg transition-all cursor-pointer text-base inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Sign Up</span>
                </button>
              </SignUpButton>
            </div>

            {/* Micro Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-300" />
                <span>SOC2 Type II Certified</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-blue-300" />
                <span>End-to-End Enterprise Encryption</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-300" />
                <span>99.99% High Availability SLA</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
          <div className="text-center max-w-4xl mx-auto mb-16 px-2">
            <div className="inline-flex flex-col items-center max-w-full">
              <h2
                className="bg-[#93032E] text-white px-1.5 py-0.5 sm:px-2 sm:py-1 font-heading text-lg sm:text-2xl md:text-[28px] font-bold not-italic whitespace-nowrap tracking-tight crimson-banner rounded-none"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#93032E",
                  textShadow: "none",
                }}
              >
                Built for Modern Scale, Security, and Agility
              </h2>
              <div className="w-full h-[3px] bg-white mt-[2.5px]" />
            </div>
            <p className="mt-4 text-slate-200 text-base max-w-2xl mx-auto">
              Say goodbye to fragmented silos. SyncERP connects every department into a single source of truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/35 transition-all backdrop-blur-xs">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Automated Workflows
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                Streamline approvals, procurement orders, inventory triggers, and financial reconciliation with zero manual overhead.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/35 transition-all backdrop-blur-xs">
              <div className="w-12 h-12 rounded-lg bg-[#93032E]/30 text-rose-200 flex items-center justify-center mb-5">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Unified ERP Ecosystem
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                Synchronize 7 essential business pillars from supply chains to human capital and smart shop floor manufacturing in real time.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/35 transition-all backdrop-blur-xs">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Enterprise Reliability
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed">
                Engineered with banking-grade access controls, complete audit trails, and instant compliance reporting.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Landing Footer */}
      <footer className="border-t border-white/15 bg-black/20 backdrop-blur-xs py-8 text-center text-xs text-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/Sync-ERP(transparent).webp"
              alt="SyncERP Logo"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <p>© 2026 <span className="font-brand font-medium">SyncERP</span> Global Enterprise Solutions. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6 text-slate-200">
            <span className="hover:text-white cursor-pointer">Security Compliance</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
