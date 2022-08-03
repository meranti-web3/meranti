import * as React from "react";
import { useSiteMetadata } from "../hooks/use-site-metadata";

export function PageHead() {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link href="main.css" rel="stylesheet" />
    </>
  );
}
