'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod";
import React from "react";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"

import Tiptap from './tiptap';

const FormSchema = z.object({
    title: z.string().min(1).max(100),
    body: z.string().min(1).max(1000),
    description: z.string().min(1).max(50000),
    tags: z.string().min(4).max(100),
    category: z.string().min(1).max(100),
    coverImage: z.string().min(1).max(100),
});

export default function BlogForm(){
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onChange",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            body: "",
            description: "",
            tags: "",
            category: "",
            coverImage: []
        },
      })
    function onSubmit(values: z.infer<typeof FormSchema>) {
        const formdata = new FormData();
        formdata.append("title", values.title);
        formdata.append("body", values.body);
        formdata.append("description", values.description);
        formdata.append("tags", values.tags);
        formdata.append("category", values.category);
        formdata.append("coverImage", values.coverImage);
        console.log(formdata, values)
    }
    return(
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
                    <Input placeholder="Once there was a" {...field} />
                </FormControl>
                <FormDescription>
                    This is your blog title. It should be short and descriptive.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <div className="flex flex-col md:flex-row justify-between">
            <FormField
                control={form.control}
                name="tags"
                className="w-full"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                    <Input placeholder="Technology, Journey" {...field} />
                    </FormControl>
                    <FormDescription>
                    This is your blog tags. Must contain some good words seperated by commas that will help users find your blog.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="category"
                className="w-1/2"
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
            </div>
            <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                    <Input placeholder="https://www.google.com" {...field} />
                    </FormControl>
                    <FormDescription>
                    This is your blog cover image. It should be short and descriptive.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="body"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Blog</FormLabel>
                        <FormControl>
                            <div>
                                <Tiptap description={field.value} onChange={(richText: string) => field.onChange(richText)}/>
                            </div>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
}