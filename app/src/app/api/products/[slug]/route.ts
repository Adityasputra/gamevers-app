import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/db/models/Product";

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.pathname.split("/").pop(); // ambil slug dari URL

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(
      "Error fetching product by slug:",
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
