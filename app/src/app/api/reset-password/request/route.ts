import { getUserByEmail } from "@/db/models/User";
import { sendResetEmail } from "@/db/utils/email";
import { generateResetToken } from "@/db/utils/resetToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const user = await getUserByEmail(email);
  if (!user) {
    return NextResponse.json({
      message: "No user found with this email.",
      status: 404,
    });
  }

  const token = await generateResetToken(email);
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

  await sendResetEmail(email, resetLink);

  return NextResponse.json({
    message: "If your email exists, a link will be sent.",
  });
}
