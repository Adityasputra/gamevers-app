import CardGames from "@/components/CardGames";
import Navbar from "@/components/Navbar";
import { ProductModel } from "@/db/models/product";
import { cookies } from "next/headers";

async function fetchProduct() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
    headers: {
      Cookie: cookies().toString(),
    },
  });

  const data = await res.json();
  return data;
}

export default async function Productlist() {
  const data = await fetchProduct();
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex bg-gray-900 text-white p-6">
        <aside className="w-64 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Platforms</h2>
            <ul className="space-y-3">
              {[
                "PC",
                "Playstation 5",
                "Playstation 4",
                "Xbox Series",
                "Nintendo Switch",
              ].map((platform) => (
                <li key={platform} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-orange-500 focus:ring-0"
                  />
                  <span className="text-lg">{platform}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1 ml-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.data.map((el: ProductModel) => (
              <CardGames key={`el._id`} product={el} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
