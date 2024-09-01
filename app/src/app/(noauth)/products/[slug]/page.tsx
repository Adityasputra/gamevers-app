import { BASE_URL } from "@/constants";
import { ProductModel } from "@/db/models/product";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  try {
    const response = await fetch(`${BASE_URL}/api/products/${slug}`);
    if (!response.ok) {
      if (response.status === 404) {
        return (
          <div>
            <h1>Product not found</h1>
          </div>
        );
      }
      throw new Error("Failed to fetch product.");
    }

    const product: ProductModel = await response.json();

    return (
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div>
        <h1>Error fetching product</h1>
        <p>Something went wrong while fetching the product details.</p>
      </div>
    );
  }
}
