import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const pageTitle = "Persync - AI Business Advisor untuk Arah Bisnis Realistis";
const pageDescription =
  "Persync menganalisis modal, skill, waktu, dan pasar untuk menyusun arah bisnis yang realistis.";
const socialImage = "/assets/persync-og-image.png";
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const metadataBase = (() => {
  try {
    return new URL(appUrl);
  } catch {
    return new URL("http://localhost:3000");
  }
})();

export const metadata = {
  metadataBase,
  title: pageTitle,
  description: pageDescription,
  icons: {
    icon: "/assets/persync-icon.ico",
    shortcut: "/assets/persync-icon.ico",
    apple: "/assets/persync-icon.ico",
  },
  keywords: [
    "Persync",
    "AI business advisor",
    "business direction engine",
    "side hustle strategist",
    "bisnis realistis Indonesia",
  ],
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Persync - AI Business Advisor untuk arah bisnis realistis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [socialImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${plusJakartaSans.variable}`}>{children}</body>
    </html>
  );
}
