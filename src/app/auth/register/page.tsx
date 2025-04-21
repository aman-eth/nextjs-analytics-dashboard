"use client";

import { RegisterFormValues } from "@/lib/validation/authSchema";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { login } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import AuthLoading from "@/components/auth/AuthLoading";
import dynamic from "next/dynamic";

const RegisterForm = dynamic(() => import("@/components/auth/Register"), {
  loading: () => <AuthLoading />,
  ssr: false,
});

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = (data: RegisterFormValues) => {
    dispatch(login({ name: data.name, role: data.role }));
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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Join Next Level Analytics today
          </p>
        </div>

        <Suspense fallback={<AuthLoading />}>
          <RegisterForm onSubmit={onSubmit} />
        </Suspense>
      </div>
    </div>
  );
}
