import { draftMode } from "next/headers";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { LivePageBuilder } from "@/components/blocks/LivePageBuilder";
import Nav from "@/components/Nav";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export default async function Home() {
	const { isEnabled: isDraftMode } = await draftMode();
	const { data: page } = await sanityFetch({
		query: PAGE_BY_SLUG_QUERY,
		params: { slug: "home" },
	});

	return (
		<div className="min-h-screen bg-background">
			<Nav />
			{isDraftMode ? (
				<LivePageBuilder
					initialData={page}
					slug="home"
					projectId={projectId}
					dataset={dataset}
					apiVersion={apiVersion}
					token={process.env.SANITY_API_READ_TOKEN!}
				/>
			) : (
				page?.sections?.map((block: { _type: string; _key: string }) => (
					<BlockRenderer key={block._key} block={block} />
				))
			)}
		</div>
	);
}
