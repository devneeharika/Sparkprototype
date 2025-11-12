import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

interface ProfileData {
  name: string;
  bio: string;
  interests: string[];
}

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (profile: Partial<ProfileData>) => void;
}

const INTERESTS = [
  'Music', 'Fitness', 'Travel', 'Food', 'Art', 'Tech', 
  'Photography', 'Gaming', 'Reading', 'Sports'
];

export function EditProfileDialog({ open, onClose, profile, onSave }: EditProfileDialogProps) {
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(profile.interests);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    onSave({ name, bio, interests: selectedInterests });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information and interests
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-2xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-bio">Bio</Label>
            <Textarea
              id="edit-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-24 rounded-2xl"
              placeholder="Tell people about yourself..."
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Interests
            </Label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((interest) => (
                <Badge
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`cursor-pointer rounded-full px-4 py-2 transition-all ${
                    selectedInterests.includes(interest)
                      ? 'bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] text-white hover:opacity-90'
                      : 'border-2 border-gray-200 bg-white text-gray-700 hover:border-[#E67FB9]'
                  }`}
                  variant="outline"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 rounded-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
