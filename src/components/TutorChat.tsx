import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Sparkles, Languages } from 'lucide-react';
import { chatWithTutor } from '../services/gemini';
import { ChatMessage } from '../types';
import Markdown from 'react-markdown';

export default function TutorChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Tashi Delek! བཀྲ་ཤིས་བདེ་ལེགས། I am Sherab, your Tibetan language tutor. How can I assist you today? We can practice phrases, talk about Tibetan history, or I can help you with your grammar.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithTutor(input, history);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText || "I'm sorry, I couldn't process that. Let's try again.",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-bg-card rounded-3xl border border-accent-border shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-accent-border flex items-center justify-between bg-bg-sidebar/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-primary-gold to-primary-maroon rounded-full flex items-center justify-center text-white relative shadow-lg">
            <Bot size={24} />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-bg-card rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-primary-gold">Sherab (AI Tutor)</h3>
            <p className="text-sm text-text-muted flex items-center gap-1">
              <Languages size={12} /> Tibetan & English Expert
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-bg-dark to-bg-card"
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === 'user' ? 'bg-primary-gold text-bg-dark' : 'bg-primary-maroon text-white'
                }`}>
                  {message.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                </div>
                <div className={`p-4 rounded-2xl relative ${
                  message.role === 'user' 
                    ? 'bg-primary-gold text-bg-dark rounded-tr-none' 
                    : 'bg-[#222] text-text-main border border-accent-border rounded-tl-none'
                }`}>
                  <div className="markdown-body prose prose-sm prose-invert max-w-none">
                    <Markdown>{message.text}</Markdown>
                  </div>
                  <span className={`text-[10px] mt-2 block opacity-50 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-2 p-2">
            <span className="w-2 h-2 bg-primary-gold rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-primary-gold rounded-full animate-bounce delay-100"></span>
            <span className="w-2 h-2 bg-primary-gold rounded-full animate-bounce delay-200"></span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 bg-bg-sidebar/50 border-t border-accent-border">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask anything in Tibetan or English..."
            className="w-full bg-[#111] border border-accent-border rounded-2xl px-6 py-4 pr-16 text-text-main focus:ring-2 focus:ring-primary-gold focus:border-transparent outline-none resize-none transition-all placeholder:text-text-muted"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-gold text-bg-dark rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-text-muted mt-2 text-center">
          Sherab is an AI and may occasionally provide incorrect information. Practice with care.
        </p>
      </div>
    </div>
  );
}
