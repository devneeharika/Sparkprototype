import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, MoreVertical, Bell, BellOff, Ban, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
}

interface ChatScreenProps {
  conversation: Conversation;
  onBack: () => void;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hey! I saw you at the coffee shop earlier',
    sender: 'them',
    timestamp: '10:30 AM'
  },
  {
    id: '2',
    text: 'Oh hi! Yes, I was just grabbing my morning coffee ☕',
    sender: 'me',
    timestamp: '10:31 AM'
  },
  {
    id: '3',
    text: 'Same here! Do you come here often?',
    sender: 'them',
    timestamp: '10:32 AM'
  },
  {
    id: '4',
    text: 'Pretty much every day 😄 It\'s my favorite spot',
    sender: 'me',
    timestamp: '10:33 AM'
  },
  {
    id: '5',
    text: 'That sounds great! See you there 😊',
    sender: 'them',
    timestamp: '10:35 AM'
  }
];

export function ChatScreen({ conversation, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit' 
        })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleBlock = () => {
    // In production, this would call an API to block the user
    alert('User blocked');
    onBack();
  };

  const handleDelete = () => {
    // In production, this would show a confirmation dialog and call an API
    if (confirm('Are you sure you want to delete this conversation?')) {
      alert('Conversation deleted');
      onBack();
    }
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#F7F9FA] to-white">
      {/* Header */}
      <div className="shrink-0 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="ghost"
            className="h-10 w-10 rounded-full p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="relative">
            <Avatar className="h-11 w-11 border-2 border-gray-100">
              <AvatarImage src={conversation.avatar} alt={conversation.name} />
              <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {conversation.online && (
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#E67FB9]" />
            )}
          </div>

          <div className="flex-1">
            <h3>{conversation.name}</h3>
            <p className="text-gray-600">
              {conversation.online ? 'Active now' : 'Offline'}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleMuteToggle} className="cursor-pointer">
                {isMuted ? (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <BellOff className="mr-2 h-4 w-4" />
                    <span>Mute</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleBlock} className="cursor-pointer text-orange-600">
                <Ban className="mr-2 h-4 w-4" />
                <span>Block User</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Conversation</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div
                className={`max-w-[75%] rounded-3xl px-4 py-3 ${
                  message.sender === 'me'
                    ? 'rounded-br-lg bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] text-white'
                    : 'rounded-bl-lg bg-white text-gray-900 shadow-sm'
                }`}
              >
                <p className="break-words">{message.text}</p>
                <p
                  className={`mt-1 ${
                    message.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="mb-16 shrink-0 border-t border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="h-12 flex-1 rounded-full border-gray-200 px-5 shadow-sm"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="sentences"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-r from-[#9B8FE6] to-[#E67FB9] p-0 shadow-lg disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
