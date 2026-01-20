import groq from "groq";
import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import WorkItemTile from "../components/work-item-tile";
import { getIsStillsPageEnabled } from "../functions/getIsStillsPageEnabled";
import { HomeClient } from "./home-client";

async function getData() {
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

  const isStillsPageEnabled = await getIsStillsPageEnabled();

  return {
    homePage,
    workItems,
    isStillsPageEnabled,
  };
}

export async function generateMetadata() {
  const { homePage } = await getData();

  return {
    title: homePage.seo_title,
    description: homePage.seo_description,
  };
}

export default async function Home() {
  const { homePage, workItems, isStillsPageEnabled } = await getData();

  return (
    <HomeClient
      homePage={homePage}
      workItems={workItems}
      isStillsPageEnabled={isStillsPageEnabled}
    />
  );
}
