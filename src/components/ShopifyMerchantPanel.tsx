import React, { useState } from 'react';
import { useShopify } from '../context/ShopifyContext';
import { 
  Settings, ShoppingBag, Truck, BarChart3, Plus, X, 
  RotateCcw, Sliders, Check, AlertCircle, TrendingUp, Users, DollarSign, ArrowRight, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

export default function ShopifyMerchantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'products' | 'orders' | 'analytics'>('analytics');
  
  const { 
    products, orders, settings, visitorsCount, 
    updateSettings, addNewProduct, updateProduct, deleteProduct, 
    updateOrderStatus, cancelOrder, resetCatalog 
  } = useShopify();

  // Form State for Adding Product
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(199);
  const [newProdCategory, setNewProdCategory] = useState<'thekua' | 'nimki'>('thekua');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdUnit, setNewProdUnit] = useState('Pack of 350g');
  const [newProdImgUrl, setNewProdImgUrl] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formMsg, setFormMsg] = useState('');

  // Pre-configured premium snack images from Unsplash to easily let users add gorgeous culinary entries
  const IMAGE_PRESETS = [
    { url: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80', label: 'Premium Crispy' },
    { url: 'https://images.unsplash.com/photo-1548365316-160adfec83d5?auto=format&fit=crop&w=600&q=80', label: 'Spiced Bites' },
    { url: 'https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&w=600&q=80', label: 'Gur Wheat Cooking' },
    { url: 'https://images.unsplash.com/photo-1601050690597-df056fb49785?auto=format&fit=crop&w=600&q=80', label: 'Traditional Samosa/Mathri' },
    { url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80', label: 'Fried Nibbles' }
  ];

  // Calculations for Admin Analytics
  const currencySymbol = settings.currency === 'USD' ? '$' : settings.currency === 'EUR' ? '€' : '₹';
  const exchangeRate = settings.currency === 'USD' ? 0.012 : settings.currency === 'EUR' ? 0.011 : 1;

  const grossSalesINR = orders.reduce((sum, order) => sum + order.total, 0);
  const grossSalesLocalized = Math.round(grossSalesINR * exchangeRate);
  
  const totalOrdersCount = orders.length;
  const conversionRate = visitorsCount > 0 ? ((totalOrdersCount / visitorsCount) * 100).toFixed(2) : '0.00';
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(grossSalesLocalized / totalOrdersCount) : 0;

  // Track product popularity
  const productSells: Record<string, number> = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      productSells[item.product.name] = (productSells[item.product.name] || 0) + item.quantity;
    });
  });

  const topSellers = Object.entries(productSells)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdDesc.trim()) {
      setFormMsg('❌ Please fill out Name & Description!');
      return;
    }

    const selectedImg = newProdImgUrl || IMAGE_PRESETS[0].url;

    addNewProduct({
      name: newProdName,
      translationKey: 'custom_product',
      category: newProdCategory,
      description: newProdDesc,
      story: 'Kneaded and baked specially on live customer request with our traditional family recipes.',
      price: newProdPrice,
      rating: 4.8,
      reviewCount: 34,
      unit: newProdUnit,
      images: [selectedImg],
      ingredients: ['Premium wheat flour', 'Water', 'Unrefined Sugar', 'Pure oils'],
      shelfLife: '45 Days',
      nutrition: {
        calories: 410,
        protein: '5.2g',
        carbs: '65.0g',
        fat: '14.0g'
      },
      badges: ['Newly Added', 'Freshly Prepared', 'Artisanal Batch'],
      inStock: true
    });

    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice(199);
    setShowAddForm(false);
    setFormMsg('✓ Product successfully added to Shopify Store!');
    setTimeout(() => setFormMsg(''), 4000);
  };

  return (
    <>
      {/* Floating Shopify Logo & Trigger button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          id="shopify-admin-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#5c6ac4] hover:bg-[#4957b8] text-white px-4 py-3 rounded-full shadow-2xl font-semibold border-2 border-white/25 transition-all hover:scale-105 active:scale-95 focus:outline-none cursor-pointer group"
          title="Open Shopify Merchant Console"
        >
          <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center font-bold text-emerald-600 text-xs shadow-inner uppercase font-mono group-hover:rotate-12 transition-transform">
            S
          </div>
          <span className="text-xs uppercase tracking-wider font-bold">Shopify Panel</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="shopify-admin-modal"
            initial={{ opacity: 0, y: 151, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 151, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 210 }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-full max-w-[480px] bg-white rounded-3xl shadow-3xl border border-[#cbd5e1] overflow-hidden flex flex-col h-[600px] max-h-[85vh] font-sans"
          >
            {/* Shopify Color Header */}
            <div className="bg-[#2c2d30] text-gray-100 px-5 py-4 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#95BF47] flex items-center justify-center text-slate-900 font-extrabold text-sm shadow">
                  🛍️
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight text-white flex items-center gap-1.5">
                    Maati D2C Shopify Admin
                    <span className="text-[10px] bg-[#95BF47] text-slate-900 px-1.5 py-0.5 rounded font-bold uppercase">LIVE</span>
                  </h3>
                  <p className="text-[11px] text-gray-400">Configure catalog, manage orders & live stats</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick stats ribbon */}
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between text-xs font-medium text-gray-600">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                Live Visitors: <strong className="text-gray-900 font-bold">{visitorsCount}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                Gross Sales: <strong className="text-[#059669] font-bold">{currencySymbol}{grossSalesLocalized}</strong>
              </span>
            </div>

            {/* Content Switcher Tabs */}
            <div className="grid grid-cols-4 bg-slate-50 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-3 text-xs font-bold border-b-2 flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'analytics' 
                    ? 'border-[#5c6ac4] text-[#5c6ac4] bg-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`py-3 text-xs font-bold border-b-2 flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'products' 
                    ? 'border-[#5c6ac4] text-[#5c6ac4] bg-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Stock ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3 text-xs font-bold border-b-2 flex flex-col items-center gap-1 transition-all relative ${
                  activeTab === 'orders' 
                    ? 'border-[#5c6ac4] text-[#5c6ac4] bg-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Orders</span>
                {orders.filter(o => o.status === 'ordered' || o.status === 'preparing').length > 0 && (
                  <span className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 text-xs font-bold border-b-2 flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'settings' 
                    ? 'border-[#5c6ac4] text-[#5c6ac4] bg-white' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Editor</span>
              </button>
            </div>

            {/* Tab Contents Panels */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#FAF9F6]">
              {formMsg && (
                <div className="mb-3 px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  {formMsg}
                </div>
              )}

              {/* TAB 1: ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-4">
                  {/* KPI Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
                      <p className="text-[10px] uppercase font-bold text-gray-500">Conversion Rate</p>
                      <h4 className="text-xl font-bold text-slate-800 font-mono mt-1 flex items-baseline gap-1">
                        {conversionRate}%
                        <span className="text-[9px] text-[#059669] font-sans font-medium flex items-center">
                          <TrendingUp className="w-2.5 h-2.5" /> High
                        </span>
                      </h4>
                      <p className="text-[10px] text-gray-400">Total checkouts over visitors</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
                      <p className="text-[10px] uppercase font-bold text-gray-500">Avg Order Value</p>
                      <h4 className="text-xl font-bold text-slate-800 font-mono mt-1">
                        {currencySymbol}{averageOrderValue}
                      </h4>
                      <p className="text-[10px] text-gray-400">Basket size average</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
                      <p className="text-[10px] uppercase font-bold text-gray-500">Total Receipts</p>
                      <h4 className="text-xl font-bold text-slate-800 font-mono mt-1">
                        {totalOrdersCount}
                      </h4>
                      <p className="text-[10px] text-gray-400">Simulated orders in logs</p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
                      <p className="text-[10px] uppercase font-bold text-gray-500">Free Ship Sales</p>
                      <h4 className="text-xl font-bold text-slate-800 font-mono mt-1">
                        {orders.filter(o => o.total >= settings.freeShippingThreshold).length}
                      </h4>
                      <p className="text-[10px] text-gray-400">Subtotal above {currencySymbol}{Math.round(settings.freeShippingThreshold * exchangeRate)}</p>
                    </div>
                  </div>

                  {/* Leaderboard popularity */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                    <h4 className="text-xs uppercase font-extrabold tracking-wide text-gray-700 mb-3 flex items-center gap-1">
                      👑 Product Leaderboard (Orders Counts)
                    </h4>
                    {topSellers.length === 0 ? (
                      <p className="text-center text-xs text-gray-400 py-4">No active orders logged yet. Place a checkout order to see stats update!</p>
                    ) : (
                      <div className="space-y-2.5">
                        {topSellers.map(([name, qty]) => (
                          <div key={name} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-gray-700 truncate max-w-[280px]">{name}</span>
                              <span className="text-[#3b82f6] font-mono">{qty} sold</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-blue-500 h-full rounded-full" 
                                style={{ width: `${Math.min(100, (qty / orders.reduce((s, o) => s + o.items.reduce((sc, i) => sc + i.quantity, 0), 0)) * 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-[11px] text-blue-800 flex gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
                    <p>Place manual baking checkouts in the main store view to instantly register real-time customer purchases, trigger state changes, and grow sales graph!</p>
                  </div>
                </div>
              )}

              {/* TAB 2: STOCK / PRODUCTS MANAGER */}
              {activeTab === 'products' && (
                <div className="space-y-4">
                  {/* Plus Trigger Button */}
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-200">
                    <div className="text-xs font-medium text-slate-700">Add custom dishes, rates, recipes</div>
                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="px-3 py-1.5 bg-[#5c6ac4] hover:bg-[#4957b8] text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      {showAddForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      {showAddForm ? 'Cancel' : 'Add Product'}
                    </button>
                  </div>

                  {/* Add Product Form */}
                  {showAddForm && (
                    <form onSubmit={handleCreateProductSubmit} className="bg-white p-4 rounded-xl border border-gray-200 shadow-md space-y-3">
                      <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">New Product Details</h4>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-500 block">Name</label>
                        <input
                          type="text"
                          required
                          value={newProdName}
                          onChange={e => setNewProdName(e.target.value)}
                          placeholder="e.g. Saffron Kesar Malpua"
                          className="w-full text-xs px-2.5 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 text-gray-800"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-gray-500 block">Category</label>
                          <select
                            value={newProdCategory}
                            onChange={e => setNewProdCategory(e.target.value as any)}
                            className="w-full text-xs px-2 py-1.5 border border-gray-300 rounded text-gray-800"
                          >
                            <option value="thekua">Thekua (Sweet)</option>
                            <option value="nimki">Nimki (Savory)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-gray-500 block">Price (₹)</label>
                          <input
                            type="number"
                            required
                            min="10"
                            value={newProdPrice}
                            onChange={e => setNewProdPrice(parseInt(e.target.value) || 0)}
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-300 rounded text-gray-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-gray-500 block">Serving Unit</label>
                          <input
                            type="text"
                            required
                            value={newProdUnit}
                            onChange={e => setNewProdUnit(e.target.value)}
                            placeholder="Pack of 250g"
                            className="w-full text-xs px-2.5 py-1.5 border border-gray-300 rounded text-gray-800"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-gray-500 block">Or select Preset Image</label>
                          <select
                            value={newProdImgUrl}
                            onChange={e => setNewProdImgUrl(e.target.value)}
                            className="w-full text-xs px-2 py-1.5 border border-gray-300 rounded text-gray-800"
                          >
                            <option value="">Select image...</option>
                            {IMAGE_PRESETS.map(img => (
                              <option key={img.url} value={img.url}>{img.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-500 block">Description</label>
                        <textarea
                          required
                          value={newProdDesc}
                          onChange={e => setNewProdDesc(e.target.value)}
                          placeholder="What is the culinary story of this premium recipe?"
                          className="w-full text-xs p-2 border border-gray-300 rounded h-16 text-gray-800"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold font-sans flex items-center justify-center gap-1 uppercase tracking-wide"
                      >
                        <Plus className="w-4 h-4" /> Add Product to Catalog
                      </button>
                    </form>
                  )}

                  {/* Product List with Stock and Price Editor */}
                  <div className="space-y-2">
                    {products.map(prod => (
                      <div key={prod.id} className="bg-white p-3 rounded-xl border border-gray-200 flex justify-between gap-3 text-slate-800">
                        <div className="flex gap-2.5 overflow-hidden">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-12 h-12 rounded object-cover shadow-xs shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h5 className="text-xs font-bold text-slate-800 truncate" title={prod.name}>
                              {prod.name}
                            </h5>
                            <span className="text-[10px] uppercase text-gray-400 block tracking-wider">
                              {prod.category} • {prod.unit}
                            </span>
                            
                            {/* In-stock Out-of-Stock toggle */}
                            <button
                              type="button"
                              onClick={() => updateProduct(prod.id, { inStock: prod.inStock === false ? true : false })}
                              className={`mt-1.5 px-2 py-0.5 rounded text-[9px] font-bold ${
                                prod.inStock !== false 
                                  ? 'bg-[#E6F4EA] text-[#137333] hover:bg-[#D2EBD8]' 
                                  : 'bg-[#FCE8E6] text-[#C5221F] hover:bg-[#FAD2CF]'
                              }`}
                            >
                              {prod.inStock !== false ? '● In Stock' : '● Sold Out'}
                            </button>
                          </div>
                        </div>

                        {/* Price adjusters */}
                        <div className="flex flex-col items-end gap-1 shrink-0 justify-center">
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">Edit Price (INR)</span>
                          <div className="flex items-center border border-gray-300 rounded bg-gray-50">
                            <button
                              type="button"
                              onClick={() => updateProduct(prod.id, { price: Math.max(10, prod.price - 10) })}
                              className="px-2 py-0.5 text-xs font-black text-gray-600 hover:bg-gray-200 rounded-l"
                            >
                              -
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-semibold font-mono text-gray-900 bg-white">
                              ₹{prod.price}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateProduct(prod.id, { price: prod.price + 10 })}
                              className="px-2 py-0.5 text-xs font-black text-gray-600 hover:bg-gray-200 rounded-r"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: LIVE ORDERS MANAGER */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    📦 Live Incoming Pipeline ({orders.length} orders)
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-white p-6 rounded-xl border border-gray-200 text-center text-xs text-gray-400">
                      No customer orders have been simulated yet! Create and submit an order mock from checkout for it to instantly appear here.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map(order => {
                        const orderLocalizedPrice = Math.round(order.total * exchangeRate);
                        return (
                          <div key={order.id} className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 text-slate-800 shadow-sm">
                            <div className="flex justify-between items-center text-xs font-bold border-b border-gray-100 pb-2">
                              <span className="text-[#3b82f6] font-mono">{order.id}</span>
                              <span className="text-gray-400 font-normal">{order.date}</span>
                            </div>

                            {/* Customer direct block */}
                            <div className="text-xs text-gray-600 space-y-0.5">
                              <p><strong>Customer:</strong> {order.customerDetails.name} (+91 {order.customerDetails.phone})</p>
                              <p className="truncate"><strong>Ship Address:</strong> {order.customerDetails.address}, {order.customerDetails.city} - {order.customerDetails.pincode}</p>
                              <p><strong>Total Paid:</strong> <span className="font-mono font-bold text-[#059669]">{currencySymbol}{orderLocalizedPrice}</span> ({order.paymentMethod})</p>
                            </div>

                            {/* Items purchased */}
                            <div className="p-2.5 bg-slate-50 rounded-lg text-xs border border-gray-100 flex flex-col gap-1">
                              <strong>Cart Items:</strong>
                              {order.items.map(item => (
                                <div key={item.product.id} className="flex justify-between text-xs text-slate-700">
                                  <span className="truncate max-w-[240px]">• {item.product.name}</span>
                                  <span className="font-mono">x{item.quantity}</span>
                                </div>
                              ))}
                            </div>

                            {/* Status and Action Buttons */}
                            <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg gap-2">
                              <div>
                                <span className="text-[10px] text-gray-400 uppercase font-bold block">Fulfillment</span>
                                <span className={`text-[10px] font-bold uppercase rounded px-1.5 py-0.5 ${
                                  order.status === 'delivered' 
                                    ? 'bg-emerald-100 text-emerald-800' 
                                    : order.status === 'shipped'
                                    ? 'bg-blue-100 text-blue-800'
                                    : order.status === 'preparing'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-indigo-100 text-indigo-800'
                                }`}>
                                  {order.status}
                                </span>
                              </div>

                              {/* Action items */}
                              <div className="flex gap-1.5">
                                {order.status === 'ordered' && (
                                  <button
                                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-[10px] font-bold uppercase"
                                  >
                                    Bake / Prepare
                                  </button>
                                )}
                                {order.status === 'preparing' && (
                                  <button
                                    onClick={() => updateOrderStatus(order.id, 'shipped')}
                                    className="px-2.5 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-[10px] font-bold uppercase"
                                  >
                                    Ship Package
                                  </button>
                                )}
                                {order.status === 'shipped' && (
                                  <button
                                    onClick={() => updateOrderStatus(order.id, 'delivered')}
                                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold uppercase"
                                  >
                                    Mark Delivered
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => cancelOrder(order.id)}
                                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-[10px] font-bold uppercase"
                                  title="Cancel/Delete Order"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: EDITOR SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">Configure Stores Front</h4>
                  
                  {/* Announcement Bar Customizer */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 text-slate-800">
                    <label className="text-[10px] uppercase font-bold text-gray-500 block">Announcement bar marquee text</label>
                    <textarea
                      value={settings.announcementText}
                      onChange={e => updateSettings({ announcementText: e.target.value })}
                      className="w-full text-xs p-2 border border-blue-100 rounded focus:border-[#5c6ac4] text-slate-800"
                    />
                  </div>

                  {/* Currency switcher Customizer */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3 text-slate-800">
                    <label className="text-[10px] uppercase font-bold text-gray-500 block">Global Store Currency Rate</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['INR', 'USD', 'EUR'] as const).map(curr => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => updateSettings({ currency: curr })}
                          className={`py-1.5 border rounded text-xs font-bold ${
                            settings.currency === curr 
                              ? 'border-[#5c6ac4] bg-indigo-50 text-[#5c6ac4]' 
                              : 'border-gray-200 hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          {curr} ({curr === 'INR' ? '₹' : curr === 'USD' ? '$' : '€'})
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400">Merchant prices and delivery rates adjust automatically on exchange rate!</p>
                  </div>

                  {/* Toggle limits */}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3.5 text-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Dynamic Delivery Slider Progress</span>
                        <span className="text-[10px] text-gray-400 block">Encourage visitors to add more items</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.enableProgressBar}
                        onChange={e => updateSettings({ enableProgressBar: e.target.checked })}
                        className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Apply Shopify Tax Rate</span>
                        <span className="text-[10px] text-gray-400 block">Configure checkout GST tax (0-18%)</span>
                      </div>
                      <select
                        value={settings.taxRate}
                        onChange={e => updateSettings({ taxRate: parseInt(e.target.value) || 0 })}
                        className="text-xs px-2 py-1 border border-gray-300 rounded text-gray-800"
                      >
                        <option value="0">0% (Tax Exempt)</option>
                        <option value="5">5% (Sna-GST)</option>
                        <option value="12">12% (Medium)</option>
                        <option value="18">18% (Luxury Tax)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Shipping Flat Fee</span>
                        <span className="text-[10px] text-gray-400 block">Standard courier base rate</span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={settings.shippingFee}
                        onChange={e => updateSettings({ shippingFee: parseInt(e.target.value) || 0 })}
                        className="text-xs px-2 py-1 border border-gray-300 rounded text-gray-800 w-20 text-right"
                      />
                    </div>
                  </div>

                  {/* Reset store */}
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
                    <h5 className="text-xs font-bold text-rose-800 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      ⚠️ Disaster Recovery
                    </h5>
                    <p className="text-[11px] text-rose-800 mb-3">Revert all stock products and prices back to default traditional settings.</p>
                    <button
                      type="button"
                      onClick={() => {
                        resetCatalog();
                        setFormMsg('✓ Catalog successfully reset!');
                        setTimeout(() => setFormMsg(''), 3000);
                      }}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-bold uppercase transition-colors"
                    >
                      Reset Defaults
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shopify Brand footer inside console */}
            <div className="p-3 bg-[#e3e4e6] border-t border-gray-300 flex justify-between items-center text-[10px] text-gray-500 font-medium">
              <span>Maati Marketplace Console</span>
              <span className="flex items-center gap-1">
                Powered by <strong className="text-emerald-700 font-extrabold flex items-center">Shopify <Package className="w-3 h-3 ml-0.5" /></strong>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
