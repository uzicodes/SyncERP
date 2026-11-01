"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export interface UpdateUserProfileParams {
  firstName: string;
  lastName: string;
}

export interface UpdateUserProfileResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function updateUserProfile({
  firstName,
  lastName,
}: UpdateUserProfileParams): Promise<UpdateUserProfileResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized: You must be logged in to update your profile.",
      };
    }

    const client = await clerkClient();
    await client.users.updateUser(userId, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    });

    revalidatePath("/profile");

    return {
      success: true,
      message: "Profile updated successfully.",
    };
  } catch (error: any) {
    console.error("Failed to update user profile:", error);
    return {
      success: false,
      error: error?.message || "Failed to update profile. Please try again.",
    };
  }
}

