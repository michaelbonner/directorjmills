import groq from "groq";
import capitalize from "just-capitalize";
import shuffle from "just-shuffle";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ClientOnly } from "../../components/client-only";
import Layout from "../../components/layout";
import { getIsStillsPageEnabled } from "../../functions/getIsStillsPageEnabled";
import { sanityClient } from "../../lib/sanity";

const StillsGallery = dynamic(
  () =>
    import("../../components/stills-gallery", {
      loading: () => <p>Loading...</p>,
      ssr: false,
    })
);

function Stills({ isStillsPageEnabled, stillsPage }) {
  const shuffledImages = useMemo(() => {
    return shuffle(
      stillsPage.images
        .filter((image) => image.imageUrl)
        .map(
          (image) => ({
            ...image,
            lightboxSource: `${image.imageUrl}?w=1800&auto=format`,
            altText:
              image.caption ||
              capitalize(
                (image.name || `image-${index}`)
                  .replace(/-/g, " ")
                  .replace(/_/g, " ")
                  .replace(".jpg", "")
              ),
          }),
          { shuffleAll: true }
        )
    );
  }, [stillsPage.images]);

  const heroContent = (
    <div className="flex h-full w-full flex-col items-center justify-center text-white">
      <h1>{stillsPage.title}</h1>
      <h2 className="font-outline text-2xl uppercase lg:text-6xl">
        {stillsPage.subtitle}
      </h2>
    </div>
  );

  return (
    <Layout
      description={stillsPage.seoDescription}
      heroContent={heroContent}
      isStillsPageEnabled={isStillsPageEnabled}
      title={stillsPage.seoTitle}
    >
      <ClientOnly>
        <StillsGallery images={shuffledImages} />
      </ClientOnly>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `
    *[_type == "stillsPage"][!(_id in path('drafts.**'))]{slug}
  `
  );

  return {
    paths: paths
      .filter((path) => {
        return path;
      })
      .map((path) => {
        return { params: { slug: [path.slug?.current ?? ""] } };
      }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params?.slug?.at(0) ?? "";

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
    props: {
      isStillsPageEnabled,
      stillsPage,
    },
  };
}

export default Stills;
