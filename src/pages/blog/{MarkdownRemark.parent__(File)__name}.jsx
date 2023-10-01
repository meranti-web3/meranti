import React from "react";
import { graphql } from "gatsby";

import { PageFooter } from "../../components/PageFooter";
import { PageHeader } from "../../components/PageHeader";
import { useSiteMetadata } from "../../hooks/use-site-metadata";

export default function BlogPost({ data }) {
  const { post } = data;

  return (
    <div className="flex h-full flex-col">
      <PageHeader />

      <main>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-auto justify-center relative min-h-[100vh]">
          <div className="min-w-0 max-w-xl flex-auto pr-24 py-8 lg:max-w-none lg:pr-0 xl:pr-24">
            <a
              href="/blog"
              className="text-xl mb-8 text-meranti-100 hover:underline block"
            >
              &lt;&nbsp;Back
            </a>
            <time className="text-slate-500">{post.frontmatter.date}</time>
            <h1 className="text-3xl font-extrabold">
              {post.frontmatter.title}
            </h1>
            <p className="flex text-sm text-slate-500 mt-2 items-center">
              <a
                className="text-meranti-100 text-lg font-extrabold hover:underline"
                href={`mailto:${post.frontmatter.email}`}
              >
                {post.frontmatter.author}
              </a>
              {post.frontmatter.linkedIn && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="group ml-2"
                  aria-label={`${post.frontmatter.author} LinkedIn`}
                  href={post.frontmatter.linkedIn}
                >
                  <svg
                    className="w-6 h-6 fill-slate-500 group-hover:fill-slate-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </p>
            <p>
              <span className="text-xs">
                Last modified:{" "}
                <time className="italic">{post.parent.modifiedTime}</time>
              </span>
            </p>
            <article
              className="py-8 markdown-overrides"
              dangerouslySetInnerHTML={{ __html: post.html }}
            ></article>

            <div className="border-t border-slate-200">
              <p className="py-8">
                Please reach out to us for comments, information, or just to say
                hi!
              </p>
              <a
                href="https://calendly.com/olivier-meranti-web3/30min"
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 mr-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
              >
                Chat with Us
              </a>
              <a
                href="mailto:contact+portal@meranti.fr"
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-xl font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
              >
                Email Us
              </a>
            </div>
          </div>

          {post.tableOfContents.length > 0 && (
            <div className="hidden xl:sticky xl:top-[4.75rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
              <h2 className="mt-32 text-lg font-bold text-meranti-100">
                On this page
              </h2>
              <nav
                className="text-slate-500 [&_a:hover]:underline [&_li]:my-2 [&_ul]:pl-4"
                dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
              ></nav>
            </div>
          )}
        </div>
      </main>
      <PageFooter />
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    post: markdownRemark(id: { eq: $id }) {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        title
        author
        email
        linkedIn
      }
      html
      tableOfContents
      parent {
        ... on File {
          modifiedTime(formatString: "MMMM D, YYYY")
        }
      }
    }
  }
`;

export function Head({ data }) {
  const { post } = data;
  const { title } = useSiteMetadata();

  return (
    <>
      <title>{title}</title>
      <meta name="description" lang="en" content={post.frontmatter.title} />
    </>
  );
}
