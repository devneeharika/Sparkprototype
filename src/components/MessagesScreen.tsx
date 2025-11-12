import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ChatScreen } from './ChatScreen';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    lastMessage: 'That sounds great! See you there 😊',
    timestamp: '2m ago',
    unreadCount: 2,
    online: true
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    lastMessage: 'Thanks for the recommendation!',
    timestamp: '15m ago',
    unreadCount: 0,
    online: true
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    lastMessage: 'I love that coffee shop too',
    timestamp: '1h ago',
    unreadCount: 0,
    online: false
  },
  {
    id: '4',
    name: 'Alex Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    lastMessage: 'Let me know when you\'re free',
    timestamp: '3h ago',
    unreadCount: 1,
    online: false
  }
];

export function MessagesScreen() {
  const [conversations] = useState(MOCK_CONVERSATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedConversation) {
    return (
      <div className="h-full w-full">
        <ChatScreen
          conversation={selectedConversation}
          onBack={() => setSelectedConversation(null)}
        />
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-gradient-to-b from-white to-[#F7F9FA] pb-20">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="mb-2">Messages</h2>
          <p className="text-gray-600">Chat with your connections</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="h-12 rounded-full border-gray-200 pl-12 shadow-sm"
            />
          </div>
        </div>

        {/* Conversations List */}
        {filteredConversations.length === 0 ? (
          <div className="py-16 text-center">
            <MessageCircle className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-gray-900">No conversations yet</h3>
            <p className="text-gray-600">
              Start connecting with people nearby to begin chatting
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map((conversation, index) => (
              <motion.button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className="w-full rounded-2xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-14 w-14 border-2 border-gray-100">
                      <AvatarImage src={conversation.avatar} alt={conversation.name} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-[#E67FB9]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h4 className="truncate">{conversation.name}</h4>
                      <span className="whitespace-nowrap text-gray-500">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="truncate text-gray-600">
                      {conversation.lastMessage}
                    </p>
                  </div>

                  {conversation.unreadCount > 0 && (
                    <Badge className="ml-2 h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] p-0">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
