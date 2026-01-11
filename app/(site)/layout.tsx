import type { ReactNode } from "react";
import SiteMenu from "../../components/SiteMenu";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site">
      <main className="main">{children}</main>
      <SiteMenu />
    </div>
  );
}
