import { getWorks } from "../../../lib/content";

export default function WorksPage() {
  const works = getWorks();

  return (
    <section className="works-page">
      <h1 className="section-title">WORKS</h1>
      {works.length === 0 ? (
        <p className="empty-state">No published works yet.</p>
      ) : (
        <div className="works-grid">
          {works.map((work) => (
            <article className="works-item" key={work.frontmatter.slug}>
              <div className="works-thumb" aria-hidden="true" />
              <div className="works-content">
                <h2 className="works-title">
                  {work.frontmatter.url ? (
                    <a className="works-link" href={work.frontmatter.url}>
                      {work.frontmatter.title}
                    </a>
                  ) : (
                    <span className="works-link">{work.frontmatter.title}</span>
                  )}
                </h2>
                <p className="works-date">
                  {work.frontmatter.date ?? "yyyy,mm,dd"}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
