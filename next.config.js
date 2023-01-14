module.exports = {
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "mir-s3-cdn-cf.behance.net",
      "encrypted-tbn0.gstatic.com",
      "emojigraph.org",
      "firebasestorage.googleapis.com",
    ],
  },
};
