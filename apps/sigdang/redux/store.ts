// store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productReducer, { fetchProducts } from './productSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    // other reducers...
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
store.dispatch(fetchProducts());
