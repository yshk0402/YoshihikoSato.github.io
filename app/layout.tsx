import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "YoshihikoSato",
  description: "TODO: One-line site description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="body">{children}</body>
    </html>
  );
}
