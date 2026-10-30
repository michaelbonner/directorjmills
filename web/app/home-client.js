"use client";

import { clsx } from "clsx";
import Link from "next/link";
import Layout from "../components/layout";
import { WorkGrid } from "../components/work-grid";
import { globalStyles } from "../styles/globalStyles";

const FEATURED_WORK_COUNT = 6;

export function HomeClient({ homePage, workItems, isStillsPageEnabled }) {
  const heroContent = (
    <div className="flex flex-col items-start gap-5">
      <p className="border-b border-white/60 pb-3 text-sm font-medium tracking-[0.12em] uppercase">
        Director · Salt Lake City
      </p>
      <h1 className={clsx(globalStyles.h1, "max-w-[14ch]")}>Jeremy Miller</h1>
      <div className="mt-3 flex flex-wrap gap-x-10 gap-y-2">
        <Link href="#work" className={globalStyles.textLink}>
          Selected work
          <span aria-hidden="true">↓</span>
        </Link>
        <Link href="/contact" className={globalStyles.textLink}>
          Get in touch
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );

  return (
    <Layout
      title={homePage.seo_title}
      description={homePage.seo_description}
      heroContent={heroContent}
      heroImageUrl={homePage.poster || null}
      heroVideoId={homePage.video_id}
      isStillsPageEnabled={isStillsPageEnabled}
    >
      <section id="work" className="scroll-mt-8 py-20 lg:py-28">
        <div className={globalStyles.container}>
          <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={clsx(globalStyles.eyebrow, "mb-5")}>
                Selected work
              </p>
              <h2 className={clsx(globalStyles.h2, "max-w-[20ch]")}>
                Stories made to be felt
              </h2>
            </div>
            <Link
              href="/work"
              className={clsx(globalStyles.textLink, "self-start lg:self-auto")}
            >
              View all work
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <WorkGrid workItems={workItems.slice(0, FEATURED_WORK_COUNT)} />
        </div>
      </section>

      <section className="border-t border-neutral-300">
        <div
          className={clsx(
            globalStyles.container,
            "flex flex-col gap-8 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28",
          )}
        >
          <div>
            <p className={clsx(globalStyles.eyebrow, "mb-5")}>Start here</p>
            <h2 className={clsx(globalStyles.h2, "max-w-[20ch]")}>
              Have a project in mind?
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center gap-5 self-start border border-neutral-950 px-6 py-3 text-sm font-medium tracking-[0.08em] uppercase transition-colors hover:bg-neutral-950 hover:text-white lg:self-auto"
          >
            Representation &amp; contact
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
