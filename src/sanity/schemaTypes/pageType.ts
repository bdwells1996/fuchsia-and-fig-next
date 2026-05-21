import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const pageType = defineType({
	name: "page",
	title: "Page",
	type: "document",
	icon: DocumentIcon,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title" },
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "sections",
			title: "Sections",
			type: "array",
			of: [
				defineArrayMember({ type: "heroSection" }),
				defineArrayMember({ type: "ctaBanner" }),
				defineArrayMember({ type: "featuredItems" }),
				defineArrayMember({ type: "artistBioSpotlight" }),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			slug: "slug.current",
		},
		prepare({ title, slug }) {
			return {
				title: title ?? "Untitled Page",
				subtitle: slug ? `/${slug}` : "",
			};
		},
	},
});
