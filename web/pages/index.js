import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Director Jeremy Miller</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="Director Jeremy Miller" />
        <meta
          property="og:description"
          content="A visionary with an inner sense for aesthetic, story and human connection. His deep experience in the film world has positioned him in the Directors chair. Understanding the scope and gravity of projects from pre-production through the finishing touches of post. His portfolio includes commercial projects across the globe. Relate-ability and insightfulness keep him in tune with the emotion that runs deep within each project."
        />
        <meta
          property="og:image"
          content="https://directorjmills.vercel.app/og-image.jpg"
        />
      </Head>

      <main className="text-center h-screen w-full flex items-center justify-center">
        <div>
          <h1 className="text-3xl">Welcome to Jeremy Miller Director</h1>

          <p>
            Get started by editing <code>pages/index.js</code>
          </p>
        </div>
      </main>
    </div>
  );
}
