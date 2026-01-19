
import React from 'react';

interface AnnouncementBarProps {
  translations: any;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ translations }) => {
  return (
    <div className="relative z-[60] bg-[#0c0c0c] text-white py-2 overflow-hidden border-b border-white/5">
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className="flex items-center space-x-8 px-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-2"></span>
              {translations.promo.flash}: {translations.promo.flashTitle} -30%
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center opacity-50">
              <i className="fa-solid fa-star mr-2 text-[8px]"></i>
              VOGUE AURA {translations.hero.tag}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2"></span>
              {translations.promo.giftTitle} {translations.promo.save}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
