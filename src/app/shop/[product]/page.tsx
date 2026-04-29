import Link from "next/link";
import { getSingleZettleProduct } from "@/lib/zettle";
import { ProductDetails } from "./_components/ProductDetails/ProductDetails";

const page = async ({ params }: { params: Promise<{ product: string }> }) => {
	const { product: productId } = await params;
	const product = await getSingleZettleProduct(productId);

	if (!product) {
		return (
			<div className="md:container-site mx-auto md:py-12 flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
				<p className="text-5xl">🛍</p>
				<h1 className="text-2xl font-display md:text-3xl">Product not found</h1>
				<p className="text-muted max-w-sm">
					This product couldn&apos;t be loaded. It may no longer be available.
				</p>
				<Link href="/shop" className="btn btn-primary btn-sm">
					Back to shop
				</Link>
			</div>
		);
	}

	return (
		<div className="md:container-site mx-auto md:py-12">
			<ProductDetails product={product} />
		</div>
	);
};

export default page;
