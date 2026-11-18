import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

async function ProtectedUserManagement({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await auth.protect();

  return children;
}

export default function UserManagementLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={null}>
      <ProtectedUserManagement>{children}</ProtectedUserManagement>
    </Suspense>
  );
}
