"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  userEmail: string;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [userEmail, setUserEmail] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    setIsLoggedIn(
      localStorage.getItem("isLoggedIn") ===
        "true"
    );

    setUserEmail(
      localStorage.getItem("userEmail") || ""
    );

    setLoading(false);
  }, []);

  const login = (email: string) => {
    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "userEmail",
      email
    );

    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "userEmail"
    );

    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userEmail,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}