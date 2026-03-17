import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import Nav from "@/components/Nav";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/lib/queries";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const { data: page } = await sanityFetch({
    query: PAGE_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!page) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      {page.sections?.map((block: { _type: string; _key: string }) => (
        <BlockRenderer key={block._key} block={block} />
      ))}
    </div>
  );
}
