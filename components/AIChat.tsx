import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/gemini';
import { Message } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Hi! I'm DebabrataAI. How can I help you explore this portfolio today?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inactivityRef = useRef<number | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Auto-close chat after inactivity (5 minutes) and on route change
  useEffect(() => {
    const clearTimer = () => {
      if (inactivityRef.current) {
        clearTimeout(inactivityRef.current);
        inactivityRef.current = null;
      }
    };

    const startTimer = () => {
      clearTimer();
      // auto-close after 5 minutes of inactivity
      inactivityRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, 5 * 60 * 1000);
    };

    if (isOpen) {
      startTimer();
      // reset timer on user interactions inside the chat
      const reset = () => startTimer();
      window.addEventListener('mousemove', reset);
      window.addEventListener('keydown', reset);
      window.addEventListener('touchstart', reset);
      // close on navigation
      window.addEventListener('hashchange', () => setIsOpen(false));

      return () => {
        clearTimer();
        window.removeEventListener('mousemove', reset);
        window.removeEventListener('keydown', reset);
        window.removeEventListener('touchstart', reset);
        window.removeEventListener('hashchange', () => setIsOpen(false));
      };
    }
    return undefined;
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    const response = await geminiService.chat(input, history);
    
    setMessages(prev => [...prev, {
      role: 'model',
      content: response,
      timestamp: Date.now()
    }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-500 transition-all z-50 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          )}
        </svg>
        <span className="absolute right-16 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat with AI Assistant</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div ref={containerRef} className="fixed bottom-24 right-4 left-4 md:right-6 md:left-auto w-[calc(100%-2rem)] max-w-[380px] md:w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col z-[9999] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-gray-700 bg-gray-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">D</div>
              <div>
                <h3 className="text-sm font-semibold">DebabrataAI</h3>
                <p className="text-[10px] text-green-400">Online & Ready</p>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start items-center gap-2">
                <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-700 bg-gray-900">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-center"
            >
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about the projects..."
                className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 pl-4 pr-12 focus:outline-none focus:border-indigo-500 text-sm transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-1.5 text-indigo-500 hover:text-indigo-400 disabled:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;