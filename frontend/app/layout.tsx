import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

import ClientLayout from "@/components/layout/Client/ClientLayout";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prathmesh | ctOS",
  description: "Developer Control Panel & System Architecture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark">
      <body
        className={`
        ${firaCode.className}
        bg-zinc-950
        text-purple-400
        antialiased
        tracking-wide
        selection:bg-purple-500/30
        selection:text-purple-200
      `}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
