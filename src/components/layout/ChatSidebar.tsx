import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Settings2,
  MessageSquarePlus,
  MoreHorizontal,
  UserCheck, // Example: specific friend status
  UserX, // Example: block user
  Archive, // Example: archive chat
} from 'lucide-react';

interface ChatContact {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
  lastMessagePreview?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

const dummyContacts: ChatContact[] = [
  {
    id: '1',
    name: 'Julia Fillory',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    isOnline: true,
    lastMessagePreview: 'Checking out some new stores downtown!',
    lastMessageTime: '2h',
  },
  {
    id: '2',
    name: 'Ethan Miller',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    isOnline: true,
    lastMessagePreview: 'Sounds good! Let me know.',
    lastMessageTime: '3h',
    unreadCount: 2,
  },
  {
    id: '3',
    name: 'Ava Garcia',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    isOnline: false,
    lastMessagePreview: 'See you then.',
    lastMessageTime: 'Yesterday',
  },
  {
    id: '4',
    name: 'Noah Brown',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    isOnline: true,
    lastMessagePreview: 'Haha, definitely!',
    lastMessageTime: '1d',
  },
  {
    id: '5',
    name: 'Sophia Lee',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    isOnline: false,
    lastMessagePreview: 'Can you send me the file?',
    lastMessageTime: '2d',
    unreadCount: 1,
  },
];

const ChatSidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredContacts = dummyContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="fixed top-0 right-0 h-screen w-80 bg-surface border-l border-border flex flex-col z-20">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-primaryText">Chat</h2>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-muted">
              <Settings2 className="h-5 w-5 text-secondaryText" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-muted">
              <MessageSquarePlus className="h-5 w-5 text-secondaryText" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondaryText" />
          <Input 
            type="search" 
            placeholder="Search Messenger" 
            className="pl-9 bg-muted border-none focus-visible:ring-accentBlue focus-visible:ring-1 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredContacts.map(contact => (
            <a
              key={contact.id}
              href={`#chat/${contact.id}`}
              className={cn(
                'flex items-center space-x-3 p-2 rounded-lg hover:bg-muted group',
                contact.unreadCount && 'font-semibold'
              )}
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                  <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-surface ring-1 ring-green-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className={cn('text-sm text-primaryText truncate', contact.unreadCount ? 'font-bold' : 'font-medium')}>{contact.name}</p>
                  {contact.lastMessageTime && !contact.unreadCount && (
                    <p className="text-xs text-secondaryText whitespace-nowrap">{contact.lastMessageTime}</p>
                  )}
                  {contact.unreadCount && (
                     <span className="text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 font-bold">
                       {contact.unreadCount}
                     </span>
                  )}
                </div>
                {contact.lastMessagePreview && (
                  <p className={cn('text-xs text-secondaryText truncate', contact.unreadCount && 'text-primary')}>
                    {contact.lastMessagePreview}
                  </p>
                )}
              </div>
               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 hover:bg-muted/50">
                <MoreHorizontal className="h-4 w-4 text-secondaryText" />
              </Button>
            </a>
          ))}
          {filteredContacts.length === 0 && (
            <p className="text-sm text-secondaryText text-center py-4">No contacts found.</p>
          )}
        </div>
      </ScrollArea>
      
      {/* Optional Footer section example */}
      {/* <div className="p-4 border-t border-border text-center">
        <Button variant="link" className="text-accentBlue text-sm">View all in Messenger</Button>
      </div> */}
    </aside>
  );
};

export default ChatSidebar;
