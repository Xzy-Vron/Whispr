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
import { signInSchema } from "@/schemas/signIn";
import { signIn } from "next-auth/react";

export default function page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const promise =  signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    toast.promise(promise, {
      loading: "Signing in...",
      success: (res) => {
        return "Signed in successfully";
      },
      error: (res) => {
        return "Error signing in";
      },
    });

    const result = await promise;

    if (result?.url) {
      setTimeout(() => {
        router.replace("/dashboard");
      });
    }
  };

  return (
    <>
      <div className="h-screen px-4 flex justify-center items-center">
        <Card className="w-full max-w-sm rounded-md ">
          <CardHeader>
            <CardTitle className="flex items-center mb-1 gap-2">
              <div className="size-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground">
                W
              </div>
              Whispr
            </CardTitle>
            <CardDescription>Sign in to recieve feedbacks</CardDescription>
            <CardAction className="flex flex-col items-end">
              <CardDescription>Not a user?</CardDescription> {""}
              <Button variant="link">
                <Link href={"/sign-up"}>Sign up</Link>
              </Button>
            </CardAction>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  name="identifier"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Username</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          type="text"
                          placeholder=""
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
                        <Input
                          type="password"
                          placeholder="••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="pt-4">
                <Button type="submit" className="w-full cursor-pointer">
                  Sign in
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
