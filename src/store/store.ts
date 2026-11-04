import { configureStore } from '@reduxjs/toolkit';
import { JWT_PERSISTENT_STATE, userReducer } from './user.slice';
import { saveState } from './storage';
import { CART_PERSISTENT_STATE, cartReducer } from './cart.slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		cart: cartReducer
	}
});

store.subscribe(() => {
    saveState({jwt: store.getState().user.jwt}, JWT_PERSISTENT_STATE);
    saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch