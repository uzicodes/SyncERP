import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

async function ProtectedInventory({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await auth.protect();

  return children;
}

export default function InventoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={null}>
      <ProtectedInventory>{children}</ProtectedInventory>
    </Suspense>
  );
}
