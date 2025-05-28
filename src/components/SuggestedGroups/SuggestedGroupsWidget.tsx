import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Plus, X } from 'lucide-react';

interface SuggestedGroup {
  id: string;
  name: string;
  memberCount: number;
  coverImageUrl: string;
  memberPreviewAvatars: string[];
}

interface SuggestedGroupsWidgetProps {
  className?: string;
}

const initialDummyGroups: SuggestedGroup[] = [
  {
    id: '1',
    name: 'Mad Men (MADdicts)',
    memberCount: 6195,
    coverImageUrl: 'https://picsum.photos/seed/group1/300/100',
    memberPreviewAvatars: [
      'https://i.pravatar.cc/150?img=6',
      'https://i.pravatar.cc/150?img=7',
      'https://i.pravatar.cc/150?img=8',
      'https://i.pravatar.cc/150?img=9',
    ],
  },
  {
    id: '2',
    name: 'Dexter Morgan Fans',
    memberCount: 6984,
    coverImageUrl: 'https://picsum.photos/seed/group2/300/100',
    memberPreviewAvatars: [
      'https://i.pravatar.cc/150?img=10',
      'https://i.pravatar.cc/150?img=11',
      'https://i.pravatar.cc/150?img=12',
    ],
  },
  {
    id: '3',
    name: 'Tech Innovators Hub',
    memberCount: 12034,
    coverImageUrl: 'https://picsum.photos/seed/group3/300/100',
    memberPreviewAvatars: [
      'https://i.pravatar.cc/150?img=13',
      'https://i.pravatar.cc/150?img=14',
      'https://i.pravatar.cc/150?img=15',
      'https://i.pravatar.cc/150?img=16',
      'https://i.pravatar.cc/150?img=17',
    ],
  },
];

const SuggestedGroupsWidget: React.FC<SuggestedGroupsWidgetProps> = ({ className }) => {
  const [groups, setGroups] = React.useState<SuggestedGroup[]>(initialDummyGroups);

  const handleDismissGroup = React.useCallback((groupId: string) => {
    setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
  }, []);

  const handleJoinGroup = React.useCallback((groupId: string) => {
    // Placeholder for join group logic
    console.log(`Joining group ${groupId}`);
    // Potentially update UI, e.g., change button to "Joined" or remove group
  }, []);

  if (groups.length === 0) {
    return (
      <Card className={cn("w-full bg-surface shadow-sm p-4 text-center", className)}>
        <p className="text-secondaryText">No suggested groups at the moment.</p>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full bg-surface shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-3 px-4">
        <CardTitle className="text-md font-semibold text-primaryText">Suggested Groups</CardTitle>
        <Button variant="link" className="text-accentBlue h-auto p-0 text-sm">See All</Button>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        {groups.map((group) => (
          <div key={group.id} className="border border-border rounded-lg overflow-hidden">
            <div className="relative h-24">
              <img src={group.coverImageUrl} alt={`${group.name} cover`} className="w-full h-full object-cover" />
              <div className="absolute top-1 right-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 bg-black/30 hover:bg-black/50 text-white rounded-full"
                  onClick={() => handleDismissGroup(group.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-2 left-2 flex -space-x-2">
                {group.memberPreviewAvatars.slice(0, 5).map((avatarUrl, index) => (
                  <Avatar key={index} className="w-6 h-6 border-2 border-surface">
                    <AvatarImage src={avatarUrl} alt={`Member ${index + 1}`} />
                    <AvatarFallback>{index}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
            <div className="p-3 bg-card">
              <p className="font-semibold text-sm text-primaryText truncate">{group.name}</p>
              <p className="text-xs text-secondaryText mb-2">{group.memberCount.toLocaleString()} members</p>
              <Button 
                variant="outline" 
                className="w-full border-border hover:bg-muted text-primaryText" 
                onClick={() => handleJoinGroup(group.id)}
              >
                <Plus className="h-4 w-4 mr-1" /> Join
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedGroupsWidget;
