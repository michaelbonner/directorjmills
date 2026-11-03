import { clsx } from "clsx";
import Link from "next/link";
import Layout from "../components/layout";
import { getIsStillsPageEnabled } from "../functions/getIsStillsPageEnabled";
import { getMenuItems } from "../functions/getMenuItems";
import { globalStyles } from "../styles/globalStyles";

export default async function NotFound() {
  const isStillsPageEnabled = await getIsStillsPageEnabled();

  return (
    <Layout
      title={"404 - Director Jeremy Miller"}
      description={"Page could not be found"}
      isStillsPageEnabled={isStillsPageEnabled}
    >
      <section className={clsx(globalStyles.container, "py-24 lg:py-40")}>
        <p className={clsx(globalStyles.eyebrow, "mb-5")}>Error 404</p>
        <h1 className={clsx(globalStyles.h1, "max-w-[14ch]")}>
          Page not found
        </h1>
        <p className="mt-8 max-w-[48ch] text-lg/8 text-neutral-600">
          Sorry, we can&apos;t find that page. Try one of these pages instead.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-2">
          {getMenuItems({ isStillsPageEnabled }).map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={globalStyles.textLink}
            >
              {item.title}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
