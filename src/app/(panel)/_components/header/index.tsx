import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from 'lucide-react';

export default function Header() {
    return (
        <header className="w-full h-16 border-b border-border flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
            </div>
        </header>
    );
}