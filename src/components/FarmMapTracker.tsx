import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Compass, ShieldCheck, Truck, ArrowRight, Sun, Award, Leaf } from 'lucide-react';
import { Language } from '../types';

interface FarmMapTrackerProps {
  language: Language;
}

interface SourceLocation {
  id: string;
  name: Record<Language, string>;
  state: Record<Language, string>;
  ingredient: Record<Language, string>;
  coordinates: { x: number; y: number }; // Percentage coordinate on our SVG map
  description: Record<Language, string>;
  story: Record<Language, string>;
  image: string;
  fact: Record<Language, string>;
}

const LOCATIONS: SourceLocation[] = [
  {
    id: 'gaya-ghee',
    name: {
      en: 'Gaya pastures',
      hi: 'गया गौशाला',
      bho: 'गया क दूध-डेरी'
    },
    state: {
      en: 'South Bihar',
      hi: 'दक्षिण बिहार',
      bho: 'दक्खिन बिहार'
    },
    ingredient: {
      en: 'A2 Cow Desi Ghee',
      hi: 'गाय का शुद्ध ए२ सुगन्धित घी',
      bho: 'गाय के शुद्ध दानेदार घी'
    },
    coordinates: { x: 38, y: 55 },
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=500&q=80',
    description: {
      en: 'Sourced from local cowherds in the historic plains of Gaya, where traditional "bilona" churning methods yield golden A2 ghee.',
      hi: 'गया के धार्मिक और ऐतिहासिक चारागाहों में चरने वाली देसी गायों के दूध से पारंपरिक बिलोना पद्धति द्वारा दानेदार घी निकाला जाता है।',
      bho: 'गया के पावन मैदानन में घास चरईया गाय के दूध से मलाई काढ़ के, धीमा आँच पर पका के सुंदर दानेदार घी तैयार कइल जाला।'
    },
    story: {
      en: 'The rich grass in this region provides excellent fat content, giving the ghee a distinct aroma that defines Maati’s flakiness.',
      hi: 'इस क्षेत्र की हरी दूब में मौजूद प्राकृतिक पोषक तत्वों के कारण घी में एक अनोखा सोंधापन होता है, जो ठेकुआ को खस्ता बनाता है।',
      bho: 'इहाँ क हरी दूब आ जड़ी-बूटी खइला से घी में खास महक आवेला, जवने क मोयन पड़ते कड़ाई गमक उठेली।'
    },
    fact: {
      en: '🐄 Pure A2 Bilona | Churned at dawn',
      hi: '🐄 शत-प्रतिशत शुद्ध ए२ बिलोना | ब्रह्ममुहूर्त में मन्थन',
      bho: '🐄 दम शुद्ध ए२ बिलोना | भोर के मथान क घी'
    }
  },
  {
    id: 'saran-jaggery',
    name: {
      en: 'Saran Cane Co-ops',
      hi: 'सारण गुड़ सहकारी समिति',
      bho: 'सारण क लाल कोल्हू'
    },
    state: {
      en: 'North Bihar',
      hi: 'उत्तर बिहार',
      bho: 'सारण जिला, बिहार'
    },
    ingredient: {
      en: 'Organic Cane Jaggery (Gur)',
      hi: 'जैविक कोल्हू का शुद्ध गुड़',
      bho: 'खेत क सोंध भेलवा गुड़'
    },
    coordinates: { x: 42, y: 32 },
    image: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&w=500&q=80',
    description: {
      en: 'Grown along the fertile Gandak river basin without urea or industrial pesticides, pressed into solid red jaggery cakes.',
      hi: 'गंडक नदी की उपजाऊ दोमट मिट्टी में बिना यूरिया के उगाए गए गन्ने। कोल्हू से ताजा रस निकालकर लोहे की बड़ी कढ़ाई में उबाला जाता है।',
      bho: 'गंडक मईया क उपजाऊ माटी में बिना केमिकल के उपजल गँड़ारी। कोल्हू से रस काढ़ के दम लाल भेलवा तैयार कइल जाला।'
    },
    story: {
      en: 'Sugarcane juice is slow-boiled over dry cane fibers (bagasse) in open-air clay ovens, capturing a caramel note without any sulfur.',
      hi: 'गन्ने की खोई की आंच पर कढ़ाए गए इस गुड़ में कोई ब्लीचिंग केमिकल या सल्फर नहीं होता, जिससे इसके सोंधेपन में कोई कड़वाहट नहीं आती।',
      bho: 'गन्ना के सूखा खोई के आँच पर पाकल गुड़ क स्वाद दम असली होला, जेकरा में कौनों केमिकल क मिलावट नइखे।'
    },
    fact: {
      en: '🌾 Sulphur-Free | Hand-filtered sugarcane',
      hi: '🌾 सल्फर मुक्त | हाथ से छाना हुआ गन्ने का रस',
      bho: '🌾 बिना केमिकल क | हाथ से छानल कोल्हू क रस'
    }
  },
  {
    id: 'sehore-wheat',
    name: {
      en: 'Sehore Farms',
      hi: 'सीहोर शरबती खेत',
      bho: 'सीहोर क शरबती गेहूँ'
    },
    state: {
      en: 'Madhya Pradesh',
      hi: 'मध्य प्रदेश',
      bho: 'मध्य प्रदेश'
    },
    ingredient: {
      en: 'Sharbati Whole Wheat (Atta)',
      hi: 'सीहोर शरबती चोकरयुक्त गेंहू',
      bho: 'सीहोर क भारी मखमली गेहूं'
    },
    coordinates: { x: 12, y: 72 },
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    description: {
      en: 'Blessed by deep black soil and heavy dew, Sehore produces golden, heavy wheat kernels containing rich dietary fibers.',
      hi: 'सीहोर के खेतों की गहरी काली मिट्टी और ओस की बूंदों से परिपक्व होने वाला शरबती गेंहू, जो अत्यंत पौष्टिक और खस्ता होता है।',
      bho: 'इहाँ क कारी माटी गेहूँ के अलग मिठास देवेली, जवने से आटा दरदरा पिसायला पर भारी सोंधापन आ जाला।'
    },
    story: {
      en: 'We slow-grind this grain in local stone mills (Janta or Stone Chakkis) to preserve gluten structures and avoid heating the wheat.',
      hi: 'हम इसे पारंपरिक पत्थर की चक्की पर बिना गरम किए धीरे-धीरे पीसते हैं ताकि इसके प्राकृतिक औषधीय तत्व और फाइबर नष्ट न हों।',
      bho: 'गेंहू के पत्थर क शांत चक्की पर धीरे-धीरे पीस क चोकर सहित आटा निकालल जाला जेसे सुहाली आ ठेकुआ दम सुदृढ़ बनेला।'
    },
    fact: {
      en: '🌾 Stone-Milled | High Fiber chokar',
      hi: '🌾 चक्की का चोकरदार आटा | मैदा मुक्त',
      bho: '🌾 जांता क पीसल दरदरा आटा | नो मैदा'
    }
  },
  {
    id: 'patna-kitchen',
    name: {
      en: 'Maati Central Kitchen',
      hi: 'माटी पारंपरिक मुख्य रसोई',
      bho: 'माटी क केंद्रीय परान-रसोई'
    },
    state: {
      en: 'Patna, Bihar',
      hi: 'पटना, बिहार',
      bho: 'पटना, बिहार'
    },
    ingredient: {
      en: 'Artisanal Assembly & Baking',
      hi: 'दादी माँ के सांचे की ढलाई',
      bho: 'दीदी लोगन क सनेह घान'
    },
    coordinates: { x: 50, y: 46 },
    image: 'https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&w=500&q=80',
    description: {
      en: 'Our central sacred kitchen led by rural artisan women. Everything is kneaded, pressed on wooden sanchas, and slow-fried.',
      hi: 'पटना की गंगा किनारे स्थित वह पावन रसोई जहाँ आस-पास के गाँवों की दीदी लोग इकट्ठा होकर पारंपरिक चूल्हों पर ठेकुआ और निमकी ढालती हैं।',
      bho: 'पटना में माटी क उ पवित्र रसोई जहवां सवेरे गंगा मइया क नाम ले के दीदी लोग परात सजावेली आ काठ के सांचा पर ठेकुआ ढालेले।'
    },
    story: {
      en: 'This is where coordinates meet: Gaya’s ghee, Saran’s jaggery, and Sehore’s flour align to form our golden heritage.',
      hi: 'यहीं पर गया का घी, सारण का गुड़ और सीहोर का आटा आपस में मिल कर माँ के हाथ के सोंधे स्वाद का जीवित इतिहास लिखते हैं।',
      bho: 'एहि रसोईया में गया क घी, सारण क गुड़ आ सीहोर क आटा एक संगे मिलके माँ के आशीर्वाद नियन अद्भुत मिठास बनेला।'
    },
    fact: {
      en: '🍳 Women-Owned | Wood & Slow clay ovens',
      hi: '🍳 महिला स्व-सहायता संघ | मिटटी का सोंधा चूल्हा',
      bho: '🍳 दीदी लोगन क उद्यम | माटी के आँच क तपस्या'
    }
  }
];

