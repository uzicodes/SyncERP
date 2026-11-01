import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  TrendingUp,
  Boxes,
  Lock,
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
            <div className="w-9 h-9 rounded-lg bg-[#93032E] flex items-center justify-center text-white font-bold text-base shadow-sm">
              S
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
              SyncERP<span className="text-[#93032E] font-black">+</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <SignInButton mode="modal">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm transition-all cursor-pointer"
              >
                Get Started
              </button>
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* Hero Section */}
        <section className="text-white py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs sm:text-sm font-medium tracking-wide mb-8 backdrop-blur-xs">
              <Cpu className="w-4 h-4 text-blue-300" />
              <span>Next-Gen Enterprise Automation Platform</span>
            </div>

            {/* Bold Headline with Solid Underneath Layer Style (Crimson Red & White) */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold not-italic tracking-tight leading-[1.2] pb-2 underlayer-text">
              Automate Your Entire Enterprise Operations with Intelligent Precision
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
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Built for Modern Scale, Security, and Agility
            </h2>
            <p className="mt-3 text-slate-200 text-base">
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
          <p>© 2026 SyncERP Global Enterprise Solutions. All rights reserved.</p>
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
