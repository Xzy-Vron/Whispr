"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Message } from "@/models/User";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { acceptMessageSchema } from "@/schemas/acceptMessage";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "sonner";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Copy, Loader, RefreshCcw } from "lucide-react";
import MessageCard from "@/components/myComponents/messageCard";

export default function page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");

  const handleDeleteMessage = (messageId: string) => {
    setMessages(
      messages.filter((message: Message) => {
        message._id !== messageId;
      })
    );
  };
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof acceptMessageSchema>>({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;

  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsLoading(true);
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
      setIsLoading(false);
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
        if (response.data && Array.isArray(response.data.messages)) {
          setMessages(response.data.messages);
        } else {
          toast.error("Error fetching messages", {
            description: "Invalid response data",
          });
        }
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
    fetchAcceptMessage();
    fetchMessage();
  }, [session, fetchAcceptMessage, fetchMessage]);

  const handleSwitchChange = async () => {
    try {
      const promise = axios.post("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast.promise(promise, {
        loading: "Accepting messages...",
        success: (res) => {
          return res.data.message;
        },
        error: (res) => {
          return res.data.message;
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log('Error response:', axiosError.response);
      toast.error("Error accepting messages", {
        description:
          axiosError.response?.data.message || "Failed to accept messages",
      });
    }
  };

  const username = session?.user?.username;
  console.log('username', username);

  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
  }, []);

  const profileMessageUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileMessageUrl);
    toast.success("Copied to clipboard");
  };

  if (!session || !session?.user) {
    return (
      <div>
        <h1>Not authenticated</h1>
      </div>
    );
  }
    return (
    <>
    <div className="px-4 py-8 md:px-8 lg:px-12">
    <div className="my-8 md:mx-8 lg:mx-auto p-6 bg-white dark:bg-neutral-900 rounded w-full max-  h-20px">
      <h1 className="text-4xl font-bold mb-4">Hello, {username} </h1>
    </div>

    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{" "}
      <div className="flex items-center  dark:bg-neutral-800 rounded">
        <input type="text" value={profileMessageUrl} className="input input-bordered w-full p-2 mr-2" readOnly={true}/>
        {/* flex-grow border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:border-blue-500 */}
        <Button
          variant={"outline"}
          className="bg-gray-100 text-white dark:bg-neutral-900 bg-blur px-4 py-2 rounded"
          onClick={copyToClipboard}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>

    <div className="mb-4">
      <Switch
        {...register("acceptMessages")}
        onChange={handleSwitchChange}
        disabled={isSwitchLoading}
      />
      <span className="ml-2">
        {acceptMessages ? "Accepting messages" : "Not accepting messages"}
      </span>
    </div>
    <Separator />

    <Button
    className="mt-4"
    variant={"outline"}
    onClick={(e) => {
      e.preventDefault();
      fetchMessage(true)}}
    >
      {isLoading? (
        <Loader className=" h-4 w-4 animate-spin" />
      ): (
        <RefreshCcw className=" h-4 w-4" />
      )}
    </Button>
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

      {
      messages.length > 0 ? 
        messages.map((message, index) => (
        <MessageCard 
        key={(message as {_id : string})._id.toString()}
        message={message} 
        onMessageDelete={handleDeleteMessage} 
        />
      )): (
        <p>No messages</p>
      )}
    </div>
    </div>
    </>
    );
}
