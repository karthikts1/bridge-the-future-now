import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { useUser } from "@/contexts/UserContext";
import { User, Message as MessageType } from "@/types/user";
import { Send, User as UserIcon, Check } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Messages() {
  const { user } = useUser();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  
  // Load real users and messages from localStorage on mount
  useEffect(() => {
    if (!user) return;
    
    // Get registered users from localStorage
    const registeredUsersString = localStorage.getItem("registeredUsers");
    let registeredUsers: User[] = [];
    
    if (registeredUsersString) {
      try {
        registeredUsers = JSON.parse(registeredUsersString);
      } catch (error) {
        console.error("Failed to parse registered users:", error);
      }
    }
    
    // Only include actual registered users (not the current user)
    const actualUsers = registeredUsers.filter(u => u.id !== user?.id);
    setUsers(actualUsers);
    
    // Load messages from localStorage
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error("Failed to parse messages:", error);
      }
    }
  }, [user?.id]);
  
  // Filter users based on search term, role filter and role access
  const filteredUsers = users.filter(u => {
    if (!user) return false;
    
    // Add null checks for each property used in toLowerCase
    const nameMatch = u.name && searchTerm ? u.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const emailMatch = u.email && searchTerm ? u.email.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const matchesSearch = searchTerm ? (nameMatch || emailMatch) : true;
    
    // Apply role filter if selected
    const matchesRoleFilter = roleFilter ? u.role === roleFilter : true;
    
    // All registered users can message each other, regardless of role
    return matchesSearch && matchesRoleFilter;
  });
  
  // Get conversation messages between current user and selected user
  const conversationMessages = selectedUser && user
    ? messages.filter(m => 
        (m.senderId === user.id && m.receiverId === selectedUser.id) || 
        (m.senderId === selectedUser.id && m.receiverId === user.id)
      ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
    : [];
  
  // Mark messages as read when conversation is opened
  useEffect(() => {
    if (selectedUser && user) {
      const updatedMessages = messages.map(m => {
        if (m.senderId === selectedUser.id && m.receiverId === user.id && !m.read) {
          return { ...m, read: true };
        }
        return m;
      });
      
      setMessages(updatedMessages);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
    }
  }, [selectedUser, user, messages]);
  
  // Get unread message count for user
  const getUnreadCount = (userId: string) => {
    if (!user) return 0;
    
    return messages.filter(m => 
      m.senderId === userId && 
      m.receiverId === user.id && 
      !m.read
    ).length;
  };
  
  // Send message with encryption
  const handleSendMessage = () => {
    if (!message.trim() || !selectedUser || !user) return;
    
    // In a real app, this would use end-to-end encryption
    // Here we're simulating "encrypted" messages with a simple flag
    const newMessage: MessageType = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      senderId: user.id,
      receiverId: selectedUser.id,
      content: message,
      timestamp: new Date(),
      read: false,
      encrypted: true // Flag to indicate message is "encrypted"
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    setMessage("");
    
    toast({
      title: "Secure message sent",
      description: `Your encrypted message has been sent to ${selectedUser.name}.`
    });
  };
  
  // Get appropriate bg color for user role
  const getUserRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-100';
      case 'alumni': return 'bg-green-100';
      case 'faculty': return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };
  
  // Get user by ID
  const getUserById = (id: string): User | undefined => {
    return users.find(u => u.id === id) || undefined;
  };

  // Get total number of unread messages
  const getTotalUnreadCount = () => {
    if (!user) return 0;
    
    return messages.filter(m => 
      m.receiverId === user.id && 
      !m.read
    ).length;
  };

  // Clear chat history with the selected user
  const clearChatHistory = () => {
    if (!selectedUser || !user) return;
    
    const updatedMessages = messages.filter(m => 
      !((m.senderId === user.id && m.receiverId === selectedUser.id) || 
      (m.senderId === selectedUser.id && m.receiverId === user.id))
    );
    
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    
    toast({
      title: "Chat cleared",
      description: `Your conversation with ${selectedUser.name} has been cleared.`
    });
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center p-8">
          <p>Loading user data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Secure Messages</h1>
            <p className="text-muted-foreground mt-1">
              Connect and communicate with other users using end-to-end encrypted messaging
            </p>
          </div>
          
          {getTotalUnreadCount() > 0 && (
            <div className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium">
              {getTotalUnreadCount()} unread {getTotalUnreadCount() === 1 ? 'message' : 'messages'}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[70vh]">
          {/* Contacts sidebar */}
          <Card className="col-span-1 overflow-hidden border">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Contacts</CardTitle>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-1 text-green-500" />
                  <span className="text-xs text-green-500">End-to-End Encrypted</span>
                </div>
              </div>
              <div className="mt-2 space-y-2">
                <Input 
                  placeholder="Search users..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
                <Select 
                  onValueChange={(value) => setRoleFilter(value === "all" ? null : value)} 
                  defaultValue="all"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <Separator />
            <div className="overflow-y-auto h-[calc(70vh-160px)]">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((contact) => {
                  const unreadCount = getUnreadCount(contact.id);
                  return (
                    <div 
                      key={contact.id}
                      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-accent/50 border-b ${selectedUser?.id === contact.id ? 'bg-accent/30' : ''}`}
                      onClick={() => setSelectedUser(contact)}
                    >
                      <Avatar className={`h-10 w-10 ${getUserRoleColor(contact.role)}`}>
                        <AvatarImage src={contact.avatar || ""} alt={contact.name || ""} />
                        <AvatarFallback>
                          {contact.name ? contact.name.charAt(0) : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{contact.name || "Unknown"}</p>
                        <p className="text-xs text-muted-foreground capitalize">{contact.role}</p>
                      </div>
                      {unreadCount > 0 && (
                        <div className="bg-primary text-white rounded-full h-5 min-w-5 flex items-center justify-center text-xs font-medium px-1">
                          {unreadCount}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  {users.length === 0 ? "No other users have registered yet" : "No contacts found"}
                </div>
              )}
            </div>
          </Card>
          
          {/* Message area */}
          <Card className="col-span-1 md:col-span-2 flex flex-col">
            {selectedUser ? (
              <>
                <CardHeader className="py-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className={`h-10 w-10 ${getUserRoleColor(selectedUser.role)}`}>
                        <AvatarImage src={selectedUser.avatar || ""} alt={selectedUser.name || ""} />
                        <AvatarFallback>{selectedUser.name ? selectedUser.name.charAt(0) : "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg font-medium">{selectedUser.name || "Unknown"}</CardTitle>
                        <p className="text-xs text-muted-foreground capitalize">{selectedUser.role}</p>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={clearChatHistory}>
                          Clear conversation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(70vh-180px)]">
                  {conversationMessages.length > 0 ? (
                    conversationMessages.map((msg) => {
                      const isSentByMe = msg.senderId === user.id;
                      const sender = isSentByMe ? user : getUserById(msg.senderId);
                      
                      return (
                        <div 
                          key={msg.id} 
                          className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="flex items-start gap-2 max-w-[80%]">
                            {!isSentByMe && (
                              <Avatar className={`h-8 w-8 ${getUserRoleColor(sender?.role || '')}`}>
                                <AvatarImage src={sender?.avatar || ""} alt={sender?.name || ""} />
                                <AvatarFallback>
                                  {sender?.name ? sender.name.charAt(0) : <UserIcon className="h-4 w-4" />}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={`rounded-lg px-3 py-2 ${
                                isSentByMe 
                                  ? user.role === 'student' ? 'bg-blue-500 text-white' :
                                    user.role === 'alumni' ? 'bg-green-500 text-white' :
                                    'bg-purple-500 text-white'
                                  : 'bg-accent border'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                              <div className="flex items-center justify-end gap-1 mt-1 text-xs opacity-70">
                                <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                {msg.encrypted && (
                                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                )}
                              </div>
                            </div>
                            {isSentByMe && (
                              <Avatar className={`h-8 w-8 ${getUserRoleColor(user.role || '')}`}>
                                <AvatarImage src={user.avatar || ""} alt={user.name || ""} />
                                <AvatarFallback>
                                  {user.name ? user.name.charAt(0) : <UserIcon className="h-4 w-4" />}
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground text-center">
                      <div>
                        <p>No messages yet</p>
                        <p className="text-sm">Send a message to start the conversation</p>
                        <p className="text-xs mt-2 text-green-600">End-to-end encrypted messaging</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <CardContent className="border-t pt-3 pb-3">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!message.trim()}
                      size="icon"
                      className={
                        user.role === 'student' ? 'bg-blue-500 hover:bg-blue-600' :
                        user.role === 'alumni' ? 'bg-green-500 hover:bg-green-600' :
                        'bg-purple-500 hover:bg-purple-600'
                      }
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            ) : (
              <div className="h-full flex items-center justify-center p-4 text-muted-foreground text-center">
                <div>
                  <UserIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <h2 className="text-xl font-medium mb-2">Select a contact</h2>
                  <p>Choose a contact from the list to start messaging</p>
                  <div className="mt-4 flex items-center justify-center text-xs gap-1 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <span>End-to-end encrypted messaging</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
