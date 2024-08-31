import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface Protected {
  children: React.ReactNode;
}

export default function ServerPublic({ children }: Protected) {
  const cookieStore = cookies();
  const token = cookieStore.get("Authorization");

  if (token) {
    redirect("/");
  }

  return <>{children}</>;
}
