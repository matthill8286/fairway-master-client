import { createContext } from "react";
import DataManager from "./DataManager";

// Create a context for the DataManager instance
const DataManagerContext = createContext<DataManager | null>(null);

export { DataManagerContext };
