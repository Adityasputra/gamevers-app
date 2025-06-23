import {
  createUser,
  getUserByEmail,
  getUserByUsername,
  UserModelInput,
} from "@/db/models/User";
import { registerSchema } from "@/db/utils/zodSchemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return Response.json(
        {
          error: {
            message: "Validation failed",
            details: errors,
          },
        },
        { status: 400 }
      );
    }

    const { confirmPassword, ...rest } = parsed.data;
    const userData: UserModelInput = {
      ...rest,
    };

    const { email, username } = userData;

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return Response.json(
        { error: { message: "Email already registered" } },
        { status: 400 }
      );
    }

    const existingUsername = await getUserByUsername(username);
    if (existingUsername) {
      return Response.json(
        { error: { message: "Username already taken" } },
        { status: 400 }
      );
    }

    const user = await createUser(userData);

    console.log("User created:", user);

    return Response.json(user, { status: 201 });
  } catch (err) {
    console.error("POST /api/register error:", err);
    return Response.json(
      { error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
