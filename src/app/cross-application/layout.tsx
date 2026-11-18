import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

async function ProtectedCrossApplication({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await auth.protect();

  return children;
}

export default function CrossApplicationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={null}>
      <ProtectedCrossApplication>{children}</ProtectedCrossApplication>
    </Suspense>
  );
}
