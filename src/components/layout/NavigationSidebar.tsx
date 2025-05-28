import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutGrid,
  MessageSquare,
  PlaySquare,
  Store,
  Gamepad2,
  CalendarDays,
  Flag,
  Users,
  ListChecks,
  HeartHandshake,
  ChevronDown,
  MoreHorizontal,
  Settings,
  LogOut,
  ShieldCheck,
  HelpCircle,
  Moon,
  Activity,
  Megaphone,
  FilePlus2,
  UserPlus,
  CalendarPlus,
  HandHeart
} from 'lucide-react';

interface NavItemProps {
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
  badge?: string | number;
  onClick?: () => void;
  hasMoreOptions?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon: Icon, href, isActive, badge, onClick, hasMoreOptions }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium text-primaryText hover:bg-muted',
        isActive && 'bg-accent text-accent-foreground font-semibold',
        'group'
      )}
    >
      <Icon className={cn('h-5 w-5', isActive ? 'text-accent-foreground' : 'text-secondaryText group-hover:text-primaryText')} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className={cn(
          'px-2 py-0.5 text-xs rounded-full font-semibold',
          isActive ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'
        )}>
          {badge}
        </span>
      )}
      {hasMoreOptions && (
        <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto opacity-0 group-hover:opacity-100 hover:bg-transparent">
          <MoreHorizontal className="h-4 w-4 text-secondaryText" />
        </Button>
      )}
    </a>
  );
};

const NavigationSidebar: React.FC = () => {
  const [showMoreExplore, setShowMoreExplore] = React.useState(false);

  const user = {
    name: 'Olenna Mason',
    avatarUrl: 'https://i.pravatar.cc/150?u=olenna_mason',
  };

  const mainNavItems: NavItemProps[] = [
    { label: 'News Feed', icon: LayoutGrid, href: '#', isActive: true, hasMoreOptions: true },
    { label: 'Messenger', icon: MessageSquare, href: '#', badge: '3' },
    { label: 'Watch', icon: PlaySquare, href: '#', badge: '9+' },
    { label: 'Marketplace', icon: Store, href: '#' },
  ];

  const shortcutItems: NavItemProps[] = [
    { label: 'FarmVille 2', icon: Gamepad2, href: '#' },
    // Add more shortcuts here
  ];

  const exploreItems: NavItemProps[] = [
    { label: 'Events', icon: CalendarDays, href: '#', badge: '12' },
    { label: 'Pages', icon: Flag, href: '#', badge: 'New' },
    { label: 'Groups', icon: Users, href: '#' },
    { label: 'Friend Lists', icon: ListChecks, href: '#' },
    { label: 'Fundraisers', icon: HeartHandshake, href: '#' },
  ];

  const moreExploreItems: NavItemProps[] = [
    { label: 'Activity Log', icon: Activity, href: '#' },
    { label: 'Dark Mode', icon: Moon, href: '#' },
    { label: 'Support Inbox', icon: HelpCircle, href: '#' },
    { label: 'Settings & Privacy', icon: Settings, href: '#' },
    { label: 'Logout', icon: LogOut, href: '#' },
  ];

  const createItems: {label: string; href: string}[] = [
    {label: 'Ad', href: '#'},
    {label: 'Page', href: '#'},
    {label: 'Group', href: '#'},
    {label: 'Event', href: '#'},
    {label: 'Fundraiser', href: '#'},
  ];


  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-sidebar flex flex-col z-20 border-r border-border">
      <div className="p-4">
        <a href="#" className="flex items-center space-x-3 group">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-primaryText group-hover:text-accentBlue transition-colors text-sm">
            {user.name}
          </span>
        </a>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <nav className="space-y-1">
          {mainNavItems.map((item) => <NavItem key={item.label} {...item} />)}
        </nav>

        <Separator className="my-3" />

        <h3 className="px-3 pt-2 pb-1 text-xs font-semibold text-secondaryText uppercase tracking-wider">Shortcuts</h3>
        <nav className="space-y-1">
          {shortcutItems.map((item) => <NavItem key={item.label} {...item} />)}
        </nav>

        <Separator className="my-3" />

        <h3 className="px-3 pt-2 pb-1 text-xs font-semibold text-secondaryText uppercase tracking-wider">Explore</h3>
        <nav className="space-y-1">
          {exploreItems.map((item) => <NavItem key={item.label} {...item} />)}
          <Button 
            variant="ghost" 
            className="w-full justify-start px-3 py-2.5 text-sm font-medium text-primaryText hover:bg-muted group"
            onClick={() => setShowMoreExplore(!showMoreExplore)}
          >
            <ChevronDown className={cn('h-5 w-5 mr-3 text-secondaryText group-hover:text-primaryText transition-transform', showMoreExplore && 'rotate-180')} />
            See More...
          </Button>
          {showMoreExplore && moreExploreItems.map((item) => <NavItem key={item.label} {...item} />)}
        </nav>

        <Separator className="my-3" />

        <h3 className="px-3 pt-2 pb-1 text-xs font-semibold text-secondaryText uppercase tracking-wider">Create</h3>
        <nav className="space-y-1">
           {/* Example of how "Create" links might be displayed, based on image it's just text links */} 
          {createItems.map(item => (
            <a key={item.label} href={item.href} className="flex items-center space-x-3 px-3 py-1.5 rounded-md text-sm text-primaryText hover:bg-muted hover:text-accentBlue">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      
      <div className="p-2 border-t border-border">
        <a href="#" className="text-xs text-secondaryText hover:text-primaryText hover:underline">Privacy</a> · 
        <a href="#" className="text-xs text-secondaryText hover:text-primaryText hover:underline"> Terms</a> · 
        <a href="#" className="text-xs text-secondaryText hover:text-primaryText hover:underline"> Advertising</a> · 
        <a href="#" className="text-xs text-secondaryText hover:text-primaryText hover:underline"> Cookies</a> · 
        <a href="#" className="text-xs text-secondaryText hover:text-primaryText hover:underline"> More</a>
        <p className="text-xs text-secondaryText mt-1">Facebook © {new Date().getFullYear()}</p>
      </div>
    </aside>
  );
};

export default NavigationSidebar;
