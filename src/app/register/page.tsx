"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async () => {
      const response =
        await fetch(
          "/api/register",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

      const data =
        await response.json();

      alert(
        JSON.stringify(data)
      );
    };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Register
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        className="border p-3 block mt-4"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        className="border p-3 block mt-4"
      />

      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
      >
        Register
      </button>
    </div>
  );
}