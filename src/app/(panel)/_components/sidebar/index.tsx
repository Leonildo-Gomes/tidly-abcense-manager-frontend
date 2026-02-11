"use client";

import { cn } from "@/lib/api-client";
import {
  Building2,
  Home,
  Settings
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Organization",
    icon: Building2,
    children: [
      { title: "Companies", href: "/organization/company" },
      { title: "Teams", href: "/organization/team" },
      { title: "Employees", href: "/organization/employee" },
    ],
  },
  {
    title: "Workflow",
    //icon: LayoutSubheader,
    children: [
      { title: "My Requests", href: "/workflow/requests" },
      { title: "Approvals", href: "/workflow/approvals" },
    ],
  },
  {
    title: "Configuration",
    icon: Settings,
    children: [
      { title: "Absence Types", href: "/configuration/absence-types" },
      { title: "Holidays", href: "/configuration/holidays" },
    ],
  },
];

export default function Sidebar({children}: {children: React.ReactNode}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <div className="flex min-h-screen w-full">
      <aside className={cn("flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",{
                "w-20": isCollapsed,
                "w-64": !isCollapsed,
                "hidden md:flex md:fixed": true
            })}>
        
      </aside>
      <h1>sidebar</h1>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
