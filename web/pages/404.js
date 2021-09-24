import Layout from "../components/layout";

export default function Custom404() {
  return (
    <Layout
      title={"404 - Director Jeremy Miller"}
      description={"Page could not be found"}
    >
      <div className="prose w-full lg:max-w-lg mx-4 my-8 lg:my-24 py-8 px-12 lg:mx-auto border-2 border-black text-center">
        <h1>404 - Page Not Found</h1>
        <p>Use the site navigation to find the page you were looking for</p>
      </div>
    </Layout>
  );
}
