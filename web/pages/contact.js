/* eslint-disable @next/next/no-img-element */
import { PortableText } from "@portabletext/react";
import { clsx } from "clsx";
import groq from "groq";
import Image from "next/image";
import { useState } from "react";
import Layout from "../components/layout";
import { getIsStillsPageEnabled } from "../functions/getIsStillsPageEnabled";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";

function ContactPage({ about, isStillsPageEnabled }) {
  const [isMoreAwardsVisible, setIsMoreAwardsVisible] = useState(false);

  return (
    <Layout
      title={about.seo_title}
      description={about.seo_description}
      isStillsPageEnabled={isStillsPageEnabled}
    >
      <div className="max-w-5xl mx-auto px-4 lg:px-0">
        <div className="relative border-2 border-black py-8 px-7 max-w-xs mx-auto w-full">
          <img
            src={urlForSanitySource(about.photo).width(500).url()}
            alt="Jeremy Miller Headshot"
          />
          <div className="absolute px-4 w-full left-0 right-0 -bottom-6">
            <div className="flex items-center justify-center w-full">
              <div className="bg-white px-8">
                <Image
                  alt="x"
                  className="bg-white px-8"
                  height="30"
                  src="/images/menu-close.svg"
                  width="30"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-16 prose max-w-3xl text-center mx-auto">
          <PortableText value={about.bio} />
        </div>
        <div className="my-16 prose max-w-3xl text-center mx-auto">
          <PortableText value={about.representation} />
        </div>
        <div className="my-16 prose max-w-5xl text-center mx-auto">
          <PortableText value={about.notableAwards} />
          <div
            className="grid overflow-hidden -mt-6"
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
              <PortableText value={about.otherAwards} />
            </div>
          </div>

          <div className={clsx(isMoreAwardsVisible ? "mt-0" : "mt-6")}>
            <button
              className="underline"
              onClick={() => setIsMoreAwardsVisible(!isMoreAwardsVisible)}
            >
              Show More
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const isStillsPageEnabled = await getIsStillsPageEnabled();
  return {
    props: {
      about: await getClient().fetch(groq`
          *[_type == "aboutPage"][0]{
            title,
            photo,
            bio,
            representation,
            notableAwards,
            otherAwards,
            seo_title,
            seo_description
          }
        `),
      isStillsPageEnabled,
    },
  };
}

export default ContactPage;
