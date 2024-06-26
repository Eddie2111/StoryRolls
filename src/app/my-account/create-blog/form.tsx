"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import CreateBlog from "@/utils/blogs/createBlogs";
import { Button } from "@/components/ui/button";
import Editor from "@/components/editor/jodit";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import React from "react";
import { z } from "zod";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    body: z.string().min(1, { message: "Body is required" }).max(100000, { message: "Body must be less than 10000 characters" }),
    tags: z.string().min(1, { message: "Tags are required" }),
    category: z.string().min(1, { message: "Category is required" }),
});

export default function BlogForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            body: "",
            tags: "",
            category: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await CreateBlog(values);
            console.log(values);
            if (response) {
                toast("Blog created successfully");
                setInterval(() => {
                    router.push("/my-account");
                }, 2000);
                form.reset();
            } else {
                toast("Something went wrong, try again?");
            }
        } catch (err) {
            // toast(err.message || "Something went wrong, try again?");
            console.log(err);
        }
    }
    return (
        <Form {...form}>
            <h1 className="text-3xl text-center font-bold">Create a blog</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <div className="flex flex-col md:flex-row justify-between">
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input placeholder="Technology, Journey" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your blog tags. Must contain some good words seperated by commas that will help users find your
                                    blog.
                                </FormDescription>
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
                                    This is your blog category. It will be used to categorize and sort your blog out from all the other
                                    blogs.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
