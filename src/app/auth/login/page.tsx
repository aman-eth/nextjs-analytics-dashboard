"use client";

import { LoginFormValues } from "@/lib/validation/authSchema";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { login } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import AuthLoading from "@/components/auth/AuthLoading";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/components/auth/Login"), {
  loading: () => <AuthLoading />,
  ssr: false,
});

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = (data: LoginFormValues) => {
    dispatch(login({ name: data.email }));
    router.push("/dashboard");
  };

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Welcome back to Next Level Analytics
          </p>
        </div>

        <Suspense fallback={<AuthLoading />}>
          <LoginForm onSubmit={onSubmit} />
        </Suspense>
      </div>
    </div>
  );
}
