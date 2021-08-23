/* eslint-disable @next/next/no-img-element */
import groq from "groq";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactPlayer from "react-player";
import { HiChevronDown } from "react-icons/hi";
import Layout from "../../components/layout";
import { getClient } from "../../lib/sanity";
import urlForSanitySource from "../../lib/urlForSanitySource";

const BackgroundFallback = ({ image }) => {
  return <img alt="Background" className="w-full h-full" src={image} />;
};

const workItemQuery = groq`
*[_type == "workItem" && slug.current == $slug][0]{
  _id,
  behindTheScenes,
  clientName,
  credits,
  extraPaddingOnVideo,
  frames,
  poster,
  slug,
  title,
  video_id,
  videoHeightAspectRatio,
  videoWidthAspectRatio,
}
`;

/*
prevent purging of aspect ratio
aspect-w-1	aspect-h-1
aspect-w-2	aspect-h-2
aspect-w-3	aspect-h-3
aspect-w-4	aspect-h-4
aspect-w-5	aspect-h-5
aspect-w-6	aspect-h-6
aspect-w-7	aspect-h-7
aspect-w-8	aspect-h-8
aspect-w-9	aspect-h-9
aspect-w-10	aspect-h-10
aspect-w-11	aspect-h-11
aspect-w-12	aspect-h-12
aspect-w-13	aspect-h-13
aspect-w-14	aspect-h-14
aspect-w-15	aspect-h-15
aspect-w-16	aspect-h-16
*/

const WorkItem = ({ workItem = {} }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);

  const {
    clientName = "",
    credits = [],
    poster = "",
    title = "",
    video_id = null,
  } = workItem;

  const videoHeightAspectRatio = workItem.videoHeightAspectRatio || "9";
  const videoWidthAspectRatio = workItem.videoWidthAspectRatio || "16";

  const fullTitle = clientName ? `${clientName} | ${title}` : title;

  return (
    <Layout
      title={workItem.seo_title || `${fullTitle} | Director Jeremy Miller`}
      description={
        workItem.seo_description || `${fullTitle} | Director Jeremy Miller`
      }
    >
      <article>
        {video_id ? (
          <div className="container mx-auto">
            <div
              className={`aspect-w-${videoWidthAspectRatio} aspect-h-${videoHeightAspectRatio} transition-all duration-700 ${
                showVideo ? `opacity-100` : `opacity-0`
              }`}
            >
              <ReactPlayer
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen={true}
                controls={true}
                frameBorder="0"
                height={`100%`}
                title="Jeremy Miller"
                url={`https://player.vimeo.com/video/${video_id}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
                width={`100%`}
                fallback={
                  <BackgroundFallback
                    image={urlForSanitySource(poster).width(1200).url()}
                  />
                }
                onReady={() => {
                  setTimeout(() => {
                    setShowVideo(true);
                  }, [100]);
                }}
              ></ReactPlayer>
            </div>
          </div>
        ) : (
          <div className="container mx-auto">
            <div
              className={`aspect-w-${videoWidthAspectRatio} aspect-h-${videoHeightAspectRatio} transition-all duration-700`}
            >
              <img
                alt="Poster image"
                className="w-full h-full"
                src={urlForSanitySource(poster).width(1200).url()}
              />
            </div>
          </div>
        )}

        <div className="container px-4 md:px-0 mx-auto">
          <div className="flex justify-start items-center">
            <h1 className="text-2xl md:text-2xl lg:text-4xl uppercase flex space-x-4 md:space-x-8 text-left py-4">
              <span className="font-extrabold">
                {clientName ? `${clientName}` : ""}
              </span>
              <span className="font-outline">{title ? `${title}` : ""}</span>
            </h1>
          </div>

          <div>
            {credits && credits.length > 0 && (
              <>
                <button
                  className="w-full flex items-center space-x-2 font-bold text-lg lg:text-2xl text-left my-12 uppercase border-b-2 border-black pb-2"
                  onClick={() => setCreditsOpen(!creditsOpen)}
                  type="button"
                >
                  <span>Credits</span>
                  <span
                    className={`${
                      creditsOpen ? "rotate-180" : null
                    } transform transition-all text-4xl`}
                  >
                    <HiChevronDown />
                  </span>
                </button>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 ${
                    creditsOpen ? "h-auto" : "h-0"
                  } transition-all overflow-hidden`}
                >
                  {credits.map((credit, index) => {
                    return (
                      <div className="grid grid-cols-3" key={index}>
                        <div className="font-bold">{credit.role}</div>
                        <div className="col-span-2">{credit.value}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `
    *[_type == "workItem"]{slug}
  `
  );

  return {
    paths: paths
      .filter((path) => {
        return path;
      })
      .map((path) => {
        return { params: { slug: path.slug.current } };
      }),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  try {
    const workItem = await getClient().fetch(workItemQuery, { slug });
    return {
      props: { workItem },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default WorkItem;