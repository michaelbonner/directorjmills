import Layout from "../components/layout";
import groq from "groq";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";
import Link from "next/link";
import { useEffect, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";

const WorkItemTile = ({ workItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link href={`/work/${workItem.slug.current}`} key={workItem._id}>
      <a
        className="relative text-white flex flex-col items-center justify-center space-y-2 lg:space-y-0 bpd-project-tile"
        key={workItem._id}
        style={{
          backgroundImage: `url(${urlForSanitySource(workItem.poster)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {workItem.shortClipMp4URL && workItem.shortClipOgvURL && (
          <video
            className={`absolute inset-0 object-cover transition-all duration-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            muted
            autoPlay
            loop
          >
            <source id="mp4" src={workItem.shortClipMp4URL} type="video/mp4" />
            <source id="ogv" src={workItem.shortClipOgvURL} type="video/ogg" />
          </video>
        )}
        <div className="z-10 text-center">
          <h2 className="uppercase font-extrabold text-3xl lg:text-xl">
            {workItem.clientName}
          </h2>
          <h3 className="uppercase font-outline text-2xl lg:text-lg">
            {workItem.title}
          </h3>
        </div>
      </a>
    </Link>
  );
};

function Home({ homePage, workItems }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    setIsDesktop(size.width >= 1024);
  }, [size.width]);

  return (
    <Layout
      title={homePage.seo_title}
      description={homePage.seo_description}
      heroImageUrl={homePage.poster}
      isDesktop={isDesktop}
    >
      <div className="mx-auto lg:grid lg:grid-cols-3">
        {workItems.map((workItem, index) => {
          return <WorkItemTile workItem={workItem} key={index} />;
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const homePage = await getClient().fetch(
    groq`
  *[_type == "homePage"][0]{
    seo_title,
    seo_description,
    poster,
    video_id,
  }
  `
  );
  const workItems = await getClient().fetch(
    groq`
    *[_type == "workItem"][!(_id in path('drafts.**'))]|order(order asc){
      _id,
      slug,
      clientName,
      title,
      poster,
      "shortClipMp4URL": shortClipMp4.asset->url,
      "shortClipOgvURL": shortClipOgv.asset->url,
    }
  `
  );
  return {
    props: {
      homePage,
      workItems,
    },
  };
}

export default Home;
