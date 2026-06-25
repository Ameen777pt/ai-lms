"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
type NavbarProps = {
  title: string;
};

export default function Navbar({
  title,
}: NavbarProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const loggedIn =
    localStorage.getItem("isLoggedIn");

  setIsLoggedIn(
    loggedIn === "true"
  );
}, []);
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

  {isLoggedIn ? (
    <>
      <Link href="/courses">Courses</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/profile">Profile</Link>

      <button
        onClick={handleLogout}
        className="text-red-600 hover:underline"
      >
        Logout
      </button>
    </>
  ) : (
    <Link href="/login">Login</Link>
  )}
</div>

      <div className="flex items-center">
  <ThemeToggle />
</div>
    </nav>
  );
}