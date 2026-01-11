"use client";

import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <small>TODO: Add footer copy and social links.</small>
      </div>
    </footer>
  );
}
