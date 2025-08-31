"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Message } from "@/models/User";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schemas/acceptMessage";
import * as z from "zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "sonner";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Copy, Loader, RefreshCcw } from "lucide-react";
import MessageCard from "@/components/dashboard/messageCard";
import { NameCard } from "@/components/dashboard/name-card";
import { CopyLinkCard } from "@/components/dashboard/copy-link-card";
import MessageSection from "@/components/dashboard/message-section";

export default function page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  const handleDeleteMessage = (messageId: string) => {
    setMessages(
      messages.filter((message: Message) => message._id !== messageId)
    );
  };
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof acceptMessageSchema>>({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get("/api/accept-messages");
      if (response.data && response.data.isAcceptingMessage !== undefined) {
        setValue("acceptMessages", response.data.isAcceptingMessage);
      } else {
        toast.error("Error accepting messages", {
          description: "Invalid response data",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error("Error accepting messages", {
        description:
          axiosError.response?.data.message ||
          "Failed to fetch messages settings",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessage = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(true);
      try {
        const promise = axios.get("/api/get-messages");
        if (refresh) {
          toast.promise(promise, {
            loading: "Refreshing messages...",
            success: (res) => {
              return res.data.message;
            },
            error: (res) => {
              return res.data.message;
            },
          });
        }
        const response = await promise;
        setMessages(response.data.messages || []);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error("Error accepting messages", {
          description:
            axiosError.response?.data.message || "Failed to fetch messages",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session?.user) return;
    fetchMessage();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessage]);

  const handleSwitchChange = async (): Promise<void> => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log("Error response:", axiosError.response);
      toast.error("Error accepting messages", {
        description:
          axiosError.response?.data.message || "Failed to accept messages",
      });
    }
  };

  const username = session?.user?.username;

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
  }, []);

  const profileMessageUrl = `${baseUrl}/u/${username}`;

  if (!session || !session?.user) {
    return (
      <div>
        <h1>Not authenticated</h1>
      </div>
    );
  }
  return (
    <>
      <div className="px-4 mx-20 py-8 md:px-8 lg:px-12">
        <NameCard username={username} messageAcceptance={acceptMessages} />

        <CopyLinkCard messageUrl={profileMessageUrl} />

        <MessageSection
          messages={messages}
          handleDeleteMessage={handleDeleteMessage}
          register={register}
          acceptMessages={acceptMessages}
          handleSwitchChange={handleSwitchChange}
          isSwitchLoading={isSwitchLoading}
          fetchMessage={fetchMessage}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
