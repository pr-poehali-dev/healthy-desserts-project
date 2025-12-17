export type ProductCategory = 'drinks' | 'desserts' | 'combo' | 'seasonal';

export type Sweetener = 'none' | 'stevia' | 'erythritol' | 'stevia-erythritol';

export type ProductTag = 'high-protein' | 'lactose-free' | 'vegan' | 'no-added-sugar';

export interface Nutrition {
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
  portionSize: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  ingredients: string;
  nutrition: Nutrition;
  allergens: string[];
  sweetener: Sweetener;
  tags: ProductTag[];
  inStock: boolean;
  isPopular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type DeliveryType = 'pickup' | 'delivery';

export type OrderStatus = 'paid' | 'preparing' | 'ready' | 'completed' | 'in-transit';

export interface Order {
  id: string;
  items: CartItem[];
  deliveryType: DeliveryType;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  deliveryDetails?: {
    entrance?: string;
    floor?: string;
    apartment?: string;
  };
  comment?: string;
  pickupTime?: string;
  deliveryTime?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  paidAt?: string;
}
