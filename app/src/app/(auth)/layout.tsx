import ServerProtected from "@/components/ServerProtected";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GameVers - Discover Amazing Products",
  description:
    "GameVers is a marketplace where you can find and buy unique products tailored to your needs. Discover the latest trends and exclusive deals.",
  applicationName: "GameVers",
  keywords: [
    "GameVers",
    "marketplace",
    "e-commerce",
    "shopping",
    "exclusive deals",
    "digital goods",
  ],
  themeColor: "#A259FF",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServerProtected>{children}</ServerProtected>;
}
