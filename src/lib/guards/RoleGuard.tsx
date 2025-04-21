"use client";

import { useAppSelector } from "@/hooks/useRedux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  allowedRoles: ("admin" | "user")[];
}

export default function RoleGuard({ children, allowedRoles }: Props) {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    } else if (user && !allowedRoles.includes(user.role)) {
      router.replace("/unauthorized");
    }
  }, [isAuthenticated, user, router, allowedRoles]);

  if (!isAuthenticated || (user && !allowedRoles.includes(user.role)))
    return null;

  return <>{children}</>;
}
