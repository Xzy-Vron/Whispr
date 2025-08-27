"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { messageSchema } from "@/schemas/message";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";

export default function InputForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { username } = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof messageSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/send-message", {
        username,
        content: data.content,
      });
      if (response.data && !response.data.success) {
        toast.error(response.data.message);
      }
      if (response.data && response.data.success) {
        toast(response.data.message, {
          description: (
            <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
              <code className="text-white">
                {JSON.stringify(data.content, null, 2)}
              </code>
            </pre>
          ),
        });
        form.reset({content:""});
      }
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error sending message", {
        description: axiosError.response?.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-start p-10 h-screen">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance mb-10">
          Send Message Link
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><h4 className="scroll-m-20 text-xs font-semibold tracking-tight text-muted-foreground">Send Message to <span className="text-lg text-white font-bold">@{username}</span></h4></FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your Message here..."
                      {...field}
                      className="input-description w-full h-30"
                      spellCheck={false}
                      onKeyUp={(e) => e.key === "Enter" && e.preventDefault()}
                    />
                  </FormControl>
                  <div className=" h-0.5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button className="w-full cursor-pointer" type="submit">
              Submit Message
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
