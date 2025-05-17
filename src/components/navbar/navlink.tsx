"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: NavLinkProps) {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={path === href ? "border-b-2 border-white " : ""}
    >
      {label}
    </Link>
  );
}
