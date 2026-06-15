import React from 'react';
import { ArrowLeft, ShieldCheck, Truck, Scale, RefreshCw } from 'lucide-react';

interface PoliciesProps {
  policyType: 'shipping' | 'privacy' | 'refund' | 'terms';
  onBack: () => void;
}

export default function Policies({ policyType, onBack }: PoliciesProps) {
  
  const getPolicyContent = () => {
    switch (policyType) {
      case 'shipping':
        return {
          title: 'Careful Shipping & Dispatch Guidelines',
          icon: <Truck className="w-8 h-8 text-[#B45309]" />,
          intro: 'Because our traditional snacks are freshly baked without any commercial chemicals, we take extraordinary care in transit packaging.',
          sections: [
            {
              heading: '1. Fresh-Kneaded Dispatch Timeline',
              content: 'All orders are prepared in fresh morning batches within 24 hours of checkout. Once prepared and heat-sealed, they are picked up of our Darbhanga and Saran village kitchens by premium cargo couriers.'
            },
            {
              heading: '2. Transit Timelines across India',
              content: 'Ground delivery to Tier-1 metros (Delhi NCR, Mumbai, Pune, Bangalore, Patna, Ranchi) takes 3-4 business days. Other states and remote PINs take 4-5 business days.'
            },
            {
              heading: '3. Vacuum Preservation & Nitrogen Sealing',
              content: 'We flush all product bags with clean nitrogen to ensure oxidation is prevented. The crisps will remain 100% crispy and untouched during dry winter or humid monsoon transits.'
            }
          ]
        };
      case 'privacy':
        return {
          title: 'Humble Privacy & Customer Data Protection',
          icon: <ShieldCheck className="w-8 h-8 text-[#0F766E]" />,
          intro: 'We respect your digital boundaries just as much as we respect traditional recipe secrets.',
          sections: [
            {
              heading: '1. What and why we collect address data',
              content: 'We collect your name, mobile number, home address, and pin-code solely to safely dispatch your snack baskets. We never trade or rent this data to any marketing conglomerates.'
            },
            {
              heading: '2. WhatsApp Notifications Opt-in',
              content: 'By placing an order via our website, you only opt-in to receives dispatch updates, tracking URLs, and direct grandmother holiday wish greetings.'
            }
          ]
        };
      case 'refund':
        return {
          title: 'Trust-First Easy Refund Policy',
          icon: <RefreshCw className="w-8 h-8 text-orange-600" />,
          intro: 'If you are not delighted with the crispness, or if transit bumps crushed your crisp, we stand by your absolute peace of mind.',
          sections: [
            {
              heading: '1. Damage Replacement Guarantee',
              content: 'Simply snap a dynamic picture of the broken pack or crushed snacks, and WhatsApp it to +91 82106 12345. We will ship a fresh newly prepared batch for 100% FREE immediately.'
            },
            {
              heading: '2. 7-Day Devotion Refund Check',
              content: 'If you feel our sweet sweetness measurements did not meet your memory standard, let us know within 7 days of receiving. We will provide a complete refund, no returns of open packets required!'
            }
          ]
        };
      case 'terms':
        default:
        return {
          title: 'Traditional Snacking Terms and Conditions',
          icon: <Scale className="w-8 h-8 text-zinc-700" />,
          intro: 'Simple, fair policies to govern your digital interaction with Maati.',
          sections: [
            {
              heading: '1. Batch Variations Warning',
              content: 'Because everything is handcrafted manually on wood-fires inside rosewood moulds, slight variations in browning, thickness, and leaf-prints are completely normal and are indeed indicators of authentic, non-machine processes!'
            },
            {
              heading: '2. Correct Coordinates Obligation',
              content: 'Please double-check your mobile number. Our carrier partners will ring you up before physical delivery. Incorrect phone numbers may trigger automatic return-to-origin procedures.'
            }
          ]
        };
    }
  };

  const policy = getPolicyContent();

  return (
    <div id="policy-view" className="py-12 bg-[#FAF6EE] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-[#B45309] hover:text-[#853A00] mb-8 focus:outline-none cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {/* Content Box */}
        <div className="bg-[#FBF9F4] rounded-3xl border border-[#EADCC6] p-6 sm:p-10 shadow-sm space-y-6">
          
          <div className="flex items-center gap-4 border-b border-[#EADCC6]/60 pb-5">
            <div className="p-3 bg-[#FAF6EE] rounded-2xl border border-[#EADCC6]">
              {policy.icon}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-black text-[#3F2E1E]">{policy.title}</h1>
              <p className="text-xs text-[#857252] font-semibold mt-1">Maati Traditional Snacks Co • Policy Hub</p>
            </div>
          </div>

          <p className="text-sm font-medium text-[#5C4D3C] italic leading-relaxed">
            "{policy.intro}"
          </p>

          <div className="space-y-6 pt-2">
            {policy.sections.map((sect, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-sm sm:text-base font-serif font-bold text-[#3F2E1E]">{sect.heading}</h3>
                <p className="text-xs sm:text-sm text-[#5C4D3C] leading-relaxed font-sans">{sect.content}</p>
              </div>
            ))}
          </div>

          {/* Secure seals */}
          <div className="pt-6 border-t border-[#EADCC6]/40 text-center text-xs text-[#857252] font-mono uppercase tracking-widest">
            🛡️ 100% Trust Sourced • Darbhanga Village Co-operative No. 8421A
          </div>

        </div>

      </div>
    </div>
  );
}
