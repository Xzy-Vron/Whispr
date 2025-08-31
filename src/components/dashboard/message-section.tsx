import { Separator } from "@radix-ui/react-separator";
import { Message } from "@/models/User";
import React from "react";
import MessageCard from "./messageCard";
import { Switch } from "@/components/ui/switch";
import { UseFormRegister } from "react-hook-form";
import z from "zod";
import { acceptMessageSchema } from "@/schemas/acceptMessage";
import RefreshButton from "./refresh-button";

interface MessageSectionProps {
  messages: Message[];
  handleDeleteMessage: (messageId: any) => void;
  register: UseFormRegister<z.infer<typeof acceptMessageSchema>>;
  acceptMessages: boolean;
  handleSwitchChange: () => Promise<void>;
  isSwitchLoading: boolean;
}

export default function MessageSection({
  messages,
  handleDeleteMessage,
  register,
  acceptMessages,
  handleSwitchChange,
  isSwitchLoading,
}: MessageSectionProps) {
  
  return (
    <>
      <div className="mt-15">
        <div className="flex justify-between">
          <div className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Feedbacks
          </div>
         <RefreshButton />
          <div className="mb-4">
            <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
            />
            <span className="ml-2">
              Accept Messages :{acceptMessages ? " ON" : " OFF"}
            </span>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <MessageCard
                key={(message as { _id: string })._id.toString()}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p>No messages</p>
          )}
        </div>
      </div>
    </>
  );
}
