import Layout from "../components/layout";
import groq from "groq";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";
import Link from "next/link";

function Home({ workItems }) {
  return (
    <Layout>
      <div className="container mx-auto lg:grid lg:grid-cols-3">
        {workItems.map((workItem) => {
          return (
            <Link href={`/work/${workItem.slug.current}`} key={workItem._id}>
              <a
                className="text-white flex flex-col items-center justify-center space-y-2 bpd-project-tile"
                key={workItem._id}
                style={{
                  backgroundImage: `url(${urlForSanitySource(
                    workItem.poster
                  )})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h2 className="uppercase font-extrabold text-3xl">
                  {workItem.clientName}
                </h2>
                <h3 className="uppercase font-outline text-2xl">
                  {workItem.title}
                </h3>
              </a>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const workItems = await getClient().fetch(
    groq`
    *[_type == "workItem"][!(_id in path('drafts.**'))]|order(order asc)
  `
  );
  return {
    props: {
      workItems,
    },
  };
}

export default Home;
