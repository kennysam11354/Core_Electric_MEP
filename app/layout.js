import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import "./hero-animation.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "CORE ELECTRIC MEP INDUSTRIES | Electrical Contractor",
  description:
    "Electrical contractor serving commercial, residential, and public sector projects across New York.",
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
        {children}
      </body>
    </html>
  );
}
