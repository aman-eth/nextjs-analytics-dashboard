"use client";

import { useAppSelector } from "@/hooks/useRedux";
import ProtectedRoute from "@/lib/guards/ProtectedRoute";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <ProtectedRoute>
      <div className="max-w-lg mx-auto mt-20 space-y-4 ml-5 sm:ml-auto">
        <button
          onClick={() => router.back()}
          className="cursor-pointer hover:opacity-70 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p>Hi, {user?.name}</p>
        <p>You are {user?.role === "admin" ? "an admin" : "a user"}</p>
      </div>
    </ProtectedRoute>
  );
}
