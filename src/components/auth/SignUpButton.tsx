import { SignUpButton as ClerkSignUpButton } from "@clerk/nextjs";
import { UserPlus } from "lucide-react";

interface SignUpButtonProps {
  className?: string;
  mode?: "modal" | "redirect";
  children?: React.ReactNode;
  showIcon?: boolean;
}

export function SignUpButton({
  className,
  mode = "modal",
  children,
  showIcon = false,
}: SignUpButtonProps) {
  return (
    <ClerkSignUpButton mode={mode}>
      <button
        type="button"
        className={
          className ??
          "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs sm:text-sm px-3.5 py-1.5 rounded-lg transition-all shadow-xs hover:shadow-sm cursor-pointer inline-flex items-center gap-1.5"
        }
      >
        {showIcon && <UserPlus className="w-3.5 h-3.5" />}
        {children ?? "Sign Up"}
      </button>
    </ClerkSignUpButton>
  );
}

