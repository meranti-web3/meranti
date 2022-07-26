module.exports = {
  siteMetadata: {
    title: `Meranti Web3`,
    siteUrl: `https://meranti.fr`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-GKZE7CF2KD"],
      },
      pluginConfig: {
        head: true,
        respectDNT: true,
      },
    },
  ],
};
