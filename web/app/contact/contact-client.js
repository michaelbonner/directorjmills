/* eslint-disable @next/next/no-img-element */
"use client";

import { PortableText } from "@portabletext/react";
import { clsx } from "clsx";
import { useState } from "react";
import Layout from "../../components/layout";
import urlForSanitySource from "../../lib/urlForSanitySource";
import { globalStyles } from "../../styles/globalStyles";

const blockText = (block) =>
  (block?.children || [])
    .map((child) => child.text)
    .join("")
    .trim();

// Each rich text field opens with its own h2; pull it out so it can sit in
// the left column of the editorial layout.
const splitHeading = (blocks = []) => {
  const [first, ...rest] = blocks;

  if (first?.style === "h2") {
    return { heading: blockText(first), body: rest };
  }

  return { heading: null, body: blocks };
};

// Group representation blocks into one card per h3 (agency/region)
const groupByH3 = (blocks = []) => {
  return blocks.reduce((groups, block) => {
    if (block.style === "h3") {
      groups.push({ heading: blockText(block), blocks: [] });
    } else if (blockText(block)) {
      if (!groups.length) {
        groups.push({ heading: null, blocks: [] });
      }
      groups.at(-1).blocks.push(block);
    }
    return groups;
  }, []);
};

const awardComponents = {
  block: {
    normal: ({ children }) => (
      <p className="border-b border-neutral-300 py-4 text-base/7">{children}</p>
    ),
  },
};

const SectionHeading = ({ eyebrow, heading }) => (
  <div className="lg:col-span-5">
    <p className={clsx(globalStyles.eyebrow, "mb-5")}>{eyebrow}</p>
    {heading && (
      <h2 className={clsx(globalStyles.h2, "max-w-[16ch]")}>{heading}</h2>
    )}
  </div>
);

export function ContactPageClient({ about, isStillsPageEnabled }) {
  const [isMoreAwardsVisible, setIsMoreAwardsVisible] = useState(false);

  const bio = splitHeading(about.bio);
  const representation = splitHeading(about.representation);
  const awards = splitHeading(about.notableAwards);
  const representationGroups = groupByH3(representation.body);

  return (
    <Layout
      title={about.seo_title}
      description={about.seo_description}
      isStillsPageEnabled={isStillsPageEnabled}
    >
      <section
        className={clsx(
          globalStyles.container,
          "grid gap-12 pt-12 pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-28",
        )}
      >
        <div className="lg:col-span-5">
          <div
            className="overflow-hidden bg-neutral-200 lg:sticky lg:top-8"
            style={{ aspectRatio: "4 / 5" }}
          >
            {about.photo && (
              <img
                src={urlForSanitySource(about.photo).width(1000).url()}
                alt="Jeremy Miller Headshot"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="lg:col-span-7 lg:pl-6">
          <p className={clsx(globalStyles.eyebrow, "mb-5")}>
            {bio.heading || "About"}
          </p>
          <h1 className={clsx(globalStyles.h1, "mb-10")}>Jeremy Miller</h1>
          <div className="prose prose-lg max-w-[65ch] text-pretty text-neutral-600 prose-a:font-medium prose-a:text-neutral-950">
            <PortableText value={bio.body} />
          </div>
        </div>
      </section>

      <section className="bg-[#eeece8] py-20 lg:py-28">
        <div
          className={clsx(
            globalStyles.container,
            "grid gap-12 lg:grid-cols-12 lg:gap-10",
          )}
        >
          <SectionHeading eyebrow="Contact" heading={representation.heading} />
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7">
            {representationGroups.map((group, index) => (
              <div className="border-t border-neutral-400 pt-5" key={index}>
                {group.heading && (
                  <h3 className="mb-3 text-sm font-semibold tracking-[0.12em] uppercase">
                    {group.heading}
                  </h3>
                )}
                <div className="prose max-w-none text-neutral-600 prose-p:my-0 prose-a:font-medium prose-a:text-neutral-950">
                  <PortableText value={group.blocks} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={clsx(
          globalStyles.container,
          "grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28",
        )}
      >
        <SectionHeading eyebrow="Recognition" heading={awards.heading} />
        <div className="lg:col-span-7">
          <div className="border-t border-neutral-300">
            <PortableText value={awards.body} components={awardComponents} />
          </div>
          <div
            className="grid overflow-hidden"
            style={{
              gridTemplateRows: isMoreAwardsVisible ? "1fr" : "0fr",
              transition: "grid-template-rows 1s",
            }}
          >
            <div
              className={clsx(isMoreAwardsVisible ? "visible" : "hidden")}
              style={{
                minHeight: 0,
                transition: "visibility 1s",
              }}
            >
              <PortableText
                value={about.otherAwards}
                components={awardComponents}
              />
            </div>
          </div>

          {about.otherAwards?.length > 0 && (
            <button
              className={clsx(globalStyles.textLink, "mt-8")}
              onClick={() => setIsMoreAwardsVisible(!isMoreAwardsVisible)}
              aria-expanded={isMoreAwardsVisible}
            >
              {isMoreAwardsVisible ? "Close" : "Show More"}
              <span aria-hidden="true">{isMoreAwardsVisible ? "−" : "+"}</span>
            </button>
          )}
        </div>
      </section>
    </Layout>
  );
}
