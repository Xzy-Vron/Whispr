"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUp";
import axios, { AxiosError } from "axios";
import { NextApiResponse } from "next";
import { EmailResponse } from "@/types/emailResponse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function page() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebouncedCallback(setUsername, 300);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const usernameCheck = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-valid-username?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error: any) {
          const axiosError = error as AxiosError<EmailResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    usernameCheck();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const promise = axios.post<EmailResponse>("/api/sign-up", data);
      const response = promise.then((res) => {
        return res.data;
      });

      toast.promise(response, {
        loading: "Signing up...",
        success: (res) => {
          return res.message;
        },
        error: (res) => res.message,
      });

      router.replace(`/verify-${username}`);
    } catch (error) {
      console.log(error);
      toast.error("Error signing up");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="h-screen flex justify-center items-center">

      <Card className="w-full max-w-sm rounded-md ">
        <CardHeader>
          <CardTitle>Whispr</CardTitle>
          <CardDescription>Signup to recieve feedbacks</CardDescription>
          <CardAction className="flex flex-col items-end">
            <CardDescription>Already a user?</CardDescription> {''}
            <Button variant="link"><Link href={"/sign-in"}>Sign in</Link></Button>
          </CardAction>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent  className="space-y-4">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John_Doe"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="John@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="•••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="pt-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Sign up
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
    </>
  );
}
