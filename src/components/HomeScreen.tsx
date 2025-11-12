import { useState } from 'react';
import { Map, User, Bell, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LiveMapScreen } from './LiveMapScreen';
import { ProfileScreen } from './ProfileScreen';
import { MessagesScreen } from './MessagesScreen';
import { PingRequestsModal } from './PingRequestsModal';

interface HomeScreenProps {
  onLogout: () => void;
}

export function HomeScreen({ onLogout }: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState('map');
  const [showPingRequests, setShowPingRequests] = useState(false);
  const [pingCount] = useState(3);
  const [unreadMessages] = useState(3);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="map" className="m-0 h-full">
            <LiveMapScreen 
              pingCount={pingCount}
              onShowPingRequests={() => setShowPingRequests(true)}
            />
          </TabsContent>
          <TabsContent value="messages" className="m-0 h-full">
            <MessagesScreen />
          </TabsContent>
          <TabsContent value="profile" className="m-0 h-full">
            <ProfileScreen onLogout={onLogout} />
          </TabsContent>
        </div>

        {/* Bottom Tab Navigation */}
        <TabsList className="absolute bottom-0 left-0 right-0 z-40 grid h-16 w-full grid-cols-3 rounded-none border-t border-gray-200 bg-white/95 p-0 backdrop-blur-sm">
          <TabsTrigger
            value="map"
            className="relative h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <div className="flex flex-col items-center gap-1">
              <Map className={`h-6 w-6 ${activeTab === 'map' ? 'text-[#9B8FE6]' : 'text-gray-400'}`} />
              <span className={`${activeTab === 'map' ? 'text-[#9B8FE6]' : 'text-gray-500'}`}>
                Map
              </span>
              {activeTab === 'map' && (
                <div className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-t-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9]" />
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="messages"
            className="relative h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="relative">
                <MessageCircle className={`h-6 w-6 ${activeTab === 'messages' ? 'text-[#9B8FE6]' : 'text-gray-400'}`} />
                {unreadMessages > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] p-0 text-center text-[10px]">
                    {unreadMessages}
                  </Badge>
                )}
              </div>
              <span className={`${activeTab === 'messages' ? 'text-[#9B8FE6]' : 'text-gray-500'}`}>
                Messages
              </span>
              {activeTab === 'messages' && (
                <div className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-t-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9]" />
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="relative h-full rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <div className="flex flex-col items-center gap-1">
              <User className={`h-6 w-6 ${activeTab === 'profile' ? 'text-[#9B8FE6]' : 'text-gray-400'}`} />
              <span className={`${activeTab === 'profile' ? 'text-[#9B8FE6]' : 'text-gray-500'}`}>
                Profile
              </span>
              {activeTab === 'profile' && (
                <div className="absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-t-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9]" />
              )}
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Ping Requests Modal */}
      <PingRequestsModal
        open={showPingRequests}
        onClose={() => setShowPingRequests(false)}
      />
    </div>
  );
}
