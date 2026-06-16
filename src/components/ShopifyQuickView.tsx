import React, { useState } from 'react';
import { useShopify } from '../context/ShopifyContext';
import { X, Star, ShoppingBag, Plus, Minus, ShieldCheck, Heart, Sparkles, Clipboard, Flame } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../data';
import { motion } from 'motion/react';

interface ShopifyQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
  onInstantBuy: (product: Product, qty: number) => void;
  language: Language;
}

export default function ShopifyQuickView({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onInstantBuy,
  language
}: ShopifyQuickViewProps) {
  const { settings } = useShopify();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const t = TRANSLATIONS[language];
  const currencySymbol = settings.currency === 'USD' ? '$' : settings.currency === 'EUR' ? '€' : '₹';
  const exchangeRate = settings.currency === 'USD' ? 0.012 : settings.currency === 'EUR' ? 0.011 : 1;
  const localizedPrice = Math.round(product.price * exchangeRate);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  const handleInstantBuy = () => {
    onInstantBuy(product, quantity);
    onClose();
  };

  return (
    <div id="shopify-quickview-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs pointer-events-auto"
      />

      {/* Lightbox layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative bg-[#FAF6EE] rounded-3xl shadow-3xl w-full max-w-3xl overflow-hidden border border-[#EADCC6] flex flex-col md:flex-row h-auto max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-1.5 rounded-full bg-white/80 hover:bg-[#B45309] hover:text-white transition-colors shadow focus:outline-none cursor-pointer text-slate-800"
          title="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Column 1: Image sliders & selections */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-white/40 border-r border-[#EADCC6]/55">
          <div className="space-y-4">
            <span className="text-[10px] bg-slate-900 text-white rounded px-2 py-0.5 uppercase tracking-widest font-extrabold inline-block">
              Shopify Quick View
            </span>

            {/* Display active image */}
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-[#EADCC6] relative">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {product.isBestSeller && (
                <span className="absolute top-3 left-3 bg-[#D97706] text-white font-extrabold text-[9px] px-2 py-1 rounded-md uppercase tracking-wider animate-pulse shadow">
                  Best Seller 🔥
                </span>
              )}
            </div>

            {/* Thumbnails list */}
            <div className="flex gap-2 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-[#B45309] shadow-md scale-102' : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick specs section */}
          <div className="mt-4 pt-4 border-t border-[#EADCC6]/40 hidden md:block">
            <h5 className="text-[11px] font-bold text-[#857252] uppercase tracking-wider mb-2">🌿 Traditional Ingredients:</h5>
            <div className="flex flex-wrap gap-1">
              {product.ingredients.slice(0, 3).map((ing, iIdx) => (
                <span key={iIdx} className="text-[10px] bg-[#F1EAD9] text-[#5C4D3C] px-2 py-0.5 rounded-md font-medium">
                  • {ing}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Specs descriptors, prices, checkout buttons */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-5 h-auto max-h-[50vh] md:max-h-[90vh]">
          <div className="space-y-4">
            {/* Category / Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#B45309] uppercase tracking-wider bg-[#B45309]/10 px-2.5 py-0.5 rounded-full">
                {product.category === 'thekua' ? 'Thekua Cookie' : 'Nimki Savory'}
              </span>
              <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#C59B27]">
                <Star className="w-4 h-4 fill-[#C59B27] text-[#C59B27]" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-[#857252] font-normal">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Title / Pricing */}
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-[#3F2E1E] leading-tight">
                {t[`${product.translationKey}_name`] || product.name}
              </h2>
              <p className="text-xs text-[#8F7C5D] font-medium font-sans">
                Shelf Life: {product.shelfLife} • Pack of {product.unit}
              </p>
              
              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-2xl font-mono font-black text-[#B45309]">
                  {currencySymbol}{localizedPrice}
                </span>
                <span className="text-xs text-[#857252] line-through font-mono">
                  {currencySymbol}{Math.round(localizedPrice * 1.25)}
                </span>
                <span className="text-xs text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">
                  Save 20%
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5C4D3C] leading-relaxed">
              {t[`${product.translationKey}_desc`] || product.description}
            </p>

            {/* Nutrition Facts mini grid */}
            <div className="bg-amber-50/60 p-3 rounded-2xl border border-[#EADCC6]/60 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#857252] tracking-wider block flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Energy & Nutrients (per 100g)
              </span>
              <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                <div className="bg-white/75 p-1.5 rounded-lg">
                  <span className="block text-[9px] text-gray-400">Calories</span>
                  <span className="font-mono font-bold text-[#3F2E1E]">{product.nutrition.calories}k</span>
                </div>
                <div className="bg-white/75 p-1.5 rounded-lg">
                  <span className="block text-[9px] text-gray-400">Protein</span>
                  <span className="font-mono font-bold text-[#3F2E1E]">{product.nutrition.protein}</span>
                </div>
                <div className="bg-white/75 p-1.5 rounded-lg">
                  <span className="block text-[9px] text-gray-400">Carbs</span>
                  <span className="font-mono font-bold text-[#3F2E1E]">{product.nutrition.carbs}</span>
                </div>
                <div className="bg-white/75 p-1.5 rounded-lg">
                  <span className="block text-[9px] text-gray-400">Fat</span>
                  <span className="font-mono font-bold text-[#3F2E1E]">{product.nutrition.fat}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add actions / Buy It Now */}
          <div className="space-y-3 pt-4 border-t border-[#EADCC6]/40">
            {product.inStock === false ? (
              <div className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl font-bold font-sans text-xs text-center border">
                This item is currently Out of Stock
              </div>
            ) : (
              <>
                <div className="flex gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center justify-between border border-[#EADCC6] bg-white rounded-xl h-12 w-28 px-3 shadow-inner shrink-0">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="text-[#3F2E1E] hover:text-[#B45309] p-1 focus:outline-none cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-sm font-bold text-[#3F2E1E]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="text-[#3F2E1E] hover:text-[#B45309] p-1 focus:outline-none cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAdd}
                    className={`flex-1 h-12 rounded-xl font-bold font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer focus:outline-none ${
                      added 
                        ? 'bg-[#0F766E] text-white shadow-inner scale-98' 
                        : 'bg-white hover:bg-[#FAF6EE] text-[#B45309] border-2 border-[#B45309]'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{added ? 'Added to Cart ✓' : 'Add to Shopify Cart'}</span>
                  </button>
                </div>

                {/* Shopify Buy It Now style dynamic button */}
                <button
                  onClick={handleInstantBuy}
                  className="w-full h-12 bg-[#5c6ac4] hover:bg-[#4957b8] text-white rounded-xl font-bold font-sans text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer focus:outline-none flex items-center justify-center gap-1.5"
                >
                  🛒 BUY IT NOW
                </button>
              </>
            )}

            <p className="text-[10px] text-center text-[#857252] font-semibold flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full-Durable Shopify Security checkout. Dispatching in tomorrow morning batch.</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
