
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface VirtualShowroomProps {
  translations: any;
}

const VirtualShowroom: React.FC<VirtualShowroomProps> = ({ translations }) => {
  const [environment, setEnvironment] = useState<'day' | 'night'>('day');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  const backgrounds = {
    day: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000&auto=format&fit=crop',
    night: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2000&auto=format&fit=crop'
  };

  const productImg = 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop';

  const statusMessages = [
    "Initializing neural fabrics...",
    "Sampling environment lighting...",
    "Modeling silk physics...",
    "Synthesizing cinematic frames...",
    "Finalizing botanical textures...",
    "Applying high-end color grading..."
  ];

  const handleGenerateVideo = async () => {
    try {
      // Check for API key
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // Assuming success after trigger per instructions
      }

      setIsGenerating(true);
      setError(null);
      let statusIdx = 0;
      setGenerationStatus(statusMessages[0]);
      
      const statusInterval = setInterval(() => {
        statusIdx = (statusIdx + 1) % statusMessages.length;
        setGenerationStatus(statusMessages[statusIdx]);
      }, 8000);

      // Initialize AI right before call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Convert current image to base64 or use URI (Veo likes base64 for 'image' part)
      // For this demo, we'll prompt Veo to generate based on description + environment
      const prompt = `A cinematic fashion film of a model wearing a luxurious white silk evening gown with delicate floral embroidery, standing in a ${environment === 'day' ? 'bright sun-drenched modern minimalist terrace' : 'nighttime luxury moonlit balcony'}. High-end commercial style, 4k, smooth camera motion, slow motion.`;

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '9:16'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      clearInterval(statusInterval);
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        const localUrl = URL.createObjectURL(blob);
        setVideoUrl(localUrl);
      } else {
        throw new Error("Video generation failed to return a link.");
      }

    } catch (err: any) {
      console.error("Veo Error:", err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key Error. Please re-select your paid project key.");
        await window.aistudio.openSelectKey();
      } else {
        setError("Generation interrupted. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="virtual" className="relative h-[800px] bg-black overflow-hidden flex items-center">
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        <img 
          src={backgrounds[environment]} 
          className={`w-full h-full object-cover transition-opacity duration-1000 ${environment === 'day' ? 'opacity-40' : 'opacity-20'}`}
          alt="Virtual Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.2em]">Live Virtual Room</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            {translations.virtual.title}
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-md leading-relaxed">
            {translations.virtual.sub}
          </p>

          <div className="flex items-center space-x-6 mb-8">
            <button 
              onClick={() => { setEnvironment('day'); setVideoUrl(null); }}
              className={`flex items-center space-x-3 transition-all ${environment === 'day' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${environment === 'day' ? 'border-rose-400 bg-rose-400/10' : 'border-gray-700'}`}>
                <i className="fa-solid fa-sun text-sm"></i>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{translations.virtual.day}</span>
            </button>
            <button 
              onClick={() => { setEnvironment('night'); setVideoUrl(null); }}
              className={`flex items-center space-x-3 transition-all ${environment === 'night' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${environment === 'night' ? 'border-rose-400 bg-rose-400/10' : 'border-gray-700'}`}>
                <i className="fa-solid fa-moon text-sm"></i>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">{translations.virtual.night}</span>
            </button>
          </div>

          <button 
            onClick={handleGenerateVideo}
            disabled={isGenerating}
            className={`group relative overflow-hidden px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl transition-all hover:bg-rose-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <span className="relative z-10 flex items-center">
              {isGenerating ? (
                <><i className="fa-solid fa-circle-notch fa-spin mr-3"></i> Generating Film...</>
              ) : (
                <><i className="fa-solid fa-video mr-3 animate-pulse text-rose-500 group-hover:text-white"></i> Generate Cinematic Preview</>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-rose-400/20 to-rose-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
          
          {error && (
            <p className="mt-4 text-rose-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
              <i className="fa-solid fa-circle-exclamation mr-2"></i> {error}
            </p>
          )}
        </div>

        <div className="md:w-1/2 flex justify-center relative">
          <div className="relative w-full max-w-[400px] group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-gray-900">
              {videoUrl ? (
                <video 
                  src={videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover animate-in fade-in duration-1000"
                />
              ) : (
                <img 
                  src={productImg} 
                  className={`w-full h-full object-cover transition-all duration-1000 ${environment === 'night' ? 'brightness-75 contrast-125 saturate-50' : 'brightness-105'} ${isGenerating ? 'blur-sm scale-105' : ''}`}
                  alt="Virtual Dress"
                />
              )}
              
              {isGenerating && (
                <div className="absolute inset-0 z-40 bg-black/60 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(251,113,133,0.3)]"></div>
                  <p className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-2 animate-pulse">Veo AI at work</p>
                  <p className="text-gray-400 text-[9px] font-medium uppercase tracking-widest italic">{generationStatus}</p>
                </div>
              )}

              {!videoUrl && !isGenerating && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-rose-400/50 shadow-[0_0_15px_rgba(251,113,133,0.8)] animate-[scan_4s_ease-in-out_infinite] z-20"></div>
              )}

              <div className="absolute top-10 right-6 z-20 space-y-3">
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded text-white text-[8px] font-bold uppercase tracking-widest">
                  <i className="fa-solid fa-check mr-1 text-green-400"></i> {translations.virtual.fit}
                </div>
                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded text-white text-[8px] font-bold uppercase tracking-widest">
                  <i className="fa-solid fa-droplet mr-1 text-rose-300"></i> {translations.virtual.texture}
                </div>
              </div>
            </div>
            
            {!videoUrl && !isGenerating && (
              <button className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-rose-400 hover:text-white transition-all z-30 whitespace-nowrap">
                {translations.virtual.enter}
              </button>
            )}

            {videoUrl && (
              <button 
                onClick={() => setVideoUrl(null)}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl hover:bg-white hover:text-black transition-all z-30 whitespace-nowrap border border-white/10"
              >
                Reset Preview
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan { 
          0%, 100% { top: 0%; } 
          50% { top: 100%; } 
        }
      `}</style>
    </section>
  );
};

export default VirtualShowroom;
