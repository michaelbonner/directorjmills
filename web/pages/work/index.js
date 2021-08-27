import Layout from "../../components/layout";
import groq from "groq";
import { getClient } from "../../lib/sanity";
import WorkItemTile from "../../components/work-item-tile";

function Work({ homePage, workItems }) {
  return (
    <Layout title={homePage.seo_title} description={homePage.seo_description}>
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

export default Work;
