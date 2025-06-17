import ServerPublic from "@/components/ServerPublic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GameVers - Sign In or Register",
  description:
    "Join GameVers today and discover amazing digital products. Sign in or create your account to explore exclusive deals tailored to your needs.",
  applicationName: "GameVers",
  keywords: [
    "GameVers",
    "login",
    "register",
    "sign in",
    "sign up",
    "e-commerce",
    "digital marketplace",
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
  return <ServerPublic>{children}</ServerPublic>;
}
