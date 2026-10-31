import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

interface SignInButtonProps {
  className?: string;
  mode?: "modal" | "redirect";
  children?: React.ReactNode;
  showIcon?: boolean;
}

export function SignInButton({
  className,
  mode = "modal",
  children,
  showIcon = false,
}: SignInButtonProps) {
  return (
    <ClerkSignInButton mode={mode}>
      <button
        type="button"
        className={
          className ??
          "text-slate-700 hover:text-slate-900 font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer inline-flex items-center gap-1.5"
        }
      >
        {showIcon && <LogIn className="w-3.5 h-3.5" />}
        {children ?? "Sign In"}
      </button>
    </ClerkSignInButton>
  );
}

