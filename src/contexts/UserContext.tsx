import { ReactNode } from "react";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { Children } from "../types/global";
import { createBaseContext } from "./BaseContext";

const { Provider, useDataContext } = createBaseContext<User>(
  new UserRepository(),
);

export const useUserContext = useDataContext;

export const UserProvider: React.FC<Children<ReactNode>> = ({ children }) => {
  return <Provider>{children}</Provider>;
};
