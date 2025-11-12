import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Navigation, SlidersHorizontal, X, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { MapMarker } from './MapMarker';
import { UserCardSheet } from './UserCardSheet';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

interface User {
  id: string;
  name: string;
  age: number;
  distance: number;
  interests: string[];
  avatar: string;
  x: number;
  y: number;
}

// Mock current user interests - in production this would come from auth/profile
const CURRENT_USER_INTERESTS = ['Music', 'Travel', 'Photography', 'Tech'];

const NEARBY_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    age: 26,
    distance: 12,
    interests: ['Music', 'Travel', 'Photography'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    x: 45,
    y: 35
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    age: 29,
    interests: ['Fitness', 'Food', 'Tech'],
    distance: 23,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    x: 65,
    y: 55
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    age: 24,
    interests: ['Art', 'Reading', 'Music'],
    distance: 31,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    x: 30,
    y: 60
  },
  {
    id: '4',
    name: 'Alex Kim',
    age: 27,
    interests: ['Gaming', 'Tech', 'Sports'],
    distance: 18,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    x: 55,
    y: 40
  },
  {
    id: '5',
    name: 'Maya Patel',
    age: 25,
    interests: ['Food', 'Travel', 'Photography'],
    distance: 42,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
    x: 40,
    y: 70
  }
];

interface LiveMapScreenProps {
  pingCount: number;
  onShowPingRequests: () => void;
}

export function LiveMapScreen({ pingCount, onShowPingRequests }: LiveMapScreenProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [radiusFeet, setRadiusFeet] = useState(5280); // Default: 1 mile
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Filter users based on radius and interests
  const filteredUsers = useMemo(() => {
    return NEARBY_USERS.filter(user => {
      // Filter by radius
      if (user.distance > radiusFeet) return false;

      // Filter by interests (only if user has selected some interests)
      if (selectedInterests.length > 0) {
        const hasSharedInterest = user.interests.some(interest => 
          selectedInterests.includes(interest)
        );
        if (!hasSharedInterest) return false;
      }

      return true;
    });
  }, [radiusFeet, selectedInterests]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const formatDistance = (feet: number) => {
    if (feet === 0) return '0 ft';
    if (feet < 100) return `${feet} ft`;
    if (feet === 5280) return '1 mile';
    if (feet < 1000) return `${feet} ft`;
    return `${Math.round(feet / 528) / 10} miles`;
  };

  return (
    <div className="relative h-full w-full bg-[#E8F4F8]">
      {/* Notification Button - Top Right */}
      <Button
        onClick={onShowPingRequests}
        variant="outline"
        className="absolute right-6 top-6 z-30 h-10 w-10 rounded-full border-gray-200 bg-white p-0 shadow-lg"
      >
        <Bell className="h-5 w-5" />
        {pingCount > 0 && (
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] p-0 text-center">
            {pingCount}
          </Badge>
        )}
      </Button>

      {/* Map Area */}
      <div className="relative h-full w-full overflow-hidden">
        {/* Simplified map background */}
        <div className="absolute inset-0">
          {/* Streets pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-0 right-0 top-[30%] h-[2px] bg-gray-400" />
            <div className="absolute left-0 right-0 top-[60%] h-[2px] bg-gray-400" />
            <div className="absolute bottom-0 left-[40%] top-0 w-[2px] bg-gray-400" />
            <div className="absolute bottom-0 left-[70%] top-0 w-[2px] bg-gray-400" />
          </div>

          {/* Park areas (green patches) */}
          <div className="absolute left-[10%] top-[15%] h-24 w-32 rounded-full bg-green-200/40 blur-xl" />
          <div className="absolute bottom-[20%] right-[15%] h-32 w-40 rounded-full bg-green-200/40 blur-xl" />
        </div>

        {/* Current user marker (center) with radius */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Animated radius ring */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#9B8FE6]/30 bg-[#9B8FE6]/5"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#9B8FE6]/20 bg-[#9B8FE6]/10"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          
          {/* Current user dot */}
          <div className="relative h-5 w-5 rounded-full border-4 border-white bg-[#9B8FE6] shadow-lg">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#9B8FE6] opacity-75" />
          </div>
        </div>

        {/* Nearby user markers */}
        {filteredUsers.map((user) => (
          <MapMarker
            key={user.id}
            user={user}
            onClick={() => setSelectedUser(user)}
          />
        ))}
      </div>

      {/* Floating Filter Button - Bottom Left */}
      <Button
        onClick={() => setFilterOpen(true)}
        variant="outline"
        className="absolute bottom-28 left-6 z-30 h-14 w-14 rounded-full bg-white p-0 shadow-lg hover:bg-gray-50"
      >
        <SlidersHorizontal className="h-6 w-6 text-[#9B8FE6]" />
      </Button>

      {/* Floating GPS Button - Bottom Right */}
      <Button 
        className="absolute bottom-28 right-6 z-30 h-14 w-14 rounded-full bg-white p-0 shadow-lg hover:bg-gray-50"
        variant="outline"
      >
        <Navigation className="h-6 w-6 text-[#9B8FE6]" />
      </Button>

      {/* User Card Bottom Sheet */}
      <UserCardSheet 
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />

      {/* Filter Sheet */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-6 pb-8 pt-6">
          <SheetHeader className="mb-6">
            <div className="flex items-center justify-between">
              <SheetTitle>Filters</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setFilterOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SheetDescription>
              Customize who you see on the map
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6">
            {/* Radius Filter */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-gray-700">Search Radius</Label>
                <Badge variant="outline" className="rounded-full px-3 py-1">
                  {formatDistance(radiusFeet)}
                </Badge>
              </div>
              <Slider
                value={[radiusFeet]}
                onValueChange={(value) => setRadiusFeet(value[0])}
                min={0}
                max={5280}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0 ft</span>
                <span>1 mile</span>
              </div>
            </div>

            {/* Interest Filter */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-gray-700">Filter by Shared Interests</Label>
                {selectedInterests.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedInterests([])}
                    className="h-auto p-0 text-xs text-[#9B8FE6] hover:text-[#E67FB9]"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Your interests: {CURRENT_USER_INTERESTS.join(', ')}
              </p>
              <div className="space-y-3">
                {CURRENT_USER_INTERESTS.map((interest) => (
                  <div key={interest} className="flex items-center space-x-3">
                    <Checkbox
                      id={interest}
                      checked={selectedInterests.includes(interest)}
                      onCheckedChange={() => toggleInterest(interest)}
                      className="border-gray-300 data-[state=checked]:border-[#E67FB9] data-[state=checked]:bg-[#E67FB9]"
                    />
                    <Label
                      htmlFor={interest}
                      className="cursor-pointer text-gray-700"
                    >
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <Button
              onClick={() => setFilterOpen(false)}
              className="mt-4 h-12 w-full rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
