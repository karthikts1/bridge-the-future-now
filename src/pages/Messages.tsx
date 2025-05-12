
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { User, Message as MessageType } from "@/types/user";
import { getAllUsers } from "@/services/mockData";
import { Send, User as UserIcon } from "lucide-react";

export default function Messages() {
  const { user } = useUser();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Load users and messages from localStorage on mount
  useEffect(() => {
    if (!user) return;
    
    // Get all users except current user
    const allUsers = getAllUsers().filter(u => u.id !== user?.id);
    setUsers(allUsers);
    
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
  
  // Filter users based on search term and role access
  const filteredUsers = users.filter(u => {
    if (!user) return false;
    
    // Add null checks for each property used in toLowerCase
    const nameMatch = u.name && searchTerm ? u.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const emailMatch = u.email && searchTerm ? u.email.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const matchesSearch = searchTerm ? (nameMatch || emailMatch) : true;
    
    // Filter by role access
    if (user.role === 'student') {
      // Students can message faculty and alumni
      return matchesSearch && (u.role === 'faculty' || u.role === 'alumni');
    } else if (user.role === 'faculty') {
      // Faculty can message everyone
      return matchesSearch;
    } else if (user.role === 'alumni') {
      // Alumni can message students and faculty
      return matchesSearch && (u.role === 'student' || u.role === 'faculty');
    }
    
    return matchesSearch;
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
  
  // Send message
  const handleSendMessage = () => {
    if (!message.trim() || !selectedUser || !user) return;
    
    const newMessage: MessageType = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      senderId: user.id,
      receiverId: selectedUser.id,
      content: message,
      timestamp: new Date(),
      read: false
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    setMessage("");
    
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${selectedUser.name}.`
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
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1 mb-6">
          Connect and communicate with {user?.role === 'student' 
            ? 'faculty and alumni' 
            : user?.role === 'alumni' 
              ? 'students and faculty' 
              : 'students, alumni, and other faculty'}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[70vh]">
          {/* Contacts sidebar */}
          <Card className="col-span-1 overflow-hidden border">
            <CardHeader className="py-3">
              <CardTitle className="text-lg font-medium">Contacts</CardTitle>
              <div className="mt-2">
                <Input 
                  placeholder="Search users..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </CardHeader>
            <Separator />
            <div className="overflow-y-auto h-[calc(70vh-120px)]">
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
                  No contacts found
                </div>
              )}
            </div>
          </Card>
          
          {/* Message area */}
          <Card className="col-span-1 md:col-span-2 flex flex-col">
            {selectedUser ? (
              <>
                <CardHeader className="py-3 border-b">
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
                              <p className="text-xs opacity-70 text-right mt-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
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
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
