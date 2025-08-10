import React, { useCallback, useEffect, useState } from 'react'
import { Message } from '@/models/User';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { acceptMessageSchema } from '@/schemas/acceptMessage';
import * as z from "zod";
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from 'sonner';
import { User } from 'next-auth';

export default function page() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const handleDeleteMessage = (messageId : string) => {
    setMessages(messages.filter((message : Message) => {
      message._id !== messageId
     })
    ); 
  }
  const {data : session} = useSession()

  const form = useForm<z.infer<typeof acceptMessageSchema>> ({
    resolver : zodResolver(acceptMessageSchema)
  })

  const {register, watch, setValue} = form

  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessage = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error("Error accepting messages", {
        description : axiosError.response?.data.message || "Failed to fetch messages settings"
      });
    } finally {
      setIsLoading(false);
    }
  },[setValue]);

  const fetchMessage = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    setIsSwitchLoading(true);
    try {
      const promise = axios.get('/api/get-messages');
      if (refresh) {
        toast.promise(promise, {
          loading : "Refreshing messages...",
          success : (res) => {
            return res.data.message;
          },
          error : (res) => {
            return res.data.message;
          }
        });
      }
      const response = await promise;
      setMessages(response.data.messages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error("Error accepting messages", {
        description : axiosError.response?.data.message || "Failed to fetch messages"
      });
    } finally {
      setIsLoading(false);
      setIsSwitchLoading(false);
    }
  },[setIsLoading, setMessages]);

  useEffect(() => {
    if (!session ||!session?.user) return;
    fetchAcceptMessage();
    fetchMessage();
  }, [session, fetchAcceptMessage, fetchMessage]);

  const handleSwitchChange = async () => {
    try {
      const promise =  axios.post('/api/accept-messages', {
        acceptMessages : !acceptMessages
      })
      setValue("acceptMessages", !acceptMessages);
      toast.promise(promise, {
        loading : "Accepting messages...",
        success : (res) => {
          return res.data.message;
        },
        error : (res) => {
          return res.data.message;
        }
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error accepting messages", {
        description : axiosError.response?.data.message || "Failed to accept messages"
      });
    }
  }

  const {username} = session?.user as User

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileMessageUrl =  `${baseUrl}/u/${username}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileMessageUrl);
    toast.success("Copied to clipboard");
  }

  if (!session ||!session?.user) {
    return (
      <div>
        <h1>Not authenticated</h1>
      </div>
    )
  }
  return (
    <div>

    </div>
  )
}
