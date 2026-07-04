export interface Product {
  name: string;
  price: number;
  quantity?: number;
}

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  zipCode: string;
}

export interface OrderSummary {
  items: Product[];
  itemTotal: number;
  tax: number;
  total: number;
}

export interface WorldContext {
  addedProducts: Product[];
  orderSummary: OrderSummary | null;
}
