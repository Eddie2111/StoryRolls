"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUser } from "@/db/models/login-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.string().email().min(12, "Email is too short").max(35, "Email is too long").max(35),
    password: z.string().min(8).max(100),
});

export default function BlogForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await LoginUser(values);
            console.log(response);
            if (response?.data) {
                toast.success(response.message);
                router.push("/my-account");
            } else {
                toast.warning(response.message);
            }
        } catch (err) {
            toast.warning("Error logging in, try refreshing the page");
            console.log(err);
        }
    }
    return (
        <Card>
            <Form {...form}>
                <CardHeader>
                    <h1 className="text-3xl text-center font-bold">Create your account</h1>
                </CardHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John@email.com" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your email.</FormDescription>
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
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription>Select a strong password.</FormDescription>
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
    );
}
