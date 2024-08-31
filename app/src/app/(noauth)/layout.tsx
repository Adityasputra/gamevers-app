import ServerPublic from "@/components/Server/ServerPublic";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "wishlist",
  description: "all products",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServerPublic>{children}</ServerPublic>
    </>
  );
}
