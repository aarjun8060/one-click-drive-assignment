"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ThemePresetSelector } from "@/components/theme-present-selector";

const SettingsPage = () => {
  const userInfo = {
    name: "Admin",
    email: "oneclick.com",
    role: "Administrator",
  };
  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your store settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
              <AvatarFallback className="text-lg">
                {userInfo.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{userInfo.name}</h3>
              <p className="text-muted-foreground text-sm">{userInfo.email}</p>
              <Badge variant="secondary">{userInfo.role}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <div className="space-y-3">
            <ThemePresetSelector />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
