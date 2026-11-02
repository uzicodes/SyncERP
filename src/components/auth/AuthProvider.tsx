import { ClerkProvider } from "@clerk/nextjs";

export const authLocalization = {
  signIn: {
    start: {
      title: "Welcome back to SyncERP",
      subtitle: "Enter your credentials to access your enterprise workspace",
    },
  },
  signUp: {
    start: {
      title: "Welcome to SyncERP",
      subtitle: "Create your enterprise account to get started",
    },
  },
};

export const authAppearance = {
  layout: {
    logoImageUrl: "/Sync-ERP(transparent).webp",
  },
  options: {
    unsafe_disableDevelopmentModeWarnings: true,
  },
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <ClerkProvider
      localization={authLocalization}
      appearance={authAppearance}
    >
      {children}
    </ClerkProvider>
  );
}

