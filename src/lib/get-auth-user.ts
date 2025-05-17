import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function getAuthUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("user_session")?.value;

  if (session) return await decrypt(session);
}
