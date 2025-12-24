"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod/v4"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

const formSchema = z
  .object({
    name: z.string().min(2, "name must be at least 2 characters"),
    email: z.email(),
    password: z.string().min(6, "too short password"),
    confirmPassword: z.string().min(6, "too short password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords does'nt match",
    path: ["confirmPassword"],
  })

type signupForm = z.infer<typeof formSchema>

export const SignUpForm = () => {
  const router = useRouter()

  const form = useForm<signupForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: signupForm) => {
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/")
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
      },
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  disabled={form.formState.isLoading}>
                  <Image
                    src="/github.svg"
                    alt="github"
                    width={20}
                    height={20}
                  />
                  Continue with Github
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  disabled={form.formState.isLoading}>
                  <Image
                    src="/google.svg"
                    alt="google"
                    width={20}
                    height={20}
                  />
                  Continue with Google
                </Button>
              </div>

              <div className="grid gap-6">
                <FieldGroup>
                  <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>name</FieldLabel>
                        <Input
                          {...field}
                          id="name"
                          aria-invalid={fieldState.invalid}
                          placeholder="John Doe"
                          disabled={form.formState.isSubmitting}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>email</FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="jhson@gmail.com"
                          disabled={form.formState.isSubmitting}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>password</FieldLabel>
                        <Input
                          {...field}
                          id="password"
                          aria-invalid={fieldState.invalid}
                          placeholder="****"
                          type="password"
                          autoComplete="off"
                          disabled={form.formState.isSubmitting}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>confirm password</FieldLabel>
                        <Input
                          {...field}
                          id="confirmpassword"
                          aria-invalid={fieldState.invalid}
                          placeholder="****"
                          type="password"
                          autoComplete="off"
                          disabled={form.formState.isSubmitting}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <div className="flex flex-col gap-4 w-full">
              <Field orientation="vertical">
                <Button
                  className="w-full"
                  type="submit"
                  disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </Field>
              <div className="text-center text-sm">
                Already have an account
                <Link
                  href="/sign-in"
                  className="underline underline-offset-4 hover:text-primary">
                  Sign in
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
