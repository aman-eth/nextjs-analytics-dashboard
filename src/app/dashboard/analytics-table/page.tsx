"use client";

import React from "react";
import TableWrapper from "@/components/table/TableWrapper";
import RoleGuard from "@/lib/guards/RoleGuard";
export default function AnalyticsTablePage() {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <TableWrapper />
    </RoleGuard>
  );
}
