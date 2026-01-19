
import React from 'react';

interface AtelierSectionProps {
  translations: any;
}

const AtelierSection: React.FC<AtelierSectionProps> = ({ translations }) => {
  const t = translations.production;

  return (
    <section id="production" className="py-24 bg-[#fbfbfb] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-400 mb-4 block">Crafting Excellence</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">{t.title}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed italic">
            {t.sub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Stage 1: Design */}
          <div className="group">
            <div className="aspect-[4/5] overflow-hidden mb-6 bg-gray-200 relative">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop" 
                alt="Sketching" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              <span className="absolute bottom-4 left-4 text-[10px] font-bold text-white uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1">Phase 01</span>
            </div>
            <h4 className="text-lg font-serif font-bold mb-2">{t.stages[0]}</h4>
            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">Every silhouette is born from a hand-drawn inspiration.</p>
          </div>

          {/* Stage 2: Sourcing */}
          <div className="group">
            <div className="aspect-[4/5] overflow-hidden mb-6 bg-gray-200 relative">
              <img 
                src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop" 
                alt="Fabrics" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              <span className="absolute bottom-4 left-4 text-[10px] font-bold text-white uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1">Phase 02</span>
            </div>
            <h4 className="text-lg font-serif font-bold mb-2">{t.stages[1]}</h4>
            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">{t.materials}</p>
          </div>

          {/* Stage 3: Tailoring */}
          <div className="group">
            <div className="aspect-[4/5] overflow-hidden mb-6 bg-gray-200 relative">
              <img 
                src="https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=800&auto=format&fit=crop" 
                alt="Tailoring" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              <span className="absolute bottom-4 left-4 text-[10px] font-bold text-white uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1">Phase 03</span>
            </div>
            <h4 className="text-lg font-serif font-bold mb-2">{t.stages[2]}</h4>
            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">{t.ethical}</p>
          </div>
        </div>

        {/* Brand Philosophy Mini-Banner */}
        <div className="mt-24 p-12 border border-gray-100 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-serif font-bold mb-2 italic">Crafting with conscience.</h3>
            <p className="text-sm text-gray-500 uppercase tracking-widest">Sustainability is woven into every thread.</p>
          </div>
          <button className="px-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-rose-500 transition-all">
            The Sustainability Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default AtelierSection;
