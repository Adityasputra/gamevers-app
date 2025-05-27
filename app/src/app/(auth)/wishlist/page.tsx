import { redirect } from "next/navigation";
import NavbarWishlist from "./NavbarWishlist";
import { cookies } from "next/headers";
import { BASE_URL } from "@/constant";

export default function Wishlist() {
  const fetchWishlist = async () => {
    const res = await fetch(BASE_URL + "/api/wishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    });
    if (!res.ok) {
      if (res.status === 403) {
        return redirect("/login");
      }
      return redirect("/login");
    }
    const result = await res.json();
    return result;
  };
  return (
    <>
      <NavbarWishlist />
      <div className="container mx-auto mt-20">
        <h1 className="text-purple text-3xl font-semibold mt-8">Wishlist</h1>
        <p className="text-gray-600 mt-2">
          Here are the items you have added to your wishlist.
        </p>
        <div>
          {fetchWishlist()
            .then((data) => {
              return data.map((item: any) => (
                <div key={item.id} className="border-b py-4 items-center">
                  <h2 className="text-xl font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">{item.product.description}</p>
                </div>
              ));
            })
            .catch((error) => {
              console.error("Error fetching wishlist:", error);
            })}
        </div>
      </div>
    </>
  );
}
