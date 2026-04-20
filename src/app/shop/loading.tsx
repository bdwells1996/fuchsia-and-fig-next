import Skeleton from "@/components/Skeleton/Skeleton";

function ProductCardSkeleton() {
	return (
		<div className="card flex flex-col h-full">
			{/* Image placeholder */}
			<Skeleton className="aspect-square rounded-t-[var(--radius-card)] rounded-b-none" />

			{/* Body */}
			<div className="card-body flex flex-col gap-3">
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-3 w-full" />
				<Skeleton className="h-3 w-5/6" />
				<Skeleton className="h-5 w-1/3 mt-auto pt-2" />
			</div>
		</div>
	);
}

export default function ShopLoading() {
	return (
		<>
			{/* Page header */}
			<section
				className="surface-sunken border-b"
				style={{ borderColor: "var(--border)" }}
			>
				<div className="container-site py-12 md:py-16">
					<Skeleton className="h-10 w-24 md:h-12" />
					<Skeleton className="mt-3 h-4 w-72" />
				</div>
			</section>

			{/* Product grid */}
			<div className="container-site py-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{Array.from({ length: 8 }).map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
						<ProductCardSkeleton key={i} />
					))}
				</div>
			</div>
		</>
	);
}
