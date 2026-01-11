import Link from "next/link";

export default function NotFound() {
  return (
    <main className="main">
      <div className="page">
        <header className="page-intro">
          <h1>Page not found</h1>
          <p>TODO: Add a brief recovery message.</p>
        </header>
        <p>
          <Link className="text-link" href="/">
            Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
