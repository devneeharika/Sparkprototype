import { useState } from 'react';
import { motion } from 'motion/react';
import { Edit2, Heart, Send, UserCheck, MessageCircle, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { EditProfileDialog } from './EditProfileDialog';

interface ProfileData {
  name: string;
  bio: string;
  interests: string[];
  avatar: string;
  stats: {
    pingsSent: number;
    pingsReceived: number;
    connections: number;
  };
}

interface ProfileScreenProps {
  onLogout: () => void;
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Jordan Taylor',
    bio: 'Coffee lover ☕ | Always up for a good conversation',
    interests: ['Music', 'Travel', 'Food', 'Photography'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    stats: {
      pingsSent: 12,
      pingsReceived: 18,
      connections: 8
    }
  });

  const handleSaveProfile = (updatedProfile: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...updatedProfile }));
    setShowEditDialog(false);
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-gradient-to-b from-white to-[#F7F9FA] pb-20">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2>Profile</h2>
          <Button 
            onClick={() => setShowEditDialog(true)}
            variant="outline"
            className="h-10 gap-2 rounded-full border-gray-200 px-4 shadow-sm"
          >
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
        </div>

        {/* Profile Card */}
        <motion.div
          className="mb-8 overflow-hidden rounded-3xl bg-white p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Avatar and Name */}
          <div className="mb-4 flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="h-28 w-28 border-4 border-gray-100 shadow-md">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full border-4 border-white bg-[#00C6AE]" />
            </div>
            <h3 className="mb-1 text-center">{profile.name}</h3>
            <p className="text-center text-gray-600">{profile.bio}</p>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-3 gap-4 rounded-2xl bg-gradient-to-br from-[#F7F9FA] to-[#F3EBFE] p-4">
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center">
                <Send className="h-4 w-4 text-[#9B8FE6]" />
              </div>
              <div className="mb-1">{profile.stats.pingsSent}</div>
              <div className="text-gray-600">Sent</div>
            </div>
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-[#E67FB9]" />
              </div>
              <div className="mb-1">{profile.stats.pingsReceived}</div>
              <div className="text-gray-600">Received</div>
            </div>
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center">
                <UserCheck className="h-4 w-4 text-[#9B8FE6]" />
              </div>
              <div className="mb-1">{profile.stats.connections}</div>
              <div className="text-gray-600">Friends</div>
            </div>
          </div>

          {/* Interests */}
          {profile.interests.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2 text-gray-700">
                <Heart className="h-4 w-4" />
                <span>Interests</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <Badge
                    key={interest}
                    className="rounded-full bg-gradient-to-r from-[#9B8FE6]/10 to-[#E67FB9]/10 px-4 py-2 text-gray-700"
                    variant="outline"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Additional Options */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <button className="w-full rounded-2xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-md">
            <div className="text-gray-900">Privacy Settings</div>
            <div className="text-gray-500">Manage who can see you</div>
          </button>
          <button className="w-full rounded-2xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-md">
            <div className="text-gray-900">Notification Preferences</div>
            <div className="text-gray-500">Control ping alerts</div>
          </button>
          <button className="w-full rounded-2xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-md">
            <div className="text-gray-900">Help & Support</div>
            <div className="text-gray-500">Get assistance</div>
          </button>
          <button 
            onClick={onLogout}
            className="w-full rounded-2xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-red-600">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </div>
            <div className="text-gray-500">Sign out of your account</div>
          </button>
        </motion.div>
      </div>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
