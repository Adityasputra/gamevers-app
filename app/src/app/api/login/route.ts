import { getUserByEmail } from "@/db/models/User";
import { comparePassword } from "@/db/utils/bcrypt";
import { signToken } from "@/db/utils/jwt";
import { loginSchema } from "@/db/utils/zodSchemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = loginSchema.safeParse(body);

    const messages = parsedData.error?.issues.map((issue) => issue.message);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          error: messages,
        },
        { status: 400 }
      );
    }

    const { email, password } = parsedData.data;

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: { message: "Invalid email or password" } },
        { status: 401 }
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: { message: "Invalid email or password" } },
        { status: 401 }
      );
    }

    const access_token = signToken({ _id: user._id });

    const response = NextResponse.json({ access_token });

    response.cookies.set("Authorization", `Bearer ${access_token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
