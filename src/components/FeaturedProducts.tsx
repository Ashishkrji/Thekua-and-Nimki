import React, { useState } from 'react';
import { Star, Eye, Heart, ShoppingBag, Plus, Minus, Info } from 'lucide-react';
import { Product, Language } from '../types';
import { PRODUCTS, TRANSLATIONS } from '../data';
import { motion } from 'motion/react';

interface FeaturedProductsProps {
  language: Language;
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

export default function FeaturedProducts({
  language,
  onAddToCart,
  onProductClick,
  wishlist,
  onToggleWishlist
}: FeaturedProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'thekua' | 'nimki'>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  const filteredProducts = PRODUCTS.filter(product => {
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
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all focus:outline-none cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#B45309] text-white shadow-md'
                : 'bg-[#F1EAD9] text-[#3F2E1E] hover:bg-[#EADCC6]'
            }`}
          >
            {t.tab_all}
          </button>
          <button
            onClick={() => setSelectedCategory('thekua')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all focus:outline-none cursor-pointer ${
              selectedCategory === 'thekua'
                ? 'bg-[#B45309] text-white shadow-md'
                : 'bg-[#F1EAD9] text-[#3F2E1E] hover:bg-[#EADCC6]'
            }`}
          >
            {t.tab_thekua}
          </button>
          <button
            onClick={() => setSelectedCategory('nimki')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all focus:outline-none cursor-pointer ${
              selectedCategory === 'nimki'
                ? 'bg-[#B45309] text-white shadow-md'
                : 'bg-[#F1EAD9] text-[#3F2E1E] hover:bg-[#EADCC6]'
            }`}
          >
            {t.tab_nimki}
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col justify-between bg-[#FBF9F4] rounded-2xl border border-[#EADCC6] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Wishlist Button overlays */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow hover:bg-white flex items-center justify-center transition-colors focus:outline-none"
                  title="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-[#3F2E1E]'}`} />
                </button>

                {/* Best Seller / Offer badges */}
                {product.isBestSeller && (
                  <div className="absolute top-4 left-4 z-20 bg-[#D97706] text-white text-[10px] uppercase tracking-wider font-extrabold py-1 px-2.5 rounded-md shadow-md animate-pulse">
                    BEST SELLER 🔥
                  </div>
                )}

                {/* Product image with slow zoom effect */}
                <div 
                  onClick={() => onProductClick(product)}
                  className="relative aspect-4/3 overflow-hidden cursor-pointer bg-[#F1EAD9] border-b border-[#EADCC6]"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle black translucent shade on hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3F2E1E]/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end">
                    <p className="text-white text-xs font-semibold flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {t.quick_view}
                    </p>
                    <span className="text-white text-xs font-mono bg-[#B45309] px-2 py-0.5 rounded font-bold">
                      {product.unit}
                    </span>
                  </div>
                </div>

                {/* Card description details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    {/* Category Label and Rating stars */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#B45309] bg-[#EADCC6]/30 px-2 py-0.5 rounded">
                        {product.category === 'thekua' ? 'Traditional Thekua' : 'Crispy Nimki'}
                      </span>
                      <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#C59B27]">
                        <Star className="w-4 h-4 fill-[#C59B27] text-[#C59B27]" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-[#857252] font-normal">({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onProductClick(product)}
                      className="text-lg font-serif font-bold text-[#3F2E1E] group-hover:text-[#B45309] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    {/* Shelf Life alert */}
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-[#0F766E]">
                      <span>🌱 Clean Eat • Shelf Life: {product.shelfLife}</span>
                    </div>

                    {/* Short description */}
                    <p className="text-xs text-[#5C4D3C] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Badges pills list */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.badges.slice(0, 2).map((badge, bIdx) => (
                        <span key={bIdx} className="text-[9px] font-bold tracking-wide text-[#857252] bg-[#F1EAD9] rounded border border-[#EADCC6] px-2 py-0.5">
                          ✓ {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and cart controls */}
                  <div className="pt-2 border-t border-[#EADCC6]/50 space-y-3">
                    
                    {/* Price and Unit */}
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-mono font-black text-[#B45309]">
                        ₹{product.price}
                        <span className="text-[10px] text-[#857252] font-sans font-medium ml-1">/{product.unit}</span>
                      </span>
                      <span className="text-[10px] font-bold text-[#0F766E] border border-[#0F766E]/20 bg-[#0F766E]/5 rounded px-1.5 py-0.5">
                        📦 COD Available
                      </span>
                    </div>

                    {/* Quantity selectors */}
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-5 flex items-center justify-between border border-[#EADCC6] bg-white rounded-xl h-10 px-2 shadow-inner">
                        <button
                          onClick={() => handleQuantityChange(product.id, false)}
                          className="text-[#3F2E1E] hover:text-[#B45309] p-1 focus:outline-none"
                          title="Less"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold text-[#3F2E1E]">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product.id, true)}
                          className="text-[#3F2E1E] hover:text-[#B45309] p-1 focus:outline-none"
                          title="More"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Add to Cart button */}
                      <button
                        onClick={() => handleAddToCartWithAnimation(product)}
                        className={`col-span-7 h-10 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow focus:outline-none cursor-pointer ${
                          isAdded
                            ? 'bg-[#0F766E] text-white shadow-inner scale-95'
                            : 'bg-[#B45309] hover:bg-[#853A00] text-white hover:shadow-md'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{isAdded ? t.added : t.add_to_cart}</span>
                      </button>
                    </div>

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
