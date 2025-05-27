"use server";

import { BASE_URL } from "@/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const fetchWishlist = async (
  method: "POST" | "DELETE",
  url: string,
  body?: object,
  errorRedirectUrl?: string
) => {
  const res = await fetch(BASE_URL + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    if (res.status === 403 && errorRedirectUrl) {
      return redirect(errorRedirectUrl);
    }
    return redirect("/login");
  }

  return redirect("/wishlist");
};

export const AddWishlistDetail = async (id: string, slug: string) => {
  return fetchWishlist(
    "POST",
    "/api/wishlist",
    { productId: id },
    `/products/${slug}?error=You cannot love this product twice`
  );
};

export const AddWishlist = async (id: string) => {
  return fetchWishlist(
    "POST",
    "/api/wishlist",
    { productId: id },
    `/products?error=You cannot love this product twice`
  );
};

export const DeleteWishlist = async (id: string) => {
  return fetchWishlist("DELETE", `/api/wishlist/${id}`);
};
