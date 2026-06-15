import Link from "next/link";
type NavbarProps = {
  title: string;
  isLoggedIn: boolean;
};

export default function Navbar({
  title,
  isLoggedIn,
}: NavbarProps) {
  return (
   <nav className="flex justify-between items-center p-4 border-b print:hidden">
      <Link href="/" className="text-xl font-bold">
  {title}
</Link>
<div className="flex gap-4">
  <Link href="/">Home</Link>
  <Link href="/courses">Courses</Link>
  <Link href="/dashboard">Dashboard</Link>
  <Link href="/profile">Profile</Link>
</div>

      <button className="px-4 py-2 bg-black text-white rounded-lg">
       {isLoggedIn ? "Dashboard" : "Login"}
      </button>
    </nav>
  );
}