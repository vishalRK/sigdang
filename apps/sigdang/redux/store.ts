// store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import localStorageMiddleware from './localStorageMiddleware';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add other reducers as needed
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
