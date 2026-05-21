import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import { createClient } from "@/lib/supabase/server";
import ClearCartOnSuccess from "./ClearCartOnSuccess";

interface OrderItem {
	id: string;
	product_name: string;
	quantity: number;
	unit_price: number;
	image_url: string | null;
}

interface Order {
	id: string;
	status: string;
	customer_name: string;
	customer_email: string;
	total: number;
	currency: string;
	tracking_carrier: string | null;
	tracking_number: string | null;
	tracking_url: string | null;
	created_at: string;
	order_items: OrderItem[];
}

function formatPrice(amount: number, currency: string) {
	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: currency.toUpperCase(),
	}).format(amount / 100);
}

function statusLabel(status: string) {
	const map: Record<string, string> = {
		pending: "Pending",
		paid: "Payment received",
		processing: "Processing",
		shipped: "Shipped",
		delivered: "Delivered",
		cancelled: "Cancelled",
	};
	return map[status] ?? status;
}

export default async function OrderPage({
	params,
}: {
	params: Promise<{ orderId: string }>;
}) {
	const { orderId } = await params;
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("orders")
		.select("*, order_items(*)")
		.eq("id", orderId)
		.single();

	if (error || !data) {
		notFound();
	}

	const order = data as Order;

	return (
		<div className="min-h-screen bg-background">
			<Nav />
			<ClearCartOnSuccess />

			<section
				className="surface-sunken border-b"
				style={{ borderColor: "var(--border)" }}
			>
				<div className="container-site py-12 md:py-16">
					<p
						className="text-sm font-sans mb-2"
						style={{ color: "var(--text-secondary)" }}
					>
						Order #{order.id.slice(0, 8).toUpperCase()}
					</p>
					<h1
						className="font-display text-4xl md:text-5xl"
						style={{ color: "var(--text-primary)" }}
					>
						Thank you!
					</h1>
					<p className="mt-3 text-base font-sans max-w-xl text-text-secondary">
						Your payment was received. We&apos;ll get your order ready soon.
					</p>
				</div>
			</section>

			<div className="container-site py-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
					{/* Items */}
					<div className="lg:col-span-2 space-y-4">
						<h2
							className="font-sans font-semibold text-base mb-4"
							style={{ color: "var(--text-primary)" }}
						>
							Items ordered
						</h2>
						<ul className="space-y-4">
							{order.order_items.map((item) => (
								<li
									key={item.id}
									className="card flex gap-4 p-4 items-start"
								>
									<div className="relative w-20 h-20 shrink-0 rounded overflow-hidden surface-sunken">
										{item.image_url ? (
											<Image
												src={item.image_url}
												alt={item.product_name}
												fill
												className="object-cover"
												sizes="80px"
											/>
										) : (
											<span className="flex items-center justify-center w-full h-full text-2xl opacity-30">
												🛍
											</span>
										)}
									</div>
									<div className="flex-1 min-w-0">
										<p
											className="font-sans font-semibold text-base leading-snug"
											style={{ color: "var(--text-primary)" }}
										>
											{item.product_name}
										</p>
										<p
											className="font-sans text-sm mt-0.5"
											style={{ color: "var(--text-secondary)" }}
										>
											Qty: {item.quantity}
										</p>
									</div>
									<p
										className="font-sans font-bold text-base shrink-0"
										style={{ color: "var(--text-primary)" }}
									>
										{formatPrice(item.unit_price * item.quantity, order.currency)}
									</p>
								</li>
							))}
						</ul>
					</div>

					{/* Summary */}
					<div className="lg:col-span-1">
						<div className="card card-body space-y-4 sticky top-24">
							<h2
								className="font-sans font-semibold text-base"
								style={{ color: "var(--text-primary)" }}
							>
								Order summary
							</h2>

							<div
								className="flex justify-between text-sm font-sans"
								style={{ color: "var(--text-secondary)" }}
							>
								<span>Status</span>
								<span
									className="font-semibold"
									style={{ color: "var(--text-primary)" }}
								>
									{statusLabel(order.status)}
								</span>
							</div>

							<div
								className="flex justify-between text-sm font-sans border-t pt-4"
								style={{
									borderColor: "var(--border-subtle)",
									color: "var(--text-secondary)",
								}}
							>
								<span>Total</span>
								<span
									className="font-bold"
									style={{ color: "var(--text-primary)" }}
								>
									{formatPrice(order.total, order.currency)}
								</span>
							</div>

							{(order.tracking_carrier ||
								order.tracking_number ||
								order.tracking_url) && (
								<div
									className="border-t pt-4 space-y-1"
									style={{ borderColor: "var(--border-subtle)" }}
								>
									<p
										className="text-sm font-sans font-semibold"
										style={{ color: "var(--text-primary)" }}
									>
										Tracking
									</p>
									{order.tracking_carrier && (
										<p
											className="text-sm font-sans"
											style={{ color: "var(--text-secondary)" }}
										>
											{order.tracking_carrier}
											{order.tracking_number
												? ` — ${order.tracking_number}`
												: ""}
										</p>
									)}
									{order.tracking_url && (
										<Link
											href={order.tracking_url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm font-sans text-bloom-500 underline"
										>
											Track your parcel
										</Link>
									)}
								</div>
							)}

							<Link href="/shop" className="btn btn-secondary btn-md btn-full">
								Continue shopping
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
