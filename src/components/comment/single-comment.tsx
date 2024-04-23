"use client";
import React, { useState } from "react";

import { toast } from "sonner";

import { CreateBlogComments, type ReturnProps } from "@/utils/comments/create-blog-comments";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CommentBox({ id }: { id: string }) {
    const [commentBody, setCommentBody] = useState<string>("");
    const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(commentBody);
        const blogID = parseInt(id) || 0;
        const response: ReturnProps = await CreateBlogComments({
            body: commentBody,
            blogPostId: blogID,
        });
        console.log(response);
        setCommentBody("");
        if (response?.data) {
            toast.success(response?.message || "Your comment has been posted");
        } else {
            toast.warning(response?.message || "Failed to post comment");
        }
    };

    return (
        <form onSubmit={submitHandle}>
            <div className="flex flex-row gap-2">
                <AvatarComponent />
                <div className="flex w-full items-center">
                    <Textarea
                        name="comment"
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
