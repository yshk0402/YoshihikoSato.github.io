import { notFound } from "next/navigation";
import { getWritingBySlug, getWritingSlugs } from "../../../../lib/content";

export function generateStaticParams() {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export default function WritingDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getWritingBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const publishedAt = post.frontmatter.published_at;
  const coverImage = post.frontmatter.cover_image;

  return (
    <article className="detail">
      <header className="detail-header">
        <div className="detail-text">
          <h1 className="detail-title">{post.frontmatter.title}</h1>
          {publishedAt ? (
            <time className="detail-meta" dateTime={publishedAt}>
              {publishedAt}
            </time>
          ) : null}
        </div>
        <div className="detail-thumb">
          {coverImage ? (
            <img src={coverImage} alt={post.frontmatter.title} />
          ) : null}
        </div>
      </header>
      <section className="content-body">
        <p>{post.content}</p>
      </section>
    </article>
  );
}
