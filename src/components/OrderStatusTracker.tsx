import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Flame, 
  Boxes, 
  Truck, 
  CheckCircle2, 
  Search, 
  Play, 
  Pause, 
  RefreshCw, 
  Compass, 
  MapPin, 
  ThermometerSun, 
  Calendar, 
  ChevronRight,
  Info
} from 'lucide-react';
import { Language } from '../types';

interface OrderStatusTrackerProps {
  language: Language;
  initialOrderId?: string;
  onClose?: () => void;
}

interface StepDetail {
  title: Record<Language, string>;
  statusKey: string;
  desc: Record<Language, string>;
  icon: any;
  durationSec: number;
  parameters: {
    temp?: string;
    chef?: string;
    humidity?: string;
    courier?: string;
    location?: Record<Language, string>;
    checklist?: Record<Language, string[]>;
  };
}

export default function OrderStatusTracker({ language, initialOrderId = '', onClose }: OrderStatusTrackerProps) {
  const [orderQuery, setOrderQuery] = useState(initialOrderId || 'MAATI-782410');
  const [isTracked, setIsTracked] = useState(!!initialOrderId);
  
  // Simulation States
  const [simStep, setSimStep] = useState<number>(1); // 0 to 3
  const [simPercent, setSimPercent] = useState<number>(38); // overall bar loading percent
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [simLog, setSimLog] = useState<string[]>([]);
  
  // Custom message states
  const [searchError, setSearchError] = useState<string | null>(null);

  const getWhatsAppKitchenURL = () => {
    const text = encodeURIComponent(
      language === 'en'
        ? `Namaste Maati Kitchen! 🌾 I want to check the cooking status of my order ${orderQuery}. Please share details. Thanks!`
        : language === 'hi'
        ? `नमस्ते माटी रसोई! 🌾 मैं अपने आर्डर ${orderQuery} की ताज़ा स्थिति जानना चाहता हूँ। कृपया विवरण सांझा करें। धन्यवाद!`
        : `प्रणाम माटी रसोई! 🌾 हम अपन आर्डर ${orderQuery} के स्थिति के बारे में जाने के चाहत बानी। कृपया बताईं। धन्यवाद!`
    );
    return `https://api.whatsapp.com/send?phone=918210612345&text=${text}`;
  };

  const getAskGrandmaWhatsAppURL = () => {
    const text = encodeURIComponent(
      language === 'en'
        ? `Pranam Grandma! 👵 I placed order ${orderQuery}. Could you please check with your kitchen team and give me a friendly shipping update on my freshly made traditional snacks? Thank you! 🙏`
        : language === 'hi'
        ? `प्रणाम दादी माँ! 👵 मैंने आर्डर ${orderQuery} भेजा है। कृपा करके अपनी रसोई टीम से देखकर मेरी ताज़ा रेसिपी का शिपिंग स्टेटस बतायें। धन्यवाद! 🙏`
        : `प्रणाम दादी माँ! 👵 हम अपन आर्डर ${orderQuery} भेजले बानी। कृपा करके अपन रसोई टीम से देख के बताइं की ताज़ा पकवान कब तक शिप होखल। धन्यवाद! 🙏`
    );
    return `https://api.whatsapp.com/send?phone=918210612345&text=${text}`;
  };

  const STAGES: StepDetail[] = [
    {
      title: {
        en: '🔥 Fresh Baking & Crafting',
        hi: '🔥 कढ़ाई पर ताज़ा तैयारी',
        bho: '🔥 कढ़ाई पर ताज़ा तैयारी'
      },
      statusKey: 'baking',
      desc: {
        en: 'Maati snacks are hand-rolled and cooked in pure cow cow ghee and organic jaggery in our village hearths.',
        hi: 'आपके आर्डर को अभी ताज़ा शुद्ध गाय के घी और कोल्हू के गुड़ से गूंथकर धीमी आंच पर तैयार किया जा रहा है।',
        bho: 'रउआ आर्डर के अभी ताज़ा शुद्ध गाय के घी अउर गाँव के गुड़ से छान के तैयार कइल जात बा।'
      },
      icon: Flame,
      durationSec: 3,
      parameters: {
        temp: '175°C Hearth Fire',
        chef: 'Dadi Maa & Saran Artisans',
        humidity: '42% Dry Hearth',
        location: {
          en: 'Saran Artisanal Kitchen, Bihar',
          hi: 'सारण पारंपरिक रसोईशाला, बिहार',
          bho: 'सारण पारंपरिक रसोईशाला, बिहार'
        },
        checklist: {
          en: ['Whole wheat triple-sifted', 'Cow Ghee Moyen kneaded', 'Jaggery syrup balanced', 'Hand-stamped with wooden sanchas'],
          hi: ['गेहूं का आटा छाना गया', 'शुद्ध गाय के घी का मोयन मिलाया गया', 'गुड़ का सीरा संतुलित किया गया', 'लकड़ी के सांचे से कलाकृति उकेरी गई'],
          bho: ['गेहूं क आटा चालल गइला', 'शुद्ध घी क मोयन मिलावल गइला', 'गुड़ क पाक मिलावल गइला', 'लकड़ी क सांचा से बेलल गइला']
        }
      }
    },
    {
      title: {
        en: '📦 Nitrogen-Sealing & Packaging',
        hi: '📦 एयर-टाइट पैकिंग व सीलिंग',
        bho: '📦 मज़बूत एयर-टाइट पैकिंग'
      },
      statusKey: 'packaging',
      desc: {
        en: 'Double-laminated foil packets are nitrogen-flushed to lock moisture completely and loaded in 3-layer corrugated boxes.',
        hi: 'नमी को रोकने के लिए स्नैक्स को शुद्ध नाइट्रोजन गैस के साथ एयर-टाइट सील करके ३-परत वाले डिब्बों में भरा गया।',
        bho: 'सेंवई-ठेकुआ क सोंध बरकरार रखे बदे नाइट्रोजन पैक कइके मजबूत गत्ता क बक्सा में बंद कइल गइल बा।'
      },
      icon: Boxes,
      durationSec: 3.5,
      parameters: {
        temp: '22°C Cold Pack Chamber',
        humidity: '18% Low-Moisture Room',
        location: {
          en: 'Maati Packaging Cell, Gangetic Plains',
          hi: 'माटी पैकेजिंग यूनिट, गंगा तट',
          bho: 'माटी पैकेजिंग यूनिट, गंगा तट'
        },
        checklist: {
          en: ['Moisture test passed (<3%)', 'Nitrogen flush automated seal checked', 'Recyclable carton certified', 'Traditional cow ghee aroma tag placed'],
          hi: ['नमी जांच पास (<3% नमी)', 'नाइट्रोजन गैस सील की मजबूती परखी गई', 'रीसायकल गत्ता डिब्बा सुसज्जित किया गया', 'सेंधा-नमक/इलायची गुणवत्ता सील लगाई गई'],
          bho: ['नमी जाँच सफल (<3%)', 'धातु सील क जाली परखा गइल', 'पारंपरिक सोंध टैग लगावल गइल', 'बक्सा क सुरक्षा टेप चिपकावल गइल']
        }
      }
    },
    {
      title: {
        en: '🚚 Saran Village Dispatch',
        hi: '🚚 ग्रामीण रवानगी व ट्रांजिट',
        bho: '🚚 ग्रामीण रवानगी आ बहरी देश'
      },
      statusKey: 'dispatched',
      desc: {
        en: 'Handed over to regional rural logistics partner. Moving from Saran Kitchen to Patna Main Sorting hub.',
        hi: 'ग्रामीण परिवहन वाहन द्वारा सारण से रवाना। पटना मुख्य वितरण केंद्र में जांच हो चुकी है।',
        bho: 'सारण क पक्का सड़क से पटना मुख्य डाकघर क वितरण केंद्र बदे रवाना भइल।'
      },
      icon: Truck,
      durationSec: 4.5,
      parameters: {
        courier: 'Express-Rural post (Speedy Safe)',
        temp: '29°C Ambient Transit',
        location: {
          en: 'Patna Junction Sorting Gateway, Bihar',
          hi: 'पटना जंक्शन सॉर्टिंग गेटवे, बिहार',
          bho: 'पटना जंक्शन सॉर्टिंग गेटवे, बिहार'
        },
        checklist: {
          en: ['Rural courier scanned', 'Patna highway transit finished', 'All-India route barcode registered', 'SMS tracking dispatched to customer'],
          hi: ['ग्रामीण कूरियर स्कैन सफल', 'पटना राष्ट्रीय राजमार्ग पार किया गया', 'ऑल-इंडिया बारकोड मैप सहेजा गया', 'कस्टमर को SMS अपडेट भेजा गया'],
          bho: ['कूरियर क रसीद स्कैन भइल', 'पटना सॉर्टिंग ऑफिस पहुँच गइल बा', 'बारकोड रसीद जारी कइल गइल बा', 'फोन पर संदेश भेद दिहल गेल बा']
        }
      }
    },
    {
      title: {
        en: '🏡 Stepdoor Delivery Shared',
        hi: '🏡 दरवाजे पर दस्तक (सफल डिलीवरी)',
        bho: '🏡 दुआर पर पहुँच गइल (मुस्कान संग)'
      },
      statusKey: 'delivered',
      desc: {
        en: 'Package joyfully handed over to your doorstep with love, preservation hygiene guaranteed.',
        hi: 'शुद्ध सोंधापन आपके घर पहुँचा दिया गया है। पार्सल खोलने पर घी और इलायची की खुशबू का सोंधा आनंद लें!',
        bho: 'सोंध स्वादानुसार रउआ घर पहुँच गइल बा। डब्बा खोल के माई क दुलार क मज़ा लीं!'
      },
      icon: CheckCircle2,
      durationSec: 1,
      parameters: {
        courier: 'Local Delivery Executive',
        location: {
          en: 'Ready at Customer Doorstep',
          hi: 'ग्राहक के गृह-आँगन द्वार पर',
          bho: 'ग्राहक के गृह-द्वार पर'
        },
        checklist: {
          en: ['Delivery confirmation OTP verified', 'Box seal untainted check complete', 'Smiles exchanged with dadi maa blessing'],
          hi: ['डिलीवरी OTP सफलतापूर्वक परखा गया', 'पैकिंग बॉक्स पूर्णतः सुरक्षित मिला', 'सोंधे स्वाद के साथ स्नेह साझा हुआ'],
          bho: ['डिलीवरी पासवर्ड जाँच भइल', 'सुरक्षित डब्बा ग्राहक के सौंप देहल गेल बा', 'चेहरा पर मुस्कान चमक गइल बा']
        }
      }
    }
  ];

  const triggerSearch = () => {
    if (!orderQuery.trim()) {
      setSearchError(language === 'en' ? 'Please enter a valid Order ID' : 'कृपया सही आर्डर आईडी दर्ज करें');
      return;
    }
    
    // Check match pattern for simulated fun
    setSearchError(null);
    setIsTracked(true);
    
    // Setup random starting points to feel authentic
    const randomStep = Math.floor(Math.random() * 3); // 0 or 1 or 2
    setSimStep(randomStep);
    setSimPercent((randomStep + 0.4) * 28);
    setIsPlaying(false);
  };

  // Simulation playback loop
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && isTracked) {
      timer = setInterval(() => {
        setSimPercent((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setSimStep(3);
            return 100;
          }
          const next = prev + 1.5;
          // Dynamically map percent to 4 stages
          const calculatedStep = Math.min(3, Math.floor(next / 25));
          if (calculatedStep !== simStep) {
            setSimStep(calculatedStep);
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isTracked, simStep]);

  const handleToggleSimulation = () => {
    if (simPercent >= 100) {
      // restart
      setSimPercent(10);
      setSimStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleResetSimulation = () => {
    setSimPercent(12);
    setSimStep(0);
    setIsPlaying(false);
  };

  const currentStage = STAGES[simStep];

  return (
    <section id="order-status-tracker-section" className="py-12 bg-[#FAF6EE] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header styling */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] sm:text-xs tracking-widest uppercase font-extrabold text-emerald-800 bg-emerald-500/10 px-3 py-1 rounded-full inline-block">
            📦 {language === 'en' ? 'Live Cooking & Shipping Journey' : language === 'hi' ? 'ताज़ा कढ़ाई से घर-आँगन तक' : 'कढ़ाई से रउआ दुआर तक'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#3F2E1E] tracking-tight">
            {language === 'en' ? 'Interactive Order Status Simulator' : language === 'hi' ? 'आर्डर डिलीवरी लाइव ट्रैकिंग' : 'लाइव आर्डर ट्रेकर'}
          </h2>
          <p className="text-xs sm:text-sm text-[#857252] leading-relaxed">
            {language === 'en'
              ? 'Our snacks are baked on-demand once order registers. Look up your dispatch parameters using your Order ID.'
              : 'हमारे पकवान कोई बासी या कोल्ड-स्टोरेज से नहीं आते। आर्डर आईडी डालकर देखें कि दादा-दादी आपके डिब्बे को किस धीमी आंच पर तपा रहे हैं!'}
          </p>
        </div>

        {/* Outer Dashboard Paper container */}
        <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#EADCC6] shadow-xl overflow-hidden">
          
          {/* Top Search bar area */}
          <div className="p-6 bg-[#FAF6EE] border-b border-[#EADCC6] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-[200px]">
              <h4 className="text-xs font-mono font-extrabold uppercase text-[#B45309]">
                {language === 'en' ? 'Input Customer Credentials' : 'आर्डर खोज मापदण्ड'}
              </h4>
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#857252]" />
                <input
                  type="text"
                  placeholder="e.g. MAATI-782410 or Phone Number"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === 'Enter' && triggerSearch()}
                  className="w-full pl-10 pr-24 py-3 bg-white border border-[#CBB393] rounded-xl text-xs sm:text-sm text-[#3F2E1E] font-medium font-mono focus:outline-none focus:ring-2 focus:ring-[#B45309]/30 focus:border-[#B45309]"
                />
                <button
                  onClick={triggerSearch}
                  className="absolute right-2 top-2 h-8 bg-[#3F2E1E] hover:bg-[#B45309] text-white px-4 rounded-lg text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Track' : 'खोजें'}
                </button>
              </div>
              {searchError && <p className="text-[10px] text-red-500 font-bold">{searchError}</p>}
            </div>

            {/* Quick demos triggers */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-black text-[#857252] uppercase">
                {language === 'en' ? 'Quick Demo IDs:' : 'त्वरित डेमो आर्डर:'}
              </span>
              <button
                onClick={() => { setOrderQuery('MAATI-901594'); setIsTracked(true); setSimStep(1); setSimPercent(35); }}
                className="bg-white hover:bg-[#FAF6EE] border border-[#EADCC6] text-[10px] font-mono px-3 py-1.5 rounded-lg text-[#3F2E1E] cursor-pointer"
              >
                MAATI-901594 (Baking)
              </button>
              <button
                onClick={() => { setOrderQuery('MAATI-184512'); setIsTracked(true); setSimStep(2); setSimPercent(68); }}
                className="bg-white hover:bg-[#FAF6EE] border border-[#EADCC6] text-[10px] font-mono px-3 py-1.5 rounded-lg text-[#3F2E1E] cursor-pointer"
              >
                MAATI-184512 (In Transit)
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isTracked ? (
              <motion.div
                key="empty-tracker"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 px-6 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-[#B45309] mx-auto border border-amber-500/20">
                  <Package className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 max-w-sm mx-auto">
                  <h3 className="font-serif font-black text-[#3F2E1E] text-base">
                    {language === 'en' ? 'Awaiting Order Tracking Number' : 'आर्डर ट्रैकिंग के लिए तैयार'}
                  </h3>
                  <p className="text-xs text-[#857252] leading-relaxed">
                    {language === 'en' 
                      ? 'Input any Order ID or click our quick demo tracker IDs above to witness regional delivery journey simulation.' 
                      : 'कोई आर्डर आईडी दर्ज करें या उपर दिए गए डेमो बटनों पर क्लिक करें।'}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="active-tracker"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-6 sm:p-10 space-y-8"
              >
                
                {/* Meta details bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FAF6EE] p-4 rounded-2xl border border-[#EADCC6] text-xs sm:text-sm">
                  <div className="space-y-1 leading-tight">
                    <span className="text-[10px] font-mono text-[#857252] block uppercase font-bold">
                      {language === 'en' ? 'Direct Tracking Order ID' : 'आर्डर पावती पत्र'}
                    </span>
                    <strong className="text-emerald-800 font-mono text-sm sm:text-base">
                      {orderQuery}
                    </strong>
                  </div>

                   <div className="flex flex-wrap gap-2">
                    {/* Message on WhatsApp quick launch */}
                    <a
                      href={getWhatsAppKitchenURL()}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-103 active:scale-97 cursor-pointer focus:outline-none"
                      title="Direct Kitchen WhatsApp Verification"
                    >
                      <span className="text-base leading-none">💬</span>
                      <span>
                        {language === 'en' 
                          ? 'Message on WhatsApp' 
                          : language === 'hi'
                          ? 'व्हाट्सएप पर पूछें'
                          : 'व्हाट्सएप से पूछीं'}
                      </span>
                    </a>

                    {/* Ask Grandma button for polite updates */}
                    <a
                      href={getAskGrandmaWhatsAppURL()}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B00] hover:bg-[#E05E00] text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:scale-103 active:scale-97 cursor-pointer focus:outline-none border border-white/10"
                      title="Ask Grandma for Update"
                    >
                      <span className="text-base leading-none">👵</span>
                      <span>
                        {language === 'en' 
                          ? 'Ask Grandma' 
                          : language === 'hi'
                          ? 'दादी माँ से पूछें'
                          : 'दादी माँ से पूछीं'}
                      </span>
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-4 font-mono text-xs text-[#5C4D3C] font-semibold font-semibold">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#B45309]" />
                      <span>Est: Express Delivery</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThermometerSun className="w-4 h-4 text-[#B45309]" />
                      <span>Pure Hearth-Fresh</span>
                    </div>
                  </div>
                </div>

                {/* Timeline Interactive Progress Track Bar */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#857252] font-semibold uppercase tracking-wider">
                      {language === 'en' ? 'Total transit progression' : 'कुल वितरण मार्ग प्रगति'}
                    </span>
                    <span className="font-mono font-black text-[#B45309] text-sm">
                      {Math.floor(simPercent)}%
                    </span>
                  </div>

                  {/* Absolute Progress track bar */}
                  <div className="relative h-3 bg-[#EADCC6]/50 rounded-full overflow-hidden border border-[#EADCC6]/80">
                    {/* Active highlighted percent bar */}
                    <motion.div
                      animate={{ width: `${simPercent}%` }}
                      transition={{ ease: 'linear' }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 through-amber-500 to-emerald-600 shadow-sm"
                    />
                  </div>

                  {/* 4 Checkpoint Buttons row */}
                  <div className="grid grid-cols-4 gap-2 relative pt-2">
                    {STAGES.map((step, idx) => {
                      const StepIcon = step.icon;
                      const isCompleted = simPercent >= (idx) * 25 + 5;
                      const isActive = simStep === idx;
                      
                      return (
                        <button
                          key={step.statusKey}
                          onClick={() => {
                            setSimStep(idx);
                            setSimPercent(idx * 25 + 12);
                            setIsPlaying(false);
                          }}
                          className="flex flex-col items-center text-center space-y-2 group focus:outline-none relative"
                        >
                          {/* Circle Icon Badge wrapper */}
                          <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            isActive 
                              ? 'bg-[#B45309] border-[#B45309] text-white scale-110 shadow-lg ring-4 ring-[#B45309]/15'
                              : isCompleted
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-white border-[#EADCC6] text-stone-400 group-hover:border-[#B45309]/50'
                          }`}>
                            <StepIcon className="w-4 h-4 sm:w-6 sm:h-6" />
                          </div>

                          {/* Desktop title summary */}
                          <span className={`text-[9px] sm:text-xs font-serif font-bold leading-tight block ${
                            isActive ? 'text-[#3F2E1E] font-black underline decoration-amber-500 decoration-3 underline-offset-4' : 'text-stone-500'
                          }`}>
                            {step.title[language].replace(/🍉|🔥|📦|🚚|🏡|🍵/g, '')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Simulation Speed Player Controls */}
                <div className="p-4 bg-amber-500/5 rounded-2xl border border-dashed border-[#EADCC6] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📻</span>
                    <div>
                      <h5 className="text-xs font-bold text-[#3F2E1E] uppercase">
                        {language === 'en' ? 'Vessel Shipping Simulator' : 'वितरण सिम्युलेटर प्लेयर'}
                      </h5>
                      <p className="text-[10px] text-[#857252]">
                        {language === 'en'
                          ? 'Simulate courier milestone checks to track package transit in real-time.'
                          : 'सारण चूल्हा से गाँव की पगडंडी व शहरों तक का कूरियर चक्र देखें।'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleToggleSimulation}
                      className="bg-[#B45309] hover:bg-[#853A00] text-white px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlaying ? (language === 'en' ? 'Pause' : 'रौकें') : (language === 'en' ? 'Start Journey Sim' : 'सफर चालू करें')}</span>
                    </button>

                    <button
                      onClick={handleResetSimulation}
                      className="bg-white hover:bg-stone-100 text-[#3F2E1E] border border-[#EADCC6] p-1.5 rounded-xl cursor-pointer"
                      title="Reset Track Simulation"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub-Split Detail Panel for selected stage */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                  
                  {/* Left Parameter Panel Card */}
                  <div className="md:col-span-7 bg-[#FAF6EE] p-6 rounded-2xl border border-[#EADCC6]/80 space-y-4">
                    <div className="flex justify-between items-start border-b border-[#EADCC6] pb-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-[#B45309] uppercase block">
                          Current Stage Details
                        </span>
                        <h3 className="text-base sm:text-lg font-serif font-black text-[#3F2E1E]">
                          {currentStage.title[language]}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-[#B45309]/10 text-[#B45309] px-2.5 py-1 rounded-full text-[10px] font-mono font-bold">
                        <ThermometerSun className="w-3.5 h-3.5" />
                        <span>{currentStage.parameters.temp}</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#5C4D3C] leading-relaxed">
                      {currentStage.desc[language]}
                    </p>

                    {/* Operational parameters logs list */}
                    <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-mono">
                      {currentStage.parameters.chef && (
                        <div>
                          <span className="text-[#857252] block text-[10px] uppercase font-bold">Kitchen Lead</span>
                          <span className="text-[#3F2E1E] font-bold">{currentStage.parameters.chef}</span>
                        </div>
                      )}
                      {currentStage.parameters.humidity && (
                        <div>
                          <span className="text-[#857252] block text-[10px] uppercase font-bold">Sealed Humidity</span>
                          <span className="text-[#3F2E1E] font-bold">{currentStage.parameters.humidity}</span>
                        </div>
                      )}
                      {currentStage.parameters.courier && (
                        <div>
                          <span className="text-[#857252] block text-[10px] uppercase font-bold">Fleet courier Partner</span>
                          <span className="text-[#3F2E1E] font-bold">{currentStage.parameters.courier}</span>
                        </div>
                      )}
                      {currentStage.parameters.location && (
                        <div>
                          <span className="text-[#857252] block text-[10px] uppercase font-bold">Last scanned Pin</span>
                          <span className="text-[#3F2E1E] font-bold">{currentStage.parameters.location[language]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Hand: Sourcing and Packing Quality Checklist */}
                  <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-[#EADCC6] space-y-4">
                    <h4 className="text-xs font-serif font-black uppercase text-[#3F2E1E] tracking-wider border-b border-[#EADCC6]/60 pb-2">
                      📋 Grandma's Hand-Made Checklist
                    </h4>

                    <ul className="space-y-3">
                      {(currentStage.parameters.checklist?.[language] || []).map((check, idx) => (
                        <li key={idx} className="flex gap-2.5 text-xs text-[#5C4D3C] font-semibold leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{check}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Reassurance Info box */}
                    <div className="p-3 bg-amber-500/5 rounded-xl border border-dashed border-[#EADCC6]/60 flex items-start gap-2.5 text-[10px] text-[#857252] leading-normal font-sans">
                      <Info className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                      <p>
                        {language === 'en' 
                          ? 'We prepare strictly whole-wheat treats, kneaded by hand to keep structural fluff intact. Stored in sanitized drawers.' 
                          : 'हम बिना कृत्रिम रंगों के शुद्ध गेंहू व गुड़ से ताज़ा स्नैक्स बनाते हैं।'}
                      </p>
                    </div>

                     {/* Quick Kitchen Team WhatsApp Card */}
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex flex-col gap-3 mt-3 text-left">
                      <div>
                        <h5 className="text-xs font-serif font-black text-emerald-900 uppercase tracking-wide flex items-center gap-1 font-bold">
                          <span>💬</span>
                          <span>{language === 'en' ? 'Live Kitchen Assistance' : 'सीधी रसोई सहायता टीम'}</span>
                        </h5>
                        <p className="text-[10px] text-emerald-800 leading-normal font-medium mt-1">
                          {language === 'en' 
                            ? 'Connect directly with Saran village kitchen with your order ID to inquire about customized options, special baking instructions, or polite shipping updates directly from Grandma!' 
                            : 'सामग्री में घी/मीठा कस्टमाइज करने अथवा लाइव कढ़ाई का आर्डर अपडेट जानने के लिए सीधे रसोई समन्वयक या दादी माँ से व्हाट्सएप्प पर संपर्क करें!'}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={getWhatsAppKitchenURL()}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all shadow hover:scale-102 focus:outline-none"
                        >
                          <span>💬 Message Team</span>
                        </a>
                        <a
                          href={getAskGrandmaWhatsAppURL()}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white rounded-lg text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all shadow hover:scale-102 focus:outline-none"
                        >
                          <span>👵 Ask Grandma</span>
                        </a>
                      </div>
                    </div>

                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
