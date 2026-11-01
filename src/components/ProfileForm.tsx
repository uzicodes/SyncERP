"use client";

import { useState, useTransition } from "react";
import { updateUserProfile } from "@/actions/user.actions";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ProfileFormProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function ProfileForm({
  firstName: initialFirstName = "",
  lastName: initialLastName = "",
  email = "",
}: ProfileFormProps) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);

    startTransition(async () => {
      const response = await updateUserProfile({ firstName, lastName });

      if (response.success) {
        setFeedback({
          type: "success",
          message: response.message || "Profile updated successfully.",
        });
      } else {
        setFeedback({
          type: "error",
          message: response.error || "Failed to update profile.",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-slate-800">
      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`flex items-center gap-2.5 p-3.5 rounded-lg text-sm border ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
          role="alert"
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="firstName"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isPending}
            placeholder="First name"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#93032E] focus:bg-white transition-all disabled:opacity-60"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="lastName"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isPending}
            placeholder="Last name"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#93032E] focus:bg-white transition-all disabled:opacity-60"
          />
        </div>
      </div>

      {/* Email Address (Disabled) */}
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-600"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          disabled
          readOnly
          className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 text-sm cursor-not-allowed select-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#93032E] hover:bg-[#a80e3b] active:bg-[#780225] text-white text-sm font-semibold transition-all disabled:opacity-60 cursor-pointer"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{isPending ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>
    </form>
  );
}
