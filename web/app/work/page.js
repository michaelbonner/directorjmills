import { clsx } from "clsx";
import groq from "groq";
import Layout from "../../components/layout";
import { WorkGrid } from "../../components/work-grid";
import { getClient } from "../../lib/sanity";
import { globalStyles } from "../../styles/globalStyles";
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
      <section
        className={clsx(
          globalStyles.container,
          "pt-12 pb-20 lg:pt-20 lg:pb-28",
        )}
      >
        <div className="mb-12 grid gap-8 border-b border-neutral-300 pb-12 lg:mb-16 lg:grid-cols-12 lg:gap-10 lg:pb-16">
          <div className="lg:col-span-7">
            <p className={clsx(globalStyles.eyebrow, "mb-5")}>
              {workItems.length} projects
            </p>
            <h1 className={globalStyles.h1}>Work</h1>
          </div>
          <p className="max-w-[48ch] self-end text-lg/8 text-pretty text-neutral-600 lg:col-span-5">
            Commercial, branded and narrative films for automotive, tech and
            lifestyle brands.
          </p>
        </div>
        <WorkGrid workItems={workItems} />
      </section>
    </Layout>
  );
}
