"use client";

import NavLink from "./navlink";

export default function Navbar() {
  return (
    <header>
      <nav className="flex gap-4 justify-between px-2 py-4 items-center bg-amber-800 text-white text-lg font-bold flex-shrink-0">
        <NavLink href="/" label="Home" />
        <div className="space-x-4">
          <NavLink href="/register" label="Register" />
          <NavLink href="/login" label="Login" />
          <NavLink href="/dashboard" label="Dashboard" />
        </div>
      </nav>
    </header>
  );
}
