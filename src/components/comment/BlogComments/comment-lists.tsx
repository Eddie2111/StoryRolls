import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GetCommentsByPost } from "@/utils/comments/get-all-comments";
import { GetUserbyID } from "@/utils/users/getUser";

export async function CommentLists({ id }: { id: string }) {
    const body = await GetCommentsByPost(id || "0");
    const commentLength = body?.data?.length || 0;
    if (!body.data) {
        return <div>Loading </div>;
    } else {
        return (
            <div className="grid gap-6">
                <h2 className="font-semibold text-xl">{commentLength} Comments</h2>
                {body &&
                    body?.data?.map(async (items: any, index: number): Promise<any> => {
                        console.log(items, "one item here");
                        const splittedDate = items.createdAt.toDateString() || "Sun Jan 0 2020";
                        const userName = await GetUserbyID(items?.authorId || 0);
                        return (
                            <SingleComment
                                key={index}
                                username={userName?.data?.name || " "}
                                commentBody={items?.body}
                                date={splittedDate}
                            />
                        );
                    })}
            </div>
        );
    }
}

export function SingleComment({
    avatarImage,
    avatarFallback,
    username,
    commentBody,
    date,
}: {
    avatarImage?: string;
    avatarFallback?: string;
    username: string;
    commentBody: string;
    date: string;
}) {
    return (
        <div className="text-sm flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
                <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                <AvatarFallback>{avatarFallback || "AV"}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1.5">
                <div className="flex items-center gap-2">
                    <div className="font-semibold">{username}</div>
                    <div className="text-gray-500 text-xs dark:text-gray-400">{date || "5 months ago"}</div>
                </div>
                <div>{commentBody}</div>
            </div>
        </div>
    );
}
