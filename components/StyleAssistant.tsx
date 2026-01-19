
import React, { useState, useRef, useEffect } from 'react';
import { getFashionAdvice } from '../services/geminiService';
import { Message, Language } from '../types';

interface StyleAssistantProps {
  language: Language;
  translations: any;
}

const StyleAssistant: React.FC<StyleAssistantProps> = ({ language, translations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'location'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: translations.assistant.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update initial message when language changes if no interaction has occurred
    if (!hasStarted) {
      setMessages([{ role: 'model', text: translations.assistant.welcome }]);
    }
  }, [language, translations, hasStarted]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isTyping, activeTab]);

  const handleSend = async (textOverride?: string) => {
    const messageToSend = textOverride || input;
    if (!messageToSend.trim()) return;

    setHasStarted(true);
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageToSend }]);
    setIsTyping(true);

    const advice = await getFashionAdvice(messageToSend);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: advice }]);
  };

  const SUGGESTIONS = language === 'RU' 
    ? ["Сочетание шелкового платья", "Идеи вечерних курток", "Деловой шик", "Как носить кожу"]
    : language === 'ZH'
    ? ["如何搭配真丝连衣裙", "晚宴夹克灵感", "职场时尚搭配", "皮革单品穿搭"]
    : ["Matching a silk dress", "Evening jacket ideas", "Work chic combinations", "How to style leather"];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300 group"
      >
        {isOpen ? (
          <i className="fa-solid fa-xmark text-xl"></i>
        ) : (
          <div className="flex flex-col items-center">
            <i className="fa-solid fa-wand-magic-sparkles text-xl mb-0.5 group-hover:rotate-12 transition-transform"></i>
            <span className="text-[8px] font-bold uppercase tracking-tighter">Stylist</span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[380px] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden rounded-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="bg-black text-white">
            <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" 
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                  alt="Stylist Elena"
                />
                <h3 className="text-sm font-serif font-bold tracking-wide">Elena — Vogue Aura</h3>
              </div>
            </div>
            
            <div className="flex text-[10px] font-bold uppercase tracking-widest">
              <button onClick={() => setActiveTab('chat')} className={`flex-1 py-3 transition-all ${activeTab === 'chat' ? 'bg-white text-black' : 'text-white/70'}`}>
                {language === 'RU' ? 'Совет стилиста' : language === 'ZH' ? '造型建议' : 'Stylist Advice'}
              </button>
              <button onClick={() => setActiveTab('location')} className={`flex-1 py-3 transition-all ${activeTab === 'location' ? 'bg-white text-black' : 'text-white/70'}`}>
                {language === 'RU' ? 'Карта' : language === 'ZH' ? '精品店地图' : 'Map'}
              </button>
            </div>
          </div>

          <div className="h-[480px] overflow-hidden flex flex-col bg-[#fafafa]">
            {activeTab === 'chat' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                      <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-black text-white rounded-2xl rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-none shadow-sm'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {!hasStarted && (
                    <div className="pt-4 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTIONS.map((s, idx) => (
                          <button key={idx} onClick={() => handleSend(s)} className="text-[11px] bg-white border border-gray-200 hover:border-black px-3 py-1.5 rounded-full transition-all">
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl flex items-center space-x-1.5">
                        <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full animate-bounce delay-300"></div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div className="p-4 bg-white border-t border-gray-100 flex items-center">
                  <input 
                    type="text" value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={translations.assistant.input}
                    className="w-full text-xs py-3 border-none focus:ring-0"
                  />
                  <button onClick={() => handleSend()} className="ml-2 text-black"><i className="fa-solid fa-paper-plane"></i></button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-400">
                <p className="text-xs uppercase tracking-widest">Map Loading...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StyleAssistant;
