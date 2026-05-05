"use client";

import { createContext, useReducer, useEffect } from "react";

export interface CartItem {
	productId: string;
	variantId: string;
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
	| { type: "ADD"; productId: string; variantId: string }
	| { type: "INCREMENT"; productId: string; variantId: string }
	| { type: "DECREMENT"; productId: string; variantId: string }
	| { type: "REMOVE"; productId: string; variantId: string }
	| { type: "CLEAR" };

export interface CartContextValue {
	items: CartItem[];
	hydrated: boolean;
	totalItems: number;
	addItem: (productId: string, variantId: string) => void;
	increment: (productId: string, variantId: string) => void;
	decrement: (productId: string, variantId: string) => void;
	remove: (productId: string, variantId: string) => void;
	clear: () => void;
	getQuantity: (productId: string, variantId: string) => number;
}

const CART_KEY = "fuchsia-fig-cart";
const EXPIRY_MS = 48 * 60 * 60 * 1000;

function matchItem(item: CartItem, productId: string, variantId: string) {
	return item.productId === productId && item.variantId === variantId;
}

function reducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "HYDRATE":
			return { items: action.items, hydrated: true };

		case "ADD": {
			const existing = state.items.find((i) =>
				matchItem(i, action.productId, action.variantId),
			);
			if (existing) {
				return {
					...state,
					items: state.items.map((i) =>
						matchItem(i, action.productId, action.variantId)
							? { ...i, quantity: i.quantity + 1 }
							: i,
					),
				};
			}
			return {
				...state,
				items: [
					...state.items,
					{ productId: action.productId, variantId: action.variantId, quantity: 1 },
				],
			};
		}

		case "INCREMENT":
			return {
				...state,
				items: state.items.map((i) =>
					matchItem(i, action.productId, action.variantId)
						? { ...i, quantity: i.quantity + 1 }
						: i,
				),
			};

		case "DECREMENT": {
			const item = state.items.find((i) =>
				matchItem(i, action.productId, action.variantId),
			);
			if (!item) return state;
			if (item.quantity <= 1) {
				return {
					...state,
					items: state.items.filter(
						(i) => !matchItem(i, action.productId, action.variantId),
					),
				};
			}
			return {
				...state,
				items: state.items.map((i) =>
					matchItem(i, action.productId, action.variantId)
						? { ...i, quantity: i.quantity - 1 }
						: i,
				),
			};
		}

		case "REMOVE":
			return {
				...state,
				items: state.items.filter(
					(i) => !matchItem(i, action.productId, action.variantId),
				),
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
	// or carts from before the variantId field was introduced
	useEffect(() => {
		try {
			const raw = localStorage.getItem(CART_KEY);
			if (raw) {
				const stored: CartStore = JSON.parse(raw);
				const age = Date.now() - new Date(stored.lastUpdated).getTime();
				const hasVariantIds =
					Array.isArray(stored.items) &&
					stored.items.every((i) => typeof i.variantId === "string");
				if (age < EXPIRY_MS && hasVariantIds) {
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
		addItem: (productId, variantId) =>
			dispatch({ type: "ADD", productId, variantId }),
		increment: (productId, variantId) =>
			dispatch({ type: "INCREMENT", productId, variantId }),
		decrement: (productId, variantId) =>
			dispatch({ type: "DECREMENT", productId, variantId }),
		remove: (productId, variantId) =>
			dispatch({ type: "REMOVE", productId, variantId }),
		clear: () => dispatch({ type: "CLEAR" }),
		getQuantity: (productId, variantId) =>
			state.items.find((i) => matchItem(i, productId, variantId))?.quantity ?? 0,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
