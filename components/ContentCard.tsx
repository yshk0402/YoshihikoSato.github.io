import Link from "next/link";

type ContentCardProps = {
  href: string;
  title: string;
  summary: string;
  meta?: string;
  tags?: string[];
};

export default function ContentCard({
  href,
  title,
  summary,
  meta,
  tags,
}: ContentCardProps) {
  return (
    <article className="card">
      <h3 className="card-title">
        <Link className="card-link" href={href}>
          {title}
        </Link>
      </h3>
      {meta ? <p className="card-meta">{meta}</p> : null}
      <p className="card-summary">{summary}</p>
      {tags && tags.length > 0 ? (
        <ul className="tag-list" aria-label="Tags">
          {tags.map((tag) => (
            <li className="tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
