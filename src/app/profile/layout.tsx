import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

async function ProtectedProfile({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await auth.protect();

  return children;
}

export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={null}>
      <ProtectedProfile>{children}</ProtectedProfile>
    </Suspense>
  );
}
