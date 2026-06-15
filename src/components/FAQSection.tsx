import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data';
import { Language } from '../types';

interface FAQSectionProps {
  language: Language;
}

export default function FAQSection({ language }: FAQSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({ 0: true });

  const toggleFAQ = (index: number) => {
    setOpenIndexes({
      ...openIndexes,
      [index]: !openIndexes[index]
    });
  };

  return (
    <section id="faq-section" className="py-16 bg-[#FBF9F4] relative z-20 border-b border-[#EADCC6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block mb-2">💡 Gyaan Kuan (FAQs)</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#3F2E1E] tracking-tight">
            Frequently Asked Queries
          </h2>
          <div className="w-12 h-1 bg-[#B45309] mx-auto mt-4 rounded" />
        </div>

        {/* Collapsible Accordion Stream */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = !!openIndexes[index];

            return (
              <div
                key={index}
                className="bg-[#FAF6EE] border border-[#EADCC6] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                {/* Accordion Toggle Header button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#3F2E1E] hover:text-[#B45309] transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#B45309]">Q.</span>
                    <span>{faq.question}</span>
                  </div>
                  <span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#B45309]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#857252]" />
                    )}
                  </span>
                </button>

                {/* Collapsible details pane wrapper */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C4D3C] leading-relaxed border-t border-[#EADCC6]/30 font-sans">
                    <div className="flex items-start gap-2.5">
                      <span className="text-emerald-700 font-bold uppercase shrink-0 text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 mt-0.5">Answer</span>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>


        {/* Additional support options footer */}
        <div className="text-center mt-12 p-6 bg-amber-500/5 rounded-2xl border border-dashed border-[#B45309]/30">
          <p className="text-xs sm:text-sm text-[#5C4D3C] font-semibold">
            Still got questions about jaggery sweetness values? Just ring us up!
          </p>
          <p className="text-xs text-[#857252] mt-1">
            📞 Call Toll-Free: <strong>1800-419-MAATI</strong> or WhatsApp <strong>+91 82106 12345</strong>
          </p>
        </div>

      </div>
    </section>
  );
}
