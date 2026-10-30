"use client";

import { clsx } from "clsx";
import capitalize from "just-capitalize";
import shuffle from "just-shuffle";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ClientOnly } from "../../../components/client-only";
import Layout from "../../../components/layout";
import { globalStyles } from "../../../styles/globalStyles";

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

  return (
    <Layout
      description={stillsPage.seoDescription}
      isStillsPageEnabled={isStillsPageEnabled}
      title={stillsPage.seoTitle}
    >
      <section className={clsx(globalStyles.container, "pt-12 lg:pt-20")}>
        <div className="grid gap-8 border-b border-neutral-300 pb-12 lg:grid-cols-12 lg:gap-10 lg:pb-16">
          <div className="lg:col-span-7">
            <p className={clsx(globalStyles.eyebrow, "mb-5")}>
              {shuffledImages.length} frames
            </p>
            <h1 className={globalStyles.h1}>{stillsPage.title}</h1>
          </div>
          {stillsPage.subtitle && (
            <p className="max-w-[48ch] self-end text-lg/8 text-pretty text-neutral-600 lg:col-span-5">
              {stillsPage.subtitle}
            </p>
          )}
        </div>
      </section>
      <ClientOnly>
        <StillsGallery images={shuffledImages} />
      </ClientOnly>
    </Layout>
  );
}
