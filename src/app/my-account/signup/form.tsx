'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod";
import React from "react";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createAccount } from '@/utils/accountCreate'

const formSchema = z.object({
    name: z.string().min(3, "Name is too short").max(35, "Name is too long"),
    email: z.string().email().min(12, "Email is too short").max(35, "Email is too long").max(35),
    password: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),
  })

export default function BlogForm(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.password !== values.confirmPassword) {
          form.setError("confirmPassword", {
            type: "manual",
            message: "Passwords do not match",
          })
          return
        } else {
            const response = await createAccount(values)
            console.log(response)
        }

      }
    return(
        <Card>
            <Form {...form}>
                <CardHeader>
                    <h1 className="text-3xl text-center font-bold">Create your account</h1>
                </CardHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>UserName</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John2111" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your user name.
                                    </FormDescription>
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
                                        <Input placeholder="John@email.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your email.
                                    </FormDescription>
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
                                    <Input type='password' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    Select a strong password.
                                    </FormDescription>
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
                                    <Input type='password' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    Type your password again.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Submit</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
