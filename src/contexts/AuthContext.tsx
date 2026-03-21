import { createContext, useState, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from '../@types/auth';

interface AuthContextData {
  user: DecodedToken | null;
  signed: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(() => {
    const savedToken = localStorage.getItem('@Nozama:token');
    if (savedToken) return jwtDecode<DecodedToken>(savedToken);
    return null;
  });

  function login(token: string) {
    localStorage.setItem('@Nozama:token', token);
    const decoded = jwtDecode<DecodedToken>(token);
    setUser(decoded);
  }

  function logout() {
    localStorage.removeItem('@Nozama:token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signed: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};