const LOGISTICS_STEPS = [
  {
    title: { en: 'Hand-Sourcing & Milking', hi: 'शुद्ध सामग्री की विदाई', bho: 'माटी से जुड़ाव' },
    desc: {
      en: 'Milking Gaya cows and cutting Saran sugarcane at dawn under farmer supervision.',
      hi: 'किसान की निगरानी में गया की गायों से दूध दोहना और सारण में ओस भरे गन्ने काटना।',
      bho: 'गया में सवेरे मवेशी के दूध कढ़ाना अउर सारण में ताज़ा गँड़ारी काटना।'
    },
    icon: '🌾'
  },
  {
    title: { en: 'Traditional Cold Milling', hi: 'शीतल पत्थर पिसाई', bho: 'पत्थर जाता घिसाई' },
    desc: {
      en: 'Whole wheat parameters checked, slow-clayed milling preserves fibers and locks dry flavor.',
      hi: 'कच्चे गेहूं को पारंपरिक चक्की पर धीरे-धीरे पीसना, जिससे प्राकृतिक मिठास बरकरार रहे।',
      bho: 'गेहूं क जाता पर सहज पिसाई, चोकरदार दरदरपन और सुगंध की रक्षा।'
    },
    icon: '⚙️'
  },
  {
    title: { en: 'Sancha Hand-Pressing', hi: 'लकड़ी सांचा ढलाई', bho: 'काठ साँचा पर दाब' },
    desc: {
      en: 'Kneaded with cow ghee moyen by rural women, individually molded on rosewood guides.',
      hi: 'गाँव की महिलाओं द्वारा पवित्रता से घी के मोयन में गूंधकर, नक्काशीदार शीशम सांचे पर दबाव।',
      bho: 'दीदी लोग द्वारा सुगन्धित घी क मिलाव, काठ के सांचा पर बारीकी से सुंदर पत्ती क छाप।'
    },
    icon: '📜'
  },
  {
    title: { en: 'Slow Iron Cauldron Fry', desc: 'Slow baking inside heavy iron pans using natural peanut oil or golden ghee on clay warmth.', hi: 'धीमी कढ़ाई की तपस्या', desc_hi: 'लोहे की भारी कड़ाही में धीमी आंच पर घी या मूंगफली तेल में सुनहरी लाल होने तक पकाना।', bho: 'धीमा लोहा कढ़ाई छनाई', desc_bho: 'धीमा आंच पर घी चाहे सुगन्धित तेल में कढ़ाई क भीतर सोंध ताँबा रंग आवे तक छनाई।' },
    desc: {
      en: 'Slow frying in pure groundnut oil or golden ghee inside traditional heavy iron cauldrons.',
      hi: 'लोहे की कड़ाही में धीमी आंच पर घी या मूंगफली तेल में तांबे जैसा सुनहरा रंग आने तक पकाना।',
      bho: 'धीमा आंच पर शुद्ध घी चाहे तेल में सोने नियन रंग होखे तक धीमे-धीमे तलाई।'
    },
    icon: '🔥'
  },
  {
    title: { en: 'Airlock Sealed Delivery', hi: 'नाइट्रोजन वैक्यूम पैक', bho: 'वैक्यूम हवा-बंद पोटली' },
    desc: {
      en: 'Nitrogen-flushed double foil wrap blocks moisture, delivering absolute crispness nationwide.',
      hi: 'बिना केमिकल नमी को रोकने के लिए हवा-बंद नाइट्रोजन पैकिंग। कड़क सोंधा स्वाद सीधे आपके द्वार।',
      bho: 'डबल एयरलॉक पैक जेसे कुरकुरा सुगन्धित स्वाद २ महीना ले दम सुरक्षित पूरा भारत में।'
    },
    icon: '🚀'
  }
];

