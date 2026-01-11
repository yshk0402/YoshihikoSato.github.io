"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          YoshihikoSato
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <ul className="nav-list">
            <li>
              <Link className="nav-link" href="/works">
                Works
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/writing">
                Writing
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
