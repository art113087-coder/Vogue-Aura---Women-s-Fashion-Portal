
import React from 'react';

interface HeroProps {
  translations: any;
}

const Hero: React.FC<HeroProps> = ({ translations }) => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop" 
          alt="Fashion Model" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest mb-4">
            {translations.hero.tag}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            {translations.hero.title}
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-md">
            {translations.hero.sub}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#shop" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-xs font-bold uppercase tracking-widest text-white bg-black hover:bg-gray-800 transition-all duration-300 shadow-xl">
              {translations.hero.shopDresses}
            </a>
            <a href="#shop" className="inline-flex items-center justify-center px-8 py-4 border border-black text-xs font-bold uppercase tracking-widest text-black bg-transparent hover:bg-black hover:text-white transition-all duration-300">
              {translations.hero.viewJackets}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
