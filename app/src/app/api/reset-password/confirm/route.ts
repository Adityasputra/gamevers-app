import { COLLECTION_USER } from "@/constant";
import { getDB } from "@/db/config/mongodb";
import { hashPassword } from "@/db/utils/bcrypt";
import { deleteResetToken, verifyResetToken } from "@/db/utils/resetToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  const email = await verifyResetToken(token);
  if (!email) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  const db = await getDB();

  await db
    .collection(COLLECTION_USER)
    .updateOne({ email }, { $set: { password: hashPassword(password) } });

  await deleteResetToken(token);

  return NextResponse.json({ message: "Password reset successfully" });
}
