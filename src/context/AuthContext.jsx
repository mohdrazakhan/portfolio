import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AuthCtx = createContext({ user: null, loading: true, loginWithEmail: async () => {}, logout: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const verifiedUser = await api.verifyAuth();
      setUser(verifiedUser);
      setLoading(false);
    }
    checkSession();
  }, []);

  async function loginWithEmail(email, password) {
    const res = await api.login(email, password);
    setUser(res.user);
    return res;
  }

  function logout() {
    api.logout();
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, loginWithEmail, logout }), [user, loading]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}

