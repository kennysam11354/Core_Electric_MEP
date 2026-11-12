import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://stardeltaelectric.com"),
  title: {
    default: "Commercial Electrical Contractor NJ NY | Core Electric MEP Industries",
    template: "%s | Core Electric MEP Industries",
  },
  description:
    "Professional commercial electrical contractor serving New Jersey and New York. Retail, warehouse, and commercial electrical installation and maintenance.",
  icons: {
    icon: [
      { url: "/favicon.png?v=2", type: "image/png", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children }) {
  const headerStore = await headers();
  const lang = headerStore.get("x-lang") === "ko" ? "ko" : "en";

  return (
    <html lang={lang}>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
