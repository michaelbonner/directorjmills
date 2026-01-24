import groq from "groq";
import { notFound } from "next/navigation";
import { getIsStillsPageEnabled } from "../../../functions/getIsStillsPageEnabled";
import { sanityClient } from "../../../lib/sanity";
import { StillsClient } from "./stills-client";

async function getData(slug) {
  const queryDocument = `*[_type == "stillsPage" && slug.current == ${
    slug ? `"${slug}"` : null
  }][0]{
      isEnabled,
      seoDescription,
      seoTitle,
      subtitle,
      title,
      images[]{
          caption,
          "imageUrl": asset->url,
          "name": asset->originalFilename,
      },
    }`;

  const stillsPage = await sanityClient.fetch(groq`${queryDocument}`);
  const isStillsPageEnabled = await getIsStillsPageEnabled();

  return {
    stillsPage,
    isStillsPageEnabled,
  };
}

export async function generateStaticParams() {
  const paths = await sanityClient.fetch(
    `*[_type == "stillsPage"][!(_id in path('drafts.**'))]{slug}`,
  );

  return paths
    .filter((path) => path && path.slug?.current)
    .map((path) => ({
      slug: [path.slug.current],
    }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.at(0) ?? "";
  const { stillsPage } = await getData(slug);

  if (!stillsPage) {
    notFound();
  }

  const canonicalPath = slug ? `/stills/${slug}` : "/stills";

  return {
    title: stillsPage?.seoTitle || "Stills | Director Jeremy Miller",
    description: stillsPage?.seoDescription || "Stills | Director Jeremy Miller",
    alternates: {
      canonical: canonicalPath,
    },
  };
}

export default async function StillsPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.at(0) ?? "";
  const { stillsPage, isStillsPageEnabled } = await getData(slug);

  if (!stillsPage) {
    notFound();
  }

  return (
    <StillsClient
      stillsPage={stillsPage}
      isStillsPageEnabled={isStillsPageEnabled}
    />
  );
}
