import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartPulse, Clock } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { motion } from 'motion/react';

interface HeroProps {
  language: Language;
  onExploreClick: () => void;
  onOrderClick: () => void;
}

export default function Hero({ language, onExploreClick, onOrderClick }: HeroProps) {
  const t = TRANSLATIONS[language];

  // Variations for background circles
  const floatingSpices = [
    { text: '🌿 Elaichi', x: '12%', y: '15%', delay: 0 },
    { text: '🍯 Jaggery (Gur)', x: '78%', y: '12%', delay: 1.5 },
    { text: '🌾 Whole Wheat Atta', x: '82%', y: '65%', delay: 0.8 },
    { text: '🥮 Desi Ghee', x: '8%', y: '60%', delay: 2 },
  ];

  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#FAF6EE] pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#EADCC6]">
      {/* Dynamic Background Motifs */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="absolute top-10 left-10 w-48 h-48 text-[#B45309]" fill="currentColor" viewBox="0 0 100 100">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
        <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706]/10 blur-3xl opacity-30" />
        <div className="absolute left-[-5%] bottom-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#92400E] to-[#B45309]/15 blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Headline and Copywriting */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EADCC6]/50 text-[#857252] text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B45309] animate-spin-slow" />
              <span>{t.tagline} • 100% Homemade Taste</span>
            </motion.div>

            {/* Emotional Big Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#3F2E1E] leading-tight sm:leading-none tracking-tight"
            >
              {language === 'en' ? (
                <>
                  Traditional <span className="text-[#B45309] relative inline-block">Pure Taste
                    <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none"><path d="M0,5 Q50,0 100,5" stroke="#B45309" strokeWidth="4" fill="none" /></svg>
                  </span> From Our Family Kitchen
                </>
              ) : language === 'hi' ? (
                <>
                  माँ के आर्शीवाद से <span className="text-[#B45309]">शुद्ध सोंधा स्वाद</span>, सीधे आपकी थाली तक
                </>
              ) : (
                <>
                  माई के आशीष से <span className="text-[#B45309]">असली करारा स्वाद</span>, सीधे राउर दुआर तक
                </>
              )}
            </motion.h1>

            {/* Subscriptions / Descriptive */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-[#5C4D3C] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              {t.hero_sub}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#B45309] hover:bg-[#853A00] text-[#FAF6EE] rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer focus:outline-none"
              >
                <span>{t.cta_order}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[#B45309] text-[#B45309] hover:bg-[#B45309]/5 rounded-xl font-semibold transition-all flex items-center justify-center cursor-pointer focus:outline-none"
              >
                {t.cta_explore}
              </button>
            </motion.div>

            {/* Small reassurance bullet checklist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-6 text-xs text-[#857252] font-semibold border-t border-[#EADCC6]/60"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0F766E]" /> No Refined White Sugar
              </span>
              <span className="flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-[#0F766E]" /> Handcrafted with Desi Moyen
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#0F766E]" /> Vacuum-Sealed Freshness
              </span>
            </motion.div>

          </div>

          {/* Premium Packaging & Snack Composition (Right side) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            
            {/* Visual compositions frame */}
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-3xl bg-[#F1EAD9] border-4 border-[#EADCC6] shadow-xl p-6 flex flex-col justify-between overflow-hidden">
              
              {/* Wooden texture / traditional plate design */}
              <div className="absolute inset-0 bg-radial-gradient from-white/10 to-[#3F2E1E]/5 mix-blend-multiply opacity-45 pointer-events-none" />
              
              {/* Packaging Header Mock */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="font-serif font-bold text-xs text-[#B45309] tracking-wider border-b border-[#B45309]/35 pb-1">
                  🌿 शुद्ध • हस्तनिर्मित
                </div>
                <div className="bg-[#B45309] text-[#FAF6EE] text-[9px] font-bold px-2 py-1 rounded" style={{ transform: 'rotate(5deg)' }}>
                  A2 DESI GHEE
                </div>
              </div>

              {/* Main Illustration of Plates of Thekua & Nimki */}
              <div className="relative z-10 flex-1 flex flex-col justify-center items-center py-4">
                
                {/* Traditional clay platter visual display */}
                <div className="relative w-64 h-64 rounded-full bg-[#8C5E3C] border-8 border-[#3F2E1E]/20 shadow-inner flex items-center justify-center group">
                  
                  {/* Rotating Brass Outer border */}
                  <div className="absolute inset-[-12px] rounded-full border-4 border-dashed border-[#CCA366] opacity-30 animate-spin-slow" />
                  
                  {/* High Quality Food Photo fallback inside circle */}
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&w=500&q=80"
                      alt="Premium Thekua & Nimki Snacks"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark radial shade for food dramatic spotlight */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  {/* Overlapping small savory plate */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full border-4 border-[#EADCC6] bg-[#C59B27] shadow-xl overflow-hidden group">
                    <img
                      src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=300&q=80"
                      alt="Crunchy Nimki"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Trust Stamps overlay */}
                  <div className="absolute -top-4 -left-4 bg-[#0F766E] text-[#FBF9F4] text-[10px] font-bold px-2.5 py-1.5 rounded-full border border-white shadow-lg flex items-center gap-1">
                    ⭐⭐⭐⭐⭐ <span className="font-mono">4.9/5</span>
                  </div>
                </div>

              </div>

              {/* Packaging footer mockup details */}
              <div className="relative z-10 flex justify-between items-end border-t border-[#3F2E1E]/10 pt-3">
                <div>
                  <p className="text-[10px] font-sans text-[#857252] font-semibold leading-none uppercase tracking-widest">Village Sourced</p>
                  <p className="text-xs font-serif font-bold text-[#3F2E1E]">Darbhanga & Saran Roots</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-mono text-[#857252]">FSSAI LICENSE NO.</p>
                  <p className="text-[10px] font-bold text-[#0F766E]">#10023021008742</p>
                </div>
              </div>
            </div>

            {/* Interactive/Animated Floating Spice Badges */}
            {floatingSpices.map((spice, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: spice.delay,
                  ease: 'easeInOut',
                }}
                className="absolute hidden sm:flex items-center gap-1 bg-[#FAF6EE] text-[#5C4D3C] text-xs font-bold py-1.5 px-3 rounded-full border border-[#EADCC6] shadow-md z-20"
                style={{ left: spice.x, top: spice.y }}
              >
                <span>✨</span>
                <span>{spice.text}</span>
              </motion.div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}
