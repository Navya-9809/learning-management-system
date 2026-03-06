import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_KEY = 'lms_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const userData = { email, name: email.split('@')[0] };
    setUser(userData);
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
  };

  const signup = (email, password, name) => {
    const userData = { email, name: name || email.split('@')[0] };
    setUser(userData);
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
