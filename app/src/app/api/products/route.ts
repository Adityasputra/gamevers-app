import { addProduct, getAllProducts } from "@/db/models/product";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const products = await getAllProducts();

    return Response.json(products, {
      status: 200,
    });
  } catch (error) {}
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = z
      .object({
        name: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        excerpt: z.string().optional(),
        price: z.number().optional(),
        tags: z.array(z.string()).optional(),
        thumbnail: z.string().optional(),
        images: z.array(z.string()),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      })
      .safeParse(body);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const product = await addProduct(body);
    return Response.json(product, {
      status: 201,
    });
  } catch (error) {
    console.log(error);
  }
}
