"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContextProps, User } from "./types";
import { demoUser } from "@/data/demoUser";

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Load user from cookies
    const savedUser = Cookies.get("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        Cookies.remove("user");
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (user && pathname === "/login") {
      router.replace("/dashboard");
    } else if (!user && pathname.startsWith("/dashboard")) {
      router.replace("/login");
    }
  }, [user, isLoading, pathname, router]);

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email === demoUser.email && password === demoUser.password) {
      const newUser = { email: demoUser.email, name: demoUser.name };
      setUser(newUser);
      Cookies.set("user", JSON.stringify(newUser), { expires: 7 });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
