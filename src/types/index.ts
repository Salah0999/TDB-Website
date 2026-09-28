/**
 * The Daily Basket (TDB) - Types & Data Models
 * Lean MVP Store (2-Category Architecture)
 */

export type CategoryId = 'all' | 'beverages' | 'chocolates';

export interface Category {
  id: 'beverages' | 'chocolates';
  name_en: string;
  name_ar: string;
  tagline_en: string;
  tagline_ar: string;
  desc_en: string;
  desc_ar: string;
  image: string;
  itemCount: number;
  featuredProductId: string;
}

export interface Product {
  id: string;
  category: 'beverages' | 'chocolates';
  name_en: string;
  name_ar: string;
  desc_en: string;
  desc_ar: string;
  price: number;
  originalPrice?: number;
  unit_en: string;
  unit_ar: string;
  moq: number;
  moqLabel_en: string;
  moqLabel_ar: string;
  badge_en?: string;
  badge_ar?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  distributor_en: string;
  distributor_ar: string;
  inStock: boolean;
  packageDetails_en?: string[];
  packageDetails_ar?: string[];
}

export interface CartItem {
  id: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  appliedPromo: string | null;
  freeShippingThreshold: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliverySlot: string;
  paymentMethod: 'card' | 'applepay' | 'cod';
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
}
