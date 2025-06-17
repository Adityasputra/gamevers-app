import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameVers - Discover Amazing Products",
  description:
    "GameVers is a marketplace where you can find and buy unique products tailored to your needs. Discover the latest trends and exclusive deals.",
  keywords: [
    "marketplace",
    "e-commerce",
    "shopping",
    "exclusive deals",
    "GameVers",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "GameVers - Discover Amazing Products",
    description:
      "GameVersHub is a marketplace where you can find and buy unique products tailored to your needs. Discover the latest trends and exclusive deals.",
    url: "https://GameVers.com",
    siteName: "GameVersHub",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "GameVers - Discover Amazing Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameVers - Discover Amazing Products",
    description:
      "GameVers is a marketplace where you can find and buy unique products tailored to your needs. Discover the latest trends and exclusive deals.",
    images: ["/images/og-image.png"],
    creator: "@adityasputra",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
