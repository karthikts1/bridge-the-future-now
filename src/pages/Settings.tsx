
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Bell, Lock, Eye, Monitor, UserRound } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState({
    emailDigest: true,
    newMessages: true,
    mentorshipRequests: true,
    connectionRequests: true,
    eventReminders: false,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    showEmail: false,
    allowMessaging: true,
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: false,
    highContrast: false,
  });
  
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved."
    });
  };
  
  const handlePrivacyChange = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Settings updated",
      description: "Your privacy settings have been saved."
    });
  };
  
  const handleAppearanceChange = (key: keyof typeof appearanceSettings) => {
    setAppearanceSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Settings updated",
      description: "Your appearance settings have been saved."
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-alumni-100">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-alumni-500" />
                  <CardTitle>Notification Settings</CardTitle>
                </div>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-digest">Weekly Email Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of platform activities
                    </p>
                  </div>
                  <Switch
                    id="email-digest"
                    checked={notificationSettings.emailDigest}
                    onCheckedChange={() => handleNotificationChange('emailDigest')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-messages">New Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you receive a new message
                    </p>
                  </div>
                  <Switch
                    id="new-messages"
                    checked={notificationSettings.newMessages}
                    onCheckedChange={() => handleNotificationChange('newMessages')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="mentorship-requests">Mentorship Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new mentorship requests
                    </p>
                  </div>
                  <Switch
                    id="mentorship-requests"
                    checked={notificationSettings.mentorshipRequests}
                    onCheckedChange={() => handleNotificationChange('mentorshipRequests')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="connection-requests">Connection Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new connection requests
                    </p>
                  </div>
                  <Switch
                    id="connection-requests"
                    checked={notificationSettings.connectionRequests}
                    onCheckedChange={() => handleNotificationChange('connectionRequests')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="event-reminders">Event Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about upcoming events
                    </p>
                  </div>
                  <Switch
                    id="event-reminders"
                    checked={notificationSettings.eventReminders}
                    onCheckedChange={() => handleNotificationChange('eventReminders')}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card className="border-alumni-100">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-alumni-500" />
                  <CardTitle>Privacy Settings</CardTitle>
                </div>
                <CardDescription>
                  Control who can see your information and how it's used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-visibility">Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow other users to view your profile
                    </p>
                  </div>
                  <Switch
                    id="profile-visibility"
                    checked={privacySettings.profileVisibility}
                    onCheckedChange={() => handlePrivacyChange('profileVisibility')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-email">Show Email Address</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your email address on your public profile
                    </p>
                  </div>
                  <Switch
                    id="show-email"
                    checked={privacySettings.showEmail}
                    onCheckedChange={() => handlePrivacyChange('showEmail')}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allow-messaging">Allow Direct Messaging</Label>
                    <p className="text-sm text-muted-foreground">
                      Let other users send you direct messages
                    </p>
                  </div>
                  <Switch
                    id="allow-messaging"
                    checked={privacySettings.allowMessaging}
                    onCheckedChange={() => handlePrivacyChange('allowMessaging')}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  These settings only control what others can see. The platform administrators may still have access to this information.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <Card className="border-alumni-100">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-alumni-500" />
                  <CardTitle>Appearance Settings</CardTitle>
                </div>
                <CardDescription>
                  Customize how the platform looks for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a darker color scheme (coming soon)
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={appearanceSettings.darkMode}
                    onCheckedChange={() => handleAppearanceChange('darkMode')}
                    disabled
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="high-contrast">High Contrast</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better visibility (coming soon)
                    </p>
                  </div>
                  <Switch
                    id="high-contrast"
                    checked={appearanceSettings.highContrast}
                    onCheckedChange={() => handleAppearanceChange('highContrast')}
                    disabled
                  />
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Additional appearance settings will be available in a future update.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
