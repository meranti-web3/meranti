import React from "react";
import { graphql } from "gatsby";

import Emphasis from "../../components/Emphasis";
import { PageFooter } from "../../components/PageFooter";
import { PageHeader } from "../../components/PageHeader";
import { PageHead } from "../../components/PageHead";

export default function BlogPage({ data }) {
  const { posts } = data;

  return (
    <div className="flex h-full flex-col">
      <PageHeader />

      <main>
        <Intro />

        <section className="bg-meranti-100">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 h-[100vh]">
            {posts.nodes.map((post) => (
              <a href={`/blog/${post.parent.name}/`}>
                <article
                  className="relative rounded-2xl bg-white p-6 mb-6 hover:shadow-xl hover:shadow-slate-900/10 hover:bg-slate-100"
                  key={post.id}
                >
                  <h2 className="text-slate-900 text-lg font-extrabold">
                    {post.frontmatter.title}
                  </h2>

                  <p className="py-4 text-slate-500">{post.excerpt}</p>
                  <div className="flex justify-between border-t border-slate-200 pt-4">
                    <p className="flex flex-col">
                      <time className="text-slate-500">
                        {post.frontmatter.date}
                      </time>
                      <a
                        href={`mailto:${ post.frontmatter.email }`}
                        rel="noreferrer"
                        target="_blank"
                        className="text-meranti-100 hover:underline"
                      >
                        {post.frontmatter.author}
                      </a>
                    </p>
                    <Emphasis className="flex hover:underline items-center text-xl">
                      Read &gt;
                    </Emphasis>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

export const pageQuery = graphql`
  query BlogIndexQuery {
    posts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          author
          email
        }
        id
        excerpt(format: PLAIN, pruneLength: 200)

        parent {
          ... on File {
            name
          }
        }
      }
    }
  }
`;

function Intro() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 capitalize">
        Meranti's <Emphasis>Blog</Emphasis>.
      </h1>

      <p className="mx-auto my-6 max-w-4xl text-lg tracking-tight text-slate-700">
        Join us on our journey to explore the boundless potential of
        decentralized technology.
      </p>
    </div>
  );
}

export function Head() {
  return <PageHead />;
}