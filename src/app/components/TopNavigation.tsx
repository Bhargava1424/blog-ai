"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell, Settings, LogOut, Sun, Moon, Sliders } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export const TopNavigation: React.FC<{
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  showSignUp: boolean;
  setShowSignUp: (value: boolean) => void;
  isPreferredContent: boolean;
  togglePreferredContent: () => void;
}> = ({ isLoggedIn, setIsLoggedIn, showSignUp, setShowSignUp, isPreferredContent, togglePreferredContent }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="bg-background border-b">
      <div className="flex items-center justify-between px-6 py-3">
        <div>
          <h1 className="cursor-pointer text-2xl font-extrabold" onClick={() => router.push('/')}>
            BlogAI
          </h1>
        </div>
        <div className="flex items-center justify-center flex-grow">
          <div className="flex items-center w-1/2">
            <Input type="search" placeholder="Search blogs..." className="w-full" />
            <Button variant="outline" size="icon" className="ml-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant={isPreferredContent ? "default" : "outline"}
            size="icon"
            onClick={togglePreferredContent}
            className={isPreferredContent ? (theme === 'dark' ? "bg-white text-black" : "bg-black text-white") : ""}
          >
            <Sliders className="h-4 w-4" />
            <span className="sr-only">Toggle preferred content</span>
          </Button>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="@username" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">username</p>
                    <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => router.push('/login')}
              >
                Log In
              </Button>
              <Button 
                onClick={() => router.push('/signup')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
