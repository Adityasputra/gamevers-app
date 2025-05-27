import { getAllProduct, getProductCount } from "@/db/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search")?.trim() || "";

    const rawPage = parseInt(searchParams.get("page") || "1", 10);
    const rawPageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const page = Number.isNaN(rawPage) ? 1 : Math.max(1, rawPage);
    const pageSize = Number.isNaN(rawPageSize) ? 10 : Math.max(1, rawPageSize);

    const [products, totalCount] = await Promise.all([
      getAllProduct(search, page, pageSize),
      getProductCount(search),
    ]);

    return NextResponse.json(
      {
        data: products,
        pagination: {
          currentPage: page,
          pageSize,
          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
