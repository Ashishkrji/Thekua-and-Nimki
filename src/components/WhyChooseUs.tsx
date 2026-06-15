import React from 'react';
import { Award, Leaf, ShieldAlert, Package, Flame, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';

interface WhyChooseUsProps {
  language: Language;
}

export default function WhyChooseUs({ language }: WhyChooseUsProps) {
  const t = TRANSLATIONS[language];

  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      title: t.why_1_title,
      description: t.why_1_desc,
      color: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      icon: <Flame className="w-6 h-6 text-orange-600" />,
      title: t.why_2_title,
      description: t.why_2_desc,
      color: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      icon: <Award className="w-6 h-6 text-[#B45309]" />,
      title: t.why_3_title,
      description: t.why_3_desc,
      color: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      icon: <Package className="w-6 h-6 text-[#0F766E]" />,
      title: t.why_4_title,
      description: t.why_4_desc,
      color: 'bg-teal-500/10 border-teal-500/20'
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 bg-[#FAF6EE] relative z-20 border-b border-[#EADCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block mb-2">🏷️ Our Promise</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3F2E1E] tracking-tight">
            {t.why_heading}
          </h2>
          <p className="text-sm text-[#857252] mt-3 font-medium">
            {t.why_sub}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => (
            <div 
              key={index}
              className={`p-6 rounded-2xl bg-[#FBF9F4] border border-[#EADCC6] hover:shadow-lg transition-all duration-300 flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feat.color}`}>
                  {feat.icon}
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#3F2E1E]">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D3C] leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Decorative Small Dot for craft design detail */}
              <div className="flex items-center gap-1.5 pt-4 text-[10px] font-bold text-[#857252] uppercase tracking-widest border-t border-[#EADCC6]/40 mt-6">
                <Sparkles className="w-3 h-3 text-[#B45309]" />
                <span>Verified Clean Label</span>
              </div>
            </div>
          ))}
        </div>

        {/* FSSAI Registration Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#3F2E1E] text-[#FAF6EE] flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#5C4D3C] shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shrink-0">
              <span className="text-[10px] font-black font-sans text-emerald-800 tracking-tighter leading-none text-center">FSSAI<br/><span className="text-[8px] font-normal font-mono text-emerald-600">REGISTERED</span></span>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-wide">100% Food Safety Council Registered</h4>
              <p className="text-xs text-amber-200/70 font-mono">Maati Homemade Snacks • Certification Reg No. 10023021008742</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-center sm:text-right border-t sm:border-t-0 sm:border-l border-[#FAF6EE]/20 pt-2 sm:pt-0 sm:pl-4">
            📍 Darbhanga Village Hub<br/>Saran Rural Cooperative, Bihar
          </span>
        </div>

      </div>
    </section>
  );
}
