import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, Award, ShieldCheck, Heart, Sparkles, User, Calendar, CheckCircle2, History, RotateCcw, Truck, MapPin, Gift, Box, Check, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface TraceMyBatchProps {
  language: Language;
}

interface BatchRecord {
  batchNo: string;
  productName: Record<Language, string>;
  artisanName: string;
  artisanRole: Record<Language, string>;
  artisanVillage: Record<Language, string>;
  artisanAge: number;
  preparationDate: string;
  millingDate: string;
  gheeSource: Record<Language, string>;
  batchSize: number;
  artisanQuote: Record<Language, string>;
  artisanImage: string;
  qaPassed: boolean;
}

interface ShipmentStep {
  label: Record<Language, string>;
  location: Record<Language, string>;
  time: string;
  desc: Record<Language, string>;
  status: 'completed' | 'current' | 'upcoming';
  icon: string;
}

interface OrderRecord {
  orderId: string;
  customerName: string;
  orderDate: string;
  eta: string;
  currentDayIndex: number; // 0 to 5 for simulating
  steps: ShipmentStep[];
}

const PREDEFINED_BATCHES: Record<string, BatchRecord> = {
  'MT-GUR-104': {
    batchNo: 'MT-GUR-104',
    productName: { en: 'Gur & Saunf Sancha Thekua', hi: 'गुड़ और सौंफ का ठेकुआ', bho: 'गुड़ सौंफ वाला ठकुआ' },
    artisanName: 'Amrita Devi',
    artisanRole: { en: 'Master Kneader & Sancha Carver', hi: 'मुख्य परात शिल्पी', bho: 'बरिया आटा गूंथनेवाली' },
    artisanVillage: { en: 'Saran District, Bihar', hi: 'सारण जिला, उत्तर बिहार', bho: 'सारण गाँव, बिहार' },
    artisanAge: 52,
    preparationDate: 'June 12, 2026',
    millingDate: 'June 10, 2026',
    gheeSource: { en: 'Traditional Saran family wood press', hi: 'सारण सहकारी कड़ाही गुड़ कड़ाव', bho: 'सारण क गाँव क कोल्हू' },
    batchSize: 85,
    artisanQuote: {
      en: '“I ensure the fennel seeds are crushed in stone mortars, just enough to release the oils, giving the jaggery dough its deep country aroma.”',
      hi: '“मैं सौंफ को सिलबट्टे पर दरदरा कूटती हूँ। ज्यादा बारीक नहीं, ताकि जब गुड़ के साथ सिके तो खुशबू सीधे नाक पर ठहरे।”',
      bho: '“हम सौंफ के सिल पर मद्धम कूटेनी। हाथ क कुटल मसाला जब गुड़ संगे धीमा आँच पर सिखेला, त पूरा परात सुगन्धित हो जाला।”'
    },
    artisanImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    qaPassed: true
  },
  'MT-GHEE-208': {
    batchNo: 'MT-GHEE-208',
    productName: { en: 'Sancha Desi Ghee Thekua', hi: 'सुनहरा देसी गाय घी ठेकुआ', bho: 'देसी गाय घी सांचा ठेकुआ' },
    artisanName: 'Kanti Devi',
    artisanRole: { en: 'A2 Ghee Churner & Sancha Carver', hi: 'मुख्य घृत मन्थन विशेषज्ञ', bho: 'बिलोना विशेषज्ञ दीदी' },
    artisanVillage: { en: 'Gaya Grazing Plains, Bihar', hi: 'नदी किनारे गया गाँव, दक्षिण बिहार', bho: 'गया क डेरा' },
    artisanAge: 48,
    preparationDate: 'June 14, 2026',
    millingDate: 'June 13, 2026',
    gheeSource: { en: 'Pure Gaya A2 makkhan pastures', hi: 'गया की शुद्ध ए२ बिलोना गौशाला', bho: 'गया क पीला गाय क डेरी' },
    batchSize: 72,
    artisanQuote: {
      en: '“Kneading the warm whole wheat with pure Gaya pasture ghee is a sacred act of patience. There is no water used, only pure milk syrup.”',
      hi: '“शुद्ध घी के मोयन में गेहूं के आटे को सानना पूजा जैसा काम है। हम इसमें पानी नहीं, बल्कि रसीला दूध का घोल छिटक कर गूंथते हैं।”',
      bho: '“आटा पिसा के अईला के बाद भोर ही हम गाय के घी क मोयन देईला। पानी हराम बा, खाली मीठा दूध छिड़क के आटा बान्हल जाला।”'
    },
    artisanImage: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=400&q=80',
    qaPassed: true
  },
  'MT-NIM-309': {
    batchNo: 'MT-NIM-309',
    productName: { en: 'Desi Ghee Ajwain Nimki', hi: 'पारंपरिक खस्ता अजवाइन निमकी', bho: 'सोंध नुनछुर अजवाइन निमकी' },
    artisanName: 'Radha Mishra',
    artisanRole: { en: 'Dough Layering Artisan (16-folds)', hi: '१६-परत निमकी निर्माण शिल्पी', bho: 'नमकीन निमकी शिल्पी दीदी' },
    artisanVillage: { en: 'Samastipur Fields, Bihar', hi: 'समस्तीपुर ग्राम पंचायत, बिहार', bho: 'समस्तीपुर जिला क देहात' },
    artisanAge: 56,
    preparationDate: 'June 15, 2026',
    millingDate: 'June 14, 2026',
    gheeSource: { en: 'Unpolished Samastipur sea-salt beds', hi: 'समस्तीपुर चक्की एवं आर्गेनिक अजवाइन खेत', bho: 'समस्तीपुर क चक्की खेत' },
    batchSize: 110,
    artisanQuote: {
      en: '“Each triangle pastry is folded sixteen times exactly, so that when it hits the hot peanut oil, it opens up like crispy wooden book pages.”',
      hi: '“हम प्रत्येक निमकी को सोलह बार तह करते हैं। तभी तो जब गर्म मूंगफली तेल में छनती है, तो बिस्कुट की सौ परतें खुल जाती हैं।”',
      bho: '“हम १६ बार मोड़ के नमकीन निमकी क तिकोन गढ़ेनी। गर्म तेल में जात ही एकर परत खुल के एकदम खस्ता, करारा पापड़ी नियन होइ जाला।”'
    },
    artisanImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    qaPassed: true
  }
};

