import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Heart, Search, Globe, ChevronDown, Compass, Award } from 'lucide-react';
import { Language, CartItem, Product } from '../types';
import { TRANSLATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  wishlist: Product[];
  setIsWishlistOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeView: string;
  setActiveView: (view: any) => void;
  onProductClick: (product: Product) => void;
  products: Product[];
}

export default function Navbar({
  language,
  setLanguage,
  cart,
  setIsCartOpen,
  wishlist,
  setIsWishlistOpen,
  searchQuery,
  setSearchQuery,
  activeView,
  setActiveView,
  onProductClick,
  products
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const t = TRANSLATIONS[language];
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filtered search results for quick-select
  const filteredSearchProducts = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const menuItems = [
    { id: 'home', label: language === 'en' ? 'Kitchen Home' : language === 'hi' ? 'मुख्य द्वार' : 'घर-आँगन' },
    { id: 'products', label: language === 'en' ? 'Our Delights' : language === 'hi' ? 'हमारे स्नैक्स' : 'हमार पकवान' },
    { id: 'story', label: language === 'en' ? 'Our Roots' : language === 'hi' ? 'हमारी कहानी' : 'हमार कथा' },
    { id: 'about', label: language === 'en' ? 'Founder Story' : language === 'hi' ? 'दादी माँ की बात' : 'दादी माई के कहना' },
    { id: 'contact', label: language === 'en' ? 'Kitchen Support' : language === 'hi' ? 'संपर्क करें' : 'नेह-नेवता' }
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-[#FBF9F4]/90 backdrop-blur-md border-b border-[#EADCC6] shadow-sm">
      {/* Festival Banner Overlay */}
      <div className="bg-gradient-to-r from-[#D97706] to-[#B45309] text-[#FBF9F4] text-center py-2 px-4 text-xs font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="animate-pulse">✨</span>
        <span>
          {language === 'en' 
            ? '🔥 Special Offer: Use code MAATI50 to get ₹50 Off on orders above ₹499! FREE Delivery PAN India 📦'
            : language === 'hi'
            ? '🔥 स्पेशल ऑफर: ₹४९९ से ऊपर के आर्डर पर ₹५० की छूट, कूपन MAATI50 लगाएं! फ्री सुरक्षित डिलीवरी 📦'
            : '🔥 खास नेवता: ₹४९९ के आर्डर पर ₹५० छूट बदे MAATI50 कूपन लगाइब! मुफ़्त होम डिलीवरी 📦'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo and Name */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveView('home')} 
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-[#B45309] flex items-center justify-center text-amber-50 border-2 border-[#EADCC6] group-hover:scale-105 transition-transform">
                <Compass className="w-7 h-7" />
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#3F2E1E] leading-tight flex items-center gap-1.5">
                  {t.brand_name}
                  <span className="text-xs bg-[#B45309] text-white px-1.5 py-0.5 rounded font-sans tracking-widest uppercase scale-90">D2C</span>
                </span>
                <span className="block text-[10px] sm:text-xs font-sans tracking-wide text-[#857252] font-medium">
                  {t.tagline}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'products') {
                    setActiveView('home');
                    setTimeout(() => {
                      const el = document.getElementById('products-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else if (item.id === 'story') {
                    setActiveView('home');
                    setTimeout(() => {
                      const el = document.getElementById('storytelling-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    setActiveView(item.id);
                  }
                }}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  activeView === item.id 
                    ? 'text-[#B45309] border-b-2 border-[#B45309] pb-1' 
                    : 'text-[#3F2E1E] hover:text-[#B45309] pb-1'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Controls (Search, Wishlist, Language, Cart, Profile) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Search Toggle */}
            <div className="relative">
              <div className={`flex items-center bg-[#F1EAD9] rounded-full border border-[#DED0B6] transition-all duration-300 ${isSearchActive ? 'w-48 sm:w-64 px-3 py-1.5' : 'w-10 h-10 justify-center'}`}>
                {isSearchActive ? (
                  <>
                    <Search className="w-4 h-4 text-[#3F2E1E] shrink-0" />
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'Search Jaggery, Ghee...' : 'सामग्री या स्वाद खोजें...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="ml-2 w-full bg-transparent border-none text-xs text-[#3F2E1E] focus:outline-none"
                    />
                    <button onClick={() => { setSearchQuery(''); setIsSearchActive(false); }} className="text-[#857252] hover:text-black focus:outline-none">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsSearchActive(true)} className="flex items-center justify-center focus:outline-none" title="Search">
                    <Search className="w-5 h-5 text-[#3F2E1E]" />
                  </button>
                )}
              </div>

              {/* Instant Search Dropdown */}
              <AnimatePresence>
                {searchQuery && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-lg border border-[#EADCC6] shadow-xl z-50 p-3 max-h-80 overflow-y-auto"
                  >
                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#857252] mb-2 px-1">
                      {language === 'en' ? 'Found Treats' : 'मिले हुए पकवान'} ({filteredSearchProducts.length})
                    </p>
                    {filteredSearchProducts.length === 0 ? (
                      <p className="text-xs text-center text-[#857252] py-4">{language === 'en' ? 'No snacks found matching your ingredients!' : 'खोज परिणाम खाली हैं!'}</p>
                    ) : (
                      <div className="space-y-1">
                        {filteredSearchProducts.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              onProductClick(p);
                              setSearchQuery('');
                              setIsSearchActive(false);
                            }}
                            className="w-full text-left flex items-center gap-2 p-1.5 hover:bg-[#FBF9F4] rounded transition-colors"
                          >
                            <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded object-cover border border-[#EADCC6]" referrerPolicy="no-referrer" />
                            <div>
                              <p className="text-xs font-semibold text-[#3F2E1E] line-clamp-1">{p.name}</p>
                              <p className="text-[10px] text-[#857252] font-mono">₹{p.price} • {p.unit}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#F1EAD9] border border-[#DED0B6] text-xs font-semibold text-[#3F2E1E] hover:bg-[#EADCC6] transition-colors focus:outline-none"
              >
                <Globe className="w-4 h-4 text-[#B45309]" />
                <span className="hidden sm:inline uppercase">{language}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#3F2E1E]" />
              </button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-36 bg-[#FBF9F4] border border-[#EADCC6] rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors hover:bg-[#F1EAD9] ${language === 'en' ? 'text-[#B45309] bg-[#EADCC6]/20 font-bold' : 'text-[#3F2E1E]'}`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange('hi')}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors hover:bg-[#F1EAD9] ${language === 'hi' ? 'text-[#B45309] bg-[#EADCC6]/20 font-bold' : 'text-[#3F2E1E]'}`}
                    >
                      हिन्दी (Hindi)
                    </button>
                    <button
                      onClick={() => handleLanguageChange('bho')}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors hover:bg-[#F1EAD9] ${language === 'bho' ? 'text-[#B45309] bg-[#EADCC6]/20 font-bold' : 'text-[#3F2E1E]'}`}
                    >
                      भोजपुरी (Bhojpuri)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist Link */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative w-10 h-10 rounded-full bg-[#FBF9F4] hover:bg-[#F1EAD9] border border-[#EADCC6] flex items-center justify-center transition-colors focus:outline-none"
              title="View Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : 'text-[#3F2E1E]'}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full font-sans text-[10px] font-extrabold flex items-center justify-center border border-white animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-full bg-[#3F2E1E] hover:bg-[#B45309] text-white flex items-center justify-center transition-all shadow-md focus:outline-none"
              title="Cart Items"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D97706] text-[#FBF9F4] rounded-full font-sans text-[10px] font-extrabold flex items-center justify-center border border-white">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* FSSAI Mark Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 border-l border-[#EADCC6] pl-4 self-center font-mono text-[10px] text-[#857252]">
              <Award className="w-4 h-4 text-[#0F766E]" />
              <span>FSSAI Registered<br/><strong className="text-[#3F2E1E]">10023021008742</strong></span>
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-[#F1EAD9] flex items-center justify-center focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#3F2E1E]" /> : <Menu className="w-5 h-5 text-[#3F2E1E]" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#FBF9F4] border-t border-[#EADCC6]"
          >
            <div className="px-4 py-3 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (item.id === 'products') {
                      setActiveView('home');
                      setTimeout(() => {
                        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 120);
                    } else if (item.id === 'story') {
                      setActiveView('home');
                      setTimeout(() => {
                        document.getElementById('storytelling-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 120);
                    } else {
                      setActiveView(item.id);
                    }
                  }}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                    activeView === item.id 
                      ? 'bg-[#EADCC6] text-[#B45309]' 
                      : 'text-[#3F2E1E] hover:bg-[#F1EAD9]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 pb-2 border-t border-[#EADCC6] flex justify-around items-center text-xs font-semibold text-[#857252]">
                <span className="flex items-center gap-1">🌿 100% Vegetarian</span>
                <span className="flex items-center gap-1">💯 Hygienic Made</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
