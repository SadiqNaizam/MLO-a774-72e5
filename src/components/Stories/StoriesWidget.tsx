import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlusCircle, Archive, Settings } from 'lucide-react';

interface Story {
  id: string;
  userName: string;
  userAvatarUrl: string;
  storyImageUrl: string;
  viewed?: boolean;
}

interface StoriesWidgetProps {
  className?: string;
}

const dummyStories: Story[] = [
  {
    id: '1',
    userName: 'Sophia Lee',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=1',
    storyImageUrl: 'https://picsum.photos/seed/story1/200/300',
  },
  {
    id: '2',
    userName: 'Ethan Miller',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=2',
    storyImageUrl: 'https://picsum.photos/seed/story2/200/300',
    viewed: true,
  },
  {
    id: '3',
    userName: 'Ava Garcia',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=3',
    storyImageUrl: 'https://picsum.photos/seed/story3/200/300',
  },
  {
    id: '4',
    userName: 'Noah Brown',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=4',
    storyImageUrl: 'https://picsum.photos/seed/story4/200/300',
  },
  {
    id: '5',
    userName: 'Isabella Wilson',
    userAvatarUrl: 'https://i.pravatar.cc/150?img=5',
    storyImageUrl: 'https://picsum.photos/seed/story5/200/300',
  },
];

const StoriesWidget: React.FC<StoriesWidgetProps> = ({ className }) => {
  return (
    <Card className={cn("w-full bg-surface shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-3 px-4">
        <CardTitle className="text-lg font-semibold text-primaryText">Stories</CardTitle>
        <div className="flex space-x-3">
          <Button variant="ghost" size="sm" className="text-accentBlue hover:bg-accent/50 px-2 py-1 h-auto">
            <Archive className="h-4 w-4 mr-1" /> Archive
          </Button>
          <Button variant="ghost" size="sm" className="text-accentBlue hover:bg-accent/50 px-2 py-1 h-auto">
            <Settings className="h-4 w-4 mr-1" /> Settings
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {/* Add to Your Story Card */}
          <div className="flex-shrink-0 w-28 h-48 rounded-lg border border-border bg-muted/50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-2">
              <PlusCircle className="h-6 w-6 text-primary-foreground" />
            </div>
            <p className="text-xs font-medium text-primaryText">Add to Your Story</p>
            <p className="text-xs text-secondaryText mt-1 px-1">Share a photo, video or write something</p>
          </div>

          {/* Story Cards */}
          {dummyStories.map((story) => (
            <div
              key={story.id}
              className={cn(
                "flex-shrink-0 w-28 h-48 rounded-lg overflow-hidden relative group cursor-pointer border-2",
                story.viewed ? "border-border/50" : "border-primary"
              )}
            >
              <img src={story.storyImageUrl} alt={`${story.userName}'s story`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
              <Avatar className={cn("absolute top-2 left-2 w-8 h-8 border-2", story.viewed ? "border-muted-foreground" : "border-primary")}>
                <AvatarImage src={story.userAvatarUrl} alt={story.userName} />
                <AvatarFallback>{story.userName.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <p className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white truncate">{story.userName}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoriesWidget;
