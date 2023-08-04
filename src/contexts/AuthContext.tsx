// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import {
  AuthRepository,
  createAuthRepository,
} from "../repositories/AuthRepository";
import AuthSubject from "../services/AuthSubject";
import { useNavigate } from "react-router-dom";

interface AuthContextValue<T> {
  isAuthenticated: boolean;
  login: (credentials: T) => Promise<void>;
  register: (userData: T) => void;
  resetPassword?: (userData: T) => void;
  logout: () => void;
}

const initialContextValue = {
  isAuthenticated: false,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  logout: () => {},
};

const AuthContext = createContext<AuthContextValue<any>>(initialContextValue);

export function useAuthContext<T>() {
  return useContext(AuthContext) as AuthContextValue<T>;
}

export const AuthProvider = <T,>({
  children,
  credentialMapper,
  userDataMapper,
}: {
  children: React.ReactNode;
  credentialMapper: (credentials: T) => { email: string; password: string };
  userDataMapper: (userData: T) => { email: string; password: string };
}) => {
  const authSubject = new AuthSubject();

  const [isAuthenticated, setAuthentication] = useState(false);

  const authRepository: AuthRepository<T> = createAuthRepository<T>(
    credentialMapper,
    userDataMapper,
    authSubject,
  );

  const navigate = useNavigate();

  const login = async (credentials: T) => {
    try {
      await authRepository.login(credentials);
      setAuthentication(true);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  const register = async (userData: T) => {
    try {
      await authRepository.register(userData);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Registration failed:", error.message);
    }
  };

  const logout = () => {
    setAuthentication(false);
  };

  const contextValue: AuthContextValue<T> = {
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
