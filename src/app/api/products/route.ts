import { NextResponse } from "next/server";
import { getZettleProducts } from "@/lib/zettle";

export async function GET() {
	try {
		const products = await getZettleProducts();
		return NextResponse.json(products);
	} catch (err) {
		console.error("[API /products] Failed to fetch products:", err);
		return NextResponse.json(
			{ error: "Failed to fetch products" },
			{ status: 500 },
		);
	}
}
