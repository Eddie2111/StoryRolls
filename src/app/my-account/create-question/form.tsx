"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CreateQuestion, type ReturnProps } from "@/utils/questions/createQuestions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Editor from "@/components/editor/jodit";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    body: z.string().min(1, { message: "Body is required" }).max(10000, { message: "Body must be less than 10000 characters" }),
    category: z.string().min(1, { message: "Category is required" }),
});

export default function QuestionForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            body: "",
            category: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response: ReturnProps = await CreateQuestion(values);
            if (response?.data) {
                toast.success(response?.message);
                router.push("/my-account/my-questions");
            } else {
                toast.warning(response?.message);
            }
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h1 className="text-3xl text-center font-bold">Create a question</h1>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Once there was a ..." {...field} />
                            </FormControl>
                            <FormDescription>This is your blog title. It should be short and descriptive.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="Technical / Journalism" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your blog category. It will be used to categorize and sort your blog out from all the other blogs.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blog Body</FormLabel>
                            <FormControl>
                                <Editor placeholder="Start typing..." {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your blog body. It should be long and descriptive. You can use markdown to format your blog. Also
                                you can insert image links using the image icon on the toolbar.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
