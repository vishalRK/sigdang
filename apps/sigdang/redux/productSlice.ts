// productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import axios from 'axios';

interface Product {
  // Define your product interface
  _id: string;
  image: string;
  title: string;
  tags: [string];
  price: number;
  rating: number;
  quantity: number;
}

interface ProductState {
  data: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} = productSlice.actions;

export default productSlice.reducer;

// Async thunk for fetching products
export const fetchProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
     await fetch('http://localhost:3000/api/v1/product/getProduct').then(response => {
        if(!response.ok)
        {
            throw new Error("api error");
        }
        return response.json();
     }).then(data => {
        
         dispatch(fetchProductsSuccess(data.products));
     }).catch(error => {
        console.log(error);
     }); // Replace with your actual API endpoint
  } catch (error) {
    dispatch(fetchProductsFailure("error"));
  }
};
