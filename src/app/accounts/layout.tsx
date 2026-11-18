import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

async function ProtectedAccounts({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await auth.protect();

  return children;
}

export default function AccountsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={null}>
      <ProtectedAccounts>{children}</ProtectedAccounts>
    </Suspense>
  );
}
