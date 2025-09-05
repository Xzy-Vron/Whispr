import { Separator } from "@/components/ui/separator";
import { Message } from "@/models/User";
import React from "react";
import MessageCard from "./messageCard";
import RefreshButton from "./refresh-button";
import MessageSwitch from "./message-switch";

interface MessageSectionProps {
  messages: Message[];
  handleDeleteMessage: (messageId : unknown ) => void;
}

export default function MessageSection({
  messages,
  handleDeleteMessage,
}: MessageSectionProps) {
  return (
    <>
      <div className="mt-15">
        <div className="flex justify-between">
          <div className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Feedbacks
          </div>
          <div className="flex gap-8 items-center justify-evenly">
            <RefreshButton />
            <MessageSwitch />
          </div>
        </div>

        <Separator className="my-2" />
        <div className="mt-6 min-h-44 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {messages.length > 0 ? (
            messages.map((message) => (
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
