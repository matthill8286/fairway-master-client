import React, { ReactNode } from "react";
import * as authApi from "./authApi";

type AuthApiServiceType = typeof authApi;

const AuthApiContext = React.createContext<AuthApiServiceType | undefined>(
  undefined
);

export const ApiProvider: React.FC<{ children: NonNullable<ReactNode> }> = ({
  children,
}) => {
  return (
    <AuthApiContext.Provider value={authApi}>
      {children}
    </AuthApiContext.Provider>
  );
};

export const useAuthApi = (): AuthApiServiceType => {
  const context = React.useContext(AuthApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

export default AuthApiContext;
