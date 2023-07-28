import { graphql, useStaticQuery } from "gatsby";

export function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          descriptionFr
          descriptionEn
        }
      }
    }
  `);

  return data.site.siteMetadata;
}
