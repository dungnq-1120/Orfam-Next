module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "agricola.axiomthemes.com",
      "media.istockphoto.com",
      "html.hixstudio.net",
      "ninzio.com",
      "ninetheme.com",
      "bubulla.like-themes.com",
    ],
  },
  distDir: "build",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
