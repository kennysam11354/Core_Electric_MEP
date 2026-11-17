import { Inter } from "next/font/google";
import { headers } from "next/headers";
import StructuredData from "@/components/StructuredData";
import { createPageMetadata, site } from "@/lib/seo";
import "./globals.css";
import "./hero-animation.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  ...createPageMetadata("en"),
  icons: {
    icon: [
      { url: "/favicon.png?v=4", type: "image/png", sizes: "48x48" },
      { url: "/favicon.svg?v=4", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.ico?v=4",
    apple: "/apple-touch-icon.png?v=4",
  },
};

export default async function RootLayout({ children }) {
  const headerStore = await headers();
  const lang = headerStore.get("x-lang") === "ko" ? "ko" : "en";

  return (
    <html lang={lang} className={inter.variable}>
      <body>
        <StructuredData lang={lang} />
        {children}
      </body>
    </html>
  );
}
