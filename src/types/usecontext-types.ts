import { acceptMessageSchema } from "@/schemas/acceptMessage";
import { UseFormRegister } from "react-hook-form";
import z from "zod";

export interface RefreshType {
  fetchMessage: (refresh?: boolean) => Promise<void>;
  isLoading: boolean;
}

export interface AcceptMessageType {
   register: UseFormRegister<z.infer<typeof acceptMessageSchema>>;
  acceptMessages: boolean;
  handleSwitchChange: () => Promise<void>;
  isSwitchLoading: boolean;
}