import React, { useState } from 'react';
import { INSTAGRAM_REELS, TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Play, Heart, Eye, X, Volume2, VolumeX, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InstagramReelsProps {
  language: Language;
}

export default function InstagramReels({ language }: InstagramReelsProps) {
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState(false);

  const t = TRANSLATIONS[language];
  const activeReel = INSTAGRAM_REELS.find(r => r.id === activeReelId);

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedReels({ ...likedReels, [id]: !likedReels[id] });
  };

  return (
    <section id="reels-section" className="py-16 bg-[#FAF6EE] border-b border-[#EADCC6] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block mb-2">📸 Swad Ki Kahani</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#3F2E1E] tracking-tight">
            {t.gallery_heading}
          </h2>
          <div className="w-12 h-1 bg-[#B45309] mx-auto my-3 rounded" />
          <p className="text-xs sm:text-sm text-[#857252] font-semibold mt-3">
            {t.gallery_sub}
          </p>
        </div>

        {/* Reels grid layout - looks like mobile app feed */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {INSTAGRAM_REELS.map((reel) => {
            const isLiked = likedReels[reel.id];

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReelId(reel.id)}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-[#EADCC6] bg-[#3F2E1E] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Visual Thumbnail */}
                <img
                  src={reel.videoThumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient shade overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 p-4 flex flex-col justify-between" />

                {/* Top labels */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white z-10">
                  <span className="text-[9px] font-bold uppercase tracking-widest bg-[#B45309] rounded-md px-1.5 py-0.5 border border-white/20">
                    {reel.category}
                  </span>
                  <span className="text-[9px] font-mono font-medium text-amber-200">{reel.duration}</span>
                </div>

                {/* Play icon badge indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-5 h-5 fill-white stroke-none ml-0.5" />
                  </span>
                </div>

                {/* Bottom Stats overlay details */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5 z-10">
                  <p className="text-[11px] font-sans font-medium line-clamp-2 text-amber-100/90 italic">
                    "{reel.title}"
                  </p>
                  
                  {/* Likes and Views counter line */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300">
                    <button
                      onClick={(e) => handleToggleLike(reel.id, e)}
                      className="flex items-center gap-1 hover:text-red-400 focus:outline-none focus:ring-0"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{isLiked ? 'Liked' : reel.likes}</span>
                    </button>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {reel.views}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Modern Reels Viewer Modal component block */}
      <AnimatePresence>
        {activeReelId && activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Background close overlay */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setActiveReelId(null)} />

            {/* Reel simulated layout */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="relative w-full max-w-[360px] aspect-[9/16] rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              {/* Fake video continuous preview */}
              <div className="absolute inset-0">
                <img
                  src={activeReel.videoThumbnail}
                  alt={activeReel.title}
                  className="w-full h-full object-cover blur-md scale-110 opacity-30"
                  referrerPolicy="no-referrer"
                />
                
                {/* Main center crisp food graphic loop */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={activeReel.videoThumbnail}
                    alt={activeReel.title}
                    className="w-full object-contain max-h-full"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dim light gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                </div>
              </div>

              {/* Reel Header */}
              <div className="relative z-10 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#B45309] flex items-center justify-center text-[10px] font-black border border-[#EADCC6]">M</div>
                  <div>
                    <p className="text-xs font-bold leading-none">maati_snacks</p>
                    <p className="text-[9px] text-[#857252] leading-none mt-0.5">Darbhanga Kitchen Hub</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Mute and Unmute simulated trigger */}
                  <button onClick={() => setIsMuted(!isMuted)} className="p-1 text-white hover:text-[#B45309] focus:outline-none">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setActiveReelId(null)} className="p-1 text-white hover:text-red-500 focus:outline-none">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Simulated video playback indicators */}
              <div className="absolute top-[80px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full text-[10px] text-white">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span>Simulated Process Loop ({activeReel.duration})</span>
              </div>

              {/* Bottom description / action sidebar */}
              <div className="relative z-10 p-4 space-y-4 text-white">
                
                {/* Description */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-yellow-300 font-bold mb-1 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dadi Maa's Recipe Secrets</span>
                  </div>
                  <p className="text-xs text-zinc-200 font-medium leading-relaxed italic">
                    "{activeReel.title}"
                  </p>
                </div>

                {/* Floating controls */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                  <button
                    onClick={(e) => handleToggleLike(activeReel.id, e)}
                    className="flex items-center gap-1 hover:text-red-400 focus:outline-none"
                  >
                    <Heart className={`w-4 h-4 ${likedReels[activeReel.id] ? 'fill-red-500 text-red-500' : ''}`} />
                    <span>{likedReels[activeReel.id] ? 'Liked!' : activeReel.likes}</span>
                  </button>

                  <span className="text-[10px] font-mono text-zinc-400">
                    👁️ {activeReel.views} views • PAN India delivery ready
                  </span>
                </div>

                {/* CTA Order now linked straight inside the Reel viewing */}
                <button
                  onClick={() => {
                    setActiveReelId(null);
                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full h-9 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-bold text-xs uppercase tracking-wider shadow focus:outline-none cursor-pointer"
                >
                  🌾 Check Pure Ingredients
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
