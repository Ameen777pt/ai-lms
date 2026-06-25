"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
type NavbarProps = {
  title: string;
};

export default function Navbar({
  title,
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const loggedIn =
    localStorage.getItem("isLoggedIn");

  setIsLoggedIn(
    loggedIn === "true"
  );
}, [pathname]);
const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");

  setIsLoggedIn(false);

  router.push("/");
};
  return (
   <nav className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-b print:hidden">
      <Link href="/" className="text-xl font-bold">
  {title}
</Link>
<div className="flex flex-wrap justify-center gap-4">
  <Link href="/">Home</Link>

  {isLoggedIn && (
    <>
      <Link href="/courses">Courses</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/profile">Profile</Link>
    </>
  )}
</div>

      <div className="flex items-center gap-4">
  {isLoggedIn ? (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
    >
      Logout
    </button>
  ) : (
    <Link
      href="/login"
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
    >
      Login
    </Link>
  )}

  <ThemeToggle />
</div>
    </nav>
  );
}