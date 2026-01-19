
import React, { useState, useRef, useEffect } from 'react';
import { AUDIO_ASSETS } from '../constants';

interface PromoAudioProps {
  translations: any;
}

const PromoAudio: React.FC<PromoAudioProps> = ({ translations }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const chimeRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = async () => {
    if (!bgAudioRef.current) return;

    if (isPlaying) {
      bgAudioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      setHasError(false);
      try {
        await bgAudioRef.current.play();
        setIsPlaying(true);
      } catch (e) {
        console.error("Audio playback failed:", e);
        setHasError(true);
        setTimeout(() => setHasError(false), 3000);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleToggle = () => {
      if (!isPlaying) {
        togglePlay();
      }
    };

    window.addEventListener('toggle-vibe-music', handleToggle);
    return () => window.removeEventListener('toggle-vibe-music', handleToggle);
  }, [isPlaying]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPlaying && !showAnnouncement) {
        triggerAnnouncement();
      }
    }, 45000);

    return () => clearInterval(timer);
  }, [isPlaying, showAnnouncement]);

  const triggerAnnouncement = () => {
    if (chimeRef.current) {
      chimeRef.current.play().catch(() => {});
      setShowAnnouncement(true);
      setTimeout(() => setShowAnnouncement(false), 5000);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[60] flex items-center space-x-3">
        <button 
          onClick={togglePlay}
          disabled={isLoading}
          className={`w-12 h-12 rounded-full border shadow-2xl flex items-center justify-center transition-all duration-300 relative ${
            isPlaying 
              ? 'bg-rose-500 text-white border-rose-500 shadow-rose-500/20' 
              : hasError 
                ? 'bg-rose-50 text-rose-500 border-rose-200' 
                : 'bg-white text-black border-gray-100 hover:scale-105'
          }`}
          title={translations.audio.radio}
        >
          {isLoading ? (
            <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
          ) : isPlaying ? (
            <div className="flex items-center space-x-0.5">
              <span className="w-0.5 h-3 bg-white animate-[music-wave_0.8s_ease-in-out_infinite]"></span>
              <span className="w-0.5 h-5 bg-white animate-[music-wave_1.2s_ease-in-out_infinite_0.2s]"></span>
              <span className="w-0.5 h-4 bg-white animate-[music-wave_1s_ease-in-out_infinite_0.4s]"></span>
            </div>
          ) : hasError ? (
            <i className="fa-solid fa-exclamation text-xs"></i>
          ) : (
            <i className="fa-solid fa-play text-xs ml-1"></i>
          )}

          {hasError && (
            <div className="absolute -top-10 left-0 bg-rose-500 text-white text-[8px] font-bold py-1 px-2 rounded whitespace-nowrap animate-bounce">
              ERROR LOADING AUDIO
            </div>
          )}
        </button>

        <div className={`transition-all duration-500 overflow-hidden ${isPlaying ? 'max-w-[250px] opacity-100' : 'max-w-0 opacity-0'}`}>
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg border border-gray-100 whitespace-nowrap shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest block leading-none">
                {translations.audio.playing}
              </span>
            </div>
            <span className="text-[10px] font-medium text-gray-800 block mt-1">
              {translations.audio.radio}
            </span>
          </div>
        </div>
      </div>

      {showAnnouncement && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-black text-white px-6 py-3 rounded-full flex items-center space-x-3 shadow-2xl border border-rose-500/50">
            <i className="fa-solid fa-bullhorn text-rose-400 animate-bounce"></i>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              {translations.audio.announcement}
            </span>
          </div>
        </div>
      )}

      <audio 
        ref={bgAudioRef} 
        loop 
        src={AUDIO_ASSETS.background} 
        crossOrigin="anonymous"
        onCanPlay={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onError={() => {
            setHasError(true);
            setIsPlaying(false);
            setIsLoading(false);
        }}
      />
      <audio ref={chimeRef} src={AUDIO_ASSETS.announcementChime} crossOrigin="anonymous" />

      <style>{`
        @keyframes music-wave {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
      `}</style>
    </>
  );
};

export default PromoAudio;
