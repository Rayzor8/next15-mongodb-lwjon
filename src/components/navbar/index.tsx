import getAuthUser from "@/lib/get-auth-user";
import NavLink from "./navlink";
import Logout from "./logout";

export default async function Navbar() {
  const authUser = await getAuthUser();

  return (
    <header>
      <nav className="flex gap-4 justify-between p-4 items-center bg-amber-800 text-white text-lg font-bold flex-shrink-0">
        <NavLink href="/" label="Home" />

        {authUser ? (
          <div className="flex gap-4">
            <NavLink href="/posts/create" label="New Post" />
            <NavLink href="/dashboard" label="Dashboard" />
            <Logout />
          </div>
        ) : (
          <div className="space-x-4">
            <NavLink href="/register" label="Register" />
            <NavLink href="/login" label="Login" />
          </div>
        )}
      </nav>
    </header>
  );
}
