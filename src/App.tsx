import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import FeaturedProducts from './components/FeaturedProducts';
import Storytelling from './components/Storytelling';
import StorytellingGallery from './components/StorytellingGallery';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import InstagramReels from './components/InstagramReels';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import FAQSection from './components/FAQSection';
import Chatbot from './components/Chatbot';
import Policies from './components/Policies';
import GiftBoxBuilder from './components/GiftBoxBuilder';
import FarmMapTracker from './components/FarmMapTracker';
import TraceMyBatch from './components/TraceMyBatch';
import OrderStatusTracker from './components/OrderStatusTracker';
import RitualsAndTraditions from './components/RitualsAndTraditions';
import TraditionalRecipes from './components/TraditionalRecipes';

import { Product, CartItem, Language } from './types';
import { PRODUCTS, TRANSLATIONS } from './data';
import { Compass, Award, Mail, Phone, MapPin, Instagram, Check, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState<'home' | 'about' | 'contact' | 'faqs' | 'checkout' | 'shipping' | 'privacy' | 'refund' | 'terms'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const t = TRANSLATIONS[language];

  // Load from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('maati_cart');
    const savedWish = localStorage.getItem('maati_wishlist');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
    if (savedWish) {
      try {
        setWishlist(JSON.parse(savedWish));
      } catch (e) {
        console.error("Error loading wishlist", e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('maati_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('maati_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart operations
  const handleAddToCart = (product: Product, qtyToAdd: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }
      return [...prevCart, { product, quantity: qtyToAdd }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, nextQty: number) => {
    if (nextQty < 1) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: nextQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prevWish) => {
      const exists = prevWish.some((item) => item.id === product.id);
      if (exists) {
        return prevWish.filter((item) => item.id !== product.id);
      }
      return [...prevWish, product];
    });
  };

  const handleProductDetailClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSuccess(false);
    }, 4000);
  };

  return (
    <div id="root-theme" className="min-h-screen bg-[#FAF6EE] text-[#3F2E1E] selection:bg-[#B45309] selection:text-white flex flex-col justify-between font-sans">
      
      {/* Sticky Header Navigation bar */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        wishlist={wishlist}
        setIsWishlistOpen={setIsWishlistOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v);
          setSelectedProduct(null);
          // scroll to top on navigate
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onProductClick={handleProductDetailClick}
        products={PRODUCTS}
      />

      {/* Main Core Views Section */}
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          {selectedProduct ? (
            <motion.div
              key={`product-${selectedProduct.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ProductDetail
                product={selectedProduct}
                language={language}
                onBack={() => setSelectedProduct(null)}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductDetailClick}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />
            </motion.div>
          ) : activeView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {/* 1. Hero banner */}
              <Hero
                language={language}
                onExploreClick={() => {
                  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onOrderClick={() => {
                  document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* 2. Trust indicator bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 50, damping: 12 }}
              >
                <TrustBar language={language} />
              </motion.div>

              {/* 3. Featured snack card grid */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <FeaturedProducts
                  language={language}
                  onAddToCart={handleAddToCart}
                  onProductClick={handleProductDetailClick}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                />
              </motion.div>

              {/* 3b. Interactive Custom Festival Gift Box builder */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <GiftBoxBuilder
                  language={language}
                  onAddToCart={handleAddToCart}
                  openCart={() => setIsCartOpen(true)}
                />
              </motion.div>

              {/* 3c. Traditional Heritage Recipes Cooking Guides Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <TraditionalRecipes
                  language={language}
                  onAddToCart={handleAddToCart}
                  openCart={() => setIsCartOpen(true)}
                />
              </motion.div>

              {/* 4. Split-layout story section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <Storytelling language={language} />
              </motion.div>

              {/* 4b. Dynamic Storytelling Gallery with motion scroll reveals */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <StorytellingGallery language={language} />
              </motion.div>

              {/* 4c. Interactive India sourcing and logistics map tracker */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <FarmMapTracker language={language} />
              </motion.div>

              {/* 5. Why chooses us bento promise list */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <WhyChooseUs language={language} />
              </motion.div>

              {/* 5b. Transparent batch tracer lookups and digital authenticity tag generator */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <TraceMyBatch language={language} />
              </motion.div>

              {/* 5c. Interactive order tracking journey tracker */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <OrderStatusTracker language={language} />
              </motion.div>

              {/* 6. Customer reviews slider */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <Reviews language={language} />
              </motion.div>

              {/* 7. Instagram Reels mockup flow */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <InstagramReels language={language} />
              </motion.div>

              {/* 7b. Auspicious rituals guide and calendar integration triggers */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <RitualsAndTraditions language={language} />
              </motion.div>

              {/* 8. Collapsible FAQ Accordions */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", stiffness: 45, damping: 14 }}
              >
                <FAQSection language={language} />
              </motion.div>

            </motion.div>
          ) : activeView === 'about' ? (
            <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <AboutPage language={language} />
            </motion.div>
          ) : activeView === 'contact' ? (
            <motion.div key="contact" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <ContactPage language={language} />
            </motion.div>
          ) : activeView === 'faqs' ? (
            <motion.div key="faqs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <FAQSection language={language} />
            </motion.div>
          ) : activeView === 'checkout' ? (
            <motion.div key="checkout" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <Checkout
                language={language}
                cart={cart}
                onBack={() => setActiveView('home')}
                onClearCart={handleClearCart}
              />
            </motion.div>
          ) : (
            <motion.div key="policy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Policies
                policyType={activeView as 'shipping' | 'privacy' | 'refund' | 'terms'}
                onBack={() => setActiveView('home')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating AI Grandma Chatbot (Aesthetic & Highly Interactive!) */}
      <Chatbot language={language} />

      {/* Sliding Slide Cart Drawer overlay panel */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => setActiveView('checkout')}
        language={language}
      />

      {/* Wishlist Sidebar Overlay slide (simple modal helper) */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div id="wishlist-overlay" className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setIsWishlistOpen(false)} className="absolute inset-0 bg-black/50" />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="relative w-screen max-w-sm bg-[#FAF6EE] border-l border-[#EADCC6] h-full shadow-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-[#EADCC6]/80 pb-4">
                  <h3 className="text-lg font-serif font-black text-[#3F2E1E]">💖 {language === 'en' ? 'Maas Wishlist' : 'सहेजाइल व्यंजन'}</h3>
                  <button onClick={() => setIsWishlistOpen(false)} className="p-1 rounded-full hover:bg-[#EADCC6] text-[#3F2E1E] focus:outline-none">🧺 Back</button>
                </div>

                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                  {wishlist.length === 0 ? (
                    <p className="text-xs text-center py-12 text-[#857252] font-semibold">{language === 'en' ? 'Show love to grandma’s Nimki and Thekua by tapping the heart icon.' : 'पसंदीदा व्यंजनों को यहाँ सहेजें!'}</p>
                  ) : (
                    wishlist.map((p) => (
                      <div key={p.id} className="flex gap-3 items-center bg-white p-2.5 rounded-xl border border-[#EADCC6]/30">
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                        <div className="flex-1">
                          <h4 className="text-xs font-serif font-bold text-[#3F2E1E] line-clamp-1">{p.name}</h4>
                          <span className="font-mono text-xs font-bold text-[#B45309]">₹{p.price}</span>
                        </div>
                        <button
                          onClick={() => {
                            handleAddToCart(p, 1);
                            handleToggleWishlist(p); // remove from wish
                          }}
                          className="bg-[#B45309] text-white text-[10px] font-bold px-2 py-1 rounded-lg cursor-pointer focus:outline-none"
                        >
                          + Add
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <button onClick={() => setIsWishlistOpen(false)} className="w-full py-3 bg-[#3F2E1E] text-[#FAF6EE] text-xs uppercase font-extrabold rounded-lg hover:bg-neutral-800 transition-colors">Continue browsing treats</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modern Premium Footer */}
      <footer id="brand-footer" className="bg-[#3F2E1E] text-[#FAF6EE] border-t border-[#EADCC6]/15 relative z-20 pt-16 pb-8">
        {/* Wave pattern divider */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-repeat-x" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"5\" viewBox=\"0 0 20 5\"><path d=\"M0,5 L10,0 L20,5 Z\" fill=\"%233F2E1E\"/></svg>')" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 items-start border-b border-[#FAF6EE]/10 pb-12">
          
          {/* Brand block summary */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#B45309] flex items-center justify-center text-white border-2 border-[#EADCC6]">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xl font-serif font-black text-[#FAF6EE] leading-none">
                  {t.brand_name} Traditional
                </span>
                <span className="block text-[10px] text-amber-200/60 font-sans tracking-widest uppercase">
                  {t.tagline}
                </span>
              </div>
            </div>
            
            <p className="text-xs text-amber-100/70 font-sans leading-relaxed max-w-sm">
              We started Maati to reclaim the forgotten standard of pure whole-wheat Indian snacks. Kneaded with cows Desi Ghee Moyen, sweet organic sugarcane jaggery, cardboard-free and nitrogen-flushed packages. Preserving local legacy with pride.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#FAF6EE]/10 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-orange-500 hover:text-white flex items-center justify-center text-[#EADCC6] transition-all" title="Instagram Profile">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/918210612345" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#FAF6EE]/10 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-[#EADCC6] transition-all" title="WhatsApp Business">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links flow maps */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-xs font-serif font-black uppercase text-amber-400 tracking-wider">Taste Navigation</h4>
            <div className="flex flex-col space-y-2 text-xs text-amber-200/70">
              <button onClick={() => { setActiveView('home'); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="text-left hover:text-white transition-colors cursor-pointer">Kitchen Home</button>
              <button onClick={() => { setActiveView('home'); setSelectedProduct(null); setTimeout(() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-left hover:text-white transition-colors cursor-pointer">Our Delights</button>
              <button onClick={() => { setActiveView('about'); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="text-left hover:text-white transition-colors cursor-pointer">Founders Story</button>
              <button onClick={() => { setActiveView('contact'); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="text-left hover:text-white transition-colors cursor-pointer">Kitchen Support</button>
            </div>
          </div>

          {/* Policy Links */}
          <div className="md:col-span-2 space-y-3.5">
            <h4 className="text-xs font-serif font-black uppercase text-amber-400 tracking-wider">Ethics & Policies</h4>
            <div className="flex flex-col space-y-2 text-xs text-amber-200/70 font-sans">
              <button onClick={() => { setActiveView('shipping'); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="text-left hover:text-white transition-colors cursor-pointer">Shipping & Sealed Care</button>
              <button onClick={() => { setActiveView('refund'); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="text-left hover:text-white transition-colors cursor-pointer">Refund Guarantee</button>
              <button onClick={() => { setActiveView('terms'); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="text-left hover:text-white transition-colors cursor-pointer">Baking Terms & Conditions</button>
              <button onClick={() => { setActiveView('privacy'); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="text-left hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
            </div>
          </div>

          {/* Newsletter subscription block */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-serif font-black uppercase text-amber-400 tracking-wider">Subscribe at Grandma’s Hearth</h4>
            <p className="text-xs text-amber-100/70 leading-relaxed font-sans">
              Sign up with your electronic mail below to receives 15% discount on your first order & notification regarding seasonal festival batches.
            </p>

            {!newsletterSuccess ? (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="enter.email@gmail.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/10 text-white placeholder-zinc-400 border border-white/20 rounded-xl px-3 py-2 text-xs w-full focus:outline-none focus:border-amber-400"
                />
                <button type="submit" className="bg-[#B45309] hover:bg-neutral-800 text-white font-bold text-xs px-3 py-2 rounded-xl border border-transparent shadow transition-colors cursor-pointer">Subscribe</button>
              </form>
            ) : (
              <p className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Successfully subscribed with love! Enjoy 15% off coupon via email.
              </p>
            )}
          </div>

        </div>

        {/* FSSAI Registration badge and license verification details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A39281] font-mono gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-500" />
            <span>FSSAI Registered Manufacturer No. <strong>10023021008742</strong></span>
          </div>
          <p className="text-center sm:text-right font-sans">
            © 2026 Maati Snacks & Traditional Confectionaries Co. Hand-pressed with Love.
          </p>
        </div>

      </footer>

    </div>
  );
}
