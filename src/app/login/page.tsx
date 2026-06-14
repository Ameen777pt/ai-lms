"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

    
export default function LoginPage() {
    
     const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const router = useRouter();
const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  if (
  email === "admin@example.com" &&
  password === "123456"
) {
  localStorage.setItem(
    "isLoggedIn",
    "true"
  );
  localStorage.setItem(
  "userEmail",
  email
);

  router.push("/dashboard");
} else {
  alert("Invalid credentials");
}
};
  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-4xl font-bold mb-6">
        Login
      </h1>

      <form
  onSubmit={handleLogin}
  className="space-y-4"
>
        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border p-3 rounded"
/>

        <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border p-3 rounded"
/>
        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}