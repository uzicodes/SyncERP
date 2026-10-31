import Link from "next/link";
import { Home, Mail, Folder, ShieldCheck } from "lucide-react";
import { AuthControls } from "@/components/auth";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#151515]/95 backdrop-blur-md border-b border-[#93032E]/25 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand logo & quick action icons */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-98"
          >
            <div className="w-8 h-8 rounded-lg bg-[#93032E] flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:opacity-90 transition-opacity">
              S
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight text-[#93032E]">
              SyncERP<span className="text-[#93032E] font-black">+</span>
            </span>
          </Link>

          {/* Quick Action Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-[#93032E]/25">
            <button
              type="button"
              title="Home Dashboard"
              aria-label="Home"
              className="w-8 h-8 flex items-center justify-center rounded-md text-white bg-[#1a1a1a] border border-[#93032E]/30 hover:bg-[#93032E]/20 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Messages & Notifications"
              aria-label="Email"
              className="w-8 h-8 flex items-center justify-center rounded-md text-white bg-[#1a1a1a] border border-[#93032E]/30 hover:bg-[#93032E]/20 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Document Center"
              aria-label="Folder"
              className="w-8 h-8 flex items-center justify-center rounded-md text-white bg-[#1a1a1a] border border-[#93032E]/30 hover:bg-[#93032E]/20 transition-colors cursor-pointer"
            >
              <Folder className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Environment status & Authentication controls */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1a1a1a] border border-[#93032E]/30 text-xs font-medium text-white">
            <ShieldCheck className="w-3.5 h-3.5 text-[#93032E]" />
            <span>Enterprise Suite</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#93032E] animate-pulse" />
          </div>

          <AuthControls />
        </div>
      </div>
    </header>
  );
}
