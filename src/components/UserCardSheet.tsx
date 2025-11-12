import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Heart, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

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

interface UserCardSheetProps {
  user: User | null;
  onClose: () => void;
}

export function UserCardSheet({ user, onClose }: UserCardSheetProps) {
  const handlePing = () => {
    toast.success('Ping sent!', {
      description: `Your connection request was sent to ${user?.name}`,
      duration: 3000,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {user && (
        <>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="absolute bottom-16 left-0 right-0 z-50 mx-4 overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Handle bar */}
            <div className="flex justify-center py-3">
              <div className="h-1.5 w-12 rounded-full bg-gray-300" />
            </div>

            <div className="px-6 pb-6">
              {/* Profile Section */}
              <div className="mb-5 flex items-start gap-4">
                <Avatar className="h-16 w-16 border-4 border-gray-100 shadow-md">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="mb-1">{user.name}, {user.age}</h3>
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <MapPin className="h-4 w-4 text-[#00C6AE]" />
                    <span>{user.distance} feet away</span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              {user.interests.length > 0 && (
                <div className="mb-5">
                  <div className="mb-2 flex items-center gap-2 text-gray-700">
                    <Heart className="h-4 w-4" />
                    <span>Interests</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map((interest) => (
                      <Badge
                        key={interest}
                        className="rounded-full border-2 border-gray-200 bg-gray-50 px-3 py-1 text-gray-700"
                        variant="outline"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Ping Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handlePing}
                  className="relative h-14 w-full overflow-hidden rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] shadow-lg transition-all hover:shadow-xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: '-100%', opacity: 0.3 }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Send Ping
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
