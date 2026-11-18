import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

async function ProtectedDashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await auth.protect();

  return children;
}

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={null}>
      <ProtectedDashboard>{children}</ProtectedDashboard>
    </Suspense>
  );
}
