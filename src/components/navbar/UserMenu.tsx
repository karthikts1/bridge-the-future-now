
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, MessageSquare } from "lucide-react";
import { NotificationBell } from "@/components/NotificationBell";
import { User } from "@/types/user";

interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <Link 
        to="/dashboard/messages" 
        className="hidden md:flex text-white hover:text-white/80"
        title="Messages"
      >
        <MessageSquare className="h-5 w-5" />
      </Link>
      
      <NotificationBell />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="border-2 border-accent hover:border-white cursor-pointer">
            <AvatarImage src={user?.avatar || ""} />
            <AvatarFallback className="bg-secondary text-white">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            {user?.role}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/dashboard" className="cursor-pointer w-full">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/messages" className="cursor-pointer w-full">Messages</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/profile" className="cursor-pointer w-full">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout} className="text-destructive cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
