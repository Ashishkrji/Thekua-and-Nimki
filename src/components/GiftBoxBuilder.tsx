import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, Check, Info, Trash2, ArrowRight, Heart, HelpCircle, Eye, RefreshCw, Briefcase, Mail, User, Phone, Calendar, Edit3 } from 'lucide-react';
import { Product, Language } from '../types';
import { PRODUCTS, TRANSLATIONS } from '../data';

interface GiftBoxBuilderProps {
  language: Language;
  onAddToCart: (product: Product, quantity: number) => void;
  openCart: () => void;
}

interface WrapperTheme {
  id: string;
  name: Record<Language, string>;
  hex: string;
  textColor: string;
  image: string;
  symbol: string;
  meaning: Record<Language, string>;
}

const WRAPPERS: WrapperTheme[] = [
  {
    id: 'gerua-ochre',
    name: { en: 'Gerua Ochre (Earthen Red)', hi: 'गेरुआ सोंध (मिट्टी)', bho: 'गेरुआ माटी क रंग' },
    hex: '#C25A27',
    textColor: '#FAF6EE',
    image: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&w=600&q=80',
    symbol: '🕉️',
    meaning: {
      en: 'The auspicious color of sacred riverbanks, symbolizing devotion and grandmotherly heritage.',
      hi: 'गंगा कछार की पवित्र गेरू मिट्टी का रंग, जो त्याग, आशीर्वाद और शुचिता का उद्घोषक है।',
      bho: 'पवित्र नदी के माटी क गमकदार रंग, जवन सुहाग आ आशीष क सूचक ह।'
    }
  },
  {
    id: 'haldi-yellow',
    name: { en: 'Haldi Golden (Turmeric)', hi: 'हल्दी पीताम्बर (मंगल)', bho: 'सरसो गेंदा क पीला रंग' },
    hex: '#E5A924',
    textColor: '#3F2E1E',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=600&q=80',
    symbol: '🏵️',
    meaning: {
      en: 'Auspicious celebratory yellow of ground turmeric, representing fresh beginnings and family health.',
      hi: 'मांगलिक अवसरों पर प्रयोग होने वाली ताजी कुटी पिसी हल्दी का सुनहरा रंग, जो आरोग्य प्रदाता है।',
      bho: 'शादी-विवाह आ छठ घाट क गेंदा फूल नियन पीला रंग, जवन खुशहाली देवेला।'
    }
  },
  {
    id: 'saran-terracotta',
    name: { en: 'Saran Terracotta (Clay)', hi: 'सारण टेराकोटा (मृदा)', bho: 'चूल्हा क लाल रंग' },
    hex: '#8D543B',
    textColor: '#FAF6EE',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    symbol: '🧱',
    meaning: {
      en: 'Earthen village clay-stove color, celebrating the heat of traditional slow wood fires.',
      hi: 'गाँव के मिट्टी के सुंदर चूल्हों का प्राकृतिक पका हुआ टेराकोटा रंग, जो प्रकृति के सानिध्य को दर्शाता है।',
      bho: 'गाँव क पका माटी क रंग, जवने पर दादी माई घान तियारेली।'
    }
  },
  {
    id: 'ganga-aqua',
    name: { en: 'Ganga Aqua (Holy Blue)', hi: 'गंगा अविरल (शीतल)', bho: 'गंगा मइया क शीतल रंग' },
    hex: '#438A9E',
    textColor: '#FAF6EE',
    image: 'https://images.unsplash.com/photo-1521903062400-b80a2c430267?auto=format&fit=crop&w=600&q=80',
    symbol: '🌊',
    meaning: {
      en: 'Cool aquatic breeze of the morning river-flow, representing serenity and pristine flow.',
      hi: 'गंगा मैया की शीतल जलधारा का रंग, जो मन में असीम शांति और नवीनता लेकर आता है।',
      bho: 'कल-कल बहत गंगा जल क रंग, जवन पवित्रता आ मन की शीतलता के हरदम बढ़ावेला।'
    }
  }
];

