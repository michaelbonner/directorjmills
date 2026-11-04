"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import Layout from "../components/layout";
import { WorkGrid } from "../components/work-grid";
import { globalStyles } from "../styles/globalStyles";

const FEATURED_WORK_COUNT = 6;

export function HomeClient({ homePage, workItems, isStillsPageEnabled }) {
  const copy = {
    heroEyebrow: homePage?.heroEyebrow || "Director · Salt Lake City",
    heroHeading: homePage?.heroHeading || "Stories that stay with you",
    heroWorkLink: homePage?.heroWorkLink || "Selected work",
    heroContactLink: homePage?.heroContactLink || "Get in touch",
    workEyebrow: homePage?.workEyebrow || "Selected work",
    workHeading: homePage?.workHeading || "Stories made to be felt",
    workLink: homePage?.workLink || "View all work",
    contactEyebrow: homePage?.contactEyebrow || "Start here",
    contactHeading: homePage?.contactHeading || "Have a project in mind?",
    contactLink: homePage?.contactLink || "Representation & contact",
  };

  const heroContent = (
    <div className="flex flex-col items-start gap-5">
      <p className="border-b border-white/60 pb-3 text-sm font-medium tracking-[0.12em] uppercase">
        {copy.heroEyebrow}
      </p>
      <h1 className={clsx(globalStyles.h1, "max-w-[14ch]")}>{copy.heroHeading}</h1>
      <div className="mt-3 flex flex-wrap gap-x-10 gap-y-2">
        <Link href="#work" className={globalStyles.textLink}>
          {copy.heroWorkLink}
          <FiArrowDown aria-hidden="true" className="size-4 shrink-0" />
        </Link>
        <Link href="/contact" className={globalStyles.textLink}>
          {copy.heroContactLink}
          <FiArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
        </Link>
      </div>
    </div>
  );

  return (
    <Layout
      title={homePage?.seo_title}
      description={homePage?.seo_description}
      heroContent={heroContent}
      heroImageUrl={homePage?.poster || null}
      heroVideoId={homePage?.video_id}
      isStillsPageEnabled={isStillsPageEnabled}
    >
      <section id="work" className="scroll-mt-8 py-20 lg:py-28">
        <div className={globalStyles.container}>
          <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className={clsx(globalStyles.eyebrow, "mb-5")}>
                {copy.workEyebrow}
              </p>
              <h2 className={clsx(globalStyles.h2, "max-w-[20ch]")}>
                {copy.workHeading}
              </h2>
            </div>
            <Link
              href="/work"
              className={clsx(globalStyles.textLink, "self-start lg:self-auto")}
            >
              {copy.workLink}
              <FiArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
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
            <p className={clsx(globalStyles.eyebrow, "mb-5")}>{copy.contactEyebrow}</p>
            <h2 className={clsx(globalStyles.h2, "max-w-[20ch]")}>
              {copy.contactHeading}
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center gap-5 self-start border border-neutral-950 px-6 py-3 text-sm font-medium tracking-[0.08em] uppercase transition-colors hover:bg-neutral-950 hover:text-white lg:self-auto"
          >
            {copy.contactLink}
            <FiArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
