
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import StyleAssistant from './components/StyleAssistant';
import VirtualShowroom from './components/VirtualShowroom';
import AtelierSection from './components/AtelierSection';
import SocialGallery from './components/SocialGallery';
import AnnouncementBar from './components/AnnouncementBar';
import PromoAudio from './components/PromoAudio';
import { PRODUCTS, TRANSLATIONS, SOCIAL_LINKS } from './constants';
import { Category, Language } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lang, setLang] = useState<Language>('EN');
  const [apiKeySelected, setApiKeySelected] = useState<boolean | null>(null);
  
  const t = TRANSLATIONS[lang];

  // Perform a mandatory check for API key selection before allowing full app access,
  // as required for the Veo video generation features.
  useEffect(() => {
    const checkApiKeyStatus = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setApiKeySelected(hasKey);
      } else {
        // Fallback for standard development environments
        setApiKeySelected(true);
      }
    };
    checkApiKeyStatus();
  }, []);

  const handleNavigation = (category: Category, targetId: string) => {
    setActiveCategory(category);
    
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80; // Header height offset
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const openKeySelection = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      // As per instructions, assume success after triggering the selection dialog
      setApiKeySelected(true);
    }
  };

  // Render a mandatory API key selection screen if no key is present.
  if (apiKeySelected === false) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center space-y-12">
        <div className="space-y-4">
          <span className="text-rose-500 text-[10px] font-bold uppercase tracking-[0.5em] block animate-pulse">Connection Required</span>
          <h1 className="text-6xl font-serif font-bold text-white tracking-tighter">VOGUE AURA</h1>
        </div>
        <div className="max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          <p className="text-gray-400 text-sm leading-relaxed mb-10 italic">
            "To unlock our premium AI features, including the Virtual Showroom and cinematic video previews, please select a Google Cloud project with billing enabled."
          </p>
          <button 
            onClick={openKeySelection}
            className="w-full py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.3em] hover:bg-rose-500 hover:text-white transition-all shadow-xl"
          >
            Connect API Key
          </button>
          <div className="mt-8">
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] text-gray-500 hover:text-rose-400 transition-colors uppercase tracking-[0.2em] border-b border-gray-800 pb-1"
            >
              Billing Requirements <i className="fa-solid fa-arrow-up-right-from-square ml-1 text-[8px]"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Prevent UI rendering until the key status is confirmed.
  if (apiKeySelected === null) return null;

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Informational marquee at the very top */}
      <AnnouncementBar translations={t} />

      <Header 
        onNavigate={handleNavigation} 
        language={lang} 
        onLanguageChange={setLang}
        translations={t}
      />
      
      <main>
        <Hero translations={t} />

        {/* Promotions Section (Акции) */}
        <section id="promotions" className="py-12 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-rose-300"></span>
                <h2 className="text-xl font-serif italic text-gray-800 tracking-wide">{t.promo.title}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group relative bg-[#1a1a1a] p-8 h-[220px] overflow-hidden flex flex-col justify-center border border-gray-800">
                <span className="text-rose-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{t.promo.flash}</span>
                <h3 className="text-2xl font-serif text-white mb-4">{t.promo.flashTitle}<br /><span className="text-rose-400">-30% OFF</span></h3>
                <button className="w-fit text-[9px] font-bold uppercase tracking-widest text-white border-b border-rose-500 pb-1">{t.promo.claim}</button>
              </div>

              <div className="group relative bg-[#fcf8f7] p-8 h-[220px] overflow-hidden flex flex-col justify-center border border-rose-100">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{t.promo.bundle}</span>
                <h3 className="text-2xl font-serif text-gray-900 mb-4">{t.promo.bundleTitle}<br /><span className="text-rose-600">{t.promo.save} $50</span></h3>
                <button className="w-fit text-[9px] font-bold uppercase tracking-widest text-black border-b border-black pb-1">{t.promo.claim}</button>
              </div>

              <div className="group relative bg-white p-8 h-[220px] overflow-hidden flex flex-col justify-center border border-gray-100 shadow-sm">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{t.promo.gift}</span>
                <h3 className="text-2xl font-serif text-gray-900 mb-4">{t.promo.giftTitle}<br /><span className="text-gray-400 text-lg">{t.promo.giftSub}</span></h3>
                <button className="w-fit text-[9px] font-bold uppercase tracking-widest text-black border-b border-gray-200 pb-1">{t.promo.claim}</button>
              </div>
            </div>
          </div>
        </section>

        {/* Virtual Ad Section */}
        <VirtualShowroom translations={t} />

        {/* Categories / Filter Section */}
        <section id="shop" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-20 right-0 text-pink-50/20 text-[200px] pointer-events-none z-0">
            <i className="fa-solid fa-spa"></i>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <i className="fa-solid fa-leaf text-rose-200"></i>
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300">Selected Selection</span>
              </div>
              <h2 className="text-4xl font-serif font-bold mb-4">{t.shop.title}</h2>
              <p className="text-gray-500 max-w-sm">{t.shop.sub}</p>
            </div>
            
            <div className="mt-8 md:mt-0 flex space-x-8 border-b border-gray-100">
              {(['All', 'Dresses', 'Jackets'] as Category[]).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 relative ${
                    activeCategory === cat ? 'text-black' : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></div>}
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Atelier / Production Section */}
        <AtelierSection translations={t} />

        {/* Social / Instagram Gallery */}
        <SocialGallery translations={t} />
      </main>

      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-serif font-bold tracking-tighter">VOGUE AURA</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Curating luxury fashion for the modern woman. Quality, sustainability, and botanical grace.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href={SOCIAL_LINKS.instagram} target="_blank" className="hover:text-white transition-colors"><i className="fa-brands fa-instagram"></i></a>
              <a href={SOCIAL_LINKS.pinterest} target="_blank" className="hover:text-white transition-colors"><i className="fa-brands fa-pinterest"></i></a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" className="hover:text-white transition-colors"><i className="fa-brands fa-tiktok"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button onClick={() => handleNavigation('All', 'shop')} className="hover:text-white transition-colors">Shop All</button></li>
              <li><button onClick={() => handleNavigation('All', 'production')} className="hover:text-white transition-colors">The Atelier</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href={SOCIAL_LINKS.instagram} target="_blank" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href={SOCIAL_LINKS.tiktok} target="_blank" className="hover:text-white transition-colors">TikTok</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Language</h4>
            <p className="text-gray-400 text-[10px] leading-relaxed italic">
              Experience Vogue Aura in your preferred language. Select from the top menu.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-[10px] uppercase tracking-widest">
          © 2024 Vogue Aura. Global Elegance. {lang} Edition.
        </div>
      </footer>

      {/* Style assistance interface */}
      <StyleAssistant language={lang} translations={t} />

      {/* Audio player and environment chime */}
      <PromoAudio translations={t} />
    </div>
  );
};

export default App;