const SAMPLE_ORDERS: Record<string, OrderRecord> = {
  'MAATI-82106': {
    orderId: 'MAATI-82106',
    customerName: 'Ashish Gupta',
    orderDate: 'June 14, 2026',
    eta: 'June 19, 2026',
    currentDayIndex: 2,
    steps: [
      {
        label: { en: 'Baking / Slow Roasting', hi: 'बेकिंग व भट्टी सिकाई', bho: 'भट्टी सिकाई' },
        location: { en: 'Saran Kitchens, Bihar', hi: 'सारण चूल्हाघर, बिहार', bho: 'सारण गाँव, बिहार' },
        time: 'Day 1 - 09:00 AM',
        desc: { 
          en: 'Our artisan sisters are slowbaking your cookies with hand-fed wood-fire and pure grass-fed A2 cow ghee in clay ovens (chulhas).',
          hi: 'हमारी कारीगर दीदीयों द्वारा आपके व्यंजनों को सारण के पारंपरिक चूल्हे पर धीमी आंच में ताजे पीला बिलोना घी के मोयन से सेका जा रहा है।',
          bho: 'दीदी लोग चूल्हा पर धीमी आँच में घी आ गेंहू क मोयन से एकदम ताँबा तरी स्नैक्स पका रहल बाड़ी।'
        },
        status: 'completed',
        icon: '🔥'
      },
      {
        label: { en: 'Packaging & Quality Check', hi: 'पैकेजिंग व पवित्रता जाँच', bho: 'डब्बा सील' },
        location: { en: 'Hand sealing Hub, Saran', hi: 'देहात पैकिंग केंद्र, बिहार', bho: 'गाँव क पैकिंग' },
        time: 'Day 1 - 04:30 PM',
        desc: {
          en: 'Your snacks were naturally cooled on traditional wide bamboo trays, passed real-time absolute moisture testing, and hand-sealed.',
          hi: 'व्यंजनों को बांस के बर्तनों में सुखाकर नमी की कड़क जाँच दी गई और आर्गेनिक एयर-टाइट थैली में सुवास सुरक्षित करने को पैक किया गया।',
          bho: 'तैयार प्रसाद सूप में ठंढा भईल आ नमी क पूरा जाँच भईल। आर्गेनिक पोटली में धागा क संगे हाथ से सील भईल।'
        },
        status: 'completed',
        icon: '📦'
      },
      {
        label: { en: 'Dispatched for Delivery', hi: 'प्रेषण व देहात से रवानगी', bho: 'डाक गाड़ी रवानगी' },
        location: { en: 'Rural Postal Junction, Bihar', hi: 'देहात निकासी स्टेशन, पूर्वांचल', bho: 'देहाती मार्ग' },
        time: 'Day 2 - 06:15 PM',
        desc: {
          en: 'Your package completed highway toll clearance and and is in transit via temperature-controlled delivery vans.',
          hi: 'आपकी स्वादिष्ट सौगात गांव की देहरी लांघकर तेज डाक वाहन के साथ राष्ट्रीय राजमार्ग से आपके निवास की ओर प्रेषित हो चुकी है।',
          bho: 'डाक गाड़ी क संगे रउआ सुगन्धित पोटली मुख्य राजमार्ग पर तेजी से निकल चुकल बा।'
        },
        status: 'current',
        icon: '🚚'
      },
      {
        label: { en: 'Delivered / Doorstep Handover', hi: 'वितरण व द्वार आगमन', bho: 'दुआर पर दस्तक' },
        location: { en: 'Your Loving Home Yard', hi: 'आपका निवास स्थान', bho: 'रउवा घर' },
        time: 'Day 4 - Estimated',
        desc: {
          en: 'Grandma’s fresh authentic fragrance delivered safely to your hands. Keep the hot cardamom tea ready!',
          hi: 'दादी माँ के प्यार और शुद्ध स्वाद की सौगात आपके द्वार पर पहुँच चुकी है। अदरक-इलायची वाली चाय तैयार रखें!',
          bho: 'दादी जी क प्यार आ ताज़ा सुगन्ध रउवा दुआर पर पहुँच गइल बा! गरमा-गरम चाय क पानी चढ़ा के राखीं।'
        },
        status: 'upcoming',
        icon: '🏡'
      }
    ]
  }
};

