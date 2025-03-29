"use client";

import * as React from "react";
import { PackageCheck, Package, Command, Activity } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const data = {
        user: {
            name: "Admin",
            email: localStorage.getItem("email") || "",
            avatar: "/avatars/shadcn.jpg",
        },
        navMain: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: Activity,
                isActive: true,
            },
            {
                title: "Manage Inventory",
                url: "/dashboard/inventory",
                icon: Package,
            },
            {
                title: "Manage Orders",
                url: "/dashboard/orders",
                icon: PackageCheck,
            },
        ],
    };
    return (
        <Sidebar variant="inset" {...props} collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Ganza Inc</span>
                                    <span className="truncate text-xs">Enterprise</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
