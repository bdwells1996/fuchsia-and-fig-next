"use client";

import { createContext, useReducer, useEffect } from "react";

export interface CartItem {
	productId: string;
	quantity: number;
}

interface CartStore {
	items: CartItem[];
	lastUpdated: string;
}

interface CartState {
	items: CartItem[];
	hydrated: boolean;
}

type CartAction =
	| { type: "HYDRATE"; items: CartItem[] }
	| { type: "ADD"; productId: string }
	| { type: "INCREMENT"; productId: string }
	| { type: "DECREMENT"; productId: string }
	| { type: "REMOVE"; productId: string }
	| { type: "CLEAR" };

export interface CartContextValue {
	items: CartItem[];
	hydrated: boolean;
	totalItems: number;
	addItem: (productId: string) => void;
	increment: (productId: string) => void;
	decrement: (productId: string) => void;
	remove: (productId: string) => void;
	clear: () => void;
	getQuantity: (productId: string) => number;
}

const CART_KEY = "fuchsia-fig-cart";
const EXPIRY_MS = 48 * 60 * 60 * 1000;

function reducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "HYDRATE":
			return { items: action.items, hydrated: true };

		case "ADD": {
			const existing = state.items.find((i) => i.productId === action.productId);
			if (existing) {
				return {
					...state,
					items: state.items.map((i) =>
						i.productId === action.productId
							? { ...i, quantity: i.quantity + 1 }
							: i,
					),
				};
			}
			return {
				...state,
				items: [...state.items, { productId: action.productId, quantity: 1 }],
			};
		}

		case "INCREMENT":
			return {
				...state,
				items: state.items.map((i) =>
					i.productId === action.productId ? { ...i, quantity: i.quantity + 1 } : i,
				),
			};

		case "DECREMENT": {
			const item = state.items.find((i) => i.productId === action.productId);
			if (!item) return state;
			if (item.quantity <= 1) {
				return {
					...state,
					items: state.items.filter((i) => i.productId !== action.productId),
				};
			}
			return {
				...state,
				items: state.items.map((i) =>
					i.productId === action.productId ? { ...i, quantity: i.quantity - 1 } : i,
				),
			};
		}

		case "REMOVE":
			return {
				...state,
				items: state.items.filter((i) => i.productId !== action.productId),
			};

		case "CLEAR":
			return { ...state, items: [] };

		default:
			return state;
	}
}

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, { items: [], hydrated: false });

	// Hydrate from localStorage after mount, discarding carts older than 48 hours
	useEffect(() => {
		try {
			const raw = localStorage.getItem(CART_KEY);
			if (raw) {
				const stored: CartStore = JSON.parse(raw);
				const age = Date.now() - new Date(stored.lastUpdated).getTime();
				if (age < EXPIRY_MS && Array.isArray(stored.items)) {
					dispatch({ type: "HYDRATE", items: stored.items });
					return;
				}
				localStorage.removeItem(CART_KEY);
			}
		} catch {
			// malformed JSON — start fresh
		}
		dispatch({ type: "HYDRATE", items: [] });
	}, []);

	// Persist to localStorage on every change, refreshing the lastUpdated timestamp
	useEffect(() => {
		if (!state.hydrated) return;
		const store: CartStore = {
			items: state.items,
			lastUpdated: new Date().toISOString(),
		};
		localStorage.setItem(CART_KEY, JSON.stringify(store));
	}, [state.items, state.hydrated]);

	const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);

	const value: CartContextValue = {
		items: state.items,
		hydrated: state.hydrated,
		totalItems,
		addItem: (productId) => dispatch({ type: "ADD", productId }),
		increment: (productId) => dispatch({ type: "INCREMENT", productId }),
		decrement: (productId) => dispatch({ type: "DECREMENT", productId }),
		remove: (productId) => dispatch({ type: "REMOVE", productId }),
		clear: () => dispatch({ type: "CLEAR" }),
		getQuantity: (productId) =>
			state.items.find((i) => i.productId === productId)?.quantity ?? 0,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
