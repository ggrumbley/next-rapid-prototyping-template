module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/opentdb/:path*',
        destination: 'https://opentdb.com/:path*',
      },
    ];
  },
};
