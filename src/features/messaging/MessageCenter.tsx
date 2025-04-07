import { useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

// Mock conversations data
const mockConversations = [
  {
    id: "c1",
    with: {
      id: "u1",
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      isHost: true
    },
    property: {
      id: "p1",
      name: "Luxury Beach Villa",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
    },
    lastMessage: {
      text: "Yes, the beach is just a 5-minute walk from the villa. You'll love it!",
      timestamp: new Date(2025, 3, 5, 14, 23),
      isFromMe: false
    },
    unread: 1
  },
  {
    id: "c2",
    with: {
      id: "u2",
      name: "Maria Garcia",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      isHost: true
    },
    property: {
      id: "p2",
      name: "Downtown Loft",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
    },
    lastMessage: {
      text: "Great! Looking forward to hosting you next month.",
      timestamp: new Date(2025, 3, 4, 9, 15),
      isFromMe: false
    },
    unread: 0
  },
  {
    id: "c3",
    with: {
      id: "u3",
      name: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      isHost: false
    },
    property: {
      id: "p3",
      name: "Mountain Cabin Retreat",
      image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
    },
    lastMessage: {
      text: "I'll arrive around 4 PM. Is that okay?",
      timestamp: new Date(2025, 3, 3, 18, 42),
      isFromMe: true
    },
    unread: 0
  }
];

// Mock messages for each conversation
const mockMessages = {
  c1: [
    {
      id: "m1",
      sender: "user",
      text: "Hi there! I'm interested in your Luxury Beach Villa. Is it close to the beach?",
      timestamp: new Date(2025, 3, 5, 10, 15)
    },
    {
      id: "m2",
      sender: "other",
      text: "Hello! Thanks for your interest. Yes, the beach is just a 5-minute walk from the villa. You'll love it!",
      timestamp: new Date(2025, 3, 5, 14, 23)
    }
  ],
  c2: [
    {
      id: "m1",
      sender: "user",
      text: "Hi Maria, I just booked your Downtown Loft for next month. I'm excited!",
      timestamp: new Date(2025, 3, 4, 9, 0)
    },
    {
      id: "m2",
      sender: "other",
      text: "Great! Looking forward to hosting you next month.",
      timestamp: new Date(2025, 3, 4, 9, 15)
    }
  ],
  c3: [
    {
      id: "m1",
      sender: "other",
      text: "Hello! I'm looking forward to your stay at my Mountain Cabin Retreat. Let me know if you have any questions.",
      timestamp: new Date(2025, 3, 3, 15, 30)
    },
    {
      id: "m2",
      sender: "user",
      text: "Thanks for reaching out! What time can I check in?",
      timestamp: new Date(2025, 3, 3, 16, 45)
    },
    {
      id: "m3",
      sender: "other",
      text: "Check-in is anytime after 3 PM. What time do you think you'll arrive?",
      timestamp: new Date(2025, 3, 3, 17, 20)
    },
    {
      id: "m4",
      sender: "user",
      text: "I'll arrive around 4 PM. Is that okay?",
      timestamp: new Date(2025, 3, 3, 18, 42)
    }
  ]
};

const MessageCenter = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
    
    // Mark as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unread: 0 } 
          : conv
      )
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeConversation || !newMessage.trim()) return;
    
    setIsLoading(true);
    
    // Create new message
    const newMsg = {
      id: `m${Date.now()}`,
      sender: "user",
      text: newMessage.trim(),
      timestamp: new Date()
    };
    
    // Update messages
    setMessages(prev => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation as keyof typeof prev] || []), newMsg]
    }));
    
    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation 
          ? { 
              ...conv, 
              lastMessage: {
                text: newMessage.trim(),
                timestamp: new Date(),
                isFromMe: true
              }
            } 
          : conv
      )
    );
    
    setNewMessage("");
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate response for demo purposes
      if (Math.random() > 0.5) {
        setTimeout(() => {
          const responseMsg = {
            id: `m${Date.now()}`,
            sender: "other",
            text: "Thanks for your message! I'll get back to you soon.",
            timestamp: new Date()
          };
          
          setMessages(prev => ({
            ...prev,
            [activeConversation]: [...(prev[activeConversation as keyof typeof prev] || []), responseMsg]
          }));
          
          setConversations(prev => 
            prev.map(conv => 
              conv.id === activeConversation 
                ? { 
                    ...conv, 
                    lastMessage: {
                      text: "Thanks for your message! I'll get back to you soon.",
                      timestamp: new Date(),
                      isFromMe: false
                    }
                  } 
                : conv
            )
          );
          
          toast({
            title: "New message",
            description: "You received a new message.",
          });
        }, 5000);
      }
    }, 1000);
  };

  const formatMessageTime = (date: Date) => {
    const today = new Date();
    const isToday = date.getDate() === today.getDate() && 
                    date.getMonth() === today.getMonth() && 
                    date.getFullYear() === today.getFullYear();
    
    if (isToday) {
      return format(date, "h:mm a");
    } else {
      return format(date, "MMM d, h:mm a");
    }
  };

  const activeConversationData = conversations.find(c => c.id === activeConversation);
  const activeMessages = activeConversation ? (messages[activeConversation as keyof typeof messages] || []) : [];

  return (
    <div className="flex h-[calc(100vh-200px)] bg-white rounded-lg shadow-md overflow-hidden">
      {/* Conversation List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-65px)]">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeConversation === conversation.id ? "bg-gray-50" : ""
                }`}
                onClick={() => handleSelectConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={conversation.with.avatar} alt={conversation.with.name} />
                    <AvatarFallback>{conversation.with.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{conversation.with.name}</h3>
                      <span className="text-xs text-gray-500">
                        {format(conversation.lastMessage.timestamp, "MMM d")}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage.isFromMe && "You: "}
                      {conversation.lastMessage.text}
                    </p>
                    
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {conversation.property.name}
                    </p>
                  </div>
                  
                  {conversation.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No conversations yet
            </div>
          )}
        </div>
      </div>
      
      {/* Message Area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage 
                    src={activeConversationData?.with.avatar} 
                    alt={activeConversationData?.with.name} 
                  />
                  <AvatarFallback>
                    {activeConversationData?.with.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-medium">{activeConversationData?.with.name}</h3>
                  <p className="text-xs text-gray-500">
                    {activeConversationData?.with.isHost ? "Host" : "Guest"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  View Profile
                </Button>
                <Button variant="ghost" size="sm">
                  View Listing
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-blue-100" : "text-gray-500"
                    }`}>
                      {formatMessageTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={isLoading}
                />
                <Button type="submit" disabled={!newMessage.trim() || isLoading}>
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-gray-500">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;
