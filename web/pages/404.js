import Link from "next/link";
import Layout from "../components/layout";
import { menuItems } from "../data/menu-items";

export default function Custom404() {
  return (
    <Layout
      title={"404 - Director Jeremy Miller"}
      description={"Page could not be found"}
    >
      <div className="prose w-full lg:max-w-lg mx-4 my-8 lg:my-24 py-8 px-12 lg:mx-auto border-2 border-black text-center">
        <h1>404 - Page Not Found</h1>
        <p>
          Sorry, we can&apos;t find that page.
          <br />
          Try one of these pages instead.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block mt-4 text-xl font-bold"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
