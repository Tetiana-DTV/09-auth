'use client';

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getMe, checkSession } from "@/lib/api/clientApi";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getMe();
          if (user) setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch (error) {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    // Можна показати spinner або просто нічого
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
