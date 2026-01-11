import Link from "next/link";
import { getWriting } from "../../../lib/content";

export default function WritingPage() {
  const posts = getWriting();

  return (
    <section className="blog-page">
      <h1 className="section-title">NOTES</h1>
      {posts.length === 0 ? (
        <p className="empty-state">No published posts yet.</p>
      ) : (
        <div className="blog-list">
          {posts.map((post) => {
            const publishedAt = post.frontmatter.published_at;
            return (
              <article className="blog-item" key={post.frontmatter.slug}>
                <div className="blog-thumb" aria-hidden="true">
                  {post.frontmatter.cover_image ? (
                    <img src={post.frontmatter.cover_image} alt="" />
                  ) : null}
                </div>
                <div className="blog-content">
                  <h2 className="blog-title">
                    <Link
                      className="blog-link"
                      href={`/writing/${post.frontmatter.slug}`}
                    >
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                  <time className="blog-date" dateTime={publishedAt ?? undefined}>
                    {publishedAt ?? "yyyy,mm,dd"}
                  </time>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
