"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", allowedRoles: ["admin", "user"] },
  {
    name: "Analytics",
    href: "/dashboard/analytics-table",
    allowedRoles: ["admin"],
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const signOut = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div
        className={cn(
          "fixed z-40 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4 text-xl font-bold">Next Level Analytics</div>
        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item) =>
            item?.allowedRoles?.includes(user?.role || "user") ? (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800",
                  pathname === item.href &&
                    "bg-gray-200 dark:bg-gray-800 font-semibold",
                )}
                onClick={() => setSidebarOpen(false)}
              >
                {item.name}
              </Link>
            ) : null,
          )}
        </nav>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white dark:bg-black opacity-80 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={toggleSidebar}
            className="cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <h1 className="text-2xl font-bold">Welcome back 👋</h1>

          <div className="flex items-center gap-4">
            <Link href="/profile" className="cursor-pointer">
              <FaUserCircle className="w-8 h-8 text-gray-300 dark:text-gray-700" />
            </Link>
            <button
              className="text-sm cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="pt-6 sm:pt-6">{children}</div>
      </main>
    </div>
  );
}
