export interface Product {
  id: string;
  name: string;
  translationKey: string; // reference in translations for localization
  category: 'thekua' | 'nimki';
  description: string;
  story: string; // mother's touch/emotional description
  price: number;
  rating: number;
  reviewCount: number;
  unit: string; // e.g., "Pack of 400g"
  images: string[];
  ingredients: string[];
  shelfLife: string;
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  badges: string[]; // e.g. ["Desi Ghee", "No White Sugar", "Traditional"]
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariation?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  location: string;
  avatar: string;
  verifiedPurchase: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerDetails: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  paymentMethod: 'COD' | 'Online';
  status: 'ordered' | 'preparing' | 'shipped' | 'delivered';
  total: number;
  date: string;
}

export type Language = 'en' | 'hi' | 'bho';
