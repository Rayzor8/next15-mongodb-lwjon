import { logout } from "@/actions/auth";

export default function Logout() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="bg-white text-amber-800 px-2 rounded-3xl cursor-pointer hover:bg-amber-50 hover:text-amber-900"
      >
        Logout
      </button>
    </form>
  );
}
