/* eslint-disable @next/next/no-img-element */
import groq from "groq";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { HiChevronDown, HiPlay, HiPause, HiLogin } from "react-icons/hi";
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
  const [videoPlaying, setVideoPlaying] = useState(false);
  const player = useRef(null);

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
              className={`relative aspect-w-${videoWidthAspectRatio} aspect-h-${videoHeightAspectRatio} transition-all duration-700 ${
                showVideo ? `opacity-100` : `opacity-0`
              }`}
            >
              <ReactPlayer
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen={true}
                controls={false}
                frameBorder="0"
                height={`100%`}
                title={fullTitle}
                url={`https://player.vimeo.com/video/${video_id}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
                width={`100%`}
                playing={videoPlaying}
                onReady={() => {
                  setTimeout(() => {
                    setShowVideo(true);
                  }, [500]);
                }}
                onEnded={() => {
                  setVideoPlaying(false);
                }}
                ref={player}
              ></ReactPlayer>
              <div
                className="absolute inset-0 bg-transparent flex items-center justify-center"
                onClick={() => setVideoPlaying(!videoPlaying)}
              >
                <HiPlay
                  className={`text-7xl text-white transition-all duration-500 ${
                    videoPlaying ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                className="relative text-4xl w-8 h-8"
                onClick={() => setVideoPlaying(!videoPlaying)}
                title="Play/Pause"
              >
                <HiPause
                  className={`${
                    videoPlaying ? "opacity-100" : "opacity-0"
                  } absolute inset-0 transition-all duration-500`}
                />
                <HiPlay
                  className={`${
                    videoPlaying ? "opacity-0" : "opacity-100"
                  } absolute inset-0 transition-all duration-500`}
                />
              </button>
              <button
                className="text-4xl"
                onClick={() => player.current.seekTo(0)}
                title="Start over"
              >
                <HiLogin />
              </button>
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

        <div className="container px-4 md:px-0 mx-auto mt-4">
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
