import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Sparkles, ShoppingBag, Send } from 'lucide-react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { useShopify } from '../context/ShopifyContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  language: Language;
}

export default function Cart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  language
}: CartProps) {
  const { settings } = useShopify();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoAppliedMsg, setPromoAppliedMsg] = useState('');

  // Maati Loyalty Rewards State
  const [pointsBalance, setPointsBalance] = useState<number>(() => {
    const saved = localStorage.getItem('maati_rewards_points');
    return saved ? parseInt(saved, 10) : 380;
  });
  const [pointsRedeemed, setPointsRedeemed] = useState<number>(0);

  const t = TRANSLATIONS[language];

  // Dynamic currency support
  const currencySymbol = settings.currency === 'USD' ? '$' : settings.currency === 'EUR' ? '€' : '₹';
  const exchangeRate = settings.currency === 'USD' ? 0.012 : settings.currency === 'EUR' ? 0.011 : 1;

  // Raw calculations in base currency (INR)
  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const subtotal = Math.round(rawSubtotal * exchangeRate);

  const isFreeDelivery = rawSubtotal >= settings.freeShippingThreshold;
  const shippingCharge = rawSubtotal > 0 && !isFreeDelivery ? Math.round(settings.shippingFee * exchangeRate) : 0;
  
  // Point values: 1 point = 1 rupee discount
  const maxPossiblePointsToRedeem = Math.min(pointsBalance, rawSubtotal);
  const cappedRedeemedRaw = Math.min(pointsRedeemed, maxPossiblePointsToRedeem);
  const cappedRedeemed = Math.round(cappedRedeemedRaw * exchangeRate);
  
  // Apply Promo
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'MAATI50') {
      if (rawSubtotal < 499) {
        setPromoAppliedMsg(language === 'en' ? `⚠️ Promo is valid only for orders above ${currencySymbol}${Math.round(499 * exchangeRate)}!` : `⚠️ कूपन कोड केवल ${currencySymbol}${Math.round(499 * exchangeRate)} से ऊपर के आर्डर पर मान्य है!`);
        setDiscount(0);
      } else {
        setDiscount(Math.round(50 * exchangeRate));
        setPromoAppliedMsg(language === 'en' ? `✓ Promo "MAATI50" Applied! ${currencySymbol}${Math.round(50 * exchangeRate)} Discounted.` : `✓ कूपन कोड "MAATI50" सफल रहा! ${currencySymbol}${Math.round(50 * exchangeRate)} की छूट मिली।`);
      }
    } else {
      setPromoAppliedMsg(language === 'en' ? '❌ Invalid Promo Code!' : '❌ कूपन कोड अमान्य है!');
      setDiscount(0);
    }
  };

  const total = Math.max(0, subtotal + shippingCharge - discount - cappedRedeemed);
  const earnedPoints = Math.floor(rawSubtotal / 10);

  // Pre-filled WhatsApp checkout message generator
  const triggerWhatsAppOrder = () => {
    if (cart.length === 0) return;

    // Deduct redeemed points and save remaining balance to simulate real state updates
    if (cappedRedeemed > 0) {
      const nextBalance = pointsBalance - cappedRedeemed + earnedPoints;
      localStorage.setItem('maati_rewards_points', String(nextBalance));
      setPointsBalance(nextBalance);
      setPointsRedeemed(0);
    } else {
      const nextBalance = pointsBalance + earnedPoints;
      localStorage.setItem('maati_rewards_points', String(nextBalance));
      setPointsBalance(nextBalance);
    }

    let text = `*🌿 NEW ORDER REQUEST - MAATI SNACKS 🌿*\n`;
    text += `━━━━━━━━━━━━━━━━━\n`;
    text += `Namaste Maati Team, I would like to place an order for custom handcrafted snacks:\n\n`;

    cart.forEach((item, index) => {
      text += `*${index + 1}. ${item.product.name}*\n`;
      text += `   Qty: ${item.quantity} [${item.product.unit}]\n`;
      text += `   Price: ₹${item.product.price} x ${item.quantity} = *₹${item.product.price * item.quantity}*\n\n`;
    });

    text += `━━━━━━━━━━━━━━━━━\n`;
    text += `*Subtotal:* ₹${subtotal}\n`;
    if (discount > 0) {
      text += `*Promo Discount:* -₹${discount} (MAATI50)\n`;
    }
    if (cappedRedeemed > 0) {
      text += `*Loyalty Points Redeemed:* -₹${cappedRedeemed} spent\n`;
    }
    text += `*Loyalty Points Earned:* +${earnedPoints} pts\n`;
    text += `*Delivery Care:* ${isFreeDelivery ? 'FREE Shipping' : `₹${shippingCharge}`}\n`;
    text += `*Estimated Total Amount:* *₹${total}*\n`;
    text += `━━━━━━━━━━━━━━━━━\n`;
    text += `Please send me the dispatch confirmation. Dhanyawad! 🙏`;

    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://api.whatsapp.com/send?phone=918210612345&text=${encodedText}`;
    
    // Open in new tab securely
    window.open(whatsappURL, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 pointer-events-auto"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            {/* Panel drawer slide */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-[#FAF6EE] h-full shadow-2xl flex flex-col justify-between border-l border-[#EADCC6]"
            >
              
              {/* Drawer Header */}
              <div className="px-6 py-5 bg-[#3F2E1E] text-[#FAF6EE] flex items-center justify-between border-b border-[#FAF6EE]/15">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                  <h2 className="text-lg font-serif font-black tracking-wide">
                    {t.cart_heading}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white focus:outline-none"
                  title="Close Cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                
                {/* Free Delivery tracker bar */}
                {cart.length > 0 && (
                  <div className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-between ${isFreeDelivery ? 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20' : 'bg-amber-500/10 text-[#3F2E1E] border-amber-500/20'}`}>
                    <span>
                      {isFreeDelivery 
                        ? '🎉 Guaranteed FREE Express Delivery Unlocked!' 
                        : `🛒 Add ${currencySymbol}${Math.round((settings.freeShippingThreshold - rawSubtotal) * exchangeRate)} more to unlock FREE Home Delivery!`}
                    </span>
                    <span className="font-mono text-[10px] font-bold">Limit: {currencySymbol}{Math.round(settings.freeShippingThreshold * exchangeRate)}</span>
                  </div>
                )}

                {/* Items List */}
                {cart.length === 0 ? (
                  <div className="h-4/5 flex flex-col justify-center items-center text-center space-y-4 px-4">
                    <div className="w-16 h-16 rounded-full bg-[#EADCC6]/50 flex items-center justify-center text-3xl">🧺</div>
                    <p className="text-xs sm:text-sm text-[#857252] font-semibold leading-relaxed">
                      {t.empty_cart}
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-[#B45309] hover:bg-[#853A00] text-white font-bold text-xs rounded-xl uppercase tracking-wider focus:outline-none cursor-pointer"
                    >
                      Browse Sweets & Savory
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 border-b border-[#EADCC6]/40 pb-4">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-start gap-4 p-3 bg-white rounded-xl border border-[#EADCC6]/40 shadow-sm relative group"
                      >
                        {/* Remove item button icon absolute */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="absolute top-2 right-2 p-1 text-[#857252] hover:text-red-500 transition-colors focus:outline-none"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover bg-amber-50 select-none border border-[#EADCC6]/30"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 space-y-1.5 pr-4">
                          <p className="text-xs font-bold text-[#857252] uppercase tracking-wider leading-none">{item.product.category}</p>
                          <h4 className="text-sm font-serif font-black text-[#3F2E1E] leading-tight pr-2">{item.product.name}</h4>
                          
                          <div className="flex text-[10px] font-mono text-[#8F7C5D] leading-none">
                            <span>{currencySymbol}{Math.round(item.product.price * exchangeRate)} / {item.product.unit}</span>
                          </div>

                          {/* Item Quantity editor row */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center border border-[#EADCC6] rounded-lg bg-[#FAF6EE] px-1.5 h-7">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="text-zinc-600 hover:text-black p-0.5 focus:outline-none"
                                title="Less"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs font-bold px-2.5 text-zinc-800">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="text-zinc-600 hover:text-black p-0.5 focus:outline-none"
                                title="More"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Line total */}
                            <span className="font-mono text-xs font-black text-[#B45309]">
                              {currencySymbol}{Math.round(item.product.price * item.quantity * exchangeRate)}
                            </span>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Maati Loyalty Rewards Tracker & Redeeming Widget */}
                {cart.length > 0 && (
                  <div className="space-y-3 p-4 bg-white rounded-2xl border border-[#EADCC6]/40 text-[#3F2E1E] shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-center pb-2 border-b border-[#EADCC6]/40">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">🌟</span>
                        <h4 className="text-xs font-serif font-black uppercase text-[#3F2E1E] tracking-wider">
                          {language === 'en' ? 'Maati Rewards' : language === 'hi' ? 'माटी पुरस्कार' : 'माटी पुरस्कार'}
                        </h4>
                      </div>
                      <span className="font-mono text-xs font-extrabold text-[#B45309] bg-[#FAF6EE] border border-[#EADCC6] px-2.5 py-1 rounded-full">
                        {pointsBalance} Pts
                      </span>
                    </div>

                    <div className="text-[11px] leading-relaxed text-[#857252] font-semibold">
                      {language === 'en' 
                        ? `You have ${pointsBalance} points. Redeem them directly to save instant Rupees! (1 Pt = ₹1)`
                        : `आपके पास ${pointsBalance} पुरस्कार अंक हैं। तत्काल नकद छूट के रूप में भुनाएं! (१ अंक = ₹१)`
                      }
                    </div>

                    {maxPossiblePointsToRedeem > 0 ? (
                      <div className="space-y-3 pt-1">
                        <div className="flex justify-between text-[10px] uppercase font-bold text-[#8F7C5D]">
                          <span>Slide to redeem:</span>
                          <span className="text-[#B45309] font-extrabold">Save ₹{cappedRedeemed}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="0"
                            max={maxPossiblePointsToRedeem}
                            value={pointsRedeemed}
                            onChange={(e) => setPointsRedeemed(parseInt(e.target.value, 10))}
                            className="w-full h-1 bg-[#FAF6EE] rounded-lg appearance-none cursor-pointer accent-[#B45309]"
                          />
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setPointsRedeemed(Math.min(100, maxPossiblePointsToRedeem))}
                            disabled={pointsBalance < 100}
                            className="flex-1 py-1 px-2 text-[9px] font-mono leading-none bg-white border border-[#EADCC6] font-bold text-[#3F2E1E] rounded-md hover:bg-[#B45309]/10 disabled:opacity-40 cursor-pointer"
                          >
                            Redeem 100
                          </button>
                          <button
                            type="button"
                            onClick={() => setPointsRedeemed(Math.min(250, maxPossiblePointsToRedeem))}
                            disabled={pointsBalance < 250}
                            className="flex-1 py-1 px-2 text-[9px] font-mono leading-none bg-white border border-[#EADCC6] font-bold text-[#3F2E1E] rounded-md hover:bg-[#B45309]/10 disabled:opacity-40 cursor-pointer"
                          >
                            Redeem 250
                          </button>
                          {pointsRedeemed > 0 && (
                            <button
                              type="button"
                              onClick={() => setPointsRedeemed(0)}
                              className="py-1 px-2 text-[9px] font-mono leading-none bg-red-50 border border-red-200 text-red-600 font-bold rounded-md hover:bg-red-100 cursor-pointer"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-[10px] italic text-[#857252] font-semibold">
                        Add items to cart to start redeeming points!
                      </div>
                    )}

                    <div className="pt-2 border-t border-dashed border-[#EADCC6]/50 flex items-center justify-between text-[10px] font-mono text-emerald-800 font-bold">
                      <span>🌱 This purchase earns:</span>
                      <span>+{earnedPoints} Pts (value ₹{earnedPoints})</span>
                    </div>
                  </div>
                )}

                {/* Promo Code input panel */}
                {cart.length > 0 && (
                  <div className="space-y-2 p-3 bg-white rounded-xl border border-[#EADCC6]/40">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-[#8F7C5D]">Have grandma's coupon?</p>
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. MAATI50"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-[#FAF6EE] border border-[#EADCC6] rounded-lg px-3 py-1.5 text-xs text-[#3F2E1E] focus:outline-none focus:border-[#B45309] w-full"
                      />
                      <button 
                        type="submit" 
                        className="bg-[#3F2E1E] hover:bg-[#B45309] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer focus:outline-none"
                      >
                        Apply
                      </button>
                    </form>
                    {promoAppliedMsg && (
                      <p className={`text-[10px] font-bold ${promoAppliedMsg.startsWith('✓') ? 'text-emerald-700' : 'text-red-500'}`}>
                        {promoAppliedMsg}
                      </p>
                    )}
                  </div>
                )}

              </div>

              {/* Drawer Footer summary and checkout hooks */}
              {cart.length > 0 && (
                <div className="border-t border-[#EADCC6] bg-white p-6 space-y-4 shadow-inner">
                  
                  {/* Financial lines */}
                  <div className="space-y-2.5 text-xs sm:text-sm font-medium">
                    <div className="flex justify-between text-[#857252]">
                      <span>{t.subtotal}</span>
                      <span className="font-mono">{currencySymbol}{subtotal}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>MAATI50 Discount</span>
                        <span className="font-mono">-{currencySymbol}{discount}</span>
                      </div>
                    )}

                    {cappedRedeemed > 0 && (
                      <div className="flex justify-between text-amber-800 font-bold">
                        <span>🌟 Maati Points Applied</span>
                        <span className="font-mono">-{currencySymbol}{cappedRedeemed}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[#857252]">
                      <span>{t.shipping}</span>
                      <span className="font-mono">{isFreeDelivery ? 'FREE' : `${currencySymbol}${shippingCharge}`}</span>
                    </div>

                    <div className="border-t border-[#EADCC6]/60 pt-2.5 flex justify-between text-[#3F2E1E] text-base font-black">
                      <span>{t.total}</span>
                      <span className="font-mono text-[#B45309]">{currencySymbol}{total}</span>
                    </div>
                  </div>

                  {/* COD availability badge */}
                  <div className="text-[10px] text-center font-bold text-[#0F766E] border border-[#0F766E]/20 bg-[#0F766E]/5 rounded-md py-1">
                    🟢 Cash On Delivery (COD) & UPI payment on delivery available! 
                  </div>

                  {/* Primary Checkout hooks */}
                  <div className="space-y-2">
                    
                    {/* Native checkout form routing view */}
                    <button
                      onClick={() => {
                        onClose();
                        onCheckout();
                      }}
                      className="w-full h-12 bg-[#B45309] hover:bg-[#853A00] text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow hover:shadow-md transition-all cursor-pointer focus:outline-none"
                    >
                      <span>Proceed to dispatch</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* WhatsApp Quick order integration trigger */}
                    <button
                      onClick={triggerWhatsAppOrder}
                      className="w-full h-11 bg-[#0F766E] hover:bg-[#0D5C56] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors focus:outline-none border border-[#0A4D4A]"
                    >
                      <Send className="w-3.5 h-3.5 fill-white stroke-none" />
                      <span>{t.whatsapp_checkout}</span>
                    </button>

                  </div>

                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
