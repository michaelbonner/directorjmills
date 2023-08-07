module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  async redirects() {
    return [
      {
        source: "/work/orbit%20gum",
        destination: "/work/orbit-gum",
        permanent: true,
      },
      {
        source: "/work/back-to-work",
        destination: "/work/orbit-gum",
        permanent: true,
      },
      {
        source: "/work/webb",
        destination: "/work/webb-who-we-are",
        permanent: true,
      },
      {
        source: "/work/ACCELERATE",
        destination: "/work/pattern-accelerate",
        permanent: true,
      },
      {
        source: "/work/UMMC",
        destination: "/work/ummc-here-in-mississippi",
        permanent: true,
      },
      {
        source: "/work/tesla",
        destination: "/work/tesla-model-x",
        permanent: true,
      },
      {
        source: "/work/TRAEGER",
        destination: "/work/traeger-grills-d2",
        permanent: true,
      },
      {
        source: "/work/special-gift",
        destination: "/work/doterra-special-gift",
        permanent: true,
      },
      {
        source: "/work/ACCELERATE",
        destination: "/work/pattern-accelerate",
        permanent: true,
      },
      {
        source: "/category/uncategorized/",
        destination: "/work",
        permanent: true,
      },
    ];
  },
};
