"use client";

import { useEffect } from "react";
import { useCart } from "@/components/Cart/useCart";

export default function ClearCartOnSuccess() {
	const { clear } = useCart();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { clear(); }, []);

	return null;
}
