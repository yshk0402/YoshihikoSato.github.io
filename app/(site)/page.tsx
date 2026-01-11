import Link from "next/link";

export default function HomePage() {
  return (
    <div className="home">
      <section className="home-splash">
        <div className="home-splash-inner">
          <h1 className="home-name">Yoshihiko Sato</h1>
          <p className="home-tagline">&gt; PR, Branding, Dev</p>
          <nav className="home-nav" aria-label="Primary">
            <Link className="home-nav-link" href="/about">
              ABOUT
            </Link>
            <Link className="home-nav-link" href="/writing">
              NOTES
            </Link>
            <Link className="home-nav-link" href="/works">
              WORKS
            </Link>
          </nav>
          <Link className="home-cta" href="/contact">
            Connect
          </Link>
        </div>
      </section>
    </div>
  );
}
