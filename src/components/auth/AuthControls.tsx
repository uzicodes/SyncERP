"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useUser, SignOutButton, Show } from "@clerk/nextjs";
import { User, LogOut } from "lucide-react";
import { SignInButton } from "./SignInButton";
import { SignUpButton } from "./SignUpButton";

interface AuthControlsProps {
  className?: string;
}

export function AuthControls({ className }: AuthControlsProps) {
  const { user } = useUser();

  return (
    <div className={className ?? "flex items-center gap-3"}>
      <Suspense
        fallback={
          <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
        }
      >
        <Show when="signed-in">
          <div className="flex items-center gap-3">
            {/* Clicking the avatar opens the custom /profile page */}
            <Link
              href="/profile"
              title="Open User Profile"
              className="relative w-8 h-8 rounded-full ring-2 ring-[#93032E]/40 hover:ring-[#93032E] hover:scale-105 active:scale-95 transition-all overflow-hidden flex items-center justify-center bg-[#1a1a1a] cursor-pointer"
            >
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.fullName || "User Avatar"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 text-[#93032E]" />
              )}
            </Link>

            {/* Quick Sign Out Action */}
            <SignOutButton>
              <button
                type="button"
                title="Sign Out"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </SignOutButton>
          </div>
        </Show>
        <Show when="signed-out">
          <div className="flex items-center gap-2">
            <SignInButton />
            <SignUpButton />
          </div>
        </Show>
      </Suspense>
    </div>
  );
}
