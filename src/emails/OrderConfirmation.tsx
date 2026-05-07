import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";

interface OrderItem {
	name: string;
	quantity: number;
	unitPrice: number;
	imageUrl: string | null;
}

interface OrderConfirmationProps {
	orderId: string;
	customerName: string;
	customerEmail: string;
	total: number;
	currency: string;
	orderUrl: string;
	items: OrderItem[];
}

function formatPrice(amount: number, currency: string) {
	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: currency.toUpperCase(),
	}).format(amount / 100);
}

export function OrderConfirmation({
	orderId,
	customerName,
	total,
	currency,
	orderUrl,
	items,
}: OrderConfirmationProps) {
	const orderRef = orderId.slice(0, 8).toUpperCase();

	return (
		<Html>
			<Head />
			<Preview>Your Fuchsia & Fig order #{orderRef} is confirmed</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>Order confirmed</Heading>
					<Text style={text}>Hi {customerName},</Text>
					<Text style={text}>
						Thank you for your order! We&apos;ll get it ready and dispatch it
						as soon as possible.
					</Text>

					<Section style={orderBox}>
						<Text style={label}>Order reference</Text>
						<Text style={value}>#{orderRef}</Text>
					</Section>

					<Hr style={hr} />

					<Heading as="h2" style={h2}>
						Your items
					</Heading>
					{items.map((item, i) => (
						<Row key={i} style={itemRow}>
							<Section>
								<Text style={itemName}>
									{item.quantity}× {item.name}
								</Text>
								<Text style={itemPrice}>
									{formatPrice(item.unitPrice * item.quantity, currency)}
								</Text>
							</Section>
						</Row>
					))}

					<Hr style={hr} />

					<Row style={totalRow}>
						<Section>
							<Text style={totalLabel}>Total</Text>
							<Text style={totalValue}>{formatPrice(total, currency)}</Text>
						</Section>
					</Row>

					<Hr style={hr} />

					<Text style={text}>
						You can track your order status at any time using the link below:
					</Text>
					<Link href={orderUrl} style={button}>
						View your order
					</Link>

					<Text style={footer}>Fuchsia & Fig · Made with love</Text>
				</Container>
			</Body>
		</Html>
	);
}

export default OrderConfirmation;

const main = {
	backgroundColor: "#f9f5f0",
	fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const container = {
	margin: "0 auto",
	padding: "40px 24px",
	maxWidth: "600px",
	backgroundColor: "#ffffff",
	borderRadius: "8px",
};

const h1 = {
	fontSize: "28px",
	fontWeight: "700",
	color: "#1a1a1a",
	marginBottom: "24px",
};

const h2 = {
	fontSize: "18px",
	fontWeight: "600",
	color: "#1a1a1a",
	margin: "24px 0 12px",
};

const text = { fontSize: "15px", color: "#444", lineHeight: "1.6" };
const label = { fontSize: "12px", color: "#888", margin: "0" };
const value = { fontSize: "16px", fontWeight: "600", color: "#1a1a1a", margin: "2px 0 0" };

const orderBox = {
	backgroundColor: "#f9f5f0",
	borderRadius: "6px",
	padding: "16px",
	margin: "24px 0",
};

const hr = { borderColor: "#e8e0d8", margin: "24px 0" };

const itemRow = { marginBottom: "12px" };
const itemName = { fontSize: "14px", color: "#333", margin: "0" };
const itemPrice = { fontSize: "14px", color: "#666", margin: "2px 0 0", textAlign: "right" as const };

const totalRow = { marginTop: "8px" };
const totalLabel = { fontSize: "15px", fontWeight: "600", color: "#1a1a1a", margin: "0" };
const totalValue = { fontSize: "18px", fontWeight: "700", color: "#1a1a1a", margin: "2px 0 0", textAlign: "right" as const };

const button = {
	display: "inline-block",
	backgroundColor: "#7c3aed",
	color: "#ffffff",
	padding: "12px 24px",
	borderRadius: "6px",
	fontWeight: "600",
	fontSize: "15px",
	textDecoration: "none",
	margin: "8px 0 24px",
};

const footer = { fontSize: "12px", color: "#aaa", textAlign: "center" as const, marginTop: "32px" };
