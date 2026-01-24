import groq from "groq";
import Layout from "../../components/layout";
import { getClient } from "../../lib/sanity";
import WorkItemTile from "../../components/work-item-tile";
import { getIsStillsPageEnabled } from "../../functions/getIsStillsPageEnabled";

async function getData() {
  const workPage = await getClient().fetch(
    groq`
  *[_type == "workPage"][0]{
    seo_title,
    seo_description,
    poster,
    video_id,
  }
  `,
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
  `,
  );

  const isStillsPageEnabled = await getIsStillsPageEnabled();

  return {
    workPage,
    workItems,
    isStillsPageEnabled,
  };
}

export async function generateMetadata() {
  const { workPage } = await getData();

  return {
    title: workPage?.seo_title || "Work | Director Jeremy Miller",
    description: workPage?.seo_description || "Work | Director Jeremy Miller",
    alternates: {
      canonical: "/work",
    },
  };
}

export default async function Work() {
  const { workPage, workItems, isStillsPageEnabled } = await getData();

  return (
    <Layout
      isStillsPageEnabled={isStillsPageEnabled}
      title={workPage.seo_title}
      description={workPage.seo_description}
    >
      <div className="mx-1 grid grid-cols-1 lg:grid-cols-3 gap-1">
        {workItems.map((workItem, index) => {
          return <WorkItemTile workItem={workItem} key={index} />;
        })}
      </div>
    </Layout>
  );
}
