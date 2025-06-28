import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "@/db/models/User";
import { registerSchema } from "@/db/utils/zodSchemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => i.message);
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    const { email, username, password, name } = parsed.data;

    const [existingEmail, existingUsername] = await Promise.all([
      getUserByEmail(email),
      getUserByUsername(username),
    ]);

    if (existingEmail) {
      return NextResponse.json(
        { error: { message: "Email already registered" } },
        { status: 409 }
      );
    }

    if (existingUsername) {
      return NextResponse.json(
        { error: { message: "Username already taken" } },
        { status: 409 }
      );
    }

    const newUser = await createUser({ email, username, password, name });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
