import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, BookOpen, Clock, Heart, Download, Check, Sparkles, MapPin, Share2 } from 'lucide-react';
import { Language } from '../types';

interface RitualsAndTraditionsProps {
  language: Language;
}

interface FestivalGuide {
  id: string;
  name: Record<Language, string>;
  subtitle: Record<Language, string>;
  dateDesc: Record<Language, string>;
  gCalDateStart: string; // YYYYMMDD string for Google templating
  gCalDateEnd: string;
  gCalDetails: string;
  icsDetails: string;
  associatedSnack: Record<Language, string>;
  image: string;
  description: Record<Language, string>;
  recipeQuote: Record<Language, string>;
}

const FESTIVALS: FestivalGuide[] = [
  {
    id: 'chhath-puja',
    name: {
      en: 'Chhath Puja Mahaprasad',
      hi: 'छठ महाव्रत एवं वैदिक अपूप',
      bho: 'छठ मईया के महापवित्तर परसाद'
    },
    subtitle: {
      en: 'The ultimate sunrise gratitude ritual',
      hi: 'सूर्य उपासना और शुद्धता का शिखर पर्व',
      bho: 'सजल घाट आ उगते सुरुज देव के अरघ'
    },
    dateDesc: {
      en: 'November 14, 2026',
      hi: '१४ नवम्बर २०२६',
      bho: '१४ नवम्बर २०२६ (छठ मइया)'
    },
    gCalDateStart: '20261114T060000Z',
    gCalDateEnd: '20261114T100000Z',
    gCalDetails: 'Celebrate Chhath Puja with pure Gur & Saunf Thekua Mahaprasad from MaatSnacks! Hand-kneaded with holy water, pure Desi cow ghee, and wooden sanchas. Rest and gratitude under the golden sun.',
    icsDetails: 'Celebrate Chhath Puja with pure Gur & Saunf Thekua Mahaprasad from MaatSnacks!',
    associatedSnack: {
      en: 'Gur & Saunf Sancha Thekua',
      hi: 'गुड़ और ताज़ी हरी सौंफ का ठेकुआ',
      bho: 'सारण गुड़ क सौंफ वाला ठेकुआ'
    },
    image: 'https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&w=600&q=80',
    description: {
      en: 'To prepare Prasad for the Sun God (Surya) during Chhath Puja, mothers undergo a fast of absolute water-free devotion (Nirjala). The sweet whole-wheat patty—Gur Thekua—is hand-carved on traditional rosewood moulds, showing leaf lines symbolising the sun’s life-sustaining rays. It is baked over a slow clay stove fed only with clean Mango wood to lock the raw wood smoke aroma.',
      hi: 'छठ महापर्व के दौरान भगवान भास्कर को अर्घ्य देने के लिए अगाध श्रद्धा से "प्रसाद" तैयार किया जाता है। सुहागिन व्रतधारी महिलाएं पूरी शुचिता से आम की सूखी लकड़ियों और मिट्टी के सोंधे चूल्हे पर इसे पकाती हैं। लकड़ी के सांचे पर बनी पत्ती सूर्यदेव को जीवनदायिनी ऊर्जा के प्रति कृतज्ञता दर्शाने का वैदिक प्रतीक है।',
      bho: 'छठ माई के अरघ बदे गूँधल गेहूं क आटा, गुड़, आ पीला गाय क घी से बनल ठेकुआ सबसे पवित्र प्रसाद ह। माटी के नवका चूल्हा आ आम क काठ पर शुद्ध घी में पका के गंगा तट पर सुपली में रखल जाला। इ खाली परसाद ना, इ साक्षात् प्रकृति माई क दीक्षा ह।'
    },
    recipeQuote: {
      en: '“Prepared with zero chemical white sugar or external storage preservatives, honoring the autumn’s organic harvest cycle.”',
      hi: '“इस भोग की तैयारी में रिफाइंड चीनी या फैक्टरी के ब्लीचड मैदे का प्रवेश निषेध है। यह संपूर्ण शुचिता का लोक-संकल्प है।”',
      bho: '“छठ मइया क प्रसाद बदे साफ़-सफ़ाई क अइसन ध्यान राखल जाला कि कौनों कीड़ा चाहे जूठ क अंश तक परछाई ना डाल सके।”'
    }
  },
  {
    id: 'sawan-jhula',
    name: {
      en: 'Sawan Jhula & Kajari',
      hi: 'सावन झूले और कजरी त्योहार',
      bho: 'सावन क कजरी आ रिमझिम फुहार'
    },
    subtitle: {
      en: 'Monsoon swings and crispy evening chai pairing',
      hi: 'सावन की सुहानी फुहार और कढ़ाई की खनक',
      bho: 'पेड़ क झूला आ नीम क ठंडी छाँव'
    },
    dateDesc: {
      en: 'August 15, 2026',
      hi: '१५ अगस्त २०२६ (सावन मास)',
      bho: '१५ अगस्त २०२६ (कजरी गीत)'
    },
    gCalDateStart: '20260815T160000Z',
    gCalDateEnd: '20260815T190000Z',
    gCalDetails: 'Relish Sawan Jhula celebrations with crispy Desi Ghee Ajwain Nimki from Maati Snacks. A match made in heaven alongside hot cutting ginger tea.',
    icsDetails: 'Relish Sawan Jhula celebrations with crispy Desi Ghee Ajwain Nimki from Maati Snacks.',
    associatedSnack: {
      en: 'Desi Ghee 16-Fold Ajwain Nimki',
      hi: '१६ परतदार ख़स्ता अजवाइन निमकी',
      bho: 'जांता आटा आ सेंधा नून क सुहाली'
    },
    image: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80',
    description: {
      en: 'As fresh rainfall hits the parched central fields of Bihar, massive ropes are tied to branches of old neem and mango trees. Girls assemble in swing circles singing beautiful "Kajari" folk songs. The snacks that accompany this moist earthen-smell evening are piping hot, crispy, multilayered triangle Nimkis, seasoned with carom seeds (Ajwain) that traditional Ayurvedic vaidyas prescribe to settle digestives during humid monsoons.',
      hi: 'सावन की पहली फुहार पड़ते ही गाँव-गाँव में झूले पड़ जाते हैं। सखियाँ "कजरी" और मद्धम मल्हार गाते हुए झूला झूलती हैं। इस सुहाने मौसम में चाय के संग कुरकुरी, परतदार सेंधा नमक और पाचक अजवाइन से सजी निमकी खानी एक पुरातन परंपरा है, जिससे वातावरण का नमी युक्त प्रभाव पाचन प्रक्रिया को दुरुस्त रखता है।',
      bho: 'सावन में जब रिमझिम पानी बरसे, त गाँव के अमराई में बड़की रस्सी क झूला पड़ जाला। बहिन-बेटी लोग संगे झूला झूलत कजरी गावेली। ओ बखत सुगन्धित अदरक चाय संगे १६-परत क खस्ता नमकीन निमकी मिल जाए त सोंध मिट्टी मन खुश हो जाला।'
    },
    recipeQuote: {
      en: '“Sendha salt and hand-roasted carom seeds bring that digestive warmth crucial during heavy rainfalls.”',
      hi: '“पहाड़ी सेंधा और तवे पर हल्की सी भूनी ताज़ी अजवाइन निमकी को हल्का बनाती है जो पेट के अनुकूल है।”',
      bho: '“हाथ के रगड़ल ताज़ा अजवाइन आ सेंधा नमक क सुगन्ध सोंध चाय क आनंद दो गुना क देवेला।”'
    }
  },
  {
    id: 'khonicha-wedding',
    name: {
      en: 'Vadhus Bidai & Sugaat',
      hi: 'विवाह बिदाई और कोइछा सौगात',
      bho: 'बिटिया क कोइछा सुगात'
    },
    subtitle: {
      en: 'Golden ghee containers for traveling daughters',
      hi: 'पीतल के डिब्बे में माँ के सुगन्धित आशीर्वाद',
      bho: 'माँ के दुवार से विदा होत बिटिया क अशीष'
    },
    dateDesc: {
      en: 'Upcoming Festive Weddings 2026',
      hi: 'शुभ विवाह लग्न पर्व २०२६',
      bho: 'विवाह लग्न क सोंध रीती-रिवाज'
    },
    gCalDateStart: '20261125T090000Z',
    gCalDateEnd: '20261125T140000Z',
    gCalDetails: 'Vadhus Bidai & Sugaat packing. Gift a custom Maati Golden Ghee Thekua set containing warm wishes for newlywed brides going back to home.',
    icsDetails: 'Vadhus Bidai & Sugaat packing. Gift a custom Maati Golden Ghee Thekua set.',
    associatedSnack: {
      en: 'Sancha Desi Ghee & Cardamom Thekua',
      hi: 'शुद्ध गाय का दानेदार घी वाला खस्ता ठेकुआ',
      bho: 'ए२ पीला घी आ कुटी इलायची क ठेकुआ'
    },
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    description: {
      en: 'When a newly wedded daughter leaves her parental threshold (Myka) to board her transit after the wedding ceremony, the teary-eyed mother places fresh, golden-crisped, ghee-laden sugar-scented Thekuas inside her cloth bag, called "Khonicha" or "Sugaat". This substantial, high-energy sweet guarantees she never runs out of nutrients during arduous journeys and acts as a delicious connection to her childhood kitchen.',
      hi: 'जब बिटिया विदा होकर अपने पिया के घर जाने लगती है, तो माँ नम आँखों से उसके दामन में सूप से पाँच मुट्ठी अक्षत, दूब और भारी पीतल के डब्बों में गाय के शुद्ध घी से बने खस्ता ठेकुए डालती है जिसे स्थानीय भाषा में "खोंइछा भरना" कहते हैं। यह आशीर्वाद है कि बेटी ससुराल में सदैव प्रचुरता और मिठास फैलाए।',
      bho: 'विदाई के बेरा माई रोवत-गावत बिटिया के खोइछा में अक्षत, दुभी, आ सुगन्धित घी आ सूखा गरी क बनल गोल ठकुआ भारी कोइछा में देवेली। ससुराल पहुँचे पर इ ठेकुआ क महक दीदी-बहिन के माई के हाथ के दुलार के याद मद्धम-मद्धम दिलावत रहेला।'
    },
    recipeQuote: {
      en: '“Meticulously kneaded dry dough with high ghee percentage gives it a melting biscuit flake that lasts months.”',
      hi: '“शुद्ध घी का भरपूर मोयन और इलायची का तालमेल इसे इतना मुलायम बनाता है कि मुँह में जाते ही मलाई जैसा घुल जाता है।”',
      bho: '“बिना डालडा आ सुगन्धित तेल के केवल शुद्ध घी क मोयन ए सुगात के ६० दिन ले करारा आ महकदार राखेला।”'
    }
  }
];

