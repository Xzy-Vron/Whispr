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
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
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
          const axiosError = error as AxiosError<ApiResponse>;
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
      const promise = axios.post<ApiResponse>("/api/sign-up", data);
      

      toast.promise(promise, {
        loading: "Signing up...",
        success: (res) => {
          return res.data.message;
        },
        error: (res) => {
          return res.data.message;
        },
      });

      const response = promise.then((res) => {
        return res.data;
      });

      setTimeout(() => {
        router.replace(`/verify/${username}`);
      }, 4000);
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<ApiResponse>;
      
      toast("Error signing up",{
        description : axiosError.response?.data.message
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm rounded-md ">
        <CardHeader>
          <CardTitle className="flex items-center mb-1 gap-2">
              <div className="size-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                W
              </div>
              Whispr
            </CardTitle>
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
                        autoComplete="off"
                        placeholder="John_Doe"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value)
                        }}
                      />
                    </FormControl>
                    <div className="h-0 flex justify-end">
                    {isCheckingUsername && <Loader size={14} className="animate-spin" />}
                    <p className={`text-[11.5px]  ${usernameMessage === "Username is valid" ? "text-green-500" : "text-red-500"}`}>
                      {username && usernameMessage}
                    </p>
                    </div>
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
                        autoComplete="off"
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
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="pt-4">
              <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
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
