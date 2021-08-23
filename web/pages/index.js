import Layout from "../components/layout";
import groq from "groq";
import { getClient } from "../lib/sanity";
import urlForSanitySource from "../lib/urlForSanitySource";

function Home({ workItems }) {
  return (
    <Layout>
      <div className="container mx-auto">
        {workItems.map((workItem) => {
          console.log("workItem", workItem);
          return (
            <div
              className="text-white flex flex-col items-center justify-center space-y-2"
              key={workItem._id}
              style={{
                backgroundImage: `url(${urlForSanitySource(workItem.poster)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "33vh",
              }}
            >
              <h2 className="uppercase font-extrabold text-3xl">
                {workItem.title}
              </h2>
              <h3 className="uppercase font-outline text-2xl">
                {workItem.clientName}
              </h3>
            </div>
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
