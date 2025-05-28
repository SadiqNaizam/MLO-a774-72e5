import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe, Users, MapPin, Bookmark } from 'lucide-react';

interface PostUser {
  name: string;
  avatarUrl: string;
}

interface PostStats {
  likes: number;
  comments: number;
  shares: number;
}

type PostPrivacy = 'public' | 'friends' | 'specific_friends' | 'only_me';

export interface FeedPostProps {
  id: string;
  user: PostUser;
  timestamp: string;
  privacy: PostPrivacy;
  content?: string;
  imageUrl?: string;
  mapImageUrl?: string;
  location?: string;
  taggedFriendsDescription?: string; // e.g., "Bryan Durand and 2 others have been here"
  stats: PostStats;
  isLiked?: boolean;
  isSaved?: boolean;
  className?: string;
}

const FeedPost: React.FC<FeedPostProps> = ({
  user,
  timestamp,
  privacy,
  content,
  imageUrl,
  mapImageUrl,
  location,
  taggedFriendsDescription,
  stats,
  className,
}) => {
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [currentLikes, setCurrentLikes] = React.useState<number>(stats.likes);
  const [isSaved, setIsSaved] = React.useState<boolean>(false);

  const handleLike = React.useCallback(() => {
    setIsLiked(prev => !prev);
    setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
  }, [isLiked]);

  const handleSave = React.useCallback(() => {
    setIsSaved(prev => !prev);
  }, []);

  const PrivacyIcon = privacy === 'public' ? Globe : Users;

  return (
    <Card className={cn("w-full bg-surface shadow-sm", className)}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-primaryText text-sm">{user.name} {location && mapImageUrl && `is in ${location}.`}</p>
              <div className="flex items-center space-x-1 text-xs text-secondaryText">
                <span>{timestamp}</span>
                <span>&middot;</span>
                <PrivacyIcon className="h-3 w-3" />
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-secondaryText hover:bg-muted">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Hide post</DropdownMenuItem>
              <DropdownMenuItem>Report post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2 pt-0">
        {content && <p className="text-primaryText mb-3 text-sm whitespace-pre-wrap">{content}</p>}
        {imageUrl && <img src={imageUrl} alt="Post content" className="rounded-lg w-full object-cover max-h-[500px]" />}
        {mapImageUrl && (
          <div className="relative">
            <img src={mapImageUrl} alt={`Map of ${location}`} className="rounded-lg w-full object-cover h-80 border border-border" />
            {location && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-3 rounded-b-lg text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm flex items-center"><MapPin className="h-4 w-4 mr-1 inline-block"/> {location}</p>
                    {taggedFriendsDescription && <p className="text-xs">{taggedFriendsDescription}</p>}
                  </div>
                  <Button variant="secondary" size="sm" onClick={handleSave} className={`${isSaved ? 'bg-accentBlue text-white' : 'bg-gray-200 hover:bg-gray-300 text-primaryText'}`}>
                    <Bookmark className={`h-4 w-4 mr-1 ${isSaved ? 'fill-current' : ''}`}/>
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start space-y-3">
        <div className="flex justify-between w-full text-xs text-secondaryText">
          <span>{currentLikes > 0 ? `${currentLikes} Likes` : ''}</span>
          <div className="space-x-2">
            <span>{stats.comments > 0 ? `${stats.comments} Comments` : ''}</span>
            <span>{stats.shares > 0 ? `${stats.shares} Shares` : ''}</span>
          </div>
        </div>
        <div className="w-full border-t border-border pt-2">
          <div className="flex justify-around">
            <Button variant="ghost" className="w-full text-secondaryText hover:bg-muted" onClick={handleLike}>
              <ThumbsUp className={cn("h-5 w-5 mr-2", isLiked && "text-accentBlue fill-accentBlue")}/> Like
            </Button>
            <Button variant="ghost" className="w-full text-secondaryText hover:bg-muted">
              <MessageCircle className="h-5 w-5 mr-2" /> Comment
            </Button>
            <Button variant="ghost" className="w-full text-secondaryText hover:bg-muted">
              <Share2 className="h-5 w-5 mr-2" /> Share
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedPost;
