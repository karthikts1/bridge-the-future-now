
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Message } from '@/types/user';

export function NotificationBell() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  // Load notifications from localStorage (unread messages)
  useEffect(() => {
    if (!user) return;
    
    const loadNotifications = () => {
      const savedMessages = localStorage.getItem("messages");
      if (savedMessages && user) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          // Convert string timestamps back to Date objects and filter unread messages for current user
          const unreadMessages = parsedMessages
            .filter((msg: any) => msg.receiverId === user.id && !msg.read)
            .map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }));
          
          setNotifications(unreadMessages);
        } catch (error) {
          console.error("Failed to parse notifications:", error);
        }
      }
    };
    
    // Load notifications immediately
    loadNotifications();
    
    // Set up interval to check for new notifications
    const interval = setInterval(loadNotifications, 5000);
    
    // Clean up
    return () => clearInterval(interval);
  }, [user]);
  
  // Mark notifications as read when popover is opened
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    
    if (open && notifications.length > 0) {
      // Mark all as read in localStorage
      const savedMessages = localStorage.getItem("messages");
      if (savedMessages && user) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          const updatedMessages = parsedMessages.map((msg: any) => {
            if (msg.receiverId === user.id && !msg.read) {
              return { ...msg, read: true };
            }
            return msg;
          });
          
          localStorage.setItem("messages", JSON.stringify(updatedMessages));
          setNotifications([]);
        } catch (error) {
          console.error("Failed to update notifications:", error);
        }
      }
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
              {notifications.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 max-h-80 overflow-y-auto" align="end">
        <div className="p-3 border-b">
          <h3 className="font-medium">Notifications</h3>
        </div>
        {notifications.length > 0 ? (
          <div className="divide-y">
            {notifications.map((notification) => {
              // Find the sender in local storage
              const usersJson = localStorage.getItem("allUsers");
              let senderName = "Someone";
              
              if (usersJson) {
                try {
                  const users = JSON.parse(usersJson);
                  const sender = users.find((u: any) => u.id === notification.senderId);
                  if (sender) {
                    senderName = sender.name;
                  }
                } catch (error) {
                  console.error("Failed to parse users:", error);
                }
              }
              
              return (
                <div key={notification.id} className="p-3 hover:bg-accent/50">
                  <p className="text-sm font-medium">
                    New message from {senderName}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {notification.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            <p>No new notifications</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
