
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PolicyList } from "./_components/policy-list";

export default function AbsencePoliciesPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Absence Policies</h2>
        <Button asChild>
          <Link href="/configuration/absence-policies/new">
            <Plus className="mr-2 h-4 w-4" /> New Policy
          </Link>
        </Button>
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 p-4">
        <PolicyList />
      </div>
    </div>
  );
}
