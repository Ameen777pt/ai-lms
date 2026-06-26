"use client";

import { useEffect, useState } from "react";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setIsLoggedIn(
      localStorage.getItem("isLoggedIn") === "true"
    );

    setUserEmail(
      localStorage.getItem("userEmail") || ""
    );
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    setIsLoggedIn(false);
    setUserEmail("");
  };

  return {
    isLoggedIn,
    userEmail,
    logout,
  };
}