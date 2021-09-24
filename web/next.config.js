module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  async redirects() {
    return [
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
        source: "/work/VERIZON",
        destination: "/work/verizon",
        permanent: true,
      },
      {
        source: "/work/ACCELERATE",
        destination: "/work/pattern-accelerate",
        permanent: true,
      },
    ];
  },
};
