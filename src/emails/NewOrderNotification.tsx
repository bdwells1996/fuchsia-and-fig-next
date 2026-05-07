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

interface NewOrderNotificationProps {
	orderId: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string | null;
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

export function NewOrderNotification({
	orderId,
	customerName,
	customerEmail,
	customerPhone,
	total,
	currency,
	orderUrl,
	items,
}: NewOrderNotificationProps) {
	const orderRef = orderId.slice(0, 8).toUpperCase();

	return (
		<Html>
			<Head />
			<Preview>New order #{orderRef} from {customerName}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>New order received</Heading>
					<Text style={text}>
						A new order has been placed. Here are the details:
					</Text>

					<Section style={box}>
						<Text style={label}>Order reference</Text>
						<Text style={value}>#{orderRef}</Text>

						<Hr style={innerHr} />

						<Text style={label}>Customer</Text>
						<Text style={value}>{customerName}</Text>
						<Text style={subValue}>{customerEmail}</Text>
						{customerPhone && <Text style={subValue}>{customerPhone}</Text>}
					</Section>

					<Heading as="h2" style={h2}>
						Items ordered
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

					<Text style={totalLine}>
						<strong>Total: {formatPrice(total, currency)}</strong>
					</Text>

					<Link href={orderUrl} style={button}>
						View order
					</Link>

					<Text style={hint}>
						Update fulfillment status and tracking info in the Supabase
						dashboard or via the admin panel.
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

export default NewOrderNotification;

const main = {
	backgroundColor: "#f0f0f0",
	fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const container = {
	margin: "0 auto",
	padding: "40px 24px",
	maxWidth: "600px",
	backgroundColor: "#ffffff",
	borderRadius: "8px",
};

const h1 = { fontSize: "26px", fontWeight: "700", color: "#1a1a1a", marginBottom: "16px" };
const h2 = { fontSize: "17px", fontWeight: "600", color: "#1a1a1a", margin: "24px 0 10px" };
const text = { fontSize: "15px", color: "#444", lineHeight: "1.6" };
const label = { fontSize: "11px", color: "#888", margin: "12px 0 0", textTransform: "uppercase" as const, letterSpacing: "0.05em" };
const value = { fontSize: "15px", fontWeight: "600", color: "#1a1a1a", margin: "2px 0 0" };
const subValue = { fontSize: "14px", color: "#555", margin: "2px 0 0" };
const box = { backgroundColor: "#f8f8f8", borderRadius: "6px", padding: "16px", margin: "20px 0" };
const innerHr = { borderColor: "#e0e0e0", margin: "12px 0" };
const hr = { borderColor: "#e8e8e8", margin: "20px 0" };
const itemRow = { marginBottom: "10px" };
const itemName = { fontSize: "14px", color: "#333", margin: "0" };
const itemPrice = { fontSize: "14px", color: "#666", margin: "2px 0 0", textAlign: "right" as const };
const totalLine = { fontSize: "16px", color: "#1a1a1a" };
const button = {
	display: "inline-block",
	backgroundColor: "#1a1a1a",
	color: "#ffffff",
	padding: "11px 22px",
	borderRadius: "6px",
	fontWeight: "600",
	fontSize: "14px",
	textDecoration: "none",
	margin: "12px 0",
};
const hint = { fontSize: "13px", color: "#999", marginTop: "20px" };
