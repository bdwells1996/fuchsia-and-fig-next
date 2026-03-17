import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import Nav from "@/components/Nav";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
	const { data: page } = await sanityFetch({
		query: PAGE_BY_SLUG_QUERY,
		params: { slug: "home" },
	});

	return (
		<div className="min-h-screen bg-background">
			<Nav />
			{page?.sections?.map((block: { _type: string; _key: string }) => (
				<BlockRenderer key={block._key} block={block} />
			))}
		</div>
	);
}
