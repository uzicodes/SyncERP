"use client";

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Mail, Folder } from "lucide-react";
import { Show, UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#151515]/95 backdrop-blur-md border-b border-[#93032E]/25 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand logo & quick action icons */}
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group transition-transform active:scale-98"
          >
            <Image
              src="/Sync-ERP(transparent).webp"
              alt="SyncERP Logo"
              width={48}
              height={48}
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:opacity-90 transition-opacity drop-shadow-xs"
              priority
            />
            <span
              className="font-brand font-bold text-xl sm:text-2xl tracking-wider text-white select-none"
              style={{ fontFamily: "'Mazegin', var(--font-mazegin), sans-serif" }}
            >
              SYNC-ERP
            </span>
          </Link>

          {/* Quick Action Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-[#93032E]/25">
            <Link
              href="/dashboard"
              title="Home Dashboard"
              aria-label="Home"
              className="w-8 h-8 flex items-center justify-center rounded-md text-white bg-[#1a1a1a] border border-[#93032E]/30 hover:bg-[#93032E]/20 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
            </Link>
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

        {/* Right: Theme Toggle & Authenticated User Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          <Suspense fallback={<div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse" />}>
            <Show when="signed-in">
              <UserButton
                userProfileMode="navigation"
                userProfileUrl="/profile"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 ring-2 ring-[#93032E]/40 hover:ring-[#93032E] transition-all",
                  },
                }}
              />
            </Show>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
