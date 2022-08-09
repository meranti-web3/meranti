module.exports = {
  siteMetadata: {
    title: "Meranti SARL - Agence Web3 a Mulhouse",
    siteUrl: "https://www.meranti.fr",
    description:
      "Developpement Web3 - Web + Blockchain - a Mulhouse et environs"
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Meranti SARL - Agence Web3 à Mulhouse",
        short_name: "Meranti",
        start_url: "/",
        background_color: "white",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/icon.svg", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`
      }
    }
  ]
};
