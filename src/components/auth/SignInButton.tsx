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
          "text-white hover:text-white border border-[#93032E]/40 font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 bg-[#1a1a1a] hover:bg-[#93032E]/20"
        }
      >
        {showIcon && <LogIn className="w-3.5 h-3.5 text-[#93032E]" />}
        {children ?? "Sign In"}
      </button>
    </ClerkSignInButton>
  );
}
