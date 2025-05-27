import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function ServerProtected({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization");

  console.log("Authorization cookie:", token);

  if (!token) {
    redirect("/login");
  }

  return <>{children}</>;
}
