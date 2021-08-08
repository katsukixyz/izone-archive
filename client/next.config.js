module.exports = {
  redirects() {
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
    domains: ["d3jo54swkska26.cloudfront.net"],
  },
};
