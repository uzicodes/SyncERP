import { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import ProfileForm from "@/components/ProfileForm";

async function ProfileFormContainer() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <ProfileForm
      firstName={user.firstName ?? ""}
      lastName={user.lastName ?? ""}
      email={
        user.primaryEmailAddress?.emailAddress ??
        user.emailAddresses?.[0]?.emailAddress ??
        ""
      }
    />
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-10 bg-slate-100 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-10 bg-slate-100 rounded-lg" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-20 bg-slate-200 rounded" />
        <div className="h-10 bg-slate-100 rounded-lg" />
      </div>
      <div className="flex justify-end pt-2">
        <div className="h-10 w-28 bg-slate-200 rounded-lg" />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#575B61] flex flex-col font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6 sm:p-8 border border-slate-200 my-8">
          <h1 className="font-heading text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
            User Profile
          </h1>

          <Suspense fallback={<ProfileSkeleton />}>
            <ProfileFormContainer />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
