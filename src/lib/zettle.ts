export interface ZettleVariant {
	uuid: string;
	name: string | null;
	sku: string | null;
	price: {
		amount: number;
		currencyId: string;
	} | null;
	costPrice: {
		amount: number;
		currencyId: string;
	} | null;
}

export interface ZettleProduct {
	uuid: string;
	name: string;
	description: string | null;
	imageLookupKeys: string[];
	variants: ZettleVariant[];
	unitName: string | null;
	taxExempt: boolean;
	presentation: {
		imageUrl: string | null;
		backgroundColor: string | null;
		textColor: string | null;
	} | null;
}

export interface Product {
	id: string;
	name: string;
	description: string | null;
	imageUrl: string | null;
	variants: {
		id: string;
		name: string | null;
		sku: string | null;
		price: number | null;
		currency: string;
	}[];
}

export interface ZettleError {
	error: string;
	message: string;
}

function mapProduct(raw: ZettleProduct): Product {
	return {
		id: raw.uuid,
		name: raw.name,
		description: raw.description ?? null,
		imageUrl: raw.presentation?.imageUrl ?? null,
		variants: raw.variants.map((v) => ({
			id: v.uuid,
			name: v.name ?? null,
			sku: v.sku ?? null,
			price: v.price ? v.price.amount / 100 : null,
			currency: v.price?.currencyId ?? "GBP",
		})),
	};
}

async function getAccessToken(): Promise<string> {
	const assertion = process.env.ZETTLE_API_KEY;
	const clientId = process.env.ZETTLE_CLIENT_ID;

	if (!assertion || !clientId) {
		throw new Error(
			"ZETTLE_API_KEY and ZETTLE_CLIENT_ID environment variables must both be set.",
		);
	}

	const body = new URLSearchParams({
		grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
		client_id: clientId,
		assertion,
	});

	const res = await fetch("https://oauth.zettle.com/token", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: body.toString(),
		// Do not cache the token fetch — we handle caching at the product level
		cache: "no-store",
	});

	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(
			`Zettle OAuth error: ${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`,
		);
	}

	const json = await res.json();
	return json.access_token as string;
}

export async function getZettleProducts(): Promise<Product[]> {
	const accessToken = await getAccessToken();

	const res = await fetch(
		"https://products.izettle.com/organizations/self/products/v2",
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 300 },
		},
	);

	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(
			`Zettle API error: ${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`,
		);
	}

	const data: ZettleProduct[] = await res.json();
	return data.map(mapProduct);
}

export async function getSingleZettleProduct(
	id: string,
): Promise<Product | null> {
	const accessToken = await getAccessToken();

	const res = await fetch(
		`https://products.izettle.com/organizations/self/products/${id}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			next: { revalidate: 300 },
		},
	);

	if (!res.ok) return null;

	const data: ZettleProduct = await res.json();
	return mapProduct(data);
}

export function formatPrice(amount: number, currency = "GBP"): string {
	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency,
	}).format(amount);
}
