import * as React from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";

export function Seo() {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}
