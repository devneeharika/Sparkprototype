import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Sparkles, MapPin, Users, MessageCircle } from 'lucide-react';

interface LandingScreenProps {
  onLogin: () => void;
  onRegister: () => void;
}

export function LandingScreen({ onLogin, onRegister }: LandingScreenProps) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-[#9B8FE6] via-[#B88FE6] to-[#E67FB9] px-6 py-12 px-[24px] py-[48px]">
      {/* Content */}
      <motion.div 
        className="flex flex-1 flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Spark Badge */}
        <motion.div
          className="mb-8 flex items-center gap-4 rounded-full bg-white/20 px-8 py-4 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Sparkles className="h-10 w-10 text-white" />
          <span className="text-white text-5xl italic">Spark</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          className="mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Connect with people around
        </motion.h1>

        {/* Buttons */}
        <motion.div 
          className="w-full max-w-md space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button 
            onClick={onRegister}
            className="h-14 w-full rounded-full bg-white text-[#9B8FE6] shadow-lg transition-all hover:scale-[1.02] hover:bg-white/95 hover:shadow-xl"
          >
            Get Started
          </Button>
          <Button 
            onClick={onLogin}
            variant="ghost"
            className="h-14 w-full rounded-full border-2 border-white/0 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-white/20 hover:bg-white/20"
          >
            Log In
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom Feature Icons */}
      <motion.div 
        className="flex w-full max-w-md items-center justify-around pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <span className="text-white/80">Nearby</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Users className="h-6 w-6 text-white" />
          </div>
          <span className="text-white/80">Match</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <span className="text-white/80">Chat</span>
        </div>
      </motion.div>
    </div>
  );
}