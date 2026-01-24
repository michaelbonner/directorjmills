"use client";

import { useEffect, useState } from "react";
import Layout from "../components/layout";
import WorkItemTile from "../components/work-item-tile";
import useWindowSize from "../hooks/useWindowSize";

export function HomeClient({ homePage, workItems, isStillsPageEnabled }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    setIsDesktop(size.width >= 1024);
  }, [size.width]);

  return (
    <>
      {/* White overlay that fades out - desktop only */}
      {homePage.video_id && (
        <div className="hidden lg:block fixed inset-0 bg-white z-50 bpd-fade-out pointer-events-none" />
      )}
      <Layout
        title={homePage.seo_title}
        description={homePage.seo_description}
        heroImageUrl={homePage.poster || null}
        heroVideoId={homePage.video_id}
        isDesktop={isDesktop}
        isStillsPageEnabled={isStillsPageEnabled}
      >
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-1 px-1 pt-1">
          {workItems.map((workItem, index) => {
            return (
              <WorkItemTile
                workItem={workItem}
                key={index}
                index={index}
                hideAfterCount={6}
              />
            );
          })}
        </div>
      </Layout>
    </>
  );
}
