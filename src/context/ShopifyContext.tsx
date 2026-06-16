import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Language } from '../types';
import { PRODUCTS } from '../data';

export interface ShopifyStoreSettings {
  brandColor: string; // Tailwind color class or hex values
  currency: 'INR' | 'USD' | 'EUR';
  announcementText: string;
  enableProgressBar: boolean;
  taxRate: number; // e.g. 5 for 5% GST
  shippingFee: number;
  freeShippingThreshold: number;
}

interface ShopifyContextType {
  products: Product[];
  orders: Order[];
  settings: ShopifyStoreSettings;
  visitorsCount: number;
  updateSettings: (newSettings: Partial<ShopifyStoreSettings>) => void;
  addNewProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (productId: string, updated: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string) => void;
  simulateIncomingVisitor: () => void;
  resetCatalog: () => void;
}

const ShopifyContext = createContext<ShopifyContextType | undefined>(undefined);

export function ShopifyProvider({ children }: { children: React.ReactNode }) {
  // Load products from local storage if available, fallback to hardcoded
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shopify_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  // Load orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('shopify_orders');
    if (saved) return JSON.parse(saved);
    
    // Seed standard initial mock orders for the merchant dashboard
    return [
      {
        id: 'MAATI-481920',
        items: [
          { product: PRODUCTS[0], quantity: 2 },
          { product: PRODUCTS[3], quantity: 1 }
        ],
        customerDetails: {
          name: 'Ashish Gupta',
          phone: '9821061234',
          address: 'Flat 405, Block B, Royal Residency, Boring Road',
          city: 'Patna',
          pincode: '800001'
        },
        paymentMethod: 'COD',
        status: 'delivered',
        total: 527,
        date: '14 Jun 2026'
      },
      {
        id: 'MAATI-204918',
        items: [
          { product: PRODUCTS[1], quantity: 1 }
        ],
        customerDetails: {
          name: 'Ananya Sharma',
          phone: '8910482910',
          address: 'House 14, Sector 7, Gomti Nagar',
          city: 'Lucknow',
          pincode: '226010'
        },
        paymentMethod: 'Online',
        status: 'shipped',
        total: 249,
        date: '15 Jun 2026'
      },
      {
        id: 'MAATI-395810',
        items: [
          { product: PRODUCTS[3], quantity: 3 },
          { product: PRODUCTS[4], quantity: 2 }
        ],
        customerDetails: {
          name: 'Rohan Verma',
          phone: '7730104812',
          address: 'C-72, Green Park Extension',
          city: 'New Delhi',
          pincode: '110016'
        },
        paymentMethod: 'COD',
        status: 'preparing',
        total: 765,
        date: '16 Jun 2026'
      }
    ];
  });

  // Visual Theme settings standard for Shopify customizable blocks
  const [settings, setSettings] = useState<ShopifyStoreSettings>(() => {
    const saved = localStorage.getItem('shopify_settings');
    return saved ? JSON.parse(saved) : {
      brandColor: '#FF6B00', // Maati high-contrast brand premium amber
      currency: 'INR',
      announcementText: '🔥 Shopify Special: Free delivery on order above ₹499! Apply Code SHOPIFY20 for 20% off.',
      enableProgressBar: true,
      taxRate: 5, // 5% GST
      shippingFee: 60,
      freeShippingThreshold: 499
    };
  });

  // Visitor simulator
  const [visitorsCount, setVisitorsCount] = useState<number>(() => {
    return Math.floor(Math.random() * 410) + 230;
  });

  // Save changes to localStorage on modifications
  useEffect(() => {
    localStorage.setItem('shopify_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('shopify_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shopify_settings', JSON.stringify(settings));
  }, [settings]);

  // Periodic simulated visitors log increase to mimic active traffic in Shopify dashboard
  useEffect(() => {
    const timer = setInterval(() => {
      setVisitorsCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const updateSettings = (newSettings: Partial<ShopifyStoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addNewProduct = (productData: Omit<Product, 'id'>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id: newId
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (productId: string, updatedFields: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'ordered' } : o)); // Or a cancel state
    setOrders(prev => prev.filter(o => o.id !== orderId)); // For simplicity in mock admin we can clear/delete order
  };

  const simulateIncomingVisitor = () => {
    setVisitorsCount(prev => prev + 1);
  };

  const resetCatalog = () => {
    setProducts(PRODUCTS);
    localStorage.removeItem('shopify_products');
  };

  return (
    <ShopifyContext.Provider value={{
      products,
      orders,
      settings,
      visitorsCount,
      updateSettings,
      addNewProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrderStatus,
      cancelOrder,
      simulateIncomingVisitor,
      resetCatalog
    }}>
      {children}
    </ShopifyContext.Provider>
  );
}

export function useShopify() {
  const context = useContext(ShopifyContext);
  if (!context) {
    throw new Error('useShopify must be used within a ShopifyProvider');
  }
  return context;
}
