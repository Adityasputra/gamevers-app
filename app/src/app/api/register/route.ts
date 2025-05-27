import {
  createUser,
  getUserByEmail,
  getUserByUsername,
  UserModelInput,
} from "@/db/models/User";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().optional(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UserModelInput;
    const parsedData = userSchema.safeParse(body);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const { email, username } = parsedData.data;

    const checkEmail = await getUserByEmail(email);
    if (checkEmail) {
      return Response.json(
        {
          error: {
            message: "Email is already registered",
          },
        },
        {
          status: 400,
        }
      );
    }

    const checkUsername = await getUserByUsername(username);
    if (checkUsername) {
      return Response.json(
        {
          error: {
            message: "Username is already taken",
          },
        },
        {
          status: 400,
        }
      );
    }

    const user = await createUser(parsedData.data);
    return Response.json(user, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return Response.json(
        {
          error: {
            message: "Validation Failed",
            details: errors,
          },
        },
        {
          status: 400,
        }
      );
    }

    console.error("Unexpected error in POST /register:", error);
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
