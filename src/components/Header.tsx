import Link from "next/link";
import { Suspense } from "react";
import { UserButton, SignInButton, Show } from "@clerk/nextjs";
import { Home, Mail, Folder, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand logo & quick action icons */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-98"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:bg-blue-800 transition-colors">
              S
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              SyncERP<span className="text-orange-500 font-black">+</span>
            </span>
          </Link>

          {/* Quick Action Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-slate-200">
            <button
              type="button"
              title="Home Dashboard"
              aria-label="Home"
              className="w-8 h-8 flex items-center justify-center rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Messages & Notifications"
              aria-label="Email"
              className="w-8 h-8 flex items-center justify-center rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Document Center"
              aria-label="Folder"
              className="w-8 h-8 flex items-center justify-center rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Folder className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Environment status & Authentication controls */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Enterprise Suite</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="flex items-center">
            <Suspense
              fallback={
                <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
              }
            >
              <Show when="signed-in">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 ring-2 ring-blue-600/20",
                    },
                  }}
                />
              </Show>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg transition-all shadow-xs hover:shadow-sm cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
              </Show>
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
