import React, { useState } from 'react';
import { REVIEWS, TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReviewsProps {
  language: Language;
}

export default function Reviews({ language }: ReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = TRANSLATIONS[language];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const activeReview = REVIEWS[currentIndex];

  return (
    <section id="reviews-section" className="py-16 bg-[#FBF9F4] border-b border-[#EADCC6] relative overflow-hidden z-20">
      
      {/* Curved design accents */}
      <div className="absolute right-[-5%] top-[-5%] w-64 h-64 rounded-full border-4 border-dashed border-[#B45309]/10 pointer-events-none" />
      <div className="absolute left-[-5%] bottom-[-5%] w-72 h-72 rounded-full border-4 border-dashed border-[#B45309]/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block mb-2">⭐ Swaad Ke Saakshi</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#3F2E1E] tracking-tight">
            {t.reviews_heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#857252] font-medium mt-3">
            {t.reviews_sub}
          </p>
        </div>

        {/* Testimonial Active Display Box */}
        <div className="relative bg-[#FAF6EE] rounded-3xl border border-[#EADCC6] p-6 sm:p-10 shadow-lg min-h-[300px] flex flex-col justify-between">
          
          {/* Quote Mark background */}
          <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
            <Quote className="w-24 h-24 text-[#B45309]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Product Star ratings */}
              <div className="flex items-center gap-1.5">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
                <span className="text-xs font-sans text-[#857252] font-bold uppercase tracking-wider ml-2">Verified Taste</span>
              </div>

              {/* Review Text */}
              <p className="text-base sm:text-lg text-[#3F2E1E] leading-relaxed font-serif font-medium italic">
                "{activeReview.comment}"
              </p>

              {/* User details */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#EADCC6]/60">
                <img
                  src={activeReview.avatar}
                  alt={activeReview.userName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#B45309]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#3F2E1E] flex items-center gap-1.5">
                    {activeReview.userName}
                    {activeReview.verifiedPurchase && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-sans font-bold text-[#0F766E] border border-[#0F766E]/25 bg-[#0F766E]/5 rounded-full px-2 py-0.5">
                        <CheckCircle2 className="w-3 h-3 fill-emerald-600 text-white" /> Verified Buy
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-[#857252] font-semibold">{activeReview.location} • {activeReview.date}</p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Slider Selector Buttons & Dots */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-[#EADCC6]/30">
            
            {/* Pagination Bullet Indicators */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((r, idx) => (
                <button
                  key={r.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                    currentIndex === idx 
                      ? 'bg-[#B45309] w-6' 
                      : 'bg-[#EADCC6] hover:bg-[#B45309]/50'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Previous & Next controls */}
            <div className="flex gap-2.5">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[#EADCC6] hover:bg-[#EADCC6] bg-[#FBF9F4] flex items-center justify-center text-[#3F2E1E] transition-all focus:outline-none"
                title="Back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[#EADCC6] hover:bg-[#EADCC6] bg-[#FBF9F4] flex items-center justify-center text-[#3F2E1E] transition-all focus:outline-none"
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
