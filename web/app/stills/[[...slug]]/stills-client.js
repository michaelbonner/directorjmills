"use client";

import capitalize from "just-capitalize";
import shuffle from "just-shuffle";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ClientOnly } from "../../../components/client-only";
import Layout from "../../../components/layout";

const StillsGallery = dynamic(
  () => import("../../../components/stills-gallery"),
  {
    loading: () => <p className="p-4 text-center">Loading...</p>,
    ssr: false,
  },
);

export function StillsClient({ isStillsPageEnabled, stillsPage }) {
  const shuffledImages = useMemo(() => {
    return shuffle(
      stillsPage.images
        .filter((image) => image.imageUrl)
        .map(
          (image, index) => ({
            ...image,
            lightboxSource: `${image.imageUrl}?w=1800&auto=format`,
            altText:
              image.caption ||
              capitalize(
                (image.name || `image-${index}`)
                  .replace(/-/g, " ")
                  .replace(/_/g, " ")
                  .replace(".jpg", ""),
              ),
          }),
          { shuffleAll: true },
        ),
    );
  }, [stillsPage.images]);

  const heroContent = (
    <div className="flex h-full w-full flex-col items-center justify-center text-white">
      <h1>{stillsPage.title}</h1>
      <h2 className="font-light text-2xl uppercase lg:text-6xl">
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
