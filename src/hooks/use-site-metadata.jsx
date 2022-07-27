import { graphql, useStaticQuery } from "gatsby";

export function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          description
        }
      }
    }
  `);

  return data.site.siteMetadata;
}
