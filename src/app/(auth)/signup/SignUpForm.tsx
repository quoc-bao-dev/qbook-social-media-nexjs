"use client";

import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
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
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterBody, RegisterBodyType } from "@/schemaValidation/auth.schema";
import { useRegisterMutation } from "@/queries/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SignUpForm() {

  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const registerMutation = useRegisterMutation()

  const form = useForm({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(value: RegisterBodyType) {
    setError(null)
    if (registerMutation.isPending) return
    try {

      const result = await registerMutation.mutateAsync(value)

      toast({
        description: result.data.message,
      })
      router.push("/")

      router.refresh()

    } catch (error) {
      console.log(error);

      setError("Something went wrong")
    }
  }

  return (
    <Form {...form}>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={registerMutation.isPending} type="submit" className="w-full">
          Create account
        </LoadingButton>
      </form>
    </Form>
  );
}
