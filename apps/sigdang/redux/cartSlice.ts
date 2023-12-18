// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { json } from 'stream/consumers';

interface CartItem{ 
  product_id: string;
  quantity: number;
}

interface CartState {
  _id: string | null;
  user_id: string | null;
  items: CartItem[];
}
const initialState: CartState = {
    _id: null,
    user_id: null,
    items: [],
  };
  const loadCartFromLocalStorage = (): CartState => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const cartFromLocalStorage = localStorage.getItem('cart');
      return cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : initialState;
    } else {
      return initialState;
    }
  };
  // const initialState: CartState = loadCartFromLocalStorage();


const cartSlice = createSlice({
  name: 'cart',
  initialState:loadCartFromLocalStorage(),
  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
