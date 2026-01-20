import groq from "groq";
import { notFound } from "next/navigation";
import { getClient } from "../../../lib/sanity";
import { getIsStillsPageEnabled } from "../../../functions/getIsStillsPageEnabled";
import { WorkItemClient } from "./work-item-client";

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
  seo_description,
  seo_title,
}
`;

async function getData(slug) {
  const workItem = await getClient().fetch(workItemQuery, { slug });

  if (!workItem) {
    return null;
  }

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

  const isStillsPageEnabled = await getIsStillsPageEnabled();

  return {
    workItem,
    workItems,
    isStillsPageEnabled,
  };
}

export async function generateStaticParams() {
  const paths = await getClient().fetch(
    `*[_type == "workItem"][!(_id in path('drafts.**'))]{slug}`
  );

  return paths
    .filter((path) => path && path.slug?.current)
    .map((path) => ({
      slug: path.slug.current,
    }));
}

export async function generateMetadata({ params }) {
  const data = await getData(params.slug);

  if (!data) {
    return {};
  }

  const { workItem } = data;
  const { clientName = "", title = "" } = workItem;
  const fullTitle = clientName ? `${clientName} | ${title}` : title;

  return {
    title: workItem.seo_title || `${fullTitle} | Director Jeremy Miller`,
    description:
      workItem.seo_description || `${fullTitle} | Director Jeremy Miller`,
  };
}

export default async function WorkItemPage({ params }) {
  const data = await getData(params.slug);

  if (!data) {
    notFound();
  }

  const { workItem, workItems, isStillsPageEnabled } = data;

  return (
    <WorkItemClient
      workItem={workItem}
      workItems={workItems}
      isStillsPageEnabled={isStillsPageEnabled}
    />
  );
}
