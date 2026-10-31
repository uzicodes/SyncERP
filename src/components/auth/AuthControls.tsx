import { Suspense } from "react";
import { UserButton, Show } from "@clerk/nextjs";
import { SignInButton } from "./SignInButton";
import { SignUpButton } from "./SignUpButton";

interface AuthControlsProps {
  className?: string;
}

export function AuthControls({ className }: AuthControlsProps) {
  return (
    <div className={className ?? "flex items-center"}>
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
          <div className="flex items-center gap-2">
            <SignInButton />
            <SignUpButton />
          </div>
        </Show>
      </Suspense>
    </div>
  );
}

