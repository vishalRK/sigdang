// localStorageMiddleware.ts
import { Middleware } from 'redux';

const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (action.type.startsWith('cart/')) {
    const state = store.getState();
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }

  return result;
};

export default localStorageMiddleware;
