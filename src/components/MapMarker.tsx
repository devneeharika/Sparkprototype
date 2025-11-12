import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface User {
  id: string;
  name: string;
  avatar: string;
  x: number;
  y: number;
}

interface MapMarkerProps {
  user: User;
  onClick: () => void;
}

export function MapMarker({ user, onClick }: MapMarkerProps) {
  return (
    <motion.div
      className="absolute z-10 cursor-pointer"
      style={{
        left: `${user.x}%`,
        top: `${user.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {/* Pulsing ring */}
      <motion.div
        className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-[#9B8FE6]/30 to-[#E67FB9]/30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Avatar */}
      <Avatar className="h-12 w-12 border-4 border-white shadow-lg">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      {/* Active indicator */}
      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#E67FB9]" />
    </motion.div>
  );
}
