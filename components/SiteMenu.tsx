"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/writing", label: "notes" },
  { href: "/works", label: "works" }
];

export default function SiteMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="site-menu" aria-label="Global">
      <div className={`site-menu-panel${isOpen ? " is-open" : ""}`}>
        <ul className="site-menu-list" id="global-menu">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li className="site-menu-item" key={item.href}>
                <Link
                  className={`site-menu-link${isActive ? " is-active" : ""}`}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="site-menu-caret">&gt;</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className={`site-menu-toggle${isOpen ? " is-open" : ""}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls="global-menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="site-menu-toggle-icon" aria-hidden="true" />
        <span className="site-menu-toggle-label">menu</span>
      </button>
    </nav>
  );
}
