import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function ServerPublic({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization");

  if (token) redirect("/");
  return <>{children}</>;
}
