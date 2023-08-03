import { ReactNode } from "react";
import DataManager from "./DataManager";
import { DataManagerContext } from "./DataContext";
import AuthSubject from "./AuthSubject";

// DataManagerProvider receives a ReactNode prop as children and AuthSubject prop
interface DataManagerProviderProps {
  authSubject: AuthSubject;
  children: ReactNode;
}

export const DataManagerProvider: React.FC<DataManagerProviderProps> = ({
  authSubject,
  children,
}) => {
  const dataManagerInstance = DataManager.getInstance(authSubject);

  return (
    <DataManagerContext.Provider value={dataManagerInstance}>
      {children}
    </DataManagerContext.Provider>
  );
};
