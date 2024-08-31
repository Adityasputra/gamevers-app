import ServerPublic from "@/components/Server/ServerPublic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Semua Produk - LevelUpGames",
  description: "Telusuri semua produk yang tersedia di LevelUpGames.",
  keywords: "produk, e-commerce, belanja online, LevelUpGames",
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
