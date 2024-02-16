"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateBlogComments } from "@/utils/blogs/create-blog-comments";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
export default function CommentBox() {
    const [commentBody, setCommentBody] = useState<string>("");

    const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(commentBody);
        const response = await CreateBlogComments({
            body: commentBody,
            blogPostId: 2,
        });
        console.log(response);
        // Add your logic to submit the comment
    };

    return (
        <form onSubmit={submitHandle}>
            <div className="flex flex-row gap-2">
                <AvatarComponent />
                <div className="flex w-full items-center">
                    <Textarea
                        name="comment"
                        type="text"
                        placeholder="Write your comment"
                        className="w-full"
                        value={commentBody}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            setCommentBody(e.currentTarget.value);
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <span>&nbsp;</span>
                <Button className="right-0 ml-full disabled:bg-slate-600" type="submit" disabled={commentBody.length > 0 ? false : true}>
                    Submit
                </Button>
            </div>
        </form>
    );
}

function AvatarComponent() {
    return (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
}
