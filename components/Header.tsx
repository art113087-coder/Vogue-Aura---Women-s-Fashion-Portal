
import React from 'react';
import { Category, Language } from '../types';

interface HeaderProps {
  onNavigate: (category: Category, targetId: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  translations: any;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, language, onLanguageChange, translations }) => {
  const languages: Language[] = ['EN', 'RU', 'ZH'];
  const labels = { EN: 'EN', RU: 'РУ', ZH: '中' };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => onNavigate('All', 'top')}
          >
            <span className="text-2xl font-serif font-bold tracking-tighter">VOGUE AURA</span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => onNavigate('All', 'shop')}
              className="text-xs font-bold tracking-widest text-gray-700 hover:text-black transition-colors uppercase"
            >
              {translations.nav.new}
            </button>
            <button 
              onClick={() => onNavigate('Dresses', 'shop')}
              className="text-xs font-bold tracking-widest text-gray-700 hover:text-black transition-colors uppercase"
            >
              {translations.nav.dresses}
            </button>
            <button 
              onClick={() => onNavigate('Jackets', 'shop')}
              className="text-xs font-bold tracking-widest text-gray-700 hover:text-black transition-colors uppercase"
            >
              {translations.nav.jackets}
            </button>
            <button 
              onClick={() => onNavigate('All', 'production')}
              className="text-xs font-bold tracking-widest text-gray-700 hover:text-black transition-colors uppercase"
            >
              {translations.nav.production}
            </button>
            <button 
              onClick={() => onNavigate('All', 'virtual')}
              className="text-xs font-bold tracking-widest text-rose-500 hover:text-rose-700 transition-colors uppercase flex items-center"
            >
              <i className="fa-solid fa-headset mr-2"></i>
              {translations.nav.virtual}
            </button>
          </nav>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 mr-2">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`text-[10px] font-bold tracking-tighter w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    language === lang 
                      ? 'bg-black text-white' 
                      : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {labels[lang]}
                </button>
              ))}
            </div>
            <button className="text-gray-600 hover:text-black"><i className="fa-solid fa-magnifying-glass text-sm"></i></button>
            <button className="text-gray-600 hover:text-black relative">
                <i className="fa-solid fa-bag-shopping text-sm"></i>
                <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
