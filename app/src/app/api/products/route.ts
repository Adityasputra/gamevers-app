import {
  addProduct,
  getAllProducts,
  getProductCount,
} from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const products = await getAllProducts(search, page, pageSize);
    const totalCount = await getProductCount(search);

    const response = {
      data: products,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    console.error("Error in GET handler:", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
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

    const product = await addProduct(parsedData.data);
    return Response.json(product, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      const errorPath = error.issues[0].path[0];
      const errorMessage = error.issues[0].message;

      return Response.json(
        {
          message: `${errorPath} ${errorMessage}`,
        },
        {
          status: 400,
        }
      );
    }

    console.log(error);
    return Response.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