export default function TraceMyBatch({ language }: TraceMyBatchProps) {
  const [activeTab, setActiveTab] = useState<'artisan' | 'order'>('artisan');
  
  // Artisan state
  const [inputCode, setInputCode] = useState<string>('');
  const [searchedRecord, setSearchedRecord] = useState<BatchRecord | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  // Order status tracker state
  const [orderQuery, setOrderQuery] = useState<string>('');
  const [searchedOrder, setSearchedOrder] = useState<OrderRecord | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  const t = (key: string) => {
    const data: Record<string, Record<Language, string>> = {
      tab_artisan: { en: '👨‍🍳 Trace Artisan Batch', hi: '🌾 पैकेट निर्माता खोजें', bho: '🌾 सोंध घान निर्माता' },
      tab_order: { en: '🚚 Live Order Tracker', hi: '🚚 ऑर्डर यात्रा लाइव ट्रैकर', bho: '🚚 लाइव ऑर्डर यात्रा' },
      artisan_label: { en: 'Trace My Batch', hi: 'अपने पैकेट के निर्माता का पता लगाएं', bho: 'पता लगायीं रउआ ठेकुआ के गढ़लस' },
      order_label: { en: 'Live Shipping Journey Tracker', hi: 'घर की देहरी तक लाइव यात्रा मार्ग', bho: 'रसोईघर से रउआ दुआर ले यात्रा' }
    };
    return data[key]?.[language] || key;
  };

  const clickBatchAction = (code: string) => {
    setInputCode(code);
    setSearchedRecord(PREDEFINED_BATCHES[code]);
    setErrorText(null);
  };

  const clickOrderAction = (orderId: string) => {
    setOrderQuery(orderId);
    setSearchedOrder({ ...SAMPLE_ORDERS[orderId] });
    setOrderError(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      setErrorText(language === 'en' ? 'Please enter a batch code' : 'कृपया एक बैच नंबर दर्ज करें');
      return;
    }

    const cleanedCode = inputCode.trim().toUpperCase();
    const match = PREDEFINED_BATCHES[cleanedCode];

    if (match) {
      setSearchedRecord(match);
      setErrorText(null);
    } else {
      const simulatedRecord: BatchRecord = {
        batchNo: cleanedCode,
        productName: { en: 'Artisanal Handcraft Selection', hi: 'माटी पारंपरिक धरोहर घान', bho: 'माटी क सनेह घान' },
        artisanName: 'Shanti Devi',
        artisanRole: { en: 'Senior Traditional Baking Artisan', hi: 'वरिष्ठ पाक-कला शिल्पी', bho: 'वरिष्ठ रसोई महारानी' },
        artisanVillage: { en: 'Vaishali Village Co-operatives, Bihar', hi: 'वैशाली ग्राम पंचायत, बिहार', bho: 'वैशाली पट्टी, बिहार' },
        artisanAge: 54,
        preparationDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        millingDate: new Date(Date.now() - 48 * 3600 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        gheeSource: { en: 'Gaya grasslands & local stone crushing mills', hi: 'गंगा कछार देसी चरागाह', bho: 'नदी की उपजाऊ घाटी' },
        batchSize: 90,
        artisanQuote: {
          en: '“Your love for Maati supports rural kitchens. I baked this specific batch with organic whole wheat, praying for your family health.”',
          hi: '“आपके सहयोग से हमारा चूल्हा और सम्मान दोनों आबाद है। मैंने यह घान सच्चे मन और गंगा जल के छिड़काव से तैयार किया है।”',
          bho: '“रउआ सभके प्यार से हमनी के रोटी आ सुहाग सुरक्षित बा। हम ई आशीर्वाद मानन के घी आ गुड़ संगे शुद्ध मन से गढ़ले बानी।”'
        },
        artisanImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        qaPassed: true
      };
      setSearchedRecord(simulatedRecord);
      setErrorText(null);
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) {
      setOrderError(language === 'en' ? 'Please enter your order ID' : 'कृपया अपना ऑर्डर नंबर दर्ज करें');
      return;
    }

    const cleaned = orderQuery.trim().toUpperCase();
    const match = SAMPLE_ORDERS[cleaned];

    if (match) {
      setSearchedOrder({ ...match });
      setOrderError(null);
    } else {
      // Dynamic simulated Order timeline (Easter Egg!)
      const generatedOrder: OrderRecord = {
        orderId: cleaned,
        customerName: 'Authentic Food lover',
        orderDate: new Date(Date.now() - 24 * 3600 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        eta: new Date(Date.now() + 72 * 3600 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        currentDayIndex: 2,
        steps: [
          {
            label: { en: 'Baking / Slow Roasting', hi: 'बेकिंग व सिकाई', bho: 'भट्टी सिकाई' },
            location: { en: 'Saran Kitchens, Bihar', hi: 'सारण रसोईघर, बिहार', bho: 'सारण गाँव, बिहार' },
            time: 'Day 1 - Completed',
            desc: {
              en: 'Our co-operative mothers prepared the fresh dough using premium whole wheat, sweet organic cardamoms, and authentic cow ghee.',
              hi: 'को-ऑपरेटिव दीदियों द्वारा ताजा गेहूं के आटे, हरी इलायची और ताजे बिलोना घी के मिश्रण से आपके प्रसाद-तुल्य व्यंजनों को सेका जा रहा है।',
              bho: 'दीदी लोग ताजी गेंहू क चून आ ताज़ा बिलोना घी आ इलायची पीस के भट्टी सुलगा के सिकाई शुरू कर देहली।'
            },
            status: 'completed',
            icon: '🔥'
          },
          {
            label: { en: 'Packaging & Quality Check', hi: 'पैकेजिंग व पवित्रता जाँच', bho: 'डब्बा सील' },
            location: { en: 'Hand sealing Hub, Saran', hi: 'देहात पैकिंग केंद्र, बिहार', bho: 'गाँव क पैकिंग' },
            time: 'Day 1 - Completed',
            desc: {
              en: 'Cookies cooled down in open wooden cane sheets, passed double moisture lab checks, and hand-sealed in bags.',
              hi: 'व्यंजनों को बांस के बर्तनों में सुखाकर नमी की जाँच की गई और सुवास सुरक्षित रखने के लिए हाथों-हाथ सील पैक किया गया।',
              bho: 'छनाई के बाद प्रसाद बांस क सुपली में ठंढा भईल आ नमी जाँच करके जूट थैलियन में बंद कइल गइल।'
            },
            status: 'completed',
            icon: '📦'
          },
          {
            label: { en: 'Dispatched for Delivery', hi: 'प्रेषण व निकासी', bho: 'डाक गाड़ी रवानगी' },
            location: { en: 'Rural Courier Terminal, Saran', hi: 'देहाती डाक स्टेशन, पूर्वांचल', bho: 'डाक मार्ग' },
            time: 'Day 2 - Active',
            desc: {
              en: 'Package dispatched under safe seal. Traveling via regional speed transit route.',
              hi: 'आपकी स्वादिष्ट सौगात गांव की देहरी लांघकर तेज डाक वाहन के साथ राजमार्ग मार्ग से आपके शहर की ओर जा रही है।',
              bho: 'ताज़ा पोटली डाक गाड़ी के दुलार से राजमार्ग पार करके रउआ जिला क और बढ़ रहल बा।'
            },
            status: 'current',
            icon: '🚚'
          },
          {
            label: { en: 'Delivered / Doorstep Handover', hi: 'वितरण व द्वार आगमन', bho: 'दुआर पर दस्तक' },
            location: { en: 'Your Sweet Doorstep', hi: 'आपका पवित्र घर', bho: 'रउवा घर' },
            time: 'Transit active',
            desc: {
              en: 'Our courier advisor is arriving at your doorstep with fresh, authentic farm snacks. Keep the hot cardamom tea ready!',
              hi: 'आपका कड़क सुगन्धित पारंपरिक व्यंजन आपके पवित्र द्वार पर वितरित होने वाला है। चाय का पानी चढ़ा लें!',
              bho: 'प्रतिनिधि बाबू हाथ क सुवास संगे रउआ दुआर क घंटी बजावे वाला बाड़ें। ताज़ा चाय बना के तइयार राखीं।'
            },
            status: 'upcoming',
            icon: '🏡'
          }
        ]
      };
      setSearchedOrder(generatedOrder);
      setOrderError(null);
    }
  };

  // Simulates shipment days for user fun
  const advanceSimulatedDay = () => {
    if (!searchedOrder) return;
    setSearchedOrder((prev) => {
      if (!prev) return null;
      const nextIndex = (prev.currentDayIndex + 1) % prev.steps.length;
      const nextSteps = prev.steps.map((st, i) => {
        if (i < nextIndex) return { ...st, status: 'completed' as const };
        if (i === nextIndex) return { ...st, status: 'current' as const };
        return { ...st, status: 'upcoming' as const };
      });
      return {
        ...prev,
        currentDayIndex: nextIndex,
        steps: nextSteps,
      };
    });
  };

  return (
    <section id="trace-batch-section" className="py-16 bg-[#F3EEDD] border-b border-[#EADCC6] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toggle Hub Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('artisan')}
            className={`px-5 py-3 rounded-2xl text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider transition-all border shadow-sm cursor-pointer focus:outline-none flex items-center gap-2 ${
              activeTab === 'artisan'
                ? 'bg-[#3F2E1E] text-white border-[#3F2E1E] scale-102 font-bold'
                : 'bg-white text-[#5C4D3C] border-[#EADCC6] hover:bg-[#FAF6EE] hover:text-[#B45309]'
            }`}
          >
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>{t('tab_artisan')}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('order')}
            className={`px-5 py-3 rounded-2xl text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider transition-all border shadow-sm cursor-pointer focus:outline-none flex items-center gap-2 ${
              activeTab === 'order'
                ? 'bg-[#3F2E1E] text-white border-[#3F2E1E] scale-102 font-bold'
                : 'bg-white text-[#5C4D3C] border-[#EADCC6] hover:bg-[#FAF6EE] hover:text-[#B45309]'
            }`}
          >
            <Truck className="w-4 h-4 text-amber-500" />
            <span>{t('tab_order')}</span>
          </button>
        </div>

        {/* ==================== TAB 1: ARTISAN BATCH TRACER ==================== */}
        {activeTab === 'artisan' && (
          <div>
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#B45309] uppercase block mb-1 font-mono">
                🔍 {language === 'en' ? 'Quality Transparency Hub' : language === 'hi' ? 'बैच ट्रैसेबिलिटी' : 'स्नैक पोटली क जाँच'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#3F2E1E] tracking-tight">
                {language === 'en' ? 'Trace My Batch Number' : language === 'hi' ? 'अपने पैकेट के निर्माता का पता लगाएं' : 'पता लगायीं रउआ ठेकुआ के गढ़लस'}
              </h2>
              <div className="w-16 h-1 bg-[#B45309] mx-auto my-4 rounded" />
              <p className="text-xs sm:text-sm text-[#857252] font-semibold leading-relaxed">
                {language === 'en' 
                  ? 'Every packet has a handmade batch number on the rear. Type it below to trace the exact cow herd, stone flour mill, and the rural sister who hand-pressed your snack.'
                  : language === 'hi'
                    ? 'हमारे प्रत्येक पैकेट के पीछे एक विशिष्ट कोड अंकित होता है। उस कोड को यहाँ दर्ज करें और देखें किस दीदी ने चक्की पीसने, चूल्हा जलाने और इसे गढ़ने में अपना नेह मिलाया।'
                    : 'हमनी क हर पैकेट के पीछे हाथ से घान नंबर लिखल रहेला। ओ कोड के इहाँ लिख के देखीं की कौन माई या दीदी रउवे खातिर घी क मोयन छानत रहेली।'}
              </p>
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#EADCC6] shadow-md mb-8">
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <label className="block text-xs font-mono font-black text-[#857252] uppercase text-left">
                  {language === 'en' ? 'Enter Custom Batch Code' : language === 'hi' ? 'बैच नंबर दर्ज करें' : 'घान नंबर दर्ज करीं'}
                </label>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#857252]">
                      <Search className="h-4 w-4 opacity-70" />
                    </div>
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="e.g., MT-GUR-104, MT-GHEE-208..."
                      className="w-full pl-9 pr-4 py-3 bg-[#FAF6EE] text-[#3F2E1E] placeholder-[#857252]/60 rounded-xl border border-[#EADCC6]/80 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#B45309] hover:bg-[#3F2E1E] text-[#FAF6EE] text-xs font-black rounded-xl uppercase tracking-wider cursor-pointer font-mono whitespace-nowrap transition-colors focus:outline-none"
                  >
                    {language === 'en' ? 'Trace Sourcing' : language === 'hi' ? 'जाँच शुरू करें' : 'शुरू करीं'}
                  </button>
                </div>

                {errorText && (
                  <p className="text-[11px] text-red-600 font-bold font-mono text-left">{errorText}</p>
                )}
              </form>

              {/* Preset chips */}
              <div className="mt-5 pt-4 border-t border-[#EADCC6]/40 text-left">
                <span className="text-[10px] font-mono font-black text-[#857252] uppercase block mb-2">
                  💡 {language === 'en' ? 'Test Predefined Sancha Batches:' : 'जाँच के लिए सैंपल कोड छुएं:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => clickBatchAction('MT-GUR-104')}
                    className="px-2.5 py-1.5 bg-[#FAF6EE] hover:bg-[#EADCC6]/40 border border-[#EADCC6] text-[#3F2E1E] text-[11px] font-mono font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    🌾 MT-GUR-104 (Gur)
                  </button>
                  <button
                    onClick={() => clickBatchAction('MT-GHEE-208')}
                    className="px-2.5 py-1.5 bg-[#FAF6EE] hover:bg-[#EADCC6]/40 border border-[#EADCC6] text-[#3F2E1E] text-[11px] font-mono font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    🥛 MT-GHEE-208 (Desi Ghee)
                  </button>
                  <button
                    onClick={() => clickBatchAction('MT-NIM-309')}
                    className="px-2.5 py-1.5 bg-[#FAF6EE] hover:bg-[#EADCC6]/40 border border-[#EADCC6] text-[#3F2E1E] text-[11px] font-mono font-bold rounded-lg cursor-pointer transition-colors"
                  >
                    🥨 MT-NIM-309 (Ajwain)
                  </button>
                </div>
              </div>
            </div>

            {/* Display Results */}
            <AnimatePresence mode="wait">
              {searchedRecord && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="bg-[#FAF6EE] rounded-3xl border-2 border-[#EADCC6] overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-12 relative text-left">
                    <div className="absolute top-4 right-4 z-20 w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 font-mono text-[9px] font-black uppercase rotate-12">
                      QA PASSED ✔
                    </div>

                    {/* Left: Artisan Box */}
                    <div className="md:col-span-5 bg-[#3F2E1E] text-[#FAF6EE] p-8 flex flex-col justify-between relative">
                      <div className="space-y-4">
                        <span className="text-[9px] font-mono tracking-widest text-amber-500 uppercase block font-black border-b border-white/10 pb-2">
                          🙋‍♀️ {language === 'en' ? 'YOUR BATCH ARTISAN' : language === 'hi' ? 'आपकी दीदी' : 'रउवे बदे गढ़निया'}
                        </span>
                        
                        <div className="w-24 h-24 rounded-full border-4 border-[#B45309] overflow-hidden mx-auto shadow-md">
                          <img src={searchedRecord.artisanImage} alt={searchedRecord.artisanName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>

                        <div className="text-center">
                          <h4 className="text-lg font-serif font-black">{searchedRecord.artisanName}</h4>
                          <p className="text-xs text-amber-200 font-bold font-mono uppercase">
                            {searchedRecord.artisanRole[language]}
                          </p>
                          <p className="text-[10px] text-stone-300 font-bold font-mono mt-1">
                            Age: {searchedRecord.artisanAge} years | {searchedRecord.artisanVillage[language]}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-stone-700 text-center">
                        <p className="text-xs font-serif italic text-amber-100 leading-relaxed font-medium">
                          {searchedRecord.artisanQuote[language]}
                        </p>
                      </div>
                    </div>

                    {/* Right: Steps */}
                    <div className="md:col-span-7 p-8 flex flex-col justify-between bg-white text-[#3F2E1E]">
                      <div className="space-y-6">
                        <div>
                          <span className="text-[9px] font-mono font-black uppercase text-amber-800 tracking-wider">
                            🎫 {language === 'en' ? 'HERITAGE CERTIFICATE' : 'धरोहर प्रमाण पत्र'}
                          </span>
                          <h3 className="text-xl font-serif font-black text-[#3F2E1E] mt-1">
                            {searchedRecord.productName[language]}
                          </h3>
                          <p className="text-xs text-[#857252] font-semibold">
                            Batch Code: <strong className="font-mono text-[#B45309]">{searchedRecord.batchNo}</strong>
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#EADCC6] flex items-center justify-center text-xs shrink-0 font-bold">🌾</div>
                            <div>
                              <span className="text-[9px] font-mono font-bold uppercase text-[#857252]">{language === 'en' ? 'Stone-Milling Parameters' : 'चक्की दाना पिसाई काल'}</span>
                              <p className="text-xs font-bold font-serif">Milled on {searchedRecord.millingDate}</p>
                              <p className="text-[11px] text-[#857252]">{searchedRecord.gheeSource[language]}</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#EADCC6] flex items-center justify-center text-xs shrink-0 font-bold">🔥</div>
                            <div>
                              <span className="text-[9px] font-mono font-bold uppercase text-[#857252]">{language === 'en' ? 'Clay Pot Baking' : 'धीमी कढ़ाई घान'}</span>
                              <p className="text-xs font-bold font-serif">Prepared on {searchedRecord.preparationDate}</p>
                              <p className="text-[11px] text-[#857252]">Hand-rolled and dry wood fried under standard co-operative vigilance.</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 flex items-center justify-center text-xs shrink-0 font-bold">⚖</div>
                            <div>
                              <span className="text-[9px] font-mono font-bold uppercase text-[#857252]">{language === 'en' ? 'Batch Limitation' : 'घान सीमा निर्धारण'}</span>
                              <p className="text-xs font-bold font-serif">Total Output: {searchedRecord.batchSize} Packets</p>
                              <p className="text-[11px] text-[#857252]">Small, highly monitored batches to ensure fresh crisp moisture defense.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#EADCC6] flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 font-bold">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>{language === 'en' ? 'Authentic 100% Trace Approved' : '१००% शुद्धता प्रमाणित सूची'}</span>
                        </div>

                        <button onClick={() => { setSearchedRecord(null); setInputCode(''); }} className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-1 cursor-pointer">
                          <RotateCcw className="w-3" />
                          <span>{language === 'en' ? 'Clear' : 'साफ करें'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ==================== TAB 2: INTERACTIVE ORDER STATUS LIVE TRACKER ==================== */}
        {activeTab === 'order' && (
          <div>
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#B45309] uppercase block mb-1 font-mono">
                🚚 {language === 'en' ? 'Rural Logistics Timeline' : language === 'hi' ? 'देहाती लॉजिस्टिक्स' : 'सड़क क जहाज मार्ग'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#3F2E1E] tracking-tight">
                {language === 'en' ? 'Traditional Sourcing Shipping Tracker' : language === 'hi' ? 'ऑर्डर की जादुई लाइव देहाती यात्रा' : 'आर्डर के गाँव से घर क यात्रा'}
              </h2>
              <div className="w-16 h-1 bg-[#B45309] mx-auto my-4 rounded" />
              <p className="text-xs sm:text-sm text-[#857252] font-semibold leading-relaxed">
                {language === 'en'
                  ? 'Track the exact culinary status! Tap search or enter a custom order number to trace your package as it leaves the pristine mud kitchens of Saran towards your home.'
                  : 'देहात की चूल्हा रसोइयों से विदा होकर आपका शुद्ध पारंपरिक व्यंजन किस मार्ग पर है, उसकी समयबद्ध एवं कलात्मक इतिहास तालिका देखें।'}
              </p>
            </div>

            {/* Input Search Form */}
            <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#EADCC6] shadow-md mb-8">
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <label className="block text-xs font-mono font-black text-[#857252] uppercase text-left">
                  {language === 'en' ? 'Enter Order ID (e.g. MAATI-82106)' : 'ऑर्डर नंबर दर्ज करें (जैसे: MAATI-82106)'}
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-900">
                      <Truck className="h-4 w-4 opacity-70 text-[#B45309]" />
                    </div>
                    <input
                      type="text"
                      value={orderQuery}
                      onChange={(e) => setOrderQuery(e.target.value)}
                      placeholder="e.g., MAATI-82106..."
                      className="w-full pl-9 pr-4 py-3 bg-[#FAF6EE] text-[#3F2E1E] placeholder-[#857252]/60 rounded-xl border border-[#EADCC6]/80 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#B45309] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#B45309] hover:bg-[#3F2E1E] text-white text-xs font-black rounded-xl uppercase tracking-wider cursor-pointer font-mono whitespace-nowrap transition-all focus:outline-none"
                  >
                    {language === 'en' ? 'Track Journey' : 'यात्रा ट्रैक करें'}
                  </button>
                </div>

                {orderError && (
                  <p className="text-[11px] text-red-600 font-bold font-mono text-left">{orderError}</p>
                )}
              </form>

              {/* Order Preset Quick trigger */}
              <div className="mt-5 pt-4 border-t border-[#EADCC6]/40 text-left flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-black text-[#857252] uppercase block mb-1">
                    💡 Sample Active Dispatch:
                  </span>
                  <button
                    onClick={() => clickOrderAction('MAATI-82106')}
                    className="px-3 py-1.5 bg-[#FAF6EE] hover:bg-[#EADCC6]/30 border border-[#EADCC6] text-[#B45309] text-[11px] font-mono font-black rounded-lg cursor-pointer transition-colors"
                  >
                    📦 MAATI-82106 (Ashish Gupta)
                  </button>
                </div>
                
                <span className="text-[9px] text-[#857252] italic text-right max-w-[200px]">
                  *Click sample order code to auto-load the live interactive shipping simulation timeline!
                </span>
              </div>
            </div>

            {/* Display Interactive Orders Shipping Timeline */}
            <AnimatePresence mode="wait">
              {searchedOrder && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="max-w-3xl mx-auto bg-[#FAF6EE] rounded-3xl border-2 border-[#EADCC6] p-6 sm:p-8 shadow-xl relative text-left"
                >
                  
                  {/* Shipping summary cards */}
                  <div className="border-b border-[#EADCC6] pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-[9px] font-mono font-black text-[#B45309] uppercase block">
                        📍 ORDER DISPATCH CARD
                      </span>
                      <h3 className="text-lg font-serif font-black text-[#3F2E1E] mt-0.5">
                        ID: <span className="font-mono text-[#B45309]">{searchedOrder.orderId}</span>
                      </h3>
                      <p className="text-xs text-[#857252] font-semibold">
                        Sown for: <strong className="text-[#3F2E1E]">{searchedOrder.customerName}</strong> on {searchedOrder.orderDate}
                      </p>
                    </div>

                    <div className="bg-[#EADCC6]/40 p-3 rounded-xl border border-[#EADCC6] text-xs space-y-1 self-stretch sm:self-auto flex flex-col justify-center">
                      <span className="text-[9px] font-mono uppercase font-black text-[#857252]">Estimated Pure Hand Delivery:</span>
                      <span className="font-serif font-bold text-[#3F2E1E] flex items-center gap-1">
                        📬 {searchedOrder.eta}
                      </span>
                    </div>
                  </div>

                  {/* Interactive shipping timeline visual */}
                  <div className="relative pl-6 sm:pl-10 space-y-8 pb-4">
                    
                    {/* Vertical connecting line indicator */}
                    <div className="absolute left-[20px] sm:left-[28px] top-4 bottom-4 w-1 bg-[#EADCC6]" />

                    {/* Highly interactive animated completed shipping line overlay */}
                    <div 
                      className="absolute left-[20px] sm:left-[28px] top-4 w-1 bg-gradient-to-b from-emerald-600 to-amber-500 transition-all duration-700" 
                      style={{ 
                        height: `${(searchedOrder.currentDayIndex / (searchedOrder.steps.length - 1)) * 90}%`
                      }} 
                    />

                    {/* Map step items */}
                    {searchedOrder.steps.map((step, idx) => {
                      const isCompleted = idx < searchedOrder.currentDayIndex;
                      const isCurrent = idx === searchedOrder.currentDayIndex;
                      const isUpcoming = idx > searchedOrder.currentDayIndex;

                      return (
                        <div key={idx} className="relative flex gap-4 sm:gap-6 items-start group">
                          
                          {/* Circle state node */}
                          <div className={`absolute -left-[20px] sm:-left-[28px] transform -translate-x-[40%] w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold z-10 border transition-all duration-300 shadow-sm ${
                            isCompleted 
                              ? 'bg-[#0F766E] border-[#0A5A54] text-white ring-4 ring-[#0F766E]/10' 
                              : isCurrent
                              ? 'bg-amber-500 border-amber-600 text-[#3F2E1E] ring-4 ring-amber-500/20 scale-108 animate-pulse'
                              : 'bg-white border-[#EADCC6] text-stone-400'
                          }`}>
                            {isCompleted ? <Check className="w-4 h-4" /> : step.status === 'completed' ? <Check className="w-4 h-4" /> : step.icon}
                          </div>

                          <div className="flex-1 bg-white p-4 rounded-2xl border border-[#EADCC6] hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-2">
                              <h4 className={`text-xs sm:text-sm font-serif font-black ${
                                isCompleted ? 'text-zinc-500 line-through font-bold' : isCurrent ? 'text-[#B45309]' : 'text-[#3F2E1E]'
                              }`}>
                                {step.label[language] || step.label.en}
                              </h4>
                              
                              <span className="font-mono text-[9px] uppercase font-bold text-[#8F7C5D] bg-[#FAF6EE] border border-[#EADCC6]/50 px-2 py-0.5 rounded-full">
                                {step.time}
                              </span>
                            </div>

                            <p className="text-xs text-[#5C4D3C] leading-relaxed">
                              {step.desc[language] || step.desc.en}
                            </p>

                            <div className="mt-2.5 pt-2 border-t border-dashed border-[#EADCC6]/50 flex items-center justify-between text-[10px] font-mono">
                              <span className="text-[#857252] flex items-center gap-1 font-bold">
                                🗺️ Hub: {step.location[language] || step.location.en}
                              </span>

                              <span className={`font-black uppercase py-0.5 px-2 rounded ${
                                isCompleted ? 'text-emerald-700 bg-emerald-50' : isCurrent ? 'text-amber-700 bg-amber-50 animate-pulse' : 'text-stone-400 bg-stone-100'
                              }`}>
                                {isCompleted ? 'Completed' : isCurrent ? 'Active Location' : 'Upcoming Step'}
                              </span>
                            </div>
                          </div>

                        </div>
                      );
                    })}

                  </div>

                  {/* SHIPPING PROGRESS CONTROLS (SIMULATOR MODE!) */}
                  <div className="mt-8 pt-6 border-t border-[#EADCC6] bg-[#FAF6EE] rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-xs text-[#857252] font-semibold max-w-sm text-center sm:text-left">
                      <span className="font-bold text-[#B45309] block">🕹️ Live Logistics Simulation Mode Active</span>
                      Press the button on the right to advance the shipping path day-by-day and watch the map timeline dynamically adjust!
                    </div>

                    <button
                      onClick={advanceSimulatedDay}
                      className="px-4 py-2.5 bg-[#3F2E1E] hover:bg-[#B45309] text-white text-xs font-mono font-black uppercase rounded-xl flex items-center gap-1.5 focus:outline-none transition-colors shadow active:scale-95 cursor-pointer"
                    >
                      <span>Simulate Day +1</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
