import React, { ReactNode } from "react";
import * as usersApi from "./usersApi";

type UsersApiServiceType = typeof usersApi;

const UsersApiContext = React.createContext<UsersApiServiceType | undefined>(
  undefined,
);

export const ApiProvider: React.FC<{ children: NonNullable<ReactNode> }> = ({
  children,
}) => {
  return (
    <UsersApiContext.Provider value={usersApi}>
      {children}
    </UsersApiContext.Provider>
  );
};

export const useUsersApi = (): UsersApiServiceType => {
  const context = React.useContext(UsersApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

export default UsersApiContext;
