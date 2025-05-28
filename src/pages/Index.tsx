import React from 'react';

// Layout
import MainAppLayout from '@/components/layout/MainAppLayout';

// Organisms / Widgets
import StoriesWidget from '@/components/Stories/StoriesWidget';
import FeedPost, { FeedPostProps } from '@/components/Feed/FeedPost';
import SuggestedGroupsWidget from '@/components/SuggestedGroups/SuggestedGroupsWidget';

// Shadcn UI components
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Lucide Icons
import { Video, Image, Smile } from 'lucide-react';

// User for "Make Post"
const currentUser = {
  name: 'Olenna Mason',
  avatarUrl: 'https://i.pravatar.cc/150?u=olenna_mason',
};

// Dummy feed posts
const feedPostsData: FeedPostProps[] = [
  {
    id: 'post1',
    user: { name: 'Lana Steiner', avatarUrl: 'https://i.pravatar.cc/150?img=6' },
    timestamp: '2h ago',
    privacy: 'friends' as const,
    content: 'Just enjoyed a wonderful sunny day at the park! 🌳☀️ Feeling refreshed and happy. Hope everyone is having a great day!',
    stats: { likes: 125, comments: 18, shares: 5 },
    isLiked: false,
  },
  {
    id: 'post2',
    user: { name: 'Marcus Aurelius', avatarUrl: 'https://i.pravatar.cc/150?img=7' },
    timestamp: '5h ago',
    privacy: 'public' as const,
    content: 'Exploring the beautiful architecture of Rome. So much history in every corner!',
    imageUrl: 'https://picsum.photos/seed/rome/600/400',
    stats: { likes: 302, comments: 45, shares: 22 },
    isLiked: true,
  },
  {
    id: 'post3',
    user: { name: 'Julia Fillory', avatarUrl: 'https://i.pravatar.cc/150?img=2' }, 
    timestamp: 'Yesterday at 3:14 PM',
    privacy: 'public' as const,
    content: 'Checking out some new stores downtown! Found some amazing spots.',
    // Using a static image representing a map for Raleigh as requested.
    // In a real app, this would be an interactive map or a more specific static map image.
    mapImageUrl: 'https://i.imgur.com/VPEfUoR.png', 
    location: 'Raleigh, North Carolina',
    taggedFriendsDescription: 'Bryan Durand and 2 others have been here',
    stats: { likes: 98, comments: 12, shares: 3 },
    isSaved: true,
  },
  {
    id: 'post4',
    user: { name: 'Tech Innovations Inc.', avatarUrl: 'https://i.pravatar.cc/150?u=techinc' },
    timestamp: '3 days ago',
    privacy: 'public' as const,
    content: "We're thrilled to announce the launch of our new product! 🎉 It's designed to revolutionize how you manage your daily tasks. Check out the link in bio for more info. #innovation #tech #newproduct",
    imageUrl: 'https://picsum.photos/seed/productlaunch/600/350',
    stats: { likes: 540, comments: 88, shares: 67 },
  },
];

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* Main content container for the feed area */}
      {/* max-w-xl centers the feed and limits its width, common for feed UIs */}
      {/* gap-6 provides vertical spacing between elements, as per layout requirements */}
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        {/* Stories Widget at the top of the feed */}
        <StoriesWidget />

        {/* "Make Post" Card */}
        <Card className="bg-surface shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar>
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.substring(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
              {/* This Button acts as a placeholder for a post input field, usually triggers a modal */}
              <Button 
                variant="ghost" 
                className="flex-1 justify-start text-left h-10 bg-muted hover:bg-muted/80 rounded-full px-4 text-secondaryText text-sm"
                // onClick={() => { /* Logic to open post creation modal */ }}
              >
                What's on your mind, {currentUser.name.split(' ')[0]}?
              </Button>
            </div>
            <hr className="border-t border-border my-3" />
            <div className="flex justify-around">
              <Button variant="ghost" className="text-sm font-medium text-secondaryText hover:bg-muted flex-1 py-2.5">
                <Video className="w-5 h-5 mr-2 text-red-500" /> Live Video
              </Button>
              <Button variant="ghost" className="text-sm font-medium text-secondaryText hover:bg-muted flex-1 py-2.5">
                <Image className="w-5 h-5 mr-2 text-green-500" /> Photo/Video
              </Button>
              <Button variant="ghost" className="text-sm font-medium text-secondaryText hover:bg-muted flex-1 py-2.5">
                <Smile className="w-5 h-5 mr-2 text-yellow-500" /> Feeling/Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* List of Feed Posts */}
        {feedPostsData.map(post => (
          <FeedPost key={post.id} {...post} />
        ))}

        {/* Suggested Groups Widget, part of the main feed flow */}
        <SuggestedGroupsWidget />
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
