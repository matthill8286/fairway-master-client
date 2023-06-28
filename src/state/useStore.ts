import { useEffect, useState } from "react";
import { state, store } from "./store";

type Dispatch = (action: any) => void;
type AppState = typeof state.value;

export const useStore = (): [AppState, Dispatch] => {
  const [appState, setAppState] = useState<AppState>(state.value);

  useEffect(() => {
    const subscription = state.subscribe(setAppState);
    return () => subscription.unsubscribe();
  }, []);

  return [appState, store.dispatch];
};
