import ProductCard from "@/components/ProductCard/ProductCard";
import { getZettleProducts } from "@/lib/zettle";
import type { Product } from "@/lib/zettle";

export const metadata = {
	title: "Shop | Fuchsia & Fig",
	description: "Browse our available products.",
};

async function ShopContent() {
	let products: Product[] = [];
	let errorMessage: string | null = null;

	try {
		products = await getZettleProducts();
	} catch (err) {
		console.error("[Shop] Failed to fetch Zettle products:", err);
		errorMessage =
			"We couldn't load the shop right now. Please check back soon.";
	}

	if (errorMessage) {
		return (
			<div className="container-site py-24 text-center">
				<p className="text-lg font-sans text-text-secondary">{errorMessage}</p>
			</div>
		);
	}

	if (products.length === 0) {
		return (
			<div className="container-site py-24 text-center">
				<p className="text-lg font-sans text-text-secondary">
					No products are available right now. Check back soon.
				</p>
			</div>
		);
	}

	return (
		<div className="container-site py-12">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

export default async function ShopPage() {
	return (
		<>
			{/* Page header */}
			<section
				className="surface-sunken border-b"
				style={{ borderColor: "var(--border)" }}
			>
				<div className="container-site py-12 md:py-16">
					<h1
						className="font-display text-4xl md:text-5xl"
						style={{ color: "var(--text-primary)" }}
					>
						Shop
					</h1>
					<p className="mt-3 text-base font-sans max-w-xl text-text-secondary">
						Browse my full range of available products.
					</p>
				</div>
			</section>

			{/* Products */}
			<ShopContent />
		</>
	);
}
