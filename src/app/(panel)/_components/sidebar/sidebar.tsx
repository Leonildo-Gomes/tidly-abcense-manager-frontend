"use client";

import {
  Building2,
  Calendar,
  CheckSquare,
  ChevronRight,
  ChevronsUpDown,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  Settings,
  User,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "../../../../../public/tidly_icone.png";
// Menu configuration
const data = {
  user: {
    name: "User Name",
    email: "user@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true, // Default active logic handled below
    },
    {
      title: "Organization",
      url: "#",
      icon: Building2,
      isActive: true,
      items: [
        {
          title: "Companies",
          url: "/organization/company",
          icon: Building2,
        },
        {
          title: "Departments",
          url: "/organization/department",
          icon: Building2,
        },
        {
          title: "Teams",
          url: "/organization/team",
          icon: Users,
        },
        {
          title: "Employees",
          url: "/organization/employee",
          icon: User,
        },
      ],
    },
    {
      title: "Workflow",
      url: "#",
      icon: ClipboardList,
      items: [
        {
          title: "My Requests",
          url: "/workflow/requests",
          icon: FileText,
        },
        {
          title: "Approvals",
          url: "/workflow/approvals",
          icon: CheckSquare,
        },
      ],
    },
    {
      title: "Configuration",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Absence Types",
          url: "/configuration/absence-type",
          icon: ClipboardList,
        },
        {
          title: "Holidays",
          url: "/configuration/holiday",
          icon: Calendar,
        },
      ],
    },
  ],
};

export default function AppSidebar({ ...props }: React.ComponentProps<typeof SidebarContainer>) {
  const pathname = usePathname();

  return (
    <SidebarContainer collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-primary-foreground">
                   <Image src={logo} alt="Tidly" width={50} height={50} className="rounded-full" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Tidly</span>
                  <span className="truncate text-xs">Manage Absence</span>
                </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => {
               // Determine if grouping is active based on children URLs
               const isGroupActive = item.items?.some(subItem => pathname.startsWith(subItem.url));
               
               // If no items, render single link
               if (!item.items) {
                   const isActive = pathname === item.url;
                   return (
                       <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                               <a href={item.url}>
                                   {item.icon && <item.icon />}
                                   <span>{item.title}</span>
                               </a>
                           </SidebarMenuButton>
                       </SidebarMenuItem>
                   )
               }

               return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isGroupActive} // Open by default if active
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                            const isSubActive = pathname === subItem.url;
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={isSubActive}>
                                  <a href={subItem.url}>
                                    {/* Use icon if you want, but Standard submenus usually just text or smaller icon */}
                                    {/* {subItem.icon && <subItem.icon className="mr-2 h-4 w-4" />} */} 
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* <AvatarImage src={data.user.avatar} alt={data.user.name} /> */}
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{data.user.name}</span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </SidebarContainer>
  );
}
