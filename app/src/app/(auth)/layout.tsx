import ServerProtected from "@/components/ServerProtected";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GameVers - Discover Amazing Products",
  description:
    "YourApp is a marketplace where you can find and buy unique products tailored to your needs. Discover the latest trends and exclusive deals.",
  keywords: [
    "marketplace",
    "e-commerce",
    "shopping",
    "exclusive deals",
    "GameVerse",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServerProtected>{children}</ServerProtected>
    </>
  );
}
