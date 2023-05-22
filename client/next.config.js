const { i18n } = require("./next-i18next.config");
module.exports = {
  i18n,
  async redirects() {
    return [
      process.env.MAINTENANCE_MODE === "1"
        ? {
            source: "/((?!maintenance).*)",
            destination: "/maintenance.html",
            permanent: false,
          }
        : null,
    ].filter(Boolean);
  },
  reactStrictMode: true,
  images: {
    domains: ["hls.izonev.live"],
  },
};
