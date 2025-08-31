import { Separator } from "@radix-ui/react-separator";
import { Message } from "@/models/User";
import React from "react";
import MessageCard from "./messageCard";
import { Switch } from "@/components/ui/switch";
import { UseFormRegister } from "react-hook-form";
import z from "zod";
import { acceptMessageSchema } from "@/schemas/acceptMessage";
import { Button } from "../ui/button";
import { Loader, RefreshCcw } from "lucide-react";
import { boolean } from "zod/v4";

interface MessageSectionProps {
  messages: Message[];
  handleDeleteMessage: (messageId: any) => void;
  register: UseFormRegister<z.infer<typeof acceptMessageSchema>>;
  acceptMessages: boolean;
  handleSwitchChange: () => Promise<void>;
  isSwitchLoading: boolean;
  fetchMessage: (refresh?: boolean) => Promise<void>;
  isLoading: boolean;
}

export default function MessageSection({
  messages,
  handleDeleteMessage,
  register,
  acceptMessages,
  handleSwitchChange,
  isSwitchLoading,
  fetchMessage,
  isLoading
  
}: MessageSectionProps) {
  return (
    <>
      <div className="mt-15">
        <div className="flex justify-between">
          <div className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Feedbacks
          </div>
          <Button
            className="mt-4"
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              fetchMessage(true);
            }}
          >
            {isLoading ? (
              <Loader className=" h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className=" h-4 w-4" />
            )}
          </Button>
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
