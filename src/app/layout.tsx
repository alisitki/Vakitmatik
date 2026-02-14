import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vakitmatik.com.tr"),
  title: {
    default: "Vakitmatik | Motion-First Vakit Paneli",
    template: "%s | Vakitmatik",
  },
  description:
    "Vakitmatik için hazırlanan tek sayfa motion-first lansman deneyimi: ürün özellikleri, kullanım senaryoları ve iletişim bilgileri modern bir akışta.",
  keywords: [
    "vakitmatik",
    "namaz vakti paneli",
    "cami vakit ekranı",
    "mescit vakit sistemi",
    "vakitmatik.com.tr",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vakitmatik | Motion-First Vakit Paneli",
    description:
      "Vakitmatik ürününü antigravity tarzı modern bir tek sayfa deneyimde keşfedin.",
    url: "https://vakitmatik.com.tr",
    siteName: "Vakitmatik",
    locale: "tr_TR",
    type: "website",
    images: ["/images/og-vakitmatik.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vakitmatik | Motion-First Vakit Paneli",
    description:
      "Vakitmatik ürün özellikleri, kullanım alanları ve iletişim bilgileri tek sayfada.",
    images: ["/images/og-vakitmatik.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${sora.variable} ${jakarta.variable}`}>{children}</body>
    </html>
  );
}
