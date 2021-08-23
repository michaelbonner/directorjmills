import groq from "groq";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";
import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";

function Home({ about }) {
  return (
    <Layout
      title="Contact Jeremy Miller"
      description="Get in touch with Jeremy Miller"
    >
      <div className="max-w-md mx-auto px-4 lg:px-0">
        <div className="relative border-2 border-black py-8 px-7 max-w-xs mx-auto w-full">
          <Image
            src={urlForSanitySource(about.photo).url()}
            alt="Jeremy Miller Headshot"
            width="500"
            height="621"
          />
          <div className="absolute px-4 w-full left-0 right-0 -bottom-6">
            <div className="flex items-center justify-center w-full">
              <div className="bg-white px-8">
                <Image
                  alt="x"
                  className="bg-white px-8"
                  height="30"
                  objectFit="cover"
                  src="/images/menu-close.svg"
                  width="30"
                />
              </div>
            </div>
          </div>
        </div>
        <BlockContent className="my-16 prose text-center" blocks={about.bio} />
        <BlockContent
          className="my-16 prose text-center"
          blocks={about.representation}
        />
        <BlockContent
          className="my-16 prose text-center"
          blocks={about.notableAwards}
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      about: await getClient().fetch(groq`
          *[_type == "aboutPage"][0]{
            title,
            photo,
            bio,
            representation,
            notableAwards,
          }
        `),
    },
  };
}

export default Home;
