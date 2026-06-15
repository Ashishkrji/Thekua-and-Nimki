import React, { useState } from 'react';
import { Star, Truck, ShieldCheck, Heart, ShoppingBag, ArrowLeft, Plus, Minus, ArrowRight, Award } from 'lucide-react';
import { Product, Language } from '../types';
import { PRODUCTS, TRANSLATIONS } from '../data';
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
                alt={product.name}
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
                {product.name}
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
                "{product.story}"
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
                    <p>{product.description}</p>
                    <p className="text-[#0F766E] font-semibold flex items-center gap-1">
                      🌿 100% Preservative Free • Shelf Life: {product.shelfLife}
                    </p>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ing, idx) => (
                        <span key={idx} className="bg-amber-500/10 text-[#3F2E1E] font-bold border border-amber-500/20 rounded-md px-3 py-1.5 text-xs">
                          ✓ {ing}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-[#857252] font-semibold italic">
                      {language === 'en' ? '*All ingredients are sourced directly from registered rural farming cooperatives.' : '*सभी सामग्री सीधे पंजीकृत सहकारी किसान क्लबों से मंगवाई जाती है।'}
                    </p>
                  </div>
                )}

                {activeTab === 'nutrition' && (
                  <div className="grid grid-cols-4 gap-4 p-3 bg-[#FAF6EE] rounded-xl border border-[#EADCC6]/60 text-center font-mono">
                    <div>
                      <p className="text-[10px] text-[#857252]">Calories</p>
                      <p className="text-[#B45309] font-black">{product.nutrition.calories} kcal</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#857252]">Protein</p>
                      <p className="text-zinc-800 font-bold">{product.nutrition.protein}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#857252]">Carbs</p>
                      <p className="text-zinc-800 font-bold">{product.nutrition.carbs}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#857252]">Fats</p>
                      <p className="text-zinc-800 font-bold">{product.nutrition.fat}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quantities selector and Add to Cart layout */}
            <div className="pt-4 border-t border-[#EADCC6]/40 space-y-4">
              
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
                <button
                  onClick={handleAddToCart}
                  className={`h-12 rounded-xl text-xs uppercase tracking-widest font-black flex items-center justify-center gap-2 cursor-pointer shadow transition-all focus:outline-none ${
                    isAdded 
                      ? 'bg-[#0F766E] text-white shadow-inner scale-95' 
                      : 'bg-[#B45309] hover:bg-[#853A00] text-white hover:shadow-md'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdded ? t.added : t.add_to_cart}</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-xs text-[#857252] font-semibold tracking-wide border border-[#EADCC6] bg-[#F1EAD9]/30 rounded-xl relative">
                  <span>✨ Desi Ghee Moyen Tested</span>
                </div>
              </div>

            </div>

            {/* Pincode Estimator details form widget */}
            <div className="pt-4 border-t border-[#EADCC6]/45 space-y-2">
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
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                </div>
                <div className="pt-3 space-y-1">
                  <p className="text-xs font-sans text-amber-800 font-extrabold uppercase leading-none">{p.category}</p>
                  <h4 className="text-sm font-serif font-black text-[#3F2E1E] group-hover:text-[#B45309] transition-colors">{p.name}</h4>
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
