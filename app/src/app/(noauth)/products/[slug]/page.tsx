import { BASE_URL } from "@/constants";
import { ProductModel } from "@/db/models/product";
import Navbar from "@/components/global/Navbar";
import AddToWishlistButton from "@/components/AddToWishlist";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const userId = "x-user-id";

  const response = await fetch(`${BASE_URL}/api/products/${slug}`);
  if (!response.ok) {
    if (response.status === 404) {
      return (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      );
    }
    throw new Error("Failed to fetch product.");
  }

  const product: ProductModel = await response.json();

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src={product.thumbnail}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-100 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-100 mb-4">
                Price:{" "}
                <span className="font-semibold">
                  ${product.price?.toFixed(2)}
                </span>
              </p>
              <p className="text-gray-100 mb-6">{product.description}</p>
              <div className="flex flex-wrap gap-2 text-sm text-gray-100 mb-6">
                {product.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-700 py-1 px-3 rounded text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition duration-300">
                Add to Cart
              </button>
              <AddToWishlistButton
                productId={product._id.toString()}
                userId={userId}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {product.images?.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="h-32 overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={image}
                alt={`${product.name} image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