export default function GiftBoxBuilder({ language, onAddToCart, openCart }: GiftBoxBuilderProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedWrapper, setSelectedWrapper] = useState<WrapperTheme>(WRAPPERS[0]);
  const [greetingMessage, setGreetingMessage] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [showSuccessOverlay, setShowSuccessOverlay] = useState<boolean>(false);
  const [justBuiltBox, setJustBuiltBox] = useState<Product | null>(null);

  // Corporate bulk gifting states
  const [activeTab, setActiveTab] = useState<'individual' | 'corporate'>('individual');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    quantity: '50-100',
    deliveryDate: '',
    customRequests: '',
    packagingType: 'wooden-box'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCorporateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.phone || !formData.email) {
      alert(language === 'en' ? '⚠️ Please fill out all required contact fields!' : '⚠️ कृपया सभी आवश्यक संपर्क फ़ील्ड भरें!');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API connection with 1.5 seconds loading state
    setTimeout(() => {
      // Create a unique auspicious quote tracking ID
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const referenceId = `MAATI-2026-QS${randomSuffix}`;
      
      setQuoteReference(referenceId);
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      quantity: '50-100',
      deliveryDate: '',
      customRequests: '',
      packagingType: 'wooden-box'
    });
    setSubmitSuccess(false);
    setQuoteReference('');
  };

  const t = TRANSLATIONS[language];

  // Pricing formula:
  // Base keepsakes wooden box + wrapping setup cost: ₹149
  const baseBoxPrice = 149;
  const itemsSubtotal = selectedProducts.reduce((sum, p) => sum + p.price, 0);
  const totalBoxPrice = baseBoxPrice + itemsSubtotal;

  const handleProductToggle = (product: Product) => {
    const isAlreadySelected = selectedProducts.some(p => p.id === product.id);
    
    if (isAlreadySelected) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      if (selectedProducts.length >= 5) {
        // Enforce maximum 5 items rule
        alert(language === 'en' ? '⚠️ You can select a maximum of 5 items for a single box!' : '⚠️ आप एक बॉक्स में अधिकतम ५ आइटम चुन सकते हैं!');
        return;
      }
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleClearAll = () => {
    setSelectedProducts([]);
    setGreetingMessage('');
    setRecipientName('');
    setSenderName('');
  };

  const handleAddToCartAction = () => {
    if (selectedProducts.length < 3) {
      // Must select at least 3 items
      alert(language === 'en' ? '⚠️ Please select at least 3 items to construct your gift box!' : '⚠️ कृपया अपना उपहार बॉक्स बनाने के लिए कम से कम ३ आइटम चुनें!');
      return;
    }

    const compiledItemsSummary = selectedProducts.map(p => p.name).join(', ');
    const finalVariation = `Wrap Theme: ${selectedWrapper.name[language]} | Note: "${greetingMessage}" From: ${senderName || 'Anonymous'} To: ${recipientName || 'Family'}`;

    // Construct custom virtual product
    const customGiftBoxProduct: Product = {
      id: `custom-giftbox-${Date.now()}`,
      name: `🎁 Maati Customized ${selectedWrapper.name[language].split(' (')[0]} Gift Box`,
      translationKey: 'custom_gift_box',
      category: 'thekua',
      description: `Bespoke wooden keepsake box containing: ${compiledItemsSummary}. Wrapper Theme: ${selectedWrapper.name[language]}. Custom handwritten palm ribbon.`,
      story: `Assembled carefully with clean linen, wooden blocks, and auspicious family blessings.`,
      price: totalBoxPrice,
      rating: 5.0,
      reviewCount: 1,
      unit: `${selectedProducts.length} Pack Gift Hamper`,
      images: [selectedWrapper.image],
      ingredients: selectedProducts.flatMap(p => p.ingredients).slice(0, 5),
      shelfLife: '45 Days',
      nutrition: { calories: 440, protein: '6g', carbs: '64g', fat: '16g' },
      badges: ['Customized Wrapper', 'Keepsake Souvenir Sancha Included', 'Maa ke Haath ka Swad']
    };

    onAddToCart(customGiftBoxProduct, 1);
    setJustBuiltBox(customGiftBoxProduct);
    setShowSuccessOverlay(true);
  };

  return (
    <section id="custom-gift-box-section" className="py-16 bg-[#FAF6EE] border-b border-[#EADCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-[#B45309] uppercase block mb-1 font-mono">
            🎁 {language === 'en' ? 'Artisanal Gifting Studio' : language === 'hi' ? 'विशेष उपहार बॉक्स निर्माता' : 'सनेह क डिब्बा'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#3F2E1E] tracking-tight">
            {activeTab === 'individual'
              ? (language === 'en' ? 'Build A Custom Gift Box' : language === 'hi' ? 'अपना कस्टमाइज्ड त्योहार गिफ्ट पैक सजाएं' : 'आपन पसंद क उपहार बॉक्स गढ़ीं')
              : (language === 'en' ? 'Bulk Corporate & Festive Orders' : language === 'hi' ? 'थोक कॉर्पोरेट एवं मांगलिक उपहार' : 'बड़का थोक उत्सव उपहार')
            }
          </h2>
          <div className="w-16 h-1 bg-[#B45309] mx-auto my-4 rounded" />
          <p className="text-sm sm:text-base text-[#857252] font-semibold leading-relaxed">
            {activeTab === 'individual'
              ? (language === 'en' 
                  ? 'Select 3 to 5 traditional snacks. Choose an auspicious regional wrapper paper of holy meaning, and add a custom blessing letter. Every box includes a real hand-carved wooden sancha keepsake!'
                  : language === 'hi'
                    ? 'अपने प्रियजनों के लिए ३ से ५ मनपसंद व्यंजनों को चुनें, मांगलिक रंग पसंद करें और अपना निजी शुभकामना पत्र लिखें। हर बॉक्स के साथ शीशम का असली हाथ-पक्का लकड़ी का सांचा मुफ्त उपहार दिया जाता है!'
                    : 'दीदी लोगन क गढ़ल ३ से ५ ठेकुआ-निमकी चुनीं, बक्सा लपेटे क पावन रंग दीं आ कोइछा सौगात क सुंदर चिठ्ठी लिखीं। संग ही काठ क असली सांचा उपहार में पाईं!')
              : (language === 'en'
                  ? 'Impress partners and employees with traditional wellness rewards, slow-roasted wood charcoal snacks, custom wax stamps, and hand-delivered warm blessings.'
                  : language === 'hi'
                    ? 'अपने व्यापार भागीदारों, सहकर्मियों और प्रियजनों को पारंपरिक स्वास्थ्यवर्धक स्नैक्स सौंपें। हाथ से पिसे गेहूं, देसी ए२ गाय के घी और जैविक गुड़ से तैयार शुद्ध उपहार।'
                    : 'बड़का उत्सव, नेवता आ ऑफिस बदे तैयार करायीं शुद्धता क पोटली। custom मोहर आ हाथ क लिखल सनेह चिठ्ठी क संगे।')
            }
          </p>
        </div>

        {/* Tab Toggle Controls with beautiful layout */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#F2ECD9] p-1.5 rounded-2xl border-2 border-[#EADCC6] flex flex-wrap justify-center gap-1.5 shadow-inner">
            <button
              onClick={() => {
                setActiveTab('individual');
                resetForm();
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'individual'
                  ? 'bg-[#3F2E1E] text-white shadow-md scale-102 ring-2 ring-[#B45309]/20 font-bold'
                  : 'text-[#5C4D3C] hover:bg-[#EADCC6]/30 font-bold'
              }`}
            >
              🎁 {language === 'en' ? 'Personal Gift Builder' : 'एकल उपहार बक्सा'}
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'corporate'
                  ? 'bg-[#3F2E1E] text-white shadow-md scale-102 ring-2 ring-[#B45309]/20 font-bold'
                  : 'text-[#5C4D3C] hover:bg-[#EADCC6]/30 font-bold'
              }`}
            >
              💼 {language === 'en' ? 'Bulk Corporate Gifting' : 'कॉर्पोरेट थोक पूछताछ'}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'individual' ? (
            <motion.div
              key="individual-builder"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#F6EFE0] rounded-3xl border-2 border-[#EADCC6] p-4 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative"
            >
          
          {/* Step Controls: Product select, Wrapper selecting & Note writing - Left Col (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Snacks selector */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#EADCC6] pb-2">
                <h3 className="text-base sm:text-lg font-serif font-black text-[#3F2E1E] flex items-center gap-2">
                  <span className="bg-[#B45309] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-mono">1</span>
                  <span>{language === 'en' ? 'Select 3-5 Snacks' : 'इच्छा अनुसार ३ से ५ स्नैक्स चुनें'}</span>
                </h3>
                <span className="text-xs font-mono font-black py-1 px-3.5 bg-white border border-[#EADCC6] rounded-full text-zinc-700">
                  {language === 'en' ? 'Selected:' : 'चुने गए:'} {selectedProducts.length} / 5
                </span>
              </div>

              {/* Responsive mini products list checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRODUCTS.map((prod) => {
                  const isSelected = selectedProducts.some(p => p.id === prod.id);
                  return (
                    <div
                      key={prod.id}
                      onClick={() => handleProductToggle(prod)}
                      className={`p-3 rounded-xl border-2 transition-all flex items-center gap-3 cursor-pointer relative select-none ${
                        isSelected 
                          ? 'bg-white border-[#B45309] shadow' 
                          : 'bg-[#FDFBF7] hover:bg-[#FAF6EE] border-[#EADCC6]/60'
                      }`}
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 text-left">
                        <h4 className="text-xs sm:text-sm font-serif font-black text-[#3F2E1E] line-clamp-1">{prod.name}</h4>
                        <p className="text-[10px] text-[#857252] font-semibold">{prod.unit} | ₹{prod.price}</p>
                      </div>

                      {/* Icon checklist circle */}
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected ? 'bg-[#B45309] border-[#B45309] text-white' : 'bg-transparent border-[#EADCC6]'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Wrapper theme selector */}
            <div className="space-y-4">
              <div className="border-b border-[#EADCC6] pb-2">
                <h3 className="text-base sm:text-lg font-serif font-black text-[#3F2E1E] flex items-center gap-2">
                  <span className="bg-[#B45309] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-mono">2</span>
                  <span>{language === 'en' ? 'Choose Auspicious Wrap Color' : 'मांगलिक पारंपरिक रैपर रंग'}</span>
                </h3>
              </div>

              {/* Interactive Wrap chips selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WRAPPERS.map((wrap) => {
                  const isActive = selectedWrapper.id === wrap.id;
                  return (
                    <button
                      key={wrap.id}
                      onClick={() => setSelectedWrapper(wrap)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between items-center text-center space-y-1.5 focus:outline-none h-28 ${
                        isActive 
                          ? 'bg-white border-[#B45309] shadow' 
                          : 'bg-[#FDFBF7] hover:bg-[#FAF6EE] border-[#EADCC6]/60'
                      }`}
                    >
                      <div 
                        style={{ backgroundColor: wrap.hex }}
                        className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-sm shadow-inner shrink-0"
                      >
                        {wrap.symbol}
                      </div>
                      
                      <div>
                        <span className="text-[11px] font-serif font-black text-[#3F2E1E] block line-clamp-1">
                          {wrap.name[language].split(' (')[0]}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-[#857252]">
                          {wrap.hex}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Display Wrapper Theme folklore meaning */}
              <div className="p-3 bg-white/75 border border-[#EADCC6]/60 rounded-xl text-left text-xs text-[#857252] italic font-serif leading-relaxed flex gap-2">
                <span className="text-lg">💡</span>
                <span>“{selectedWrapper.meaning[language]}”</span>
              </div>
            </div>

            {/* Step 3: Personalized Greeting Note */}
            <div className="space-y-4">
              <div className="border-b border-[#EADCC6] pb-2">
                <h3 className="text-base sm:text-lg font-serif font-black text-[#3F2E1E] flex items-center gap-2">
                  <span className="bg-[#B45309] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-mono">3</span>
                  <span>{language === 'en' ? 'Write Handwritten Wish Note' : 'हस्तलिखित शुभकामना पत्र'}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-black text-[#857252] uppercase mb-1 text-left">Recipient Name</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g., Pyari Bua Ji & Family"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#EADCC6] rounded-xl text-xs sm:text-sm font-sans text-[#3F2E1E] placeholder-[#857252]/50 focus:outline-none focus:border-[#B45309]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-black text-[#857252] uppercase mb-1 text-left">Sender Name (Blessings From)</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g., Rohan & Shruti"
                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#EADCC6] rounded-xl text-xs sm:text-sm font-sans text-[#3F2E1E] placeholder-[#857252]/50 focus:outline-none focus:border-[#B45309]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-black text-[#857252] uppercase mb-1 text-left">Greeting Blessing Message</label>
                <textarea
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  maxLength={160}
                  placeholder="e.g., Wishing you a glorious and healthy Chhath Puja! Sending pure Desi Ghee snacks handmade with motherly blessings..."
                  rows={3}
                  className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#EADCC6] rounded-xl text-xs sm:text-sm font-sans text-[#3F2E1E] placeholder-[#857252]/50 focus:outline-none focus:border-[#B45309]"
                />
                <span className="block text-[10px] text-zinc-500 font-mono text-right mt-1">
                  Characters left: {160 - greetingMessage.length}
                </span>
              </div>
            </div>

          </div>

          {/* Golden Keepsake Box Preview Pane - Right Col (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border-2 border-[#EADCC6] shadow-md space-y-6 flex flex-col justify-between h-full sticky top-4">
            
            <div className="text-center pb-2 border-b border-[#EADCC6]">
              <span className="text-[10px] font-mono font-black uppercase text-[#B45309]">📦 REAL-TIME BOX PREVIEW</span>
              <h3 className="text-xl font-serif font-black text-[#3F2E1E] mt-1">Maati Keepsake Hamper</h3>
            </div>

            {/* Custom Interactive Wrapping Box Illustration */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-inner border border-[#EADCC6] flex items-center justify-center p-4" style={{ backgroundColor: selectedWrapper.hex }}>
              
              {/* Paper overlay textures */}
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
              
              {/* Handcrafted wooden carvings background */}
              <div className="absolute inset-4 rounded-lg border-2 border-dashed border-white/35 flex flex-col items-center justify-center text-white text-center p-4">
                
                {/* Traditional motif badge symbol */}
                <div className="text-4xl animate-bounce mb-2">🎁</div>
                
                <h4 className="text-sm font-serif font-black tracking-widest uppercase">
                  {selectedWrapper.name[language].split(' (')[0]} Edition
                </h4>
                
                <p className="text-[10px] opacity-90 mt-1 uppercase font-mono tracking-wider font-bold">
                  {selectedProducts.length} Handcrafted Snacks Suggat
                </p>

                {/* Free souvenir wood sancha callout */}
                <span className="mt-2 text-[9px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-mono font-black uppercase inline-block border border-white/10">
                  + Free Rosewood Mould Included
                </span>

              </div>
            </div>

            {/* Selected box content listings */}
            <div className="space-y-3">
              <p className="text-[10px] font-mono font-black uppercase text-[#857252] text-left">Box Fill Parameters:</p>
              
              {selectedProducts.length === 0 ? (
                <div className="border-2 border-dashed border-[#EADCC6] p-4 text-center text-xs text-[#857252] italic font-semibold rounded-xl bg-[#FAF6EE]">
                  No snacks selected yet. Scroll left to fill your festive box hampers.
                </div>
              ) : (
                <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                  {selectedProducts.map(p => (
                    <div key={p.id} className="flex justify-between items-center text-xs bg-[#FAF6EE] p-2 rounded-lg border border-[#EADCC6]/40">
                      <span className="font-serif font-black text-[#3F2E1E] line-clamp-1">🍃 {p.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-[11px] font-bold text-amber-900">₹{p.price}</span>
                        <button
                          onClick={() => handleProductToggle(p)}
                          className="text-stone-400 hover:text-red-500 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Handwritten palm greeting wish card visual mockup with live preview animations */}
            <motion.div
              key={`${recipientName}-${senderName}-${greetingMessage}`}
              initial={{ scale: 0.98, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02, rotate: -0.5, boxShadow: "0 10px 20px -5px rgba(63, 46, 30, 0.15)" }}
              className="bg-[#FFFDF3] p-5 rounded-2xl border-2 text-left relative overflow-hidden shadow-md flex flex-col justify-between group transition-colors duration-300"
              style={{ borderColor: selectedWrapper.hex }}
            >
              {/* Top thematic colored border based on selected wrapper */}
              <div className="absolute top-0 inset-x-0 h-1.5" style={{ backgroundColor: selectedWrapper.hex }} />
              
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B45309] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B45309]"></span>
                  </span>
                  <span className="text-[9px] font-mono uppercase text-[#B45309] tracking-wider font-extrabold">
                    {language === 'en' ? 'Live Virtual Note Preview' : 'लाइव प्रिव्यू संदेश'}
                  </span>
                </div>
                <div className="text-sm font-serif filter drop-shadow" style={{ color: selectedWrapper.hex }}>
                  {selectedWrapper.symbol}
                </div>
              </div>

              {/* Card Main Body */}
              <div className="font-serif italic text-xs leading-relaxed text-[#5C4D2B] pr-4 pt-1 font-semibold space-y-3 relative z-10">
                <div>
                  <span className="text-stone-500 font-sans text-[9px] tracking-wider uppercase font-bold not-italic block mb-0.5">
                    {language === 'en' ? 'Auspicious Wishes For:' : 'शुभकामनाएं हेतु:'}
                  </span>
                  <p className="text-sm">
                    To: <strong className="underline decoration-dashed text-[#3F2E1E] text-base">{recipientName || (language === 'en' ? 'Family & Friends' : 'समस्त परिवार')}</strong>,
                  </p>
                </div>
                
                {/* Note Message with handwriting style background */}
                <div className="bg-[#FAF6EE]/70 p-3 rounded-lg border border-[#EADCC6]/40 shadow-inner min-h-[60px] relative">
                  <span className="absolute -top-2.5 -left-1 text-[24px] text-[#B45309]/20 font-serif">“</span>
                  <p className="leading-relaxed text-[11px] text-[#3F2E1E] whitespace-normal tracking-wide font-medium pl-1 italic">
                    {greetingMessage || (language === 'en' ? 'Wishing you the warm organic swad of Maati! May grandmother\'s traditional culinary love bring glowing health and festive happiness to your pure-hearted home.' : 'आपको माटी के व्यंजनों का शुद्ध स्वाद और आशीर्वाद मिले! दादी माँ की रसोई का यह पारंपरिक उपहार आपके पूरे परिवार को सुख और आरोग्य प्रदान करे।')}
                  </p>
                  <span className="absolute -bottom-5 -right-1 text-[24px] text-[#B45309]/20 font-serif">”</span>
                </div>

                <p className="text-right text-xs pr-2 pt-1 text-[#5C4D2B]">
                  {language === 'en' ? 'Warm Blessings From:' : 'स्नेह और आशीर्वाद:'} <strong className="underline decoration-dashed text-[#3F2E1E] text-sm font-black">{senderName || (language === 'en' ? 'Grandma\'s Wellwisher' : 'शुभचिंतक')}</strong>
                </p>
              </div>

              {/* Authentic Royal Golden Wax/Ribbon Seal on corner */}
              <div className="absolute bottom-2 left-4 flex items-center gap-1.5 opacity-80 pt-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow font-sans font-bold" style={{ backgroundColor: selectedWrapper.hex, color: selectedWrapper.textColor || '#white' }}>
                  ✓
                </div>
                <span className="text-[8px] font-mono font-black text-stone-500 uppercase tracking-widest">
                  {language === 'en' ? 'MAATI SEALED' : 'माटी सील'}
                </span>
              </div>

              {/* Watermark leaf symbol */}
              <div className="absolute right-[-8px] bottom-[-8px] opacity-10 text-6xl pointer-events-none font-serif">
                🍂
              </div>
            </motion.div>

            {/* Pricing calculations details */}
            <div className="pt-4 border-t border-[#EADCC6] flex justify-between items-end">
              <div className="text-left">
                <span className="text-[10px] font-mono text-stone-500 block uppercase font-black">Computed Box Value</span>
                <span className="text-xs text-[#857252] font-semibold block">Box Setup Fee (₹149) included</span>
              </div>
              <div className="font-mono text-xl font-black text-[#B45309]">
                ₹{totalBoxPrice}
              </div>
            </div>

            {/* Actions CTA buttons */}
            <div className="space-y-2">
              <motion.button
                whileHover={selectedProducts.length >= 3 ? { scale: 1.02 } : {}}
                whileTap={selectedProducts.length >= 3 ? { scale: 0.98 } : {}}
                animate={selectedProducts.length >= 3 ? { scale: [1, 1.02, 1] } : {}}
                transition={selectedProducts.length >= 3 ? {
                  scale: {
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut"
                  },
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                } : {}}
                onClick={handleAddToCartAction}
                disabled={selectedProducts.length < 3}
                className={`w-full py-3 text-xs uppercase tracking-widest font-black rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow ${
                  selectedProducts.length >= 3
                    ? 'bg-[#B45309] hover:bg-[#3F2E1E] text-white hover:shadow-md'
                    : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                }`}
              >
                <Gift className="w-4 h-4 animate-bounce" />
                <span>{language === 'en' ? 'Assemble & Add Hamper to Cart' : 'उपहार बॉक्स जोड़ें'}</span>
              </motion.button>

              {selectedProducts.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="w-full text-center text-[10px] font-mono font-bold uppercase text-stone-500 hover:text-black cursor-pointer py-1 block flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Builder Fields</span>
                </button>
              )}
            </div>

          </div>

        </motion.div>
      ) : (
        <motion.div
          key="corporate-gifting-form"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto font-sans"
        >
          {submitSuccess ? (
            // Success state screen showing promise of custom quote
            <div id="corporate-success" className="bg-white rounded-3xl border-2 border-emerald-600 p-6 sm:p-10 shadow-2xl text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center text-4xl mx-auto animate-bounce">
                🤝
              </div>
              
              <div className="space-y-2 max-w-xl mx-auto">
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full font-black uppercase tracking-widest">
                  ✓ Inquiry Sown in Ledger
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#3F2E1E] pt-2">
                  {language === 'en' ? 'Your Quote Request has Been Registered!' : 'आपकी पूछताछ बही बहीखाता में दर्ज हो गई है!'}
                </h3>
                <p className="text-[#857252] text-sm font-semibold leading-relaxed">
                  {language === 'en'
                    ? `Thank you, ${formData.contactName}! Grandma's Gifting Desk has received your bulk corporate order inquiry. Our heritage representative is already calculating customized wholesale discounts.`
                    : `आदरणीय ${formData.contactName}, आपकी थोक ऑर्डर की इंक्वायरी सफलतापूर्वक स्वीकार कर ली गई है। हमारी पारंपरिक कोऑपरेटिव टीम आपके द्वारा दिए गए विवरण का आकलन कर रही है।`
                  }
                </p>
              </div>

              {/* Summary of what they requested */}
              <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#EADCC6]/80 text-left max-w-md mx-auto space-y-3 font-mono text-xs text-[#5C4D3C]">
                <div className="flex justify-between border-b border-[#EADCC6]/40 pb-2">
                  <span className="font-bold uppercase text-stone-500">Quote Reference:</span>
                  <span className="font-extrabold text-[#B45309]">{quoteReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Organization:</span>
                  <span className="font-bold text-[#3F2E1E]">{formData.companyName || 'Personal / Festive Event'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Quantity Estimate:</span>
                  <span className="font-bold text-emerald-700">{formData.quantity} Boxes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Packaging Selected:</span>
                  <span className="font-bold text-[#3F2E1E]">
                    {formData.packagingType === 'wooden-box' ? '🪵 Keepsake Wooden Box + Sancha' :
                     formData.packagingType === 'clay-box' ? '🧱 Auspicious Earthen Clay' :
                     formData.packagingType === 'jute-potli' ? '🌾 Handmade Sacred Jute Potli' :
                     '🎋 Organic Bamboo Tokri'}
                  </span>
                </div>
                {formData.deliveryDate && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Expected Date:</span>
                    <span className="font-bold text-[#3F2E1E]">{formData.deliveryDate}</span>
                  </div>
                )}
              </div>

              {/* 3-hour response guarantee promise banner */}
              <div className="p-4 bg-amber-50 border-2 border-dashed border-[#B45309] rounded-2xl max-w-lg mx-auto text-center space-y-1">
                <span className="text-xs font-serif font-black text-[#B45309] block uppercase tracking-wider">
                  ⚡ 3-Hour Custom Quote Promise
                </span>
                <p className="text-[11px] text-[#857252] font-semibold leading-relaxed">
                  We value your timelines. A customized catalog with exact pricing breaks, customization previews, and tax-invoice configurations is being routed to <strong className="text-[#3F2E1E]">{formData.email}</strong> or WhatsApp <strong className="text-[#3F2E1E]">{formData.phone}</strong> in under 3 hours.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-[#FAF6EE] hover:bg-[#EADCC6]/30 border border-[#EADCC6] rounded-xl text-xs font-mono font-black uppercase tracking-wider text-[#5C4D3C] cursor-pointer"
                >
                  ← Submit Another Request
                </button>
                <button
                  onClick={() => setActiveTab('individual')}
                  className="px-6 py-2.5 bg-[#B45309] hover:bg-[#3F2E1E] text-white rounded-xl text-xs font-mono font-black uppercase tracking-wider cursor-pointer"
                >
                  Assemble Item Gift Box
                </button>
              </div>
            </div>
          ) : (
            // Corporate Inquiry Form Workdesk
            <div className="bg-[#F6EFE0] rounded-3xl border-2 border-[#EADCC6] p-4 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative font-sans">
              
              {/* Left Column: Hand-made premium branding benefit checklist (5 cols) */}
              <div className="md:col-span-5 bg-white/40 rounded-2xl p-5 border border-[#EADCC6]/70 pb-6 md:pb-5 md:pr-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-black text-[#B45309] uppercase block tracking-wider">
                      🌾 Corporate Alliance Program
                    </span>
                    <h3 className="text-lg font-serif font-black text-[#3F2E1E] mt-1">
                      {language === 'en' ? 'Authentic Custom Packaging & Sacred Souvenirs' : 'थोक कॉर्पोरेट एवं मांगलिक साख'}
                    </h3>
                    <p className="text-[11px] text-[#857252] font-semibold mt-1 leading-relaxed">
                      Gift a box of memory, pure nutrition, and high emotional resonance. We specialize in custom-tailored bundles for corporate networks and massive family events.
                    </p>
                  </div>

                  {/* Benefits Checklist */}
                  <div className="space-y-4">
                    {/* Benefit A */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-orange-100 border border-[#B45309]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#B45309] text-[10px] font-bold">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs font-serif font-black text-[#3F2E1E]">Custom Royal Wax Stamps</h4>
                        <p className="text-[10px] text-[#857252] font-medium leading-normal">
                          We can model your brand logo or community crest in wood-carving design to physically stamp with pure lac-wax on each box cover.
                        </p>
                      </div>
                    </div>

                    {/* Benefit B */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-orange-100 border border-[#B45309]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#B45309] text-[10px] font-bold">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs font-serif font-black text-[#3F2E1E]">Traditional Keepsake Sancha</h4>
                        <p className="text-[10px] text-[#857252] font-medium leading-normal">
                          Every single hamper is embedded with a genuine, fragrant rosewood sancha cookie mold, keeping traditional heritage alive.
                        </p>
                      </div>
                    </div>

                    {/* Benefit C */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-orange-100 border border-[#B45309]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#B45309] text-[10px] font-bold">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs font-serif font-black text-[#3F2E1E]">GST Invoice & Express Post</h4>
                        <p className="text-[10px] text-[#857252] font-medium leading-normal">
                          Fully streamlined B2B invoices with complete corporate tax inputs. Express transit routes ensuring oven-to-door freshness.
                        </p>
                      </div>
                    </div>

                    {/* Benefit D */}
                    <div className="flex gap-2.5 items-start">
                      <div className="w-5 h-5 rounded-full bg-orange-100 border border-[#B45309]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#B45309] text-[10px] font-bold">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs font-serif font-black text-[#3F2E1E]">Village Cooperative Support</h4>
                        <p className="text-[10px] text-[#857252] font-medium leading-normal">
                          Supporting over 140 dry-land sisters with full fair wages. Your gifting funds rural girl childhood education.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFFDF3] p-3 rounded-xl border border-[#EADCC6]/70 text-[10px] text-[#857252] font-semibold flex items-center gap-2 mt-6">
                  <span className="text-base">🔬</span>
                  <span>Certified Sulfur-Free, Chemical-Free traditional processing from soil to kitchen.</span>
                </div>
              </div>

              {/* Right Column: Dynamic Form Container (7 cols) */}
              <form onSubmit={handleCorporateSubmit} className="md:col-span-7 space-y-4">
                {/* Form Intro */}
                <div className="border-b border-[#EADCC6] pb-2 flex justify-between items-center">
                  <h4 className="text-xs font-mono font-black uppercase text-[#3F2E1E] tracking-wider">
                    📝 {language === 'en' ? 'Ledger Quotation Entry' : 'थोक पूछताछ विवरणी'}
                  </h4>
                  <span className="text-[9px] font-mono font-black text-[#B45309] bg-orange-50 px-2 py-0.5 rounded border border-[#B45309]/15 animate-pulse">
                    * Required fields
                  </span>
                </div>

                {/* Column Input A: Organization & Contact Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono font-black uppercase text-stone-500 mb-1 flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Organization Name</span>
                    </label>
                    <input 
                      type="text"
                      name="companyName"
                      placeholder={language === 'en' ? 'e.g. Google India, Wedding Event' : 'उदा: शादी-उत्सव / कंपनी का नाम'}
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#EADCC6] rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B45309] placeholder-[#A39E93]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-black uppercase text-stone-500 mb-1 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Contact Person *</span>
                    </label>
                    <input 
                      type="text"
                      name="contactName"
                      required
                      placeholder="e.g. Ashish Gupta"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#EADCC6] rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B45309] placeholder-[#A39E93]"
                    />
                  </div>
                </div>

                {/* Column Input B: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono font-black uppercase text-stone-500 mb-1 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Email Address *</span>
                    </label>
                    <input 
                      type="email"
                      name="email"
                      required
                      placeholder="ashish@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#EADCC6] rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B45309] placeholder-[#A39E93]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-black uppercase text-stone-500 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Phone / WhatsApp *</span>
                    </label>
                    <input 
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#EADCC6] rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B45309] placeholder-[#A39E93]"
                    />
                  </div>
                </div>

                {/* Column Input C: Quantity & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono font-black uppercase text-stone-500 mb-1 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Quantity Required *</span>
                    </label>
                    <select 
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#EADCC6] rounded-xl px-3.5 py-2 text-xs font-mono font-black text-[#3F2E1E] focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                    >
                      <option value="50-100">50 - 100 Boxes (लघु उत्सव)</option>
                      <option value="100-300">100 - 300 Boxes (मांगलिक उत्सव)</option>
                      <option value="300-500">300 - 500 Boxes (कॉर्पोरेट वार्षिक)</option>
                      <option value="500+">500+ Boxes (बृहद् सम्मेलन)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-black uppercase text-stone-500 mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Target Delivery Date</span>
                    </label>
                    <input 
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-[#EADCC6] rounded-xl px-3.5 py-2 text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                    />
                  </div>
                </div>

                {/* Custom Packaging type */}
                <div>
                  <label className="text-[10px] font-mono font-black uppercase text-stone-500 block mb-1 font-sans">Packaging Preference (पैकेजिंग प्रारूप)</label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {[
                      { id: 'wooden-box', label: 'Keepsake Wood', symbol: '🪵' },
                      { id: 'clay-box', label: 'Earthen Clay', symbol: '🧱' },
                      { id: 'jute-potli', label: 'Sacred Jute', symbol: '🌾' },
                      { id: 'bamboo-tokri', label: 'Bamboo Basket', symbol: '🎋' }
                    ].map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setFormData(prev => ({ ...prev, packagingType: pkg.id }))}
                        className={`p-2 rounded-xl border text-center cursor-pointer select-none transition-all ${
                          formData.packagingType === pkg.id
                            ? 'bg-white border-[#B45309] font-bold text-[#B45309] shadow-sm'
                            : 'bg-stone-50/50 border-[#EADCC6]/60 hover:bg-white text-[#5C4D3C]'
                        }`}
                      >
                        <span className="block text-sm mb-0.5">{pkg.symbol}</span>
                        <span className="text-[9px] font-sans uppercase block tracking-wider leading-none">{pkg.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special requests messages comments */}
                <div>
                  <label className="text-[10px] font-mono font-black uppercase text-stone-500 mb-1 flex items-center gap-1">
                    <Edit3 className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>Special Customizations / Message</span>
                  </label>
                  <textarea
                    name="customRequests"
                    maxLength={350}
                    rows={3}
                    placeholder="Define your requirements (e.g., custom company logo tag, handwritten namecards for partners, specific products, partition preferences)."
                    value={formData.customRequests}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#EADCC6] rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B45309] resize-none placeholder-[#A39E93] leading-relaxed"
                  />
                  <div className="text-right text-[9px] font-mono text-stone-400">
                    {formData.customRequests.length} / 350 max characters
                  </div>
                </div>

                {/* Submit Inquiry button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-xl uppercase tracking-widest font-mono font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    isSubmitting 
                      ? 'bg-[#3F2E1E] text-stone-400 cursor-not-allowed'
                      : 'bg-[#B45309] hover:bg-[#3F2E1E] text-white hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                      <span>Reviewing Gifting Ledger...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Quote Inquiry</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </button>
                
                <p className="text-[9px] text-[#857252] font-semibold text-center italic mt-1 leading-normal">
                  *By submitting, you authorize Grandma’s corporate coordinator to draft a tax-compliant B2B pricing report and contact you via Email or WhatsApp.
                </p>
              </form>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>

        {/* Success Modal Overlay Dialog using AnimatePresence */}
        <AnimatePresence>
          {showSuccessOverlay && justBuiltBox && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay shading background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSuccessOverlay(false)}
                className="absolute inset-0 bg-black"
              />

              {/* Card box alert popup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="bg-[#FAF6EE] text-[#3F2E1E] p-6 sm:p-8 rounded-3xl border-2 border-[#EADCC6] max-w-md w-full relative z-10 shadow-2xl text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center text-3xl mx-auto">
                  🎁
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-emerald-700 font-extrabold tracking-widest uppercase">KNEADED WITH LOVE!</span>
                  <h3 className="text-xl font-serif font-black">Custom Gift Box Assembled</h3>
                  <p className="text-xs sm:text-sm text-[#857252] font-semibold leading-relaxed">
                    Wonderful choice! Your customized Maati Gift Box wrapped in <strong>{selectedWrapper.name[language].split(' (')[0]} Edition paper</strong> has been added to the shopping cart. 
                  </p>
                </div>

                {/* Simulated product details mini card */}
                <div className="bg-[#F2ECD9] p-3 rounded-xl border border-[#EADCC6]/80 text-left text-xs font-mono">
                  <p className="font-bold text-[#3F2E1E] line-clamp-1">{justBuiltBox.name}</p>
                  <p className="text-[#857252] mt-0.5">Price: <strong className="text-amber-800">₹{justBuiltBox.price}</strong> | Qty: 1</p>
                </div>

                {/* Actions row */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSuccessOverlay(false)}
                    className="flex-1 py-2.5 bg-stone-200 hover:bg-stone-300 rounded-xl text-xs font-mono font-black uppercase text-[#3F2E1E] cursor-pointer"
                  >
                    Pack Another
                  </button>
                  <button
                    onClick={() => {
                      setShowSuccessOverlay(false);
                      openCart();
                    }}
                    className="flex-1 py-2.5 bg-[#B45309] hover:bg-[#3F2E1E] text-white rounded-xl text-xs font-mono font-black uppercase flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View basket</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
