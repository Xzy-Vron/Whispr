import { Refresh } from "@/types/refresh";
import { createContext, useContext } from "react";


export const RefreshContext = createContext<Refresh | undefined>(undefined);

export function useRefreshContext() {
  const refresh = useContext(RefreshContext);
  if (!refresh) {
    throw new Error("useRefreshContext must be used within a RefreshProvider");
  }
  return refresh;
}