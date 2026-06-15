import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Heart, Sparkles, Sprout, Award, Flame, Quote, ChevronRight, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StorytellingProps {
  language: Language;
}

interface SecretFeature {
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  quote: Record<Language, string>;
  details: Record<Language, string[]>;
  image: string;
  badge: Record<Language, string>;
}

export default function Storytelling({ language }: StorytellingProps) {
  const t = TRANSLATIONS[language];
  const [activeSecret, setActiveSecret] = useState<number>(0);

  // Deeply emotional data representing "Maa ka Khazana" (The Sacred Secrets)
  const secrets: SecretFeature[] = [
    {
      title: {
        en: "The Hand-Carved Rosewood Sanchas",
        hi: "शीशम का नक्काशीदार सांचा",
        bho: "शीशम के काठ क सांचा"
      },
      subtitle: {
        en: "Generational woodcuts that print protective leaf motifs upon every dough patty.",
        hi: "पीढ़ी-दर-पीढ़ी चली आ रही लकड़ी की नक्काशी, जो हर ठेकुए पर पावन पत्ती क छाप छोड़ती है।",
        bho: "पीढ़ी-दर-पीढ़ी चलल आवत लकड़ी के सांचा, जवन हरेक ठेकुआ पर छठ माई के पत्ती गढ़ेला।"
      },
      quote: {
        en: '"A machine cuts flour to save seconds; a mother presses wood to embed prayers."',
        hi: '"मशीनें समय बचाने के लिए आकृतियां काटती हैं; माँ आटे पर प्रार्थना और आशीर्वाद उकेरने के लिए हाथ से सांचे पर दबाती है।"',
        bho: '"मशीन त खाली आटा के टुकड़ा काटेला; माई त आटा पर आपन दुलार आ दुआ गढ़ेली!"'
      },
      badge: {
        en: "Artisanal Engraving",
        hi: "हस्तशिल्प कला",
        bho: "हाथ के कला"
      },
      details: {
        en: [
          "Crafted from veteran Rosewood (Shisham) logs carved individually by local carpenters.",
          "Features traditional leaf motifs representing prosperity, harvest, and protective deities.",
          "Hand-pressed patties create natural microscopic air pockets, ensuring perfect even baking."
        ],
        hi: [
          "स्थानीय बढ़इयों द्वारा तैयार कड़े शीशम की लकड़ी के सांचे, जिनमें पारंपरिक कला जीवित है।",
          "समृद्धि, फसल कटाई और लोक देवताओं का प्रतीक पत्ती डिज़ाइन का अनूठा प्रारूप।",
          "हाथ से दबाने से आटे में सूक्ष्म छिद्र बनते हैं, जिससे ठेकुआ अंदर तक एकदम समान पकता है।"
        ],
        bho: [
          "गाँव के बढ़ई भइया लोगन द्वारा बनल शीशम के सांचा, जवना क स्पर्श ही पवित्र बा।",
          "समृद्धि आ छठ मईया के आशीर्वाद प्रतीक पत्ती के सुन्दर छाप।",
          "काठ पर हाथ के दबाव से आटे में बारीक छेद बनेला, जेकरा से ठेकुआ भीतर ले सोंध पकेला।"
        ]
      },
      image: "https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: {
        en: "The Ancient Cow Desi Ghee Moyen",
        hi: "गाय के दानेदार घी का शुद्ध मोयन",
        bho: "गाय के सुगन्धित घी क मोयन"
      },
      subtitle: {
        en: "Hand-melted golden butter fat that transforms whole wheat into premium crumbly gold.",
        hi: "हाथ से पिघलाया गया सुनहरा घी, जो साधारण गेंहू के आटे को मुंह में घुल जाने वाले खस्ता टुकड़ों में बदल देता है।",
        bho: "धीमी आंच पर पिघलावल घी, जवन साधारण गेहूं के चोकरयुक्त आटा के जीभ पर घुल जाए वाला सोना बना देवेला।"
      },
      quote: {
        en: '"Our Moyen is not measured in grams, Beta. It is measured in the heavy warmth of empty bowls."',
        hi: '"बेटा, हमारे घर का मोयन तराजू के ग्रामों में नहीं मापा जाता, बल्कि दादी के भारी और स्नेह-भरे हाथों से पड़ता है।"',
        bho: '"बाबू, हमनी के मोयन कौनों तराजू से तौल के ना पड़ेला, इ त माई के भरल हाथ और ममता से पड़ेला!"'
      },
      badge: {
        en: "A2 Danedar Ghee",
        hi: "दानेदार शुद्ध घी",
        bho: "शुद्ध दानेदार घी"
      },
      details: {
        en: [
          "We prohibit cheap palm-oil, hydrogenated vegetable fats, or refined seed shortenings.",
          "Pure cow Desi Ghee is rubbed by hand into the grain until the flour binds like wet sand.",
          "Produces the iconic crackling, flaky, and digestible structure unique to authentic rasois."
        ],
        hi: [
          "हम पाम ऑयल, डालडा या प्रसंस्कृत वनस्पति तेलों का प्रयोग कभी नहीं करते।",
          "शुद्ध दानेदार घी को आटे में तब तक मला जाता है जब तक आटा गीली रेत की तरह हाथ में न बंधने लगे।",
          "यही खस्तापन बढ़ाता है और स्नैक्स को पेट के लिए सुपाच्य और मुंह में लाजवाब बनाता है।"
        ],
        bho: [
          "हमनी के रसोई में डालडा या सस्ता रिफाइंड आयल के आना एकदम वर्जित बा।",
          "सुगन्धित घी के आटा में तब ले मिलावल जाला जब ले आटा मुट्ठी में गीला बालू नियन बंधा ना जाए।",
          "एही से ठेकुआ एकदम खस्ता आ पेट खातिर सुपाच्य आ मुँह में पानी लावे वाला बनेला।"
        ]
      },
      image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: {
        en: "Sun-Dried Jaggery & Stone Mortars",
        hi: "कोल्हू का गुड़ और सिलबट्टे की इलायची",
        bho: "खेत क देसी गुड़ आ जांते के पिसाव"
      },
      subtitle: {
        en: "Rich sugarcane jaggery syrup infused with cardamom crushed on volcanic stone pestiles.",
        hi: "गन्ने के ताजे रस से बना सोंधा गुड़ और काले सिलबट्टे पर कूटी गई हरी इलायची व मोटी सौंफ।",
        bho: "कोल्हू से निकसल ताज़ा गुड़ के सिरप, जवना में सिलबट्टा पर कुचलल इलायची आ सौंफ क महक घुलल बा।"
      },
      quote: {
        en: '"Iron-boiled sugarcane jaggery carries the blood of our soil. White sugar only brings emptiness."',
        hi: '"लोहे के कड़ाह में पकाए गुड़ में हमारी मिट्टी का लोहा है। रिफाइंड चीनी तो केवल खोखलापन लाती है।"',
        bho: '"लोहा क कड़ाह में बनल गुड़ में हमनी के माटी के ताकत बा। चीनी त खाली बीमारी अउर खोखलापन देवेला।"'
      },
      badge: {
        en: "Organic Jaggery",
        hi: "जैविक कोल्हू का गुड़",
        bho: "देहाती सोंध गुड़"
      },
      details: {
        en: [
          "Directly sourced sugarcane jaggery from pesticide-free cooperative farms in Saran.",
          "Rich in organic iron, minerals, and deep, dark caramelized flavor notes.",
          "Spiced with cardboard-free, freshly cracked heavy cardamom pods and hot sweet fennel."
        ],
        hi: [
          "सारण के कीटनाशक-मुक्त सहकारी खेतों से सीधे प्राप्त किया गया सुनहरी गन्ने का गुड़।",
          "प्राकृतिक लौह-तत्वों और खनिजों से भरपूर, जिसका स्वाद कैरामेल जैसा गहरा होता है।",
          "ताज़ी दरदरी कटी हरी इलायची और सुगन्धित मोटी सौंफ से सजी पारंपरिक मिठास।"
        ],
        bho: [
          "बिहार के सारण आ गोपालगंज के खेतन से सीधे कोल्हू के बनल सुनहरा शुद्ध गुड़।",
          "भरपूर नेचुरल आयरन आ मिनरल्स, जवना क स्वाद जीभ पर सोंध मिठास घोले।",
          "जांता आ सिलबट्टा पर दरदरा कुटी भइल हरी इलायची आ मोटे दानेदार सौंफ के मेल।"
        ]
      },
      image: "https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&w=800&q=80"
    }
  ];

  // The 4-step farm to packing timeline
  const journeyTimeline = [
    {
      step: "01",
      title: {
        en: "Heritage Wheat Sourcing",
        hi: "सेहोर के खेतों से चोकरयुक्त गेंहू",
        bho: "खेत से चोकरयुक्त गेहूं"
      },
      desc: {
        en: "We select Sehore whole wheat, sifted by hand and stone-milled slowly to lock nutrition in.",
        hi: "हम सोने जैसे चमकते गेहूं को चुनते हैं, जिसे धीरे-धीरे ठंडी पत्थर की चक्की में पीसकर आटा तैयार किया जाता है।",
        bho: "सोना नियन चमकत गेहूं चुनल जाला, जेकरा धीरे-धीरे जाता/चक्की पर पीस के पौष्टिकता सहेजवल जाला।"
      }
    },
    {
      step: "02",
      title: {
        en: "Hand-kneaded Moyen Rest",
        hi: "हाथों से रगड़कर मोयन तैयार करना",
        bho: "हाथ से मोयन के घिसाईं"
      },
      desc: {
        en: "Mothers kneed whole wheat and warm Desi Ghee for hours until the dough binds naturally.",
        hi: "गाँव की महिलाएँ गाय के गुनगुने घी और गुड़ के पानी को घंटों तक हाथों से मलकर समृद्ध मोयन तैयार करती हैं।",
        bho: "दीदी लोगन सुगन्धित गुनगुना घी आ गुड़ के पानी के आटा में घंटों हाथ से रगड़ के खस्ता मोयन तैयार करेली।"
      }
    },
    {
      step: "03",
      title: {
        en: "Wooden Mould Engraving",
        hi: "शीशम के नक्काशीदार सांचों पर ढलाई",
        bho: "शीशम के सांचा पर दाब"
      },
      desc: {
        en: "Each piece of dough is manually pressed onto aged wood carvings, tracing centuries-old motifs.",
        hi: "आटे की लोई को शीशम के नक्काशीदार सांचे पर हाथ से दबाकर पावन पत्ती का रूप दिया जाता है।",
        bho: "आटा के लोई के शीशम के सुंदर सांचा पर हाथ से दाब के लोक-संस्कृति के पत्ती रूप देवल जाला।"
      }
    },
    {
      step: "04",
      title: {
        en: "Clay-Monitored Cauldrons",
        hi: "धीमी आंच की लोहे की कढ़ाई में सिकाई",
        bho: "धीमी आंच क कढ़ाई में छनाई"
      },
      desc: {
        en: "Fresh snacks are fried slowly under fire-monitored kadhais, securing crispy edges and soft heart.",
        hi: "धीमी आंच पर लोहे की गहरी कढ़ाहियों में ठेकुए को सुनहरे तांबे जैसा होने तक धैर्यपूर्वक तला जाता है।",
        bho: "धीमी आंच पर लोहे क भारी कड़ाही में ठेकुआ के तबले तलाल जाला जबले उ सुन्दर सोने नियन सुनहरा न हो जाए।"
      }
    }
  ];

  return (
    <section id="storytelling-section" className="py-20 bg-[#FAF6EE] relative z-20 border-b border-[#EADCC6] overflow-hidden">
      
      {/* Terracotta/clay pattern top separator */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-repeat-x bg-top" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"5\" viewBox=\"0 0 20 5\"><path d=\"M0,5 L10,0 L20,5 Z\" fill=\"%233F2E1E\"/></svg>')" }} />
      
      {/* Subtle organic background vector sparks */}
      <div className="absolute top-1/4 left-5 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-5 w-72 h-72 rounded-full bg-[#B45309]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION HEADER: Dynamic Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 text-[#B45309]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest font-mono">
              {language === 'en' ? "Maa Ka Khazana • Mother's Treasury" : language === 'hi' ? "माँ का खजाना • सोंधी विरासत" : "मईया क ख़ज़ाना • पावन पोटली"}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#3F2E1E] leading-tight tracking-tight">
            {language === 'en' ? "The Hand-Pressed Secrets of a Mother's Copper Chest" : language === 'hi' ? "दादी और माँ के काँसे के डिब्बे का जादुई स्वाद" : "कौनों मशीन ना, इ त ह मईया क ख़ज़ाना!"}
          </h2>
          
          <div className="w-20 h-1 bg-[#B45309] mx-auto rounded" />
          
          <p className="text-xs sm:text-sm text-[#857252] font-medium max-w-2xl mx-auto leading-relaxed">
            {language === 'en' 
              ? "At Maati, we don't manufacture foods; we trace ancestral memories. Discover the 3 sacred pillars of ancient Indian snackcraft that make our snacks taste exactly like childhood festival mornings."
              : language === 'hi'
              ? "माटी में हम भोजन का उत्पादन नहीं करते, हम बचपन की पावन स्मृतियों को आकार देते हैं। जानिए दादी माँ के रसोईघर के उन ३ पवित्र स्तंभों को, जो इस स्वाद को बेजोड़ बनाते हैं।"
              : "माटी में हम खाली स्नैक्स ना बनाईं, हम त पुरान दिन क याद ताज़ा करील। देखीं माई के रसोई के ३ गो रहस्य जवने से ठेकुआ सीधे रउआ बचपन में पहुँचा देई।"}
          </p>
        </motion.div>

        {/* INTERACTIVE COPPER CHEST: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT: Nav Buttons and Sancha Information Details */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 flex flex-col justify-between space-y-6"
          >
            {/* The Chest Selector Tabs */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase text-[#B45309] tracking-widest flex items-center gap-1">
                <Compass className="w-4 h-4" /> {language === 'en' ? "Open Grandma's Chest Secrets:" : language === 'hi' ? "माँ का खजाना खोलें:" : "माई के पोटली टटोलीं:"}
              </h3>
              
              <div className="grid grid-cols-3 gap-2 sm:gap-3 p-1.5 bg-[#F1EAD9]/40 rounded-2xl border border-[#EADCC6]">
                {secrets.map((sc, index) => {
                  const isActive = activeSecret === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveSecret(index)}
                      className={`py-3.5 px-1 sm:px-2.5 rounded-xl text-[10px] sm:text-xs font-serif font-black transition-all cursor-pointer focus:outline-none flex flex-col items-center gap-1.5 ${
                        isActive
                          ? "bg-[#3F2E1E] text-[#FAF6EE] shadow-md border border-[#3F2E1E]"
                          : "bg-transparent text-[#5C4D3C] hover:bg-[#FAF6EE]/50 hover:text-[#3F2E1E]"
                      }`}
                    >
                      <span className="text-[9px] font-mono opacity-65">0{index + 1}</span>
                      <span className="text-center font-bold">{sc.badge[language]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Secret Info Display with transition */}
            <div className="bg-[#FBF9F4] p-6 sm:p-8 rounded-3xl border border-[#EADCC6] shadow-sm relative min-h-[340px] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-[-5%] right-[-5%] w-32 h-32 rounded-full bg-[#B45309]/5 pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSecret}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309] font-mono">
                      Secret Pillar 0{activeSecret + 1}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-serif font-black text-[#3F2E1E]">
                      {secrets[activeSecret].title[language]}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#857252] font-semibold leading-relaxed">
                      {secrets[activeSecret].subtitle[language]}
                    </p>
                  </div>

                  {/* Terracotta quote snippet block */}
                  <div className="p-4 bg-[#FAF6EE] rounded-2xl border border-[#EADCC6] relative">
                    <Quote className="absolute right-4 top-3 w-8 h-8 text-[#B45309]/15 select-none" />
                    <p className="text-xs sm:text-sm italic font-serif text-[#3F2E1E] leading-relaxed pr-6">
                      {secrets[activeSecret].quote[language]}
                    </p>
                    <p className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#B45309] mt-3">
                      — {language === 'en' ? "Dadi Maa (Founder's Grandmother)" : "दशहरा वाली दादी माई"}
                    </p>
                  </div>

                  {/* Bullet list */}
                  <ul className="space-y-2.5 pt-1.5">
                    {secrets[activeSecret].details[language].map((dt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#5C4D3C] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] mt-1.5 shrink-0" />
                        <span>{dt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>

          {/* RIGHT: Dynamic Crossfading LifeStyle Photo compositions */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 relative flex items-center justify-center p-3"
          >
            {/* Master Photo Display frame with vintage copper borders */}
            <div className="w-full aspect-square sm:aspect-4/3 lg:aspect-square rounded-3xl overflow-hidden border-8 border-[#EADCC6] shadow-2xl relative bg-amber-50 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSecret}
                  src={secrets[activeSecret].image}
                  alt={secrets[activeSecret].title[language]}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Transparent dark gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F2E1E]/80 via-transparent to-[#3F2E1E]/20" />
              
              {/* Dynamic bottom floating details */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-black text-amber-300">
                    {language === 'en' ? "100% Traditional Village Kitchen Sourced" : "१००% शुद्ध हाथ सवादिष्ठ परंपरा"}
                  </span>
                </div>
                <h4 className="text-lg sm:text-2xl font-serif font-black">{secrets[activeSecret].title[language]}</h4>
                <p className="text-[10px] sm:text-xs text-[#FAF6EE]/80 max-w-md font-medium leading-relaxed font-sans line-clamp-2">
                  {secrets[activeSecret].subtitle[language]}
                </p>
              </div>

              {/* Floating micro trust seal badge */}
              <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-[#3F2E1E] text-white border-2 border-amber-300 shadow-lg flex flex-col items-center justify-center text-center p-1 font-serif select-none rotate-6 scale-90 sm:scale-100">
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse mb-0.5" />
                <span className="text-[7px] uppercase font-bold tracking-widest leading-none font-mono">Maati</span>
                <span className="text-[7px] text-amber-200 uppercase font-black tracking-widest leading-none">Trust</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* GEOGRAPHICAL ORIGINS BAR (Emotional roots) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-6 bg-[#3F2E1E] rounded-3xl border border-amber-100/10 text-white shadow-lg grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-center md:text-left relative overflow-hidden"
        >
          {/* background design */}
          <div className="absolute right-0 bottom-[-50%] w-96 h-96 rounded-full bg-[#B45309]/10 blur-3xl pointer-events-none" />

          <div className="md:col-span-2 space-y-1.5 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 font-mono">
              ⛳ geographical roots & village cooperative
            </span>
            <h4 className="text-xl font-serif font-black">
              {language === 'en' ? "Empowering 240+ rural women in Saran, Bihar." : language === 'hi' ? "सारण, बिहार की २४०+ ग्रामीण महिलाओं का स्वावलंबन" : "सोनक गाँव के २४०+ मनिहारी दीदी लोगन क सहारा"}
            </h4>
            <p className="text-xs text-amber-100/70 max-w-md font-semibold leading-relaxed">
              {language === 'en'
                ? "Every snack directly supports stable livelihoods for women-led self-help cooperatives. We source our Sehore wheat and Saran sugarcane directly from organic farmers."
                : language === 'hi'
                ? "माटी का प्रत्येक आर्डर ग्रामीण महिलाओं के परिवारों को सम्मानजनक जीविका प्रदान करता है। हम अपना गेंहू और गुड़ सीधे स्थानीय किसानों से उचित मूल्य पर खरीदते हैं।"
                : "हरेक आर्डर गाँव के दीदी लोगन क जीविका मजबूूत बनावेला। चोकरयुक्त गेहूं आ गुड़ सीधे किसान भाई लोग से उचित मुनाफ़ा क संग लिहल जाला।"}
            </p>
          </div>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center relative z-10">
            <p className="text-3xl font-black font-mono text-amber-400">12k+</p>
            <p className="text-[10px] font-bold text-amber-50 uppercase tracking-widest mt-1">Families Served</p>
          </div>

          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-center relative z-10">
            <p className="text-3xl font-black font-mono text-amber-400">98%</p>
            <p className="text-[10px] font-bold text-amber-50 uppercase tracking-widest mt-1">Repeat Happiness</p>
          </div>
        </motion.div>


        {/* THE TRADITIONAL PREPARATION METHOD JOURNEY: Timeline Stream */}
        <div id="preparation-timeline" className="space-y-10 pt-8 border-t border-[#EADCC6]/60">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block">
              ✨ {language === 'en' ? "Heritage Sancha Cooking Flow" : "तैयारी की पावन विधि"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#3F2E1E]">
              {language === 'en' ? "The 4 Pillars of Clay Hearth Batching" : "धान की सोंधी खुशबू: खेत से थाली तक का सफर"}
            </h3>
            <p className="text-xs text-[#857252] font-semibold max-w-md mx-auto">
              {language === 'en' 
                ? "How we prepare fresh, crunchy treats in small daily morning batches under strict sanitary controls."
                : "बिना किसी ऑटोमैटिक धातु रोलर या केमिकल के, जानें कैसे सुबह के ताज़ा घान तैयार होते हैं।"}
            </p>
          </div>

          {/* Staggered Timeline Grid with subtle connections */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Interactive Connecting trails indicator (Desktop Only) */}
            <div className="hidden md:block absolute top-1/3 left-4 right-4 h-0.5 border-t-2 border-dashed border-[#EADCC6]/80 -z-10" />

            {journeyTimeline.map((jt, idx) => {
              return (
                <motion.div
                  key={jt.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-[#FBF9F4] p-5 rounded-2xl border border-[#EADCC6] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between group h-full"
                >
                  {/* Glowing index indicator */}
                  <div className="absolute top-1 right-2 text-7xl font-mono text-[#EADCC6]/20 font-black tracking-tighter select-none">
                    {jt.step}
                  </div>

                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-[#B45309]/15 flex items-center justify-center font-bold text-[#B45309] text-xs">
                      {idx === 0 && <Sprout className="w-5 h-5" />}
                      {idx === 1 && <Sprout className="w-5 h-5 rotate-90" />}
                      {idx === 2 && <Award className="w-5 h-5" />}
                      {idx === 3 && <Flame className="w-5 h-5 animate-pulse" />}
                    </div>

                    <div className="space-y-1.5 relative z-10">
                      <span className="text-[9px] font-mono text-[#B45309] font-black uppercase tracking-widest block">
                        Phase {jt.step}
                      </span>
                      <h4 className="text-sm font-serif font-black text-[#3F2E1E] group-hover:text-[#B45309] transition-colors leading-tight">
                        {jt.title[language]}
                      </h4>
                      <p className="text-[11px] text-[#5C4D3C] font-semibold leading-relaxed">
                        {jt.desc[language]}
                      </p>
                    </div>
                  </div>

                  {/* Micro traditional reassuring note */}
                  <div className="pt-4 mt-4 border-t border-[#EADCC6]/40 flex items-center justify-between text-[9px] font-mono text-[#857252] uppercase tracking-wider">
                    <span>{language === 'en' ? "Pure Artisan" : "हस्तनिर्मित"}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#B45309] group-hover:translate-x-1 transition-transform" />
                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}
