import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServiceClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { OrderConfirmation } from "@/emails/OrderConfirmation";
import { NewOrderNotification } from "@/emails/NewOrderNotification";

function getStripe() {
	return new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
}
function getResend() {
	return new Resend(process.env.RESEND_API_KEY ?? "");
}

export async function POST(req: NextRequest) {
	const stripe = getStripe();
	const resend = getResend();
	const body = await req.text();
	const sig = req.headers.get("stripe-signature");

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(
			body,
			sig!,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err) {
		console.error("[webhook] signature verification failed", err);
		return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
	}

	if (event.type !== "checkout.session.completed") {
		return NextResponse.json({ received: true });
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const orderId = session.metadata?.orderId;

	if (!orderId) {
		console.error("[webhook] missing orderId in metadata");
		return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
	}

	// Expand line items
	const expanded = await stripe.checkout.sessions.retrieve(session.id, {
		expand: ["line_items.data.price.product"],
	});

	const lineItems = expanded.line_items?.data ?? [];
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
	const supabase = createServiceClient();

	// Write order row
	const { error: orderError } = await supabase.from("orders").insert({
		id: orderId,
		stripe_session_id: session.id,
		stripe_payment_intent_id:
			typeof session.payment_intent === "string"
				? session.payment_intent
				: session.payment_intent?.id ?? null,
		status: "paid",
		customer_name: session.customer_details?.name ?? "Unknown",
		customer_email: session.customer_details?.email ?? "",
		customer_phone: session.customer_details?.phone ?? null,
		total: session.amount_total ?? 0,
		currency: session.currency ?? "gbp",
	});

	if (orderError) {
		console.error("[webhook] failed to insert order", orderError);
		return NextResponse.json({ error: "DB write failed" }, { status: 500 });
	}

	// Write order_items rows
	const itemRows = lineItems.map((li) => {
		const product =
			li.price?.product && typeof li.price.product !== "string"
				? (li.price.product as Stripe.Product)
				: null;
		return {
			order_id: orderId,
			product_id: product?.id ?? li.price?.product ?? "unknown",
			product_name: product?.name ?? li.description ?? "Item",
			quantity: li.quantity ?? 1,
			unit_price: li.price?.unit_amount ?? 0,
			image_url: product?.images?.[0] ?? null,
		};
	});

	if (itemRows.length > 0) {
		const { error: itemError } = await supabase
			.from("order_items")
			.insert(itemRows);
		if (itemError) {
			console.error("[webhook] failed to insert order_items", itemError);
		}
	}

	const customerEmail = session.customer_details?.email;
	const customerName = session.customer_details?.name ?? "there";
	const orderUrl = `${siteUrl}/order/${orderId}`;

	const orderSummary = {
		orderId,
		customerName,
		customerEmail: customerEmail ?? "",
		customerPhone: session.customer_details?.phone ?? null,
		total: session.amount_total ?? 0,
		currency: session.currency ?? "gbp",
		orderUrl,
		items: itemRows.map((i) => ({
			name: i.product_name,
			quantity: i.quantity,
			unitPrice: i.unit_price,
			imageUrl: i.image_url ?? null,
		})),
	};

	// Fire emails concurrently
	const emailResults = await Promise.allSettled([
		customerEmail
			? resend.emails.send({
					from: process.env.RESEND_FROM_EMAIL ?? "Fuchsia & Fig <onboarding@resend.dev>",
					to: customerEmail,
					subject: `Your order #${orderId.slice(0, 8).toUpperCase()} is confirmed`,
					react: OrderConfirmation(orderSummary),
				})
			: Promise.resolve(),
		resend.emails.send({
			from: process.env.RESEND_FROM_EMAIL ?? "Fuchsia & Fig <onboarding@resend.dev>",
			to: process.env.SHOP_OWNER_EMAIL!,
			subject: `New order #${orderId.slice(0, 8).toUpperCase()} received`,
			react: NewOrderNotification(orderSummary),
		}),
	]);

	for (const result of emailResults) {
		if (result.status === "rejected") {
			console.error("[webhook] email send failed:", result.reason);
		} else if (result.value && "error" in result.value && result.value.error) {
			console.error("[webhook] email send error:", result.value.error);
		}
	}

	return NextResponse.json({ received: true });
}
