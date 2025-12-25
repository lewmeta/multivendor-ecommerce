"use client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { icons } from "@/constants/icons";
import { DashboardSidebarMenuInterface } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarAdmin = ({
    menuLinks
}: {
    menuLinks: DashboardSidebarMenuInterface[];
}) => {
    const pathname = usePathname(); // Client side hook to get current path
    return (
        <nav className="relative grow">
            <Command className="overflow-visible rounded-lg bg-transparent">
                <CommandInput placeholder="Search..." />
                <CommandList className="overflow-visible py-2">
                    <CommandEmpty>No Links Found.</CommandEmpty>
                    <CommandGroup className="relative overflow-visible pt-0">
                        {menuLinks.map((link, index) => {
                            const iconSearch = icons.find((icon) => icon.value === link.icon);
                            let icon;
                            if (iconSearch) icon = <iconSearch.path />;
                            return (
                                <CommandItem
                                    key={index}
                                    className={cn("w-full h-12 cursor-pointer mt-1", {
                                        "bg-accent text-accent-foreground": link.link === pathname,
                                    })}
                                >
                                    <Link
                                        href={link.link}
                                        className="flex w-full items-center gap-2 rounded-md transition-all hover:bg-transparent"
                                    >
                                        {icon}
                                        <span>{link.label}</span>
                                    </Link>
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                </CommandList>
            </Command>
        </nav>
    );
}

export default SidebarAdmin;