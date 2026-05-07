import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

function getStripe() {
	return new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
}

interface LineItemInput {
	productId: string;
	variantId: string;
	name: string;
	variantName?: string | null;
	price: number; // in pounds
	quantity: number;
	imageUrl?: string | null;
}

export async function POST(req: NextRequest) {
	try {
		const stripe = getStripe();
		const { items, customer } = await req.json();

		if (!items?.length) {
			return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
		}

		const orderId = uuidv4();
		const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

		const lineItems = (items as LineItemInput[]).map((item) => ({
			quantity: item.quantity,
			price_data: {
				currency: "gbp",
				unit_amount: Math.round(item.price * 100),
				product_data: {
					name: item.variantName
						? `${item.name} — ${item.variantName}`
						: item.name,
					...(item.imageUrl ? { images: [item.imageUrl] } : {}),
				},
			},
		}));

		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			line_items: lineItems,
			success_url: `${siteUrl}/order/${orderId}?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${siteUrl}/checkout`,
			phone_number_collection: { enabled: true },
			metadata: { orderId },
			...(customer?.email ? { customer_email: customer.email } : {}),
		});

		return NextResponse.json({ url: session.url });
	} catch (err) {
		console.error("[checkout/create-session]", err);
		return NextResponse.json(
			{ error: "Failed to create checkout session" },
			{ status: 500 },
		);
	}
}
