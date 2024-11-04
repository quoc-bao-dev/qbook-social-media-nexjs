"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../../components/PasswordInput";
import { useState } from "react";
import { useLoginMutation } from "@/queries/useAuth";
import { LoginBody, LoginBodyType } from "@/schemaValidation/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {

  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  const loginMutation = useLoginMutation();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(value: LoginBodyType) {

    setError(null);

    try {
      const result = await loginMutation.mutateAsync(value);

      toast({
        description: result.data.message,
      })

      router.push("/");
      router.refresh();

    } catch (error) {
      console.log(error);

      setError("Something went wrong");
    }

  }
  return (
    <Form {...form}>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={loginMutation.isPending} type="submit" className="w-full">
          Log in
        </LoadingButton>
      </form>
    </Form>
  );
}
