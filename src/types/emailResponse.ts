import { Message } from "@/models/User";
export interface EmailResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: [Message];
}