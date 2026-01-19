
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

interface SocialGalleryProps {
  translations: any;
}

const SocialGallery: React.FC<SocialGalleryProps> = ({ translations }) => {
  const t = translations.social;

  const FEED_IMAGES = [
    'https://images.unsplash.com/photo-1539109136881-3be06109d7c3?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529139572765-397392efea18?q=80&w=400&auto=format&fit=crop'
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-2">{t.title}</h2>
            <p className="text-gray-500 text-sm italic">{t.sub}</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 md:mt-0">
            <a 
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center hover:bg-rose-500 transition-all justify-center"
            >
              <i className="fa-brands fa-instagram mr-3 text-sm"></i>
              {t.follow}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {FEED_IMAGES.map((img, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden bg-gray-100">
              <img 
                src={img} 
                alt={`Instagram Post ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 text-white">
                <div className="flex items-center text-xs">
                  <i className="fa-solid fa-heart mr-1.5"></i> 1.2k
                </div>
                <div className="flex items-center text-xs">
                  <i className="fa-solid fa-comment mr-1.5"></i> 48
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialGallery;
