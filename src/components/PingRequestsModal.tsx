import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, CheckCircle2, XCircle, PartyPopper } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PingRequest {
  id: string;
  name: string;
  age: number;
  distance: number;
  interests: string[];
  avatar: string;
}

interface PingRequestsModalProps {
  open: boolean;
  onClose: () => void;
}

const MOCK_REQUESTS: PingRequest[] = [
  {
    id: '1',
    name: 'Olivia Martinez',
    age: 25,
    distance: 15,
    interests: ['Music', 'Travel'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia'
  },
  {
    id: '2',
    name: 'James Wilson',
    age: 28,
    distance: 22,
    interests: ['Fitness', 'Food'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
  },
  {
    id: '3',
    name: 'Sophie Chen',
    age: 24,
    distance: 38,
    interests: ['Art', 'Photography'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie'
  }
];

export function PingRequestsModal({ open, onClose }: PingRequestsModalProps) {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [showConfetti, setShowConfetti] = useState(false);
  const [acceptedName, setAcceptedName] = useState('');

  const handleAccept = (request: PingRequest) => {
    setRequests(prev => prev.filter(r => r.id !== request.id));
    setAcceptedName(request.name);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleIgnore = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Incoming Pings</DialogTitle>
            <DialogDescription>
              Review and respond to connection requests from nearby people
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {requests.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <div className="mb-3 text-gray-400">No pending requests</div>
                <p>When someone pings you, they'll appear here</p>
              </div>
            ) : (
              requests.map((request) => (
                <motion.div
                  key={request.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <Avatar className="h-14 w-14 border-2 border-gray-100">
                      <AvatarImage src={request.avatar} alt={request.name} />
                      <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h4 className="mb-1">{request.name}, {request.age}</h4>
                      <div className="mb-2 flex items-center gap-1.5 text-gray-600">
                        <MapPin className="h-4 w-4 text-[#E67FB9]" />
                        <span>{request.distance} feet away</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {request.interests.map((interest) => (
                          <Badge
                            key={interest}
                            className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-gray-600"
                            variant="outline"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleIgnore(request.id)}
                      variant="outline"
                      className="flex-1 gap-2 rounded-full"
                    >
                      <XCircle className="h-4 w-4" />
                      Ignore
                    </Button>
                    <Button
                      onClick={() => handleAccept(request)}
                      className="flex-1 gap-2 rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9]"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Accept
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Confetti Success Message */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowConfetti(false)}
          >
            <motion.div
              className="mx-6 rounded-3xl bg-white p-8 text-center shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <motion.div
                className="mb-4 flex justify-center"
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <PartyPopper className="h-16 w-16 text-[#E67FB9]" />
              </motion.div>
              <h3 className="mb-2">You're now connected!</h3>
              <p className="text-gray-600">You and {acceptedName} can now chat</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
