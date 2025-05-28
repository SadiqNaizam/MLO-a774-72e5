import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Facebook,
  Search,
  Home,
  Users2,
  MessageCircle as MessageCircleIcon, // Renamed to avoid conflict with component
  Bell,
  ChevronDown,
  HelpCircle,
  Settings,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';

interface TopHeaderProps {}

const TopHeader: React.FC<TopHeaderProps> = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false); // Example state for theme toggle

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would call document.documentElement.classList.toggle('dark') or use a theme provider
    console.log(isDarkMode ? 'Switching to light mode' : 'Switching to dark mode');
  };

  const user = {
    name: 'Olenna Mason',
    avatarUrl: 'https://i.pravatar.cc/150?u=olenna_mason',
  };

  return (
    <header className="fixed top-0 left-60 right-80 h-16 bg-surface border-b border-border flex items-center justify-between px-6 z-10">
      {/* Left Section: Logo and Search */}
      <div className="flex items-center space-x-2">
        <a href="#" aria-label="Facebook home">
          <Facebook className="h-10 w-10 text-accentBlue" />
        </a>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondaryText" />
          <Input
            type="search"
            placeholder="Search Facebook"
            className="pl-9 bg-muted border-none focus-visible:ring-accentBlue focus-visible:ring-1 h-9"
          />
        </div>
      </div>

      {/* Center Section (Navigation based on image, slightly different than typical centered nav) */}
      {/* This section from the image seems to be part of the right-aligned user actions. Keeping it on right. */}

      {/* Right Section: User Actions & Profile */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" className="text-sm font-medium text-primaryText hover:bg-muted px-3 py-2 h-auto">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.substring(0,1)}</AvatarFallback>
          </Avatar>
          {user.name.split(' ')[0]} {/* Show first name only based on image */} 
        </Button>
        <Button variant="ghost" className="text-sm font-medium text-primaryText hover:bg-muted px-3 py-2 h-auto">
          Home
        </Button>
        <Button variant="ghost" className="text-sm font-medium text-primaryText hover:bg-muted px-3 py-2 h-auto">
          Find Friends
        </Button>

        <Separator orientation="vertical" className="h-6 mx-2"/>

        {/* Icon Buttons */}
        <TooltipButton icon={Users2} label="Friend Requests" badgeCount={8} />
        <TooltipButton icon={MessageCircleIcon} label="Messenger" badgeCount={36} />
        <TooltipButton icon={Bell} label="Notifications" badgeCount={3} />
        
        <Separator orientation="vertical" className="h-6 mx-2"/>

        <TooltipButton icon={HelpCircle} label="Help" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-muted">
              <ChevronDown className="h-5 w-5 text-secondaryText" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="flex items-center space-x-2 p-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.substring(0,1)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-primaryText">{user.name}</p>
                <p className="text-xs text-secondaryText">See your profile</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={toggleDarkMode} className="cursor-pointer">
              {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />} 
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" /> Settings & Privacy
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" /> Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

// Helper component for icon buttons with tooltips (simplified without actual tooltip for brevity)
interface TooltipButtonProps {
  icon: React.ElementType;
  label: string;
  badgeCount?: number;
  onClick?: () => void;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({ icon: Icon, label, badgeCount, onClick }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full w-9 h-9 relative hover:bg-muted"
      aria-label={label}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 text-secondaryText group-hover:text-primaryText" />
      {badgeCount && badgeCount > 0 && (
        <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 min-w-[1rem] p-0.5 text-xs justify-center">
          {badgeCount > 99 ? '99+' : badgeCount}
        </Badge>
      )}
    </Button>
  );
};

export default TopHeader;
