// AuthContext.tsx
import React, { createContext, useContext } from "react";
import AuthSubject from "./AuthSubject";

interface AuthContextValue {
  authSubject: AuthSubject;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authSubject = new AuthSubject();

  return (
    <AuthContext.Provider value={{ authSubject }}>
      {children}
    </AuthContext.Provider>
  );
};
