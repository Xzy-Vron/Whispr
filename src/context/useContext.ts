import { AcceptMessageType, RefreshType } from "@/types/usecontext-types";
import { createContext, useContext } from "react";


export const RefreshContext = createContext<RefreshType | undefined>(undefined);

export function useRefreshContext() {
  const refresh = useContext(RefreshContext);
  if (!refresh) {
    throw new Error("messageSection must be used within a RefreshProvider");
  }
  return refresh;
}

export const AcceptMessageContext = createContext<AcceptMessageType | undefined>(undefined);

export function useAcceptMessageContext() {
  const acceptMessage = useContext(AcceptMessageContext);
  if (!acceptMessage) {
    throw new Error("messageSection must be used within a AcceptMessageProvider");
  }
  return acceptMessage;
}