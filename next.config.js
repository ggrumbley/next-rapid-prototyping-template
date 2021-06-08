module.exports = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  async rewrites() {
    return [
      {
        source: '/opentdb/:path*',
        destination: 'https://opentdb.com/:path*',
      },
    ];
  },
};