export default function RitualsAndTraditions({ language }: RitualsAndTraditionsProps) {
  const [activeTab, setActiveTab] = useState<string>(FESTIVALS[0].id);
  const [successEventId, setSuccessEventId] = useState<string | null>(null);

  const activeFest = FESTIVALS.find(f => f.id === activeTab) || FESTIVALS[0];

  // Client-side .ics file generator & downloader
  const downloadICSFile = (fest: FestivalGuide) => {
    try {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Maati Snacks//Rituals Calendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${fest.id}-2026@maatisnacks.com`,
        `DTSTART:${fest.gCalDateStart}`,
        `DTEND:${fest.gCalDateEnd}`,
        `SUMMARY:${fest.name[language]} - Maati Snacks Traditional Pairing`,
        `DESCRIPTION:${fest.icsDetails} Sourced ingredients: ${fest.associatedSnack[language]}`,
        'LOCATION:Rural India Family Kitchen, Patna, Bihar',
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Maati_${fest.id}_Sugaat_2026.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Flash success visual state
      setSuccessEventId(fest.id);
      setTimeout(() => setSuccessEventId(null), 3000);
    } catch (e) {
      console.error('Failed to export calendar file', e);
    }
  };

  // Google Calendar render Template helper
  const getGoogleCalendarUrl = (fest: FestivalGuide) => {
    const title = encodeURIComponent(`${fest.name[language]} 🌾 | Maati Heritage`);
    const details = encodeURIComponent(`${fest.gCalDetails}\n\nSuggested Savor: ${fest.associatedSnack[language]}`);
    const dates = `${fest.gCalDateStart}/${fest.gCalDateEnd}`;
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=Patna+Kitchen+Sourced&sf=true&output=xml`;
  };

  return (
    <section id="rituals-sacred-section" className="py-16 bg-[#FAF6EE] border-b border-[#EADCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Decorative floral crest */}
        <div className="flex justify-center mb-2">
          <span className="text-xl">🌸 ✨ 🌸</span>
        </div>

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#B45309] uppercase block mb-1 font-mono">
            {language === 'en' ? 'Festival Roots & Sacred Customes' : language === 'hi' ? 'परंपरा और ऋतु चक्र उत्सव' : 'रीती-रिवाज आ पावन लोक-पर्व'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#3F2E1E] tracking-tight">
            {language === 'en' ? 'Rituals & Traditions' : language === 'hi' ? 'माटी कंचन: लोक त्योहार एवं संस्कृति' : 'त्योहार आ माँ के सनेह क पोटली'}
          </h2>
          <div className="w-16 h-1 bg-[#B45309] mx-auto my-4 rounded" />
          <p className="text-sm sm:text-base text-[#857252] font-semibold leading-relaxed">
            {language === 'en' 
              ? 'Our sweets and savories are not mere flour items. Discover the ancient seasonal cycles, weddings, and mother blessings associated with each snack.'
              : language === 'hi' 
                ? 'हमारा ठेकुआ और निमकी कोई बाज़ारू बिस्कुट नहीं है। यह सदियों पुराने लोक विश्वासों, मां के दुलार और खुशहाल जीवन की मंगल कामना का वैदिक रूप है।'
                : 'हमनी क ठेकुआ खाली घी-आटा क मीठा ना ह, एकरा पीछे छठ मईया क सरधा, बहिन क सनेह आ गाँव क प्राचीन जीवन-दर्शन बा।'}
          </p>
        </div>

        {/* Tab Buttons selection row */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FESTIVALS.map((fest) => (
            <button
              key={fest.id}
              onClick={() => setActiveTab(fest.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 focus:outline-none cursor-pointer border ${
                activeTab === fest.id
                  ? 'bg-[#3F2E1E] text-[#FAF6EE] border-[#3F2E1E] shadow-md'
                  : 'bg-[#F2ECD9]/60 hover:bg-[#EADCC6]/40 text-[#3F2E1E] border-[#EADCC6]'
              }`}
            >
              <span>{fest.id === 'chhath-puja' ? '☀️' : fest.id === 'sawan-jhula' ? '🌧️' : '💍'}</span>
              <span>{fest.name[language]}</span>
            </button>
          ))}
        </div>

        {/* Display detailed content with responsive split layout */}
        <div className="bg-[#FAF3E0] rounded-3xl border-2 border-[#EADCC6] p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Illustrated festival imagery */}
            <div className="lg:col-span-4 space-y-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#EADCC6] relative shadow-inner bg-amber-50">
                <img
                  src={activeFest.image}
                  alt={activeFest.name[language]}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded absolute badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#EADCC6] py-1 px-3 rounded-lg text-[10px] font-mono font-black text-amber-800 flex items-center gap-1.5 shadow">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>{activeFest.dateDesc[language]}</span>
                </div>

                {/* Sourcing Badge overlay */}
                <div className="absolute bottom-4 inset-x-4 bg-[#3F2E1E]/90 backdrop-blur-sm p-3 rounded-xl border border-white/10 text-white text-[11px]">
                  <span className="text-[9px] text-amber-300 font-mono font-black uppercase block tracking-wider mb-0.5">
                    {language === 'en' ? 'Savor this festival with' : 'पावन साझीदार व्यंजन'}
                  </span>
                  <span className="font-serif font-black flex items-center gap-1">
                    🍃 {activeFest.associatedSnack[language]}
                  </span>
                </div>
              </div>
            </div>

            {/* Cultural descriptive copy - 8 cols */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <span className="text-[10px] font-mono font-black uppercase text-[#B45309] block mb-1 tracking-widest">
                  {activeFest.subtitle[language]}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#3F2E1E] leading-tight">
                  {activeFest.name[language]}
                </h3>
                <div className="h-0.5 w-16 bg-[#B45309] my-3" />
              </div>

              {/* Core folklore & description info */}
              <div className="space-y-4 text-xs sm:text-sm text-[#3F2E1E] leading-relaxed font-sans text-left">
                <p>{activeFest.description[language]}</p>
                <div className="bg-[#FAF6EE]/70 border-l-4 border-[#B45309] p-4 rounded-r-xl font-serif italic text-[#857252] font-semibold">
                  {activeFest.recipeQuote[language]}
                </div>
              </div>

              {/* Dynamic Interactive Calendar Actions Container */}
              <div className="pt-6 border-t border-[#EADCC6] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[9px] font-mono font-black uppercase text-[#857252] block mb-1">
                    📆 {language === 'en' ? 'Festival Calendar Reminders' : 'फेस्टिवल स्मरण रिमाइंडर'}
                  </span>
                  <p className="text-xs font-serif font-black text-[#3F2E1E]">
                    {language === 'en' 
                      ? 'Add this pure culinary event to your device calendar'
                      : language === 'hi' 
                        ? 'इस पावन तिथि को अपने मोबाइल कैलेंडर में दर्ज करें'
                        : 'एह पावन तिथि के आपन मोबाइल कैलेंडर क हिस्सा बनाईं'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-start sm:justify-end">
                  
                  {/* Google Calendar Link button */}
                  <a
                    href={getGoogleCalendarUrl(activeFest)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-[#B45309] hover:bg-[#3F2E1E] text-[#FAF6EE] text-xs font-black rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <span>Google Calendar</span>
                  </a>

                  {/* Standard Offline .ICS download button */}
                  <button
                    onClick={() => downloadICSFile(activeFest)}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-white border-2 border-[#EADCC6] hover:bg-[#F2ECD9] text-[#3F2E1E] text-xs font-black rounded-xl uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm focus:outline-none"
                    title="Download iCal Invite"
                  >
                    {successEventId === activeFest.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Added!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download .iCal</span>
                      </>
                    )}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
