import React, { useState } from 'react';
import { Star, Eye, Heart, ShoppingBag, Plus, Minus, AlertCircle } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS, getLocalizedBadge, getLocalizedShelfLife } from '../data';
import { motion } from 'motion/react';
import { useShopify } from '../context/ShopifyContext';

interface FeaturedProductsProps {
  language: Language;
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onQuickViewClick: (product: Product) => void;
}

export default function FeaturedProducts({
  language,
  onAddToCart,
  onProductClick,
  wishlist,
  onToggleWishlist,
  onQuickViewClick
}: FeaturedProductsProps) {
  const { products, settings } = useShopify();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'thekua' | 'nimki'>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  const currencySymbol = settings.currency === 'USD' ? '$' : settings.currency === 'EUR' ? '€' : '₹';
  const exchangeRate = settings.currency === 'USD' ? 0.012 : settings.currency === 'EUR' ? 0.011 : 1;

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  const handleQuantityChange = (productId: string, increment: boolean) => {
    const currentQty = quantities[productId] || 1;
    let nextQty = increment ? currentQty + 1 : currentQty - 1;
    if (nextQty < 1) nextQty = 1;
    setQuantities({ ...quantities, [productId]: nextQty });
  };

  const handleAddToCartWithAnimation = (product: Product) => {
    const qty = quantities[product.id] || 1;
    onAddToCart(product, qty);
    setJustAddedId(product.id);
    
    // reset added state after 2 seconds
    setTimeout(() => {
      setJustAddedId(null);
    }, 2000);
  };

  const isProductInWishlist = (product: Product) => {
    return wishlist.some(item => item.id === product.id);
  };

  return (
    <section id="products-section" className="py-16 bg-[#FAF6EE] border-b border-[#EADCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#B45309] uppercase block mb-2">🌿 Swad Ka Utsav</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3F2E1E] tracking-tight">
            {t.section_products}
          </h2>
          <div className="w-16 h-1 bg-[#B45309] mx-auto my-4 rounded" />
          <p className="text-sm sm:text-base text-[#857252] font-medium leading-relaxed">
            {t.section_products_sub}
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 px-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all focus:outline-none cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#B45309] text-white shadow-md'
                : 'bg-[#F1EAD9] text-[#3F2E1E] hover:bg-[#EADCC6]'
            }`}
          >
            {t.tab_all}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            onClick={() => setSelectedCategory('thekua')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all focus:outline-none cursor-pointer ${
              selectedCategory === 'thekua'
                ? 'bg-[#B45309] text-white shadow-md'
                : 'bg-[#F1EAD9] text-[#3F2E1E] hover:bg-[#EADCC6]'
            }`}
          >
            {t.tab_thekua}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            onClick={() => setSelectedCategory('nimki')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all focus:outline-none cursor-pointer ${
              selectedCategory === 'nimki'
                ? 'bg-[#B45309] text-white shadow-md'
                : 'bg-[#F1EAD9] text-[#3F2E1E] hover:bg-[#EADCC6]'
            }`}
          >
            {t.tab_nimki}
          </motion.button>
        </div>

        {/* Products Grid with responsive padding/column adjusters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-8 lg:gap-10 px-2 sm:px-0">
          {filteredProducts.map((product) => {
            const qty = quantities[product.id] || 1;
            const inWishlist = isProductInWishlist(product);
            const isAdded = justAddedId === product.id;

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.015, 
                  boxShadow: "0 20px 25px -5px rgba(180, 83, 9, 0.08), 0 10px 10px -5px rgba(180, 83, 9, 0.04)" 
                }}
                transition={{ 
                  duration: 0.3, 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className="group relative flex flex-col justify-between bg-[#FBF9F4] rounded-2xl border border-[#EADCC6] hover:border-[#B45309]/30 shadow-sm transition-colors duration-300 overflow-hidden"
              >
                {/* Wishlist Button overlays */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 450, damping: 10 }}
                  onClick={() => onToggleWishlist(product)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow hover:bg-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer"
                  title="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-[#3F2E1E]'}`} />
                </motion.button>

                {/* Best Seller / Offer badges */}
                {product.isBestSeller && (
                  <div className="absolute top-4 left-4 z-20 bg-[#D97706] text-white text-[10px] uppercase tracking-wider font-extrabold py-1 px-2.5 rounded-md shadow-md animate-pulse">
                    BEST SELLER 🔥
                  </div>
                )}

                {/* Product image with slow zoom effect */}
                <div 
                  className="relative aspect-4/3 overflow-hidden cursor-pointer bg-[#F1EAD9] border-b border-[#EADCC6] group/pic"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    onClick={() => onProductClick(product)}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Quick View Button Overlay */}
                  <div className="absolute inset-0 bg-[#3F2E1E]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => onQuickViewClick(product)}
                      className="px-4 py-2 bg-white text-[#3F2E1E] text-xs font-bold rounded-lg shadow-lg hover:bg-[#B45309] hover:text-white transition-colors flex items-center gap-1 cursor-pointer focus:outline-none"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{t.quick_view}</span>
                    </button>
                  </div>

                  <span className="absolute bottom-2 right-2 text-white text-[10px] font-mono bg-[#3F2E1E]/80 backdrop-blur-xs px-2 py-0.5 rounded font-bold">
                    {product.unit}
                  </span>
                </div>

                {/* Card description details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    {/* Category Label and Rating stars */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#B45309] bg-[#EADCC6]/30 px-2 py-0.5 rounded">
                        {product.category === 'thekua' ? 'Traditional Thekua' : 'Crispy Nimki'}
                      </span>
                      <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#C59B27]">
                        <Star className="w-4 h-4 fill-[#C59B27] text-[#C59B27]" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-[#857252] font-normal">({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Title with font scaling based on media viewport */}
                    <h3 
                      onClick={() => onProductClick(product)}
                      className="text-base sm:text-lg lg:text-xl font-serif font-black text-[#3F2E1E] group-hover:text-[#B45309] transition-colors cursor-pointer leading-tight"
                    >
                      {t[`${product.translationKey}_name`] || product.name}
                    </h3>

                    {/* Shelf Life alert */}
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-[#0F766E]">
                      <span>🌱 Clean Eat • Shelf Life: {getLocalizedShelfLife(product.shelfLife, language)}</span>
                    </div>

                    {/* Short description with customizable text scaling */}
                    <p className="text-xs sm:text-[13px] text-[#5C4D3C] line-clamp-2 leading-relaxed">
                      {t[`${product.translationKey}_desc`] || product.description}
                    </p>

                    {/* Badges pills list */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.badges.slice(0, 2).map((badge, bIdx) => (
                        <span key={bIdx} className="text-[9px] sm:text-[10px] font-bold tracking-wide text-[#857252] bg-[#F1EAD9] rounded border border-[#EADCC6] px-2 py-0.5">
                          ✓ {getLocalizedBadge(badge, language)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and cart controls */}
                  <div className="pt-2 border-t border-[#EADCC6]/50 space-y-3">
                    
                    {/* Price and Unit */}
                    <div className="flex items-baseline justify-between">
                      <span className="text-xl sm:text-2xl font-mono font-black text-[#B45309]">
                        {currencySymbol}{Math.round(product.price * exchangeRate)}
                        <span className="text-[10px] sm:text-xs text-[#857252] font-sans font-medium ml-1">/{product.unit}</span>
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold text-[#0F766E] border border-[#0F766E]/20 bg-[#0F766E]/5 rounded px-1.5 py-0.5">
                        📦 COD Available
                      </span>
                    </div>

                    {/* Quantity & Cart Action - Checks Stock Status */}
                    {product.inStock === false ? (
                      <div className="w-full h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center font-bold text-xs uppercase border border-gray-200 select-none gap-1.5">
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                        <span>Sold Out (कम पर गयिल)</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-5 flex items-center justify-between border border-[#EADCC6] bg-white rounded-xl h-10 px-2 shadow-inner">
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                            onClick={() => handleQuantityChange(product.id, false)}
                            className="text-[#3F2E1E] hover:text-[#B45309] p-1 focus:outline-none cursor-pointer"
                            title="Less"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </motion.button>
                          <span className="font-mono text-xs sm:text-sm font-bold text-[#3F2E1E]">
                            {qty}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                            onClick={() => handleQuantityChange(product.id, true)}
                            className="text-[#3F2E1E] hover:text-[#B45309] p-1 focus:outline-none cursor-pointer"
                            title="More"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>

                        {/* Add to Cart button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          animate={isAdded ? {} : { scale: [1, 1.03, 1] }}
                          transition={isAdded ? { type: "spring", stiffness: 400, damping: 10 } : {
                            scale: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
                            type: "spring", stiffness: 400, damping: 10
                          }}
                          onClick={() => handleAddToCartWithAnimation(product)}
                          className={`col-span-7 h-10 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow focus:outline-none cursor-pointer ${
                            isAdded
                              ? 'bg-[#0F766E] text-white shadow-inner scale-95'
                              : 'bg-[#B45309] hover:bg-[#853A00] text-white hover:shadow-md'
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>{isAdded ? t.added : t.add_to_cart}</span>
                        </motion.button>
                      </div>
                    )}

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
