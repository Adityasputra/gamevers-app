import Navbar from "@/components/global/Navbar";
import ServerProtected from "@/components/Server/ServerProtected";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist - LevelUpGames",
  description:
    "Lihat semua produk yang ada dalam wishlist Anda di LevelUpGames.",
  keywords: "wishlist, produk, e-commerce, LevelUpGames",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ServerProtected>
        <Navbar />
        {children}
      </ServerProtected>
    </>
  );
}
