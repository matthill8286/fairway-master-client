// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import {
  AuthRepository,
  createAuthRepository,
} from "../repositories/AuthRepository";

interface AuthContextValue<T> {
  isLoggedIn: boolean;
  login: (credentials: T) => Promise<void>;
  register: (userData: T) => Promise<void>;
  logout: () => void;
}

const initialContextValue = {
  isLoggedIn: false,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
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
  credentialMapper: (credentials: T) => { username: string; password: string };
  userDataMapper: (userData: T) => { username: string; password: string };
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authRepository: AuthRepository<T> = createAuthRepository<T>(
    credentialMapper,
    userDataMapper,
  );

  const login = async (credentials: T) => {
    try {
      const success = await authRepository.login(credentials);
      setIsLoggedIn(success);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const register = async (userData: T) => {
    try {
      const success = await authRepository.register(userData);
      setIsLoggedIn(success);
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const contextValue: AuthContextValue<T> = {
    isLoggedIn,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
