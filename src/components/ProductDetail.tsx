import React, { useState } from 'react';
import { Star, Truck, ShieldCheck, Heart, ShoppingBag, ArrowLeft, Plus, Minus, ArrowRight, Award, Share2, Copy, Check } from 'lucide-react';
import { Product, Language } from '../types';
import { PRODUCTS, TRANSLATIONS, getLocalizedBadge, getLocalizedShelfLife, getLocalizedIngredient } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import RecipeModal from './RecipeModal';

interface ProductDetailProps {
  product: Product;
  language: Language;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

export default function ProductDetail({
  product,
  language,
  onBack,
  onAddToCart,
  onProductClick,
  wishlist,
  onToggleWishlist
}: ProductDetailProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeMsg, setPincodeMsg] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'nutrition'>('details');
  const [showRecipe, setShowRecipe] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isNotified, setIsNotified] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState<'instagram' | 'link' | null>(null);

  const getShareMessages = () => {
    const prodName = t[`${product.translationKey}_name`] || product.name;
    const shareUrl = `${window.location.origin}/?product=${product.id}`;

    const textEn = `🌿 Rediscover Grandmother's pure love! I'm bringing home the authentic, hand-pressed "${prodName}" from Maati. Stone-milled grains, pure pasture cow ghee, and wood-stove warmth. Check this out: ${shareUrl}`;
    const textHi = `🌿 दादी माँ का असली प्यार और स्वाद! मैंने माटी से विशेष रूप से गढ़े गए "${prodName}" खरीदे हैं। शुद्ध देसी गाय का घी, जांता की चक्की से पिसाई और चूल्हे की सोंधी सिकाई। आप भी आज़माएं: ${shareUrl}`;
    const textBho = `🌿 माई क दुलार आ गाँव क सोंध सुगन्ध! हम माटी से हाथ के कड़ल शुद्ध घी वाला "${prodName}" मँगवलीं ह। ताँबा आँच पर से कल ई खस्ता ठेकुआ रउआ भी चखीं: ${shareUrl}`;

    const rawMessage = language === 'en' ? textEn : language === 'hi' ? textHi : textBho;
    return {
      message: rawMessage,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(rawMessage)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(rawMessage)}`,
      instagramMessage: `${rawMessage} #MaatiSnacks #TraditionalSweets #MaaKeHaathKaSwad`
    };
  };

  const handleCopyCaption = (platform: 'instagram' | 'link') => {
    const shares = getShareMessages();
    const textToCopy = platform === 'instagram' ? shares.instagramMessage : `${window.location.origin}/?product=${product.id}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedPlatform(platform);
      setTimeout(() => {
        setCopiedPlatform(null);
      }, 3500);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail.trim() || !notifyEmail.includes('@')) {
      alert(language === 'en' ? '⚠️ Please enter a valid email address!' : '⚠️ कृपया सही ईमेल पता दर्ज करें!');
      return;
    }
    setIsNotified(true);
  };

  const t = TRANSLATIONS[language];
  const inWishlist = wishlist.some(item => item.id === product.id);

  // Recommendations: products from a similar category or others
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.length < 6) {
      setPincodeMsg(language === 'en' ? '⚠️ Enter valid 6-digit PIN' : '⚠️ कृपया सही ६ अंकों का पिनकोड डालें');
      return;
    }
    
    // Simple custom delivery estimation logic
    const char = pincode.charAt(0);
    if (char === '8') {
      setPincodeMsg(language === 'en' ? '🚀 Local Hub Advantage! Delivered fresh in 24 - 48 Hours to Bihar/Jharkhand!' : '🚀 लोकल हब लाभ! २४ से ४८ घंटे में आपके द्वार ताज़ा डिलीवरी!');
    } else if (char === '1' || char === '2') {
      setPincodeMsg(language === 'en' ? '🚚 Express Cargo Routing! Delivered in 3 - 4 Days to North India!' : '🚚 एक्सप्रेस कार्गो रूटिंग! ३ से ४ दिनों में ताज़ा डिलीवरी!');
    } else {
      setPincodeMsg(language === 'en' ? '📦 PAN India Secured! Delivered in 4 - 5 Days with vacuum-fresh sealing.' : '📦 अखिल भारतीय सुरक्षित शिपिंग! ४ से ५ दिनों में ताज़ा डिलीवरी।');
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div id="product-detail-view" className="py-8 bg-[#FAF6EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back and social path */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-[#B45309] hover:text-[#853A00] transition-colors focus:outline-none focus:ring-0 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t.back_to_shop}</span>
          </button>
          
          <div className="text-xs text-[#857252] font-semibold">
            {t.brand_name} Snacks & Co • {product.category === 'thekua' ? 'Thekua' : 'Nimki'}
          </div>
        </div>

        {/* Product Visual grid and detail options */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start bg-[#FBF9F4] rounded-3xl border border-[#EADCC6] p-4 sm:p-8 shadow-sm">
          
          {/* LEFT: Alternate Images Gallery and zoom preview */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Big spotlight image container with hover cursor scale zoom */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#FAF6EE] border border-[#EADCC6] group">
              <img
                src={product.images[activeImageIdx]}
                alt={t[`${product.translationKey}_name`] || product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-130 cursor-zoom-in"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/40 text-white text-[10px] uppercase font-bold py-1 px-2.5 rounded backdrop-blur-sm pointer-events-none">
                💡 Mouse Over To Zoom
              </div>
            </div>

            {/* Selector thumbnail carousel strip */}
            <div className="flex gap-3 justify-center">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIdx(index)}
                  className={`w-20 sm:w-24 aspect-4/3 rounded-xl overflow-hidden border-2 transition-all focus:outline-none cursor-pointer ${
                    activeImageIdx === index 
                      ? 'border-[#B45309] scale-105 shadow-md' 
                      : 'border-[#EADCC6] hover:border-[#B45309]/50'
                  }`}
                >
                  <img src={img} alt={`Angle ${index + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* Quick trust metrics under image */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#EADCC6] pt-6 mt-6 text-center text-xs text-[#5C4D3C] font-semibold">
              <div className="space-y-1">
                <p className="text-lg">🌿</p>
                <p className="font-serif">100% Vegetarian</p>
              </div>
              <div className="space-y-1">
                <p className="text-lg">🥣</p>
                <p className="font-serif">Slow Brick Fires</p>
              </div>
              <div className="space-y-1">
                <p className="text-lg">✨</p>
                <p className="font-serif">Packed with Nitrogen</p>
              </div>
            </div>

          </div>


          {/* RIGHT: Ordering parameters and copy */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              
              {/* Category tag & Wishlist hook */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#B45309] bg-[#EADCC6]/30 px-2.5 py-1 rounded">
                  {product.category === 'thekua' ? 'Sweet Sancha Thekua' : 'Crispy Tangy Nimki'}
                </span>
                
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="flex items-center gap-1.5 text-xs text-[#3F2E1E] hover:text-[#B45309] font-medium focus:outline-none"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{inWishlist ? 'Wishlisted' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Product Big Title */}
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#3F2E1E] leading-tight">
                {t[`${product.translationKey}_name`] || product.name}
              </h1>

              {/* Stars summary */}
              <div className="flex items-center gap-2 text-sm text-[#C59B27] font-semibold font-mono">
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-[#C59B27] text-[#C59B27]" />
                  <Star className="w-4 h-4 fill-[#C59B27] text-[#C59B27]" />
                  <Star className="w-4 h-4 fill-[#C59B27] text-[#C59B27]" />
                  <Star className="w-4 h-4 fill-[#C59B27] text-[#C59B27]" />
                  <Star className="w-4 h-4 fill-[#C59B27] text-[#C59B27]" />
                </div>
                <span>{product.rating.toFixed(1)} / 5.0</span>
                <span className="text-[#857252] font-normal font-sans">({product.reviewCount} customer reviews)</span>
              </div>

            </div>

            {/* Price section and discount mockup */}
            <div className="p-4 bg-[#FAF6EE] rounded-2xl border border-[#EADCC6] flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-[#857252] uppercase block">Guaranteed Fresh Pack price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono font-black text-[#B45309]">₹{product.price}</span>
                  <span className="text-[#857252] text-xs font-mono line-through">₹{product.price + 50}</span>
                  <span className="text-emerald-700 font-sans text-xs font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">Saved ₹50!</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-sans text-[#857252] block font-semibold">Net Weight / Pack</span>
                <span className="text-sm font-sans font-bold text-[#3F2E1E] bg-[#EADCC6]/45 px-2.5 py-1 rounded inline-block mt-1">
                  {product.unit}
                </span>
              </div>
            </div>

            {/* Emotional "Maa Ke Haath Ka" Story/Touch segment */}
            <div className="p-4 bg-orange-500/5 rounded-2xl border border-orange-500/10 space-y-2">
              <p className="text-xs font-bold text-[#B45309] uppercase tracking-wider flex items-center gap-1">
                👵 Maa Ka Aashirwad (Mother's Legacy Story)
              </p>
              <p className="text-xs sm:text-sm text-[#5C4D3C] italic leading-relaxed font-serif">
                "{t[`${product.translationKey}_story`] || product.story}"
              </p>
            </div>

            {/* Traditional Recipe Trigger Banner */}
            <div className="p-4 bg-[#F2ECD9]/70 rounded-2xl border border-[#EADCC6] flex flex-col sm:flex-row justify-between items-center gap-4 shadow-inner">
              <div className="flex items-center gap-2.5 text-left w-full sm:w-auto">
                <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-[#B45309] shrink-0 text-lg">
                  📜
                </div>
                <div>
                  <span className="text-[10px] font-mono font-black uppercase text-[#B45309] block">
                    {language === 'en' ? "Grandma's Sacred Legacy" : language === 'hi' ? "दादी माँ की पावन विधि" : "माई क पवित्र विधी"}
                  </span>
                  <span className="text-xs font-serif font-black text-[#3F2E1E] block">
                    {language === 'en' ? "View Authentic Handcraft Recipe" : language === 'hi' ? "असली हस्तनिर्मित रेसिपी देखें" : "सोंध देहाती विधी देखीं"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowRecipe(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#B45309] hover:bg-[#3F2E1E] text-white text-xs font-black rounded-xl uppercase tracking-wider transition-colors shadow active:scale-95 cursor-pointer focus:outline-none"
              >
                {language === 'en' ? 'Open Recipe Card' : language === 'hi' ? 'रेसिपी खोलें' : 'रेसिपी खोलीं'}
              </button>
            </div>

            {/* Dynamic tabs: Details, Ingredients, Nutrition values */}
            <div className="space-y-3">
              <div className="flex border-b border-[#EADCC6] text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 px-4 border-b-2 transition-all ${
                    activeTab === 'details' ? 'border-[#B45309] text-[#B45309] font-black' : 'border-transparent text-[#857252] hover:text-[#B45309]'
                  }`}
                >
                  {language === 'en' ? 'Kitchen Description' : 'रसोई का विवरण'}
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 px-4 border-b-2 transition-all ${
                    activeTab === 'ingredients' ? 'border-[#B45309] text-[#B45309] font-black' : 'border-transparent text-[#857252] hover:text-[#B45309]'
                  }`}
                >
                  {t.ingredients_label}
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`pb-2 px-4 border-b-2 transition-all ${
                    activeTab === 'nutrition' ? 'border-[#B45309] text-[#B45309] font-black' : 'border-transparent text-[#857252] hover:text-[#B45309]'
                  }`}
                >
                  {language === 'en' ? 'Nutrition Board' : 'पोषण बोर्ड'}
                </button>
              </div>

              <div className="text-xs sm:text-sm leading-relaxed text-[#5C4D3C] min-h-[90px] pt-1">
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p>{t[`${product.translationKey}_desc`] || product.description}</p>
                    <p className="text-[#0F766E] font-semibold flex items-center gap-1">
                      🌿 100% Preservative Free • Shelf Life: {getLocalizedShelfLife(product.shelfLife, language)}
                    </p>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ing, idx) => (
                        <span key={idx} className="bg-amber-500/10 text-[#3F2E1E] font-bold border border-amber-500/20 rounded-md px-3 py-1.5 text-xs">
                          ✓ {getLocalizedIngredient(ing, language)}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#857252] font-semibold italic">
                      {language === 'en' ? '*All ingredients are sourced directly from registered rural farming cooperatives.' : '*सभी सामग्री सीधे पंजीकृत सहकारी किसान क्लबों से मंगवाई जाती है।'}
                    </p>
                  </div>
                )}

                {activeTab === 'nutrition' && (
                  <div className="bg-[#FFFDF6] p-4 rounded-xl border-2 border-[#EADCC6] max-w-md mx-auto space-y-4 shadow-sm font-sans text-left">
                    <div className="border-b-4 border-stone-800 pb-1">
                      <h4 className="text-xl font-bold uppercase tracking-tight text-stone-900">Nutritional Facts</h4>
                      <p className="text-xs text-[#857252] font-semibold">{language === 'en' ? 'Calculated per 100g serving' : 'प्रति १०० ग्राम सर्विंग के आधार पर गणना'}</p>
                    </div>
                    
                    <div className="space-y-2 text-xs text-stone-800">
                      {/* Calories Row */}
                      <div className="flex justify-between items-baseline py-1.5 border-b-2 border-stone-800 font-black">
                        <span className="text-sm uppercase tracking-wider">{language === 'en' ? 'Energy (Calories)' : 'ऊर्जा (कैलोरी)'}</span>
                        <span className="font-mono text-base text-[#B45309]">{product.nutrition.calories} kcal</span>
                      </div>

                      {/* Nutrient rows */}
                      <div className="flex justify-between py-1 border-b border-stone-300">
                        <span className="font-bold flex items-center gap-1">🥣 {language === 'en' ? 'Proteins' : 'प्रोटीन'}</span>
                        <span className="font-mono font-bold">{product.nutrition.protein}</span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-stone-300">
                        <span className="font-bold flex items-center gap-1">🍞 {language === 'en' ? 'Total Carbohydrates' : 'कुल कार्बोहाइड्रेट'}</span>
                        <span className="font-mono font-bold">{product.nutrition.carbs}</span>
                      </div>

                      <div className="pl-4 flex justify-between py-1 border-b border-stone-200 text-stone-600 text-[11px]">
                        <span>- {language === 'en' ? 'Natural Dietary Fiber' : 'प्राकृतिक फाइबर'}</span>
                        <span className="font-mono">{product.category === 'thekua' ? '4.8g' : '5.2g'}</span>
                      </div>

                      <div className="pl-4 flex justify-between py-1 border-b border-stone-200 text-stone-600 text-[11px]">
                        <span>- {language === 'en' ? 'Sweetness / Sugars' : 'प्राकृतिक मिठास / शर्करा'}</span>
                        <span className="font-mono">{product.category === 'thekua' ? '18.4g' : '0.0g'}</span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-stone-300">
                        <span className="font-bold flex items-center gap-1">🧈 {language === 'en' ? 'Total Fats' : 'कुल फैट्स (गो-घृत मय)'}</span>
                        <span className="font-mono font-bold">{product.nutrition.fat}</span>
                      </div>

                      <div className="pl-4 flex justify-between py-1 border-b border-stone-200 text-stone-600 text-[11px]">
                        <span>- {language === 'en' ? 'Saturated Fat' : 'संतृप्त वसा'}</span>
                        <span className="font-mono">{product.category === 'thekua' ? '6.8g' : '4.5g'}</span>
                      </div>

                      <div className="pl-4 flex justify-between py-1 border-b border-stone-300 text-stone-600 text-[11px] font-semibold">
                        <span>- {language === 'en' ? 'Trans Fat' : 'ट्रांस फैट'}</span>
                        <span className="font-mono text-emerald-700 font-bold">0.0g (Zero!)</span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-stone-400">
                        <span className="font-bold flex items-center gap-1">🧂 {language === 'en' ? 'Sodium (Rock Salt)' : 'सोडियम (सेंधा नमक)'}</span>
                        <span className="font-mono">{product.category === 'nimki' ? '145mg' : '12mg'}</span>
                      </div>
                    </div>

                    {/* Table Footer details */}
                    <div className="text-[10px] text-[#857252] leading-relaxed italic text-center pt-1 border-t border-dashed border-stone-400">
                      {language === 'en' 
                        ? '*Percent Daily Values are based on a 2,000 calorie diet. Prepared with stone-milled whole wheat flour and pure cow ghee.' 
                        : '*दैनिक प्रतिशत मूल्य २,००० कैलोरी आहार पर आधारित हैं। जांता की पिसाई के साबुत गेहूं और शुद्ध गाय के घी से निर्मित।'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quantities selector and Add to Cart layout or Notify Me out of stock alert */}
            <div className="pt-4 border-t border-[#EADCC6]/40 space-y-4">
              
              {product.inStock !== false ? (
                <>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-[#8F7C5D] uppercase tracking-wider">Select Batches Qty:</span>
                    
                    <div className="flex items-center justify-between border border-[#EADCC6] bg-white rounded-xl w-32 h-11 px-3 shadow-inner">
                      <button onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)} className="p-1 focus:outline-none focus:ring-0">
                        <Minus className="w-4 h-4 text-[#3F2E1E]" />
                      </button>
                      <span className="font-mono text-sm font-bold text-[#3F2E1E]">{quantity}</span>
                      <button onClick={() => setQuantity(prev => prev + 1)} className="p-1 focus:outline-none focus:ring-0">
                        <Plus className="w-4 h-4 text-[#3F2E1E]" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={isAdded ? {} : { scale: [1, 1.03, 1] }}
                      transition={isAdded ? { type: "spring", stiffness: 400, damping: 10 } : {
                        scale: {
                          repeat: Infinity,
                          duration: 1.8,
                          ease: "easeInOut"
                        },
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }}
                      onClick={handleAddToCart}
                      className={`h-12 rounded-xl text-xs uppercase tracking-widest font-black flex items-center justify-center gap-2 cursor-pointer shadow focus:outline-none ${
                        isAdded 
                          ? 'bg-[#0F766E] text-white shadow-inner scale-95' 
                          : 'bg-[#B45309] hover:bg-[#853A00] text-white hover:shadow-md'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 animate-bounce" />
                      <span>{isAdded ? t.added : t.add_to_cart}</span>
                    </motion.button>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-[#857252] font-semibold tracking-wide border border-[#EADCC6] bg-[#F1EAD9]/30 rounded-xl relative">
                      <span>✨ Desi Ghee Moyen Tested</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-5 bg-amber-500/5 rounded-2xl border-2 border-amber-500/20 text-left space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🥣</span>
                    <div>
                      <h4 className="text-sm font-serif font-black text-amber-900 uppercase tracking-wide">
                        {language === 'en' ? 'UNDER PREPARATION / OUT OF STOCK' : 'तैयारी जारी है / स्टॉक समाप्त'}
                      </h4>
                      <p className="text-[11px] text-[#857252] font-semibold">
                        {language === 'en' ? 'Seasonal micro-batch limit reached.' : 'सीमित मात्रा का घान पूरा हो चुका है।'}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#5C4D3C] font-sans leading-relaxed">
                    {language === 'en' 
                      ? 'This family recipe is prepared only in small clay-pot batches. Grandmother is currently supervising the next dough kneading and wood-oven preheat.'
                      : 'इस पारंपरिक नुस्खे को केवल छोटे बैचों में ही ढाला जाता है। प्रदूषण मुक्त वातावरण और पूर्ण स्वच्छता के लिए हमारी महिला कारीगर जल्द ही अगला घान शुरू करेंगी।'}
                  </p>

                  <AnimatePresence mode="wait">
                    {!isNotified ? (
                      <motion.form 
                        key="notify-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleNotifySubmit} 
                        className="space-y-2 mt-4"
                      >
                        <label className="block text-[10px] font-mono font-black uppercase text-[#857252]">
                          {language === 'en' ? 'Get alert when next batch completes:' : 'घान पूरा होते ही अलर्ट पाने के लिए ईमेल दर्ज करें:'}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="email"
                            required
                            placeholder={language === 'en' ? 'Enter email address' : 'अपना ईमेल आईडी दर्ज करें'}
                            value={notifyEmail}
                            onChange={(e) => setNotifyEmail(e.target.value)}
                            className="bg-white border border-[#EADCC6] rounded-xl px-4 py-2 flex-1 text-xs text-[#3F2E1E] focus:outline-none focus:border-[#B45309]"
                          />
                          <button
                            type="submit"
                            className="bg-[#B45309] hover:bg-[#3F2E1E] text-white text-xs font-black px-4 py-2 rounded-xl transition-colors cursor-pointer focus:outline-none whitespace-nowrap"
                          >
                            {language === 'en' ? 'Notify Me' : 'मुझे सूचित करें'}
                          </button>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div 
                        key="notify-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 rounded-xl text-xs font-semibold space-y-1 mt-4"
                      >
                        <p className="font-bold flex items-center gap-1">✨ {language === 'en' ? 'Successfully Registered!' : 'पंजीकरण सफल रहा!'}</p>
                        <p className="text-[11px] font-sans">
                          {language === 'en' 
                            ? 'Excellent! We have registered your list parameters. We will email you the exact hour the next batch leaves Grandma’s oven.' 
                            : 'बधाई हो! अगला ताज़ा घान तैयार होते ही आपके पंजीकृत ईमेल पर सीधा लिंक प्रेषित कर दिया जाएगा।'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

            </div>

              {/* Pincode Estimator details form widget */}
              <div className="pt-4 border-t border-[#EADCC6]/45 space-y-2 text-left">
                <h4 className="text-xs font-bold text-[#3F2E1E] uppercase tracking-wider flex items-center gap-1">
                  <Truck className="w-4 h-4 text-[#B45309]" /> {t.delivery_calc}
                </h4>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder={language === 'en' ? 'Enter 6-digit Pincode' : '६ अंकों का पिनकोड'}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="bg-white border border-[#EADCC6] rounded-xl px-4 py-2 text-xs text-[#3F2E1E] focus:outline-none focus:border-[#B45309] w-full max-w-[200px]"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#3F2E1E] hover:bg-[#B45309] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer focus:outline-none"
                  >
                    Check delivery
                  </button>
                </form>

                {pincodeMsg && (
                  <div className="p-2.5 rounded-lg bg-[#FAF6EE] text-xs font-semibold text-[#3F2E1E] border border-[#EADCC6]">
                    {pincodeMsg}
                  </div>
                )}
              </div>

              {/* Share on Social block */}
              <div className="pt-4 border-t border-[#EADCC6]/45 space-y-3 text-left">
                <h4 className="text-xs font-bold text-[#3F2E1E] uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-[#B45309]" />
                  <span>
                    {language === 'en' ? 'Sahaj Sahayog (Share the Tradition)' : language === 'hi' ? 'सहज सहयोग (परंपरा साझा करें)' : 'परम्परा साझे करीं'}
                  </span>
                </h4>
                <p className="text-[11px] text-[#857252] leading-relaxed">
                  {language === 'en' 
                    ? "Help rural women co-operatives thrive! Gift the legacy by sharing this direct batch page with family:" 
                    : "ग्रामीण महिला समूहों को सशक्त बनाने में मदद करें! परिवार और मित्रों के साथ साझा करें:"}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {/* WhatsApp Share Button */}
                  <a
                    href={getShareMessages().whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow transition-all active:scale-95"
                  >
                    <span>💬 WhatsApp</span>
                  </a>

                  {/* Twitter / X Share Button */}
                  <a
                    href={getShareMessages().twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow transition-all active:scale-95"
                  >
                    <span>𝕏 Twitter</span>
                  </a>

                  {/* Copy Caption button for Instagram / Universal Clip */}
                  <button
                    type="button"
                    onClick={() => handleCopyCaption('instagram')}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-95 text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow transition-all active:scale-95 cursor-pointer focus:outline-none"
                  >
                    {copiedPlatform === 'instagram' ? (
                      <>
                        <Check className="w-3.5 h-3.5 animate-bounce" />
                        <span>{language === 'en' ? 'Caption Copied!' : 'कैप्शन कॉपी हुआ!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>📸 Instagram Caption</span>
                      </>
                    )}
                  </button>

                  {/* Direct Link Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopyCaption('link')}
                    className="flex items-center gap-1.5 bg-[#FAF6EE] text-[#3F2E1E] border border-[#EADCC6] hover:bg-[#EADCC6]/30 text-[11px] font-bold px-3 py-2 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer focus:outline-none"
                  >
                    {copiedPlatform === 'link' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#0F766E]" />
                        <span>{language === 'en' ? 'Link Copied!' : 'लिंक कॉपी हुआ!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>🔗 {language === 'en' ? 'Copy Link' : 'लिंक कॉपी करें'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Animated Copy Toast/Alert prompt */}
                <AnimatePresence>
                  {copiedPlatform && (
                    <motion.div
                      key="copy-bubble"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 mt-2"
                    >
                      <span>✨</span>
                      <span>
                        {copiedPlatform === 'instagram' 
                          ? (language === 'en' ? 'Authentic Instagram story caption & hashtags are copied! Paste directly in your feed.' : 'इंस्टाग्राम स्टोरी और हैशटैग कस्टमाइज़ होकर कॉपी हो गए हैं!')
                          : (language === 'en' ? 'Product batch link has been copied to your clipboard.' : 'उत्पाद का लाइव लिंक क्लिपबोर्ड पर कॉपी हो गया है।')}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

          </div>

        </div>


        {/* BOTTOM SECTION: Related recommended products */}
        <div className="mt-16 space-y-6">
          <div className="border-b border-[#EADCC6] pb-4 flex justify-between items-end">
            <h3 className="text-xl font-serif font-black text-[#3F2E1E]">
              {language === 'en' ? 'You May Also Handpick' : 'ये व्यंजन भी आज़माएं'}
            </h3>
            <span className="text-xs text-[#B45309] font-bold uppercase tracking-wider flex items-center gap-1 animate-pulse">
              🌾 Sourced Fresh Daily <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onProductClick(p);
                  setActiveImageIdx(0);
                  setQuantity(1);
                  setPincodeMsg('');
                }}
                className="bg-[#FBF9F4] p-3 rounded-xl border border-[#EADCC6] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="aspect-4/3 rounded-lg overflow-hidden bg-amber-50">
                  <img src={p.images[0]} alt={t[`${p.translationKey}_name`] || p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                </div>
                <div className="pt-3 space-y-1">
                  <p className="text-xs font-sans text-amber-800 font-extrabold uppercase leading-none">
                    {p.category === 'thekua' ? (language === 'en' ? 'Thekua' : language === 'hi' ? 'ठेकुआ' : 'ठेकुआ') : (language === 'en' ? 'Nimki' : language === 'hi' ? 'निमकी' : 'निमकी')}
                  </p>
                  <h4 className="text-sm font-serif font-black text-[#3F2E1E] group-hover:text-[#B45309] transition-colors">
                    {t[`${p.translationKey}_name`] || p.name}
                  </h4>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-mono text-sm font-bold text-[#B45309]">₹{p.price}</span>
                    <span className="text-[10px] font-sans text-[#857252] font-semibold">{p.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <AnimatePresence>
        {showRecipe && (
          <RecipeModal
            product={product}
            language={language}
            onClose={() => setShowRecipe(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
