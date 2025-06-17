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

const description =
  "GameVers is a marketplace where you can find and buy unique products tailored to your needs. Discover the latest trends and exclusive deals.";

export const metadata: Metadata = {
  title: "GameVers - Discover Amazing Products",
  description,
  applicationName: "GameVers",
  keywords: [
    "GameVers",
    "marketplace",
    "e-commerce",
    "shopping",
    "exclusive deals",
    "digital products",
    "gaming accessories",
  ],
  authors: [{ name: "Aditya Saputra", url: "https://gamevers.com" }],
  category: "e-commerce",
  generator: "Next.js",
  themeColor: "#A259FF",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#A259FF",
      },
    ],
  },
  openGraph: {
    title: "GameVers - Discover Amazing Products",
    description,
    url: "https://gamevers.com",
    siteName: "GameVers",
    images: [
      {
        url: "https://gamevers.com/images/og-image.png",
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
    description,
    images: ["https://gamevers.com/images/og-image.png"],
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
