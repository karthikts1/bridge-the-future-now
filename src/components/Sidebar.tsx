
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Users,
  Briefcase,
  GraduationCap,
  Book,
  LayoutDashboard,
  Info,
  Settings,
  UserRound
} from "lucide-react";

interface SidebarItemProps {
  icon: ReactNode;
  href: string;
  label: string;
}

function SidebarItem({ icon, href, label }: SidebarItemProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-base transition-all",
          isActive
            ? "bg-alumni-100 text-alumni-500 font-medium"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        )
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

export function Sidebar() {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Dashboard
        </h2>
        <div className="space-y-1">
          <SidebarItem 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            href="/dashboard" 
            label="Overview" 
          />
          <SidebarItem 
            icon={<MessageSquare className="h-5 w-5" />} 
            href="/dashboard/forums" 
            label="Discussion Forums" 
          />
          <SidebarItem 
            icon={<Users className="h-5 w-5" />} 
            href="/dashboard/mentorship" 
            label="Mentorship Programs" 
          />
          <SidebarItem 
            icon={<Briefcase className="h-5 w-5" />} 
            href="/dashboard/career" 
            label="Career Guidance" 
          />
          <SidebarItem 
            icon={<Briefcase className="h-5 w-5" />} 
            href="/dashboard/placement" 
            label="Placement Assistance" 
          />
          <SidebarItem 
            icon={<GraduationCap className="h-5 w-5" />} 
            href="/dashboard/academic" 
            label="Academic Support" 
          />
          <SidebarItem 
            icon={<Info className="h-5 w-5" />} 
            href="/about" 
            label="About" 
          />
        </div>
      </div>
      
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Account
        </h2>
        <div className="space-y-1">
          <SidebarItem 
            icon={<UserRound className="h-5 w-5" />} 
            href="/dashboard/profile" 
            label="Profile" 
          />
          <SidebarItem 
            icon={<Settings className="h-5 w-5" />} 
            href="/dashboard/settings" 
            label="Settings" 
          />
        </div>
      </div>
    </div>
  );
}
