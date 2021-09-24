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
    ];
  },
};
