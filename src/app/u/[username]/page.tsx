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
import { useCompletion } from "@ai-sdk/react";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

export default function InputForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { username } = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const {
    completion,
    complete,
    isLoading: isSuggesting,
  } = useCompletion({
    api: "/api/suggest-messages",
  });
  
  const handleSuggest = async () => {
    return await complete("", {
      body: {
        conversationContext: form.getValues("content"),
      }
    });
  };

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
        form.reset({ content: "" });
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

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("content", suggestion);
    handleSuggest();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start p-10">
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
                  <FormLabel>
                    <h4 className="scroll-m-20 text-xs font-semibold tracking-tight text-muted-foreground">
                      Send Message to{" "}
                      <span className="text-lg text-white font-bold">
                        @{username}
                      </span>
                    </h4>
                  </FormLabel>
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
      <div className="h-100 w-2/3 ml-80 flex flex-col items-start">
        <Button className="mb-10 w-40" variant={"outline"} onClick={() => handleSuggest()} disabled={isSuggesting}>
          {isSuggesting ? "Suggesting..." : "Suggest Messages"}
        </Button>
        <Card className="h-80 w-2/3 flex items-center justify-center">
          {completion ? (
            completion.split("||").map((suggestion, index) => (
              <Card
                key={index}
                className="h-fit py-4 px-4 w-2/3 flex items-center justify-center cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <CardContent className="text-start">
                  <p>{suggestion}</p>
                </CardContent>
              </Card>
            ))
          ) :isSuggesting? (
            <Card className="">
              <CardContent>
                <p className="text-center text-foreground-muted ">
                  <LoaderCircle size={20} className="animate-spin"/>
                </p>
              </CardContent>
            </Card>
          )
           :(
            <Card className="">
              <CardContent>
                <p className="text-center text-foreground-muted ">
                  No suggestions available
                </p>
              </CardContent>
            </Card>
          )}
        </Card>
      </div>
    </>
  );
}

