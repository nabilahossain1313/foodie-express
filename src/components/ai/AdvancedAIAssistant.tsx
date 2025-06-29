import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, X, Sparkles, Mic, MicOff, Image, Paperclip, MapPin, Phone } from 'lucide-react';
import { AIMessage, UserProfile, MenuItem, User as UserType } from '../../types';
import { EnhancedAIService } from '../../services/enhancedAIService';

interface AdvancedAIAssistantProps {
  user?: UserType;
  userProfile?: UserProfile;
  currentMenuItem?: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

const AdvancedAIAssistant: React.FC<AdvancedAIAssistantProps> = ({
  user,
  userProfile,
  currentMenuItem,
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `🇧🇩 **Assalamu Alaikum${user ? ` ${user.name}` : ''}!** 🍽️\n\nI'm your **Enhanced AI Food Assistant** - your intelligent companion for all things food in Bangladesh! I'm powered by advanced AI technology and designed specifically for the Bangladeshi food scene.\n\n🚀 **What makes me special:**\n\n🎤 **Voice Commands** - Just speak naturally!\n📍 **Location-Aware** - Find restaurants near you\n🌤️ **Weather-Smart** - Suggest foods based on weather\n🇧🇩 **Cultural Expert** - Deep knowledge of Bengali cuisine\n💰 **Budget Optimizer** - Find the best deals\n🧬 **Nutrition Guru** - Advanced health insights\n📱 **Order Management** - Track, modify, reorder\n\n💬 **Try saying:**\n• "Find the best biryani near me"\n• "What's good for this rainy weather?"\n• "Show me healthy Bengali options under 300 taka"\n• "Order my usual from Kacchi Bhai"\n\n**What would you like to explore today?** 🎯`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [conversationContext, setConversationContext] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await EnhancedAIService.processAdvancedMessage(
        inputMessage,
        {
          user,
          userProfile,
          menuItem: currentMenuItem,
          conversationHistory: conversationContext,
          location: { lat: 23.8103, lng: 90.4125 }, // Default to Dhaka
          timestamp: new Date()
        }
      );

      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        context: {
          menuItem: currentMenuItem,
          userProfile
        }
      };

      setMessages(prev => [...prev, assistantMessage]);
      setConversationContext(prev => [...prev, { user: inputMessage, assistant: response.content }]);
    } catch (error) {
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "দুঃখিত! I'm experiencing some technical difficulties. Please try again in a moment, or feel free to ask a different question. I'm here to help with all your food and nutrition needs! 🍽️",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Voice recognition error. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setInputMessage(`[Image uploaded: ${file.name}] Please analyze this food image and provide nutritional information and recommendations.`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: '🍛', text: 'Find biryani near me', action: 'Find the best biryani restaurants near my location' },
    { icon: '🌤️', text: 'Weather-based suggestions', action: 'What food should I order based on current weather?' },
    { icon: '💰', text: 'Budget-friendly options', action: 'Show me delicious food options under 200 taka' },
    { icon: '🥗', text: 'Healthy Bengali food', action: 'Recommend healthy traditional Bengali dishes' },
    { icon: '📦', text: 'Track my order', action: 'Help me track my current food order' },
    { icon: '🔄', text: 'Reorder favorites', action: 'Show me my recent orders so I can reorder' }
  ];

  const smartSuggestions = [
    "🇧🇩 Explore authentic Bengali cuisine and culture",
    "📍 Find restaurants and food options near your location",
    "🧬 Get personalized nutrition advice and meal planning",
    "💰 Discover budget-friendly deals and offers",
    "🌤️ Get weather-appropriate food recommendations",
    "📱 Manage orders with voice commands and smart features"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-green-600 via-red-500 to-green-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">🇧🇩 Enhanced AI Food Assistant</h3>
              <p className="text-sm text-green-100">Powered by Advanced AI • Voice & Image Enabled • Bangladesh Specialized</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-green-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-green-50 to-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-green-600 to-red-500 text-white'
                    : 'bg-white text-gray-900 shadow-sm border border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {message.type === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-green-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-4 max-w-[80%] shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-red-500 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-white">
            <p className="text-sm font-medium text-gray-700 mb-3">🚀 Quick Actions:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(action.action)}
                  className="text-left text-sm bg-gradient-to-r from-green-50 to-red-50 text-gray-700 px-3 py-2 rounded-lg hover:from-green-100 hover:to-red-100 transition-colors border border-green-200 flex items-center space-x-2"
                >
                  <span>{action.icon}</span>
                  <span>{action.text}</span>
                </button>
              ))}
            </div>
            
            <p className="text-sm font-medium text-gray-700 mb-3">✨ Smart Suggestions:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {smartSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(suggestion.replace(/[🇧🇩📍🧬💰🌤️📱]/g, '').trim())}
                  className="text-left text-sm bg-gradient-to-r from-orange-50 to-pink-50 text-gray-700 px-3 py-2 rounded-lg hover:from-orange-100 hover:to-pink-100 transition-colors border border-orange-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about food, nutrition, restaurants, or say commands like 'Find biryani near me'..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-32 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                rows={2}
                disabled={isLoading}
              />
              <div className="absolute right-2 top-2 flex space-x-1">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  title="Upload food image"
                >
                  <Image className="h-4 w-4" />
                </button>
                <button
                  onClick={handleVoiceInput}
                  disabled={isListening}
                  className={`p-2 transition-colors ${
                    isListening 
                      ? 'text-red-600 animate-pulse' 
                      : 'text-gray-400 hover:text-green-600'
                  }`}
                  title="Voice input"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  title="Location services"
                >
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-green-600 to-red-500 text-white p-3 rounded-lg hover:from-green-700 hover:to-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          {isListening && (
            <div className="mt-2 text-center">
              <p className="text-sm text-red-600 animate-pulse">🎤 Listening... Speak now (English or Bangla)</p>
            </div>
          )}
          
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-500">
              🇧🇩 Specialized for Bangladesh • Voice commands supported • Cultural food expert
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAIAssistant;