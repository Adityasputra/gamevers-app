import { signToken } from "@/db/helpers/generateToken";
import { comparedPass } from "@/db/helpers/hash";
import { getUserByEmail } from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const User = z.object({
  email: z.string(),
  password: z.string().min(5),
});

export async function POST(request: NextRequest) {
  try {
    const body: { email: string; password: string } = await request.json();
    const validation = User.safeParse(body);

    if (!validation.success) {
      throw validation.error;
    }

    const user = await getUserByEmail(body.email);
    if (!user) {
      return NextResponse.json({
        message: "Invalid email or password",
        status: 401,
      });
    }

    const comparePass = comparedPass(body.password, user.password);
    if (!comparePass) {
      return NextResponse.json({
        message: "Invalid email or password",
        status: 401,
      });
    }

    const access_token = signToken({
      _id: user._id,
    });

    const response = NextResponse.json({
      access_token,
    });

    response.cookies.set("Authorization", `Bearer ${access_token}`);
    return response;
  } catch (error) {
    // console.log(error);
    if (error instanceof z.ZodError) {
      const errorPath = error.issues[0].path[0];
      const errorMessage = error.issues[0].message;

      return NextResponse.json(
        {
          message: `${errorPath} ${errorMessage}`,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
