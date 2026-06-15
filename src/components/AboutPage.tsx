import React from 'react';
import { Heart, Globe, ShieldCheck, HelpCircle, Users2, Leaf } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface AboutPageProps {
  language: Language;
}

export default function AboutPage({ language }: AboutPageProps) {
  const t = TRANSLATIONS[language];

  return (
    <div id="about-us-view" className="py-12 bg-[#FAF6EE] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Story header display */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309]">🌾 Maati Tradition</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#3F2E1E]">
            {language === 'en' ? 'Our Mother-Recipe Story' : language === 'hi' ? 'हमारी पवित्र गृह कथा' : 'हमार माई-सहेली क गोठ'}
          </h1>
          <div className="w-12 h-1 bg-[#B45309] mx-auto rounded" />
          <p className="text-sm text-[#857252] font-semibold">
            {language === 'en' ? 'How we started small to empower 240+ rural women & preserve traditional baking sanchas.' : 'कइसे गाँव की महिलाओं के हुनर ​​को राष्ट्रव्यापी मंच और सुरक्षा मिली।'}
          </p>
        </div>

        {/* Big split layout description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FBF9F4] p-6 sm:p-8 rounded-3xl border border-[#EADCC6] shadow-sm">
          
          <div className="lg:col-span-5 aspect-square rounded-2xl overflow-hidden border border-[#EADCC6]">
            {/* Curated traditional photo representing grandma/heritage cooking */}
            <img
              src="https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&w=600&q=80"
              alt="Grandmother baking traditional Thekua in village kitchen"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#5C4D3C] font-sans leading-relaxed">
            <h3 className="text-xl font-serif font-bold text-[#3F2E1E]">
              "Dadi Maa’s kitchen was more than a room, it was a sanctuary of rich earthy aromas."
            </h3>
            
            <p>
              At Maati, our mission is to reclaim the ancestral standard of premium Indian snacks. Modern refined snacks are full of palm oil, processed starch, artificial colors, and synthetic chemical shelf-extenders. We wanted our children to taste what real wheat, cardamoms, and pure Desi Ghee represent—which we call "Maa ke haath ka swad".
            </p>

            <p>
              We sources our wheat from organic crop fields in Sehore, Madhya Pradesh, and sugarcane jaggery directly from verified farmers in saran, Bihar. Every cookie is shaped individually by rolling out dough patties, pressing them upon handcrafted rosewood sanchas, and slow cooking on perfectly checked warmth levels.
            </p>
          </div>

        </div>

        {/* Our Values section cards map */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="bg-[#FBF9F4] border border-[#EADCC6]/80 p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 bg-[#B45309]/10 rounded-xl flex items-center justify-center text-[#B45309] mx-auto">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-[#3F2E1E]">Rural Self-Help</h3>
            <p className="text-xs text-[#5C4D3C] leading-relaxed">
              We employ 240+ rural women in Saran & Darbhanga self-help groups, secure stable livelihood, and support original handwork.
            </p>
          </div>

          <div className="bg-[#FBF9F4] border border-[#EADCC6]/80 p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-700 mx-auto">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-[#3F2E1E]">True Clean Label</h3>
            <p className="text-xs text-[#5C4D3C] leading-relaxed">
              Strictly zero palm oil, zero chemical food starches, zero artificial sweeteners. We use rock salt and cold-pressed groundnut oil Moyen.
            </p>
          </div>

          <div className="bg-[#FBF9F4] border border-[#EADCC6]/80 p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-[#0F766E] mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-[#3F2E1E]">Hygienic Seals</h3>
            <p className="text-xs text-[#5C4D3C] leading-relaxed">
              Prepared in stainless steel, clean center units and packed in food-grade, nitrogen-flushed multilayer laminates to lock out moisture.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