export default function FarmMapTracker({ language }: FarmMapTrackerProps) {
  const [selectedLocation, setSelectedLocation] = useState<SourceLocation>(LOCATIONS[3]); // Default to Patna Kitchen
  const [activeDashboardTab, setActiveDashboardTab] = useState<'ghee' | 'jaggery' | 'impact'>('ghee');

  return (
    <section id="logistics-map-section" className="py-16 bg-[#F5EEDC] border-b border-[#EADCC6] relative overflow-hidden">
      {/* Decorative grain backdrop */}
      <div className="absolute right-0 top-0 w-64 h-64 opacity-5 pointer-events-none select-none">
        <Compass className="w-full h-[#FAF6EE]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#B45309] uppercase block mb-2">
            📍 {language === 'en' ? 'Farm-to-Kitchen Map' : language === 'hi' ? 'खेत से थाली तक का सफर' : 'कोल्हा से कढ़ाई क सफ़र'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#3F2E1E] tracking-tight">
            {language === 'en' ? 'Trace Our Pure Ingredients Sourcing' : language === 'hi' ? 'गंगा घाटी की पवित्र सामग्री' : 'नदी आ खेतन क असली शुद्धता'}
          </h2>
          <div className="w-16 h-1 bg-[#B45309] mx-auto my-4 rounded" />
          <p className="text-sm sm:text-base text-[#857252] font-semibold leading-relaxed">
            {language === 'en' 
              ? 'Our farm-to-kitchen logistics connects small-hold cooperative farmers directly with our grandmother’s baking kitchen in Patna.'
              : language === 'hi'
                ? 'माटी की सुगंध हवा में नहीं, बल्कि सीधे गया की गौशाला, सारण के गन्ने के खेतों और सीहोर के उपजाऊ चक्रव्यूहों से आती है।'
                : 'हमनी क घी, गुड़ आ गेहूँ कौनों केमिकल फैक्ट्री क ना, बलुक मेहनती किसान भाई लोगन के खेत आ गौशाला क अमूल्य धरोहर ह।'}
          </p>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Responsive SVG Map of Rural India (Bihar & MP Focused) - 7 cols */}
          <div className="lg:col-span-7 bg-[#FAF6EE] p-6 rounded-2xl border-2 border-[#EADCC6] shadow-md relative">
            <div className="mb-4 flex justify-between items-center bg-[#F2ECD9] p-3 rounded-xl border border-[#EADCC6]">
              <span className="text-[11px] font-mono font-black text-[#B45309] tracking-wider uppercase flex items-center gap-1.5 animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                {language === 'en' ? 'Interactive India Sourcing Map' : language === 'hi' ? 'इंटरैक्टिव मानचित्र - स्पर्श करें' : 'नक्शा पर क्लिक करीं'}
              </span>
              <span className="text-xs text-[#857252] font-semibold hidden md:block">
                {language === 'en' ? 'Click checkpoints to trace logistics' : language === 'hi' ? 'विवरण देखने के लिए केंद्रों पर क्लिक करें' : 'चेकपॉइंट दबा के देखीं'}
              </span>
            </div>

            {/* Custom SVG Map Container */}
            <div className="relative aspect-[4/3] w-full bg-[#FAF6EE] rounded-xl border border-[#EADCC6]/60 overflow-hidden flex items-center justify-center">
              
              {/* SVG drawing containing background mesh, state outlines (mocked beautifully), and routes */}
              <svg viewBox="0 0 500 375" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
                {/* Grid Background Patterns */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#EADCC6" strokeWidth="0.5" opacity="0.4" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Simulated Ganges River Flow line */}
                <path 
                  d="M 50,150 Q 150,160 250,165 T 380,170 T 480,180" 
                  fill="none" 
                  stroke="#60A5FA" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  opacity="0.65" 
                />
                <text x="180" y="152" fill="#3B82F6" className="text-[9px] font-serif italic font-bold opacity-80" transform="rotate(3, 180, 152)">
                  ~ Holy Ganga River ~
                </text>

                {/* State outline indicators - Bihar and MP regions */}
                {/* Bihar box */}
                <rect x="160" y="100" width="220" height="130" rx="10" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
                <text x="210" y="118" fill="#64748B" className="text-[10px] font-mono font-black uppercase tracking-widest opacity-80">BIHAR</text>
                
                {/* MP Box */}
                <rect x="25" y="210" width="160" height="120" rx="10" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
                <text x="50" y="228" fill="#64748B" className="text-[10px] font-mono font-black uppercase tracking-widest opacity-80">MADHYA PRADESH</text>

                {/* Flow lines from sources to Patna Central Kitchen */}
                {/* Gaya to Patna */}
                <path 
                  d="M 190,206 Q 210,190 250,172.5" 
                  fill="none" 
                  stroke="#B45309" 
                  strokeWidth="2" 
                  strokeDasharray="4 4" 
                  className="animate-[dash_10s_linear_infinite]"
                />
                {/* Saran to Patna */}
                <path 
                  d="M 210,120 Q 230,135 250,172.5" 
                  fill="none" 
                  stroke="#B45309" 
                  strokeWidth="2" 
                  strokeDasharray="4 4" 
                />
                {/* Sehore to Patna */}
                <path 
                  d="M 60,270 Q 150,220 250,172.5" 
                  fill="none" 
                  stroke="#B45309" 
                  strokeWidth="2" 
                  strokeDasharray="5 5" 
                />

                {/* Radiant animated dots on active lines */}
                <circle cx="210" cy="188" r="4.5" fill="#B45309" opacity="0.75" className="animate-ping" />
                <circle cx="225" cy="140" r="4.5" fill="#B45309" opacity="0.75" className="animate-ping" />
                <circle cx="120" cy="245" r="4.5" fill="#B45309" opacity="0.75" className="animate-ping" />

                {/* Central Kitchen Destination Indicator */}
                <g transform="translate(250, 172.5)">
                  <circle cx="0" cy="0" r="14" fill="#B45309" opacity="0.15" />
                  <circle cx="0" cy="0" r="8" fill="#B45309" className="animate-pulse" />
                  <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                  <text x="12" y="4" fill="#3F2E1E" className="text-[10px] font-bold">Patna HQ</text>
                </g>
              </svg>

              {/* DOM Overlays - Absolute positioning farm checkpoints so they overlap beautifully inside iframe */}
              {LOCATIONS.map((loc) => {
                const isActive = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                    className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-2 rounded-full cursor-pointer transition-all duration-300 group/btn focus:outline-none ${
                      isActive 
                        ? 'bg-[#B45309] text-white scale-125 ring-4 ring-[#B45309]/30 shadow-lg' 
                        : 'bg-white hover:bg-[#F2ECD9] text-[#B45309] scale-100 shadow border border-[#EADCC6]'
                    }`}
                    title={loc.ingredient[language]}
                  >
                    <MapPin className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    
                    {/* Tiny state name badge in proximity */}
                    <span className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#3F2E1E] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap opacity-80 group-hover/btn:opacity-100 transition-opacity">
                      {loc.name[language]}
                    </span>
                  </button>
                );
              })}

              {/* Map legendary guide box */}
              <div className="absolute bottom-4 left-4 bg-[#FAF6EE]/95 border border-[#EADCC6] p-2.5 rounded-lg text-[9px] font-mono text-[#857252] space-y-1 block max-w-[140px] shadow">
                <p className="font-bold border-b border-[#EADCC6] pb-1 text-[#3F2E1E]">🗺️ Guide Legend</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B45309]"></span>
                  <span>Active Sources</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-0.5 bg-[#60A5FA] inline-block"></span>
                  <span>River Ganges</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-0.5 bg-[#B45309] border-t border-dashed inline-block"></span>
                  <span>Logistics Path</span>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Source Panel & Card Detailing - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLocation.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl border-2 border-[#EADCC6] shadow-md flex flex-col justify-between h-full relative"
              >
                {/* Top Sourcing tag */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase text-[#B45309] px-2 py-0.5 bg-[#B45309]/10 rounded border border-[#B45309]/20">
                      {selectedLocation.ingredient[language]}
                    </span>
                    <h3 className="text-xl font-serif font-black text-[#3F2E1E] mt-2 mb-1 flex items-center gap-1">
                      {selectedLocation.name[language]}
                    </h3>
                    <p className="text-xs font-mono font-medium text-amber-700">
                      📍 {selectedLocation.state[language]}
                    </p>
                  </div>
                  
                  {/* Sourcing Seal Badge */}
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0" title="Authenticity Guaranteed">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>

                {/* Sourcing Image with elegant rounded borders */}
                <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 border border-[#EADCC6]">
                  <img 
                    src={selectedLocation.image} 
                    alt={selectedLocation.name[language]}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3">
                    <p className="text-[10px] font-mono font-bold text-amber-200">
                      {selectedLocation.fact[language]}
                    </p>
                  </div>
                </div>

                {/* Bullet detail summaries */}
                <div className="space-y-3.5 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase text-[#857252] block mb-1">
                      {language === 'en' ? 'Sourcing Standard' : language === 'hi' ? 'सामग्री का इतिहास' : 'सामग्री क इतिहास'}
                    </span>
                    <p className="text-xs text-[#3F2E1E] leading-relaxed font-sans">
                      {selectedLocation.description[language]}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-black uppercase text-[#857252] block mb-1">
                      {language === 'en' ? 'Emotional Handcraft Touch' : language === 'hi' ? 'दादी माँ की सीख' : 'माई क दुलार'}
                    </span>
                    <p className="text-xs text-[#857252] italic font-medium leading-relaxed font-serif">
                      “{selectedLocation.story[language]}”
                    </p>
                  </div>
                </div>

                {/* Quick CTA to visit list of snacks */}
                <div className="pt-4 border-t border-[#EADCC6]/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#857252] font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Leaf className="w-4 h-4 text-emerald-600 animate-pulse" />
                    {language === 'en' ? '100% Traceable Sourcing' : language === 'hi' ? 'शत-प्रतिशत पता लगाने योग्य' : 'दम शुद्ध आ साफ़'}
                  </span>
                  <a 
                    href="#products-section"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="text-[#B45309] hover:text-[#3F2E1E] font-black flex items-center gap-1 group"
                  >
                    {language === 'en' ? 'Browse Delights' : language === 'hi' ? 'व्यंजन देखें' : 'सोंध मिठाई'}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* --- INTERACTIVE SOURCE PURITY & TRANSPARENCY VISUALIZER DASHBOARD --- */}
        <div id="sourcing-transparency-dashboard" className="mt-12 bg-white rounded-2xl border-2 border-[#EADCC6] p-6 sm:p-8 shadow-md">
          <div className="border-b border-[#EADCC6] pb-4 mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <span className="text-[10px] font-mono font-black text-[#B45309] uppercase block tracking-wider">
                🔬 {language === 'en' ? 'Quality Testing Transparency Ledger' : 'लैब शुद्धता एवं किसान भुगतान लेखा'}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-[#3F2E1E] mt-0.5">
                {language === 'en' ? 'Interactive Source Data & Impact Scorecard' : 'सामग्री की वैज्ञानिक जाँच एवं समाज पर प्रभाव'}
              </h3>
              <p className="text-xs text-[#857252] font-semibold mt-1">
                {language === 'en' 
                  ? 'We trace every drop of A2 cow ghee and jaggery back to its chemistry reports. Tap below to inspect our real-time lab parameters.'
                  : 'हम अपनी प्रत्येक सामग्री की वास्तविक लैब जाँच रिपोर्ट और किसान सहकारी सहायता सूचकांक को सार्वजनिक रखते हैं।'}
              </p>
            </div>

            {/* Custom Interactive Tabs for Data Viz */}
            <div className="flex flex-wrap gap-2">
              {(['ghee', 'jaggery', 'impact'] as const).map((tab) => {
                const labels: Record<string, Record<Language, string>> = {
                  ghee: { en: '🥛 Cow Ghee Lab', hi: '🥛 घी लैब रिपोर्ट', bho: '🥛 घी लैब' },
                  jaggery: { en: '🌾 Jaggery Sugar', hi: '🌾 गुड़ सल्फर रिपोर्ट', bho: '🌾 गुड़ सल्फर' },
                  impact: { en: '🤝 Cooperative Pay', hi: '🤝 किसान पारिश्रमिक', bho: '🤝 किसान भुगतान' }
                };
                const isActive = activeDashboardTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveDashboardTab(tab)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all border shadow-sm cursor-pointer focus:outline-none ${
                      isActive
                        ? 'bg-[#3F2E1E] text-white border-[#3F2E1E] scale-102 ring-2 ring-[#B45309]/30'
                        : 'bg-[#FAF6EE] text-[#5C4D3C] border-[#EADCC6] hover:bg-[#EADCC6]/40'
                    }`}
                  >
                    {labels[tab]?.[language] || labels[tab]?.en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Render the visualizer state panels based on state */}
          <AnimatePresence mode="wait">
            {activeDashboardTab === 'ghee' && (
              <motion.div
                key="ghee-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Gauge visualization Column */}
                <div className="md:col-span-5 bg-[#FAF6EE] p-5 rounded-xl border border-[#EADCC6] flex flex-col items-center text-center">
                  <span className="text-[10px] font-mono uppercase font-black text-amber-800 mb-2">A2 Protein Purity Density</span>
                  
                  {/* SVG circular gauge */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#EADCC6" strokeWidth="8" fill="transparent" opacity="0.4" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke="#B45309" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray="251.2" 
                        strokeDashoffset="1.2" 
                        className="transition-all duration-1000 ease-out" 
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-2xl font-mono font-black text-[#3F2E1E]">99.8%</span>
                      <span className="text-[8px] font-mono text-emerald-700 font-bold uppercase">certified pure</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#857252] mt-4 font-medium leading-relaxed">
                    Tested via Gas-Liquid Chromatography (GLC) matching pristine values of pure milk fat without hydrogenated oils.
                  </p>
                </div>

                {/* Analytical breakdown Column */}
                <div className="md:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono font-black text-[#B45309] uppercase block tracking-wider">
                    🔬 Chem-Test Checklist (FSSAI/NABL Accredited)
                  </h4>
                  
                  <div className="space-y-3">
                    {/* Test A */}
                    <div className="bg-[#FAF6EE]/50 p-3.5 rounded-xl border border-[#EADCC6]/60">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-serif font-black text-[#3F2E1E]">Free Fatty Acids (FFA %)</span>
                        <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-500/20">0.18% (Target &lt; 0.50%)</span>
                      </div>
                      <div className="w-full bg-[#EADCC6]/40 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: '36%' }} />
                      </div>
                      <p className="text-[10px] text-[#857252] mt-1">Lower FFA ensures zero acidity, giving the ghee a long-shelf life of 12 months naturally.</p>
                    </div>

                    {/* Test B */}
                    <div className="bg-[#FAF6EE]/50 p-3.5 rounded-xl border border-[#EADCC6]/60">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-serif font-black text-[#3F2E1E]">Moisture Retention Index</span>
                        <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-500/20">0.12% (Target &lt; 0.30%)</span>
                      </div>
                      <div className="w-full bg-[#EADCC6]/40 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: '40%' }} />
                      </div>
                      <p className="text-[10px] text-[#857252] mt-1">Slight water traces cause oxidation. Slow-boiling over wood charcoal burns off all moisture contents.</p>
                    </div>

                    {/* Test C */}
                    <div className="bg-[#FAF6EE]/50 p-3.5 rounded-xl border border-[#EADCC6]/60">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-serif font-black text-[#3F2E1E]">R.M. Value (Butyric Acid density)</span>
                        <span className="text-xs font-mono font-black text-[#B45309] bg-orange-50 px-2 py-0.5 rounded border border-[#B45309]/10">29.80 (Standard 26.0+)</span>
                      </div>
                      <div className="w-full bg-[#EADCC6]/40 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#B45309] h-full rounded-full" style={{ width: '85%' }} />
                      </div>
                      <p className="text-[10px] text-[#857252] mt-1">High Reichert-Meissl value indicates high concentration of nutritious digestible short-chain fatty acids.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeDashboardTab === 'jaggery' && (
              <motion.div
                key="jaggery-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Gauge col */}
                <div className="md:col-span-5 bg-[#FAF6EE] p-5 rounded-xl border border-[#EADCC6] flex flex-col items-center text-center">
                  <span className="text-[10px] font-mono uppercase font-black text-amber-800 mb-2">Sulfur & Bleach Cleanliness</span>
                  
                  {/* SVG gauge */}
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#EADCC6" strokeWidth="8" fill="transparent" opacity="0.4" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        stroke="#10B981" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray="251.2" 
                        strokeDashoffset="251.2" 
                        className="transition-all duration-1000 ease-out" 
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center px-2">
                      <span className="text-2xl font-mono font-black text-emerald-700">0.00%</span>
                      <span className="text-[8px] font-mono text-[#3F2E1E] font-bold uppercase text-center">Sulfur Free Gas</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#857252] mt-4 font-medium leading-relaxed">
                    Most commercial gur uses sodium hydrosulfite bleach. Maati uses wild okra plant extract (deola stem pulp) to filter sugarcane juice naturally.
                  </p>
                </div>

                {/* Metrics col */}
                <div className="md:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono font-black text-[#B45309] uppercase block tracking-wider">
                    🍯 Chemical Trace & Natural Minerals Score
                  </h4>

                  <div className="space-y-3">
                    {/* Mineral A */}
                    <div className="bg-[#FAF6EE]/50 p-3.5 rounded-xl border border-[#EADCC6]/60">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-serif font-black text-[#3F2E1E]">Total Mineral Density (Iron, Magnesium)</span>
                        <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-500/20">3.4% (Direct bio-availability)</span>
                      </div>
                      <div className="w-full bg-[#EADCC6]/40 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#B45309] h-full rounded-full" style={{ width: '75%' }} />
                      </div>
                      <p className="text-[10px] text-[#857252] mt-1">Contains original magnesium, potassium, and active iron molecules lost in white industrially filtered sugars.</p>
                    </div>

                    {/* Mineral B */}
                    <div className="bg-[#FAF6EE]/50 p-3.5 rounded-xl border border-[#EADCC6]/60">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-serif font-black text-[#3F2E1E]">Synthetics & Urea Traces</span>
                        <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-500/20">Not Detected (N.D.)</span>
                      </div>
                      <div className="w-full bg-[#EADCC6]/40 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: '0%' }} />
                      </div>
                      <p className="text-[10px] text-[#857252] mt-1">Certified purely pesticide-free. No chemical fertilizers were used on the Saran Gandak sugarcane fields.</p>
                    </div>

                    {/* Mineral C */}
                    <div className="bg-[#FAF6EE]/50 p-3.5 rounded-xl border border-[#EADCC6]/60">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-serif font-black text-[#3F2E1E]">Insoluble Impurities</span>
                        <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-500/20">&lt; 0.05% (Sieve Refined)</span>
                      </div>
                      <div className="w-full bg-[#EADCC6]/40 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: '5%' }} />
                      </div>
                      <p className="text-[10px] text-[#857252] mt-1">Filtered six times using pure cotton cheesecloth before cooling in our open earthen basins.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeDashboardTab === 'impact' && (
              <motion.div
                key="impact-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Comparative bar Column */}
                <div className="md:col-span-5 bg-[#FAF6EE] p-5 rounded-xl border border-[#EADCC6] flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-black text-amber-800 block mb-2">Direct-to-Farmer Pay Rate</span>
                    <h5 className="text-sm font-serif font-black text-[#3F2E1E] mb-3">Maati vs Industrial Middlemen</h5>
                    
                    {/* Comparative Vertical Bar Visual and Chart parameters */}
                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="flex justify-between text-xs font-mono font-bold mb-1">
                          <span>Standard Traders Agent pay:</span>
                          <span className="text-stone-500">₹40 / kg</span>
                        </div>
                        <div className="w-full bg-stone-200 h-6 rounded overflow-hidden">
                          <div className="bg-stone-400 h-full w-[53%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-mono font-bold mb-1">
                          <span className="text-[#B45309] font-black">🌾 Maati Direct Co-op rate:</span>
                          <span className="text-[#B45309] font-black">₹75 / kg (+87% Premium)</span>
                        </div>
                        <div className="w-full bg-orange-100 h-6 border-2 border-[#B45309] rounded overflow-hidden">
                          <div className="bg-[#B45309] h-full w-[100%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#857252] mt-5 leading-normal">
                    *We completely bypass local block brokers. Smallholder sugarcane and cowherd families earn honest direct rewards and retain pride in their traditional trade.
                  </p>
                </div>

                {/* Co-op stats column */}
                <div className="md:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono font-black text-[#B45309] uppercase block tracking-wider">
                    🤝 Cooperative Welfare Metrics (Saran & Gaya co-ops)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Stat A */}
                    <div className="p-4 bg-[#FAF6EE]/60 border border-[#EADCC6]/60 rounded-xl">
                      <span className="text-2xl font-mono font-black text-[#B45309] block">140+</span>
                      <span className="text-xs font-serif font-black text-[#3F2E1E] block">Rural Sisters Supported</span>
                      <p className="text-[10px] text-[#857252] mt-1">Earning full monthly wages under zero middleman exploitation, bringing complete local economic autonomy.</p>
                    </div>

                    {/* Stat B */}
                    <div className="p-4 bg-[#FAF6EE]/60 border border-[#EADCC6]/60 rounded-xl">
                      <span className="text-2xl font-mono font-black text-emerald-700 block">6.5%</span>
                      <span className="text-xs font-serif font-black text-[#3F2E1E] block">Welfare Fund Allocation</span>
                      <p className="text-[10px] text-[#857252] mt-1">A direct set-aside program from every snack sold dedicated to rural farm tools, cow health check-ups and local books.</p>
                    </div>

                    {/* Stat C */}
                    <div className="p-4 bg-[#FAF6EE]/60 border border-[#EADCC6]/60 rounded-xl">
                      <span className="text-2xl font-mono font-black text-emerald-700 block">100%</span>
                      <span className="text-xs font-serif font-black text-[#3F2E1E] block">Ethical Grazing Policy</span>
                      <p className="text-[10px] text-[#857252] mt-1">All our cows drink natural fresh pasture tubewell water. Zero synthetic milk-heavy injection hormones permitted.</p>
                    </div>

                    {/* Stat D */}
                    <div className="p-4 bg-[#FAF6EE]/60 border border-[#EADCC6]/60 rounded-xl">
                      <span className="text-2xl font-mono font-black text-amber-800 block">Zero-Carbon</span>
                      <span className="text-xs font-serif font-black text-[#3F2E1E] block">Open Clay Boiler Cooking</span>
                      <p className="text-[10px] text-[#857252] mt-1">Boiled inside mud stoves utilizing only natural sugarcane leftover dry bagasse fibers for zero fuel-emission footprint.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Horizontal Farm-To-Kitchen Stepper Workflow */}
        <div id="logistics-timeline" className="mt-16 bg-[#FAF6EE] p-6 rounded-2xl border-2 border-[#EADCC6] shadow-sm">
          <div className="border-b border-[#EADCC6] pb-3 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h4 className="text-base font-serif font-black text-[#3F2E1E]">
                🚚 {language === 'en' ? 'Our Slow-Baked Cooking Pipeline' : language === 'hi' ? 'परिक्रमण चरण - गाँव से आपके घर तक' : 'कढ़ाई से रउआ पेट तक'}
              </h4>
              <p className="text-xs text-[#857252] font-medium mt-0.5">
                {language === 'en' ? 'Step-by-step rigorous process we follow to bake with pristine safety and original heritage flavor.' : 'हम हर बैच को शुद्धता, धैर्य और बेजोड़ सादगी के नियमों के साथ तैयार करते हैं।'}
              </p>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 px-3 py-1 rounded-full font-black uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Award className="w-3.5 h-3.5 animate-bounce" />
              FSSAI STANDARD APPROVED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {LOGISTICS_STEPS.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center md:items-start text-center md:text-left space-y-2">
                
                {/* Horizontal connector line on desktop */}
                {idx < LOGISTICS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-10 w-full h-0.5 bg-[#EADCC6] z-0" />
                )}

                {/* Stage Circle with icon */}
                <div className="w-10 h-10 rounded-full bg-white border-2 border-[#B45309] text-[#B45309] flex items-center justify-center text-lg shadow-sm z-10 shrink-0 font-bold">
                  {step.icon}
                </div>

                {/* Label metadata */}
                <div className="space-y-1">
                  <span className="block text-[9px] font-mono font-black uppercase text-[#B45309]">
                    {language === 'en' ? `Stage 0${idx + 1}` : `चरण ०${idx + 1}`}
                  </span>
                  <h5 className="text-xs font-serif font-black text-[#3F2E1E] leading-tight">
                    {step.title[language]}
                  </h5>
                  <p className="text-[11px] text-[#857252] leading-normal">
                    {step.desc[language]}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
