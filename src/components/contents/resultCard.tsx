import { Badge } from "@/components/ui/badge";
import Link from "next/link";
interface ComponentProps {
    id: number;
    title: string;
    createdAt: string;
    category: string;
    keywords: string;
}
export default function Component(props: ComponentProps): JSX.Element {
    const date = new Date(props?.createdAt || "");
    const splittedDate = date.toDateString() || "Sun Jan 0 2020";
    return (
        <Link href={`/blogs/${props.id}`}>
            <div className="w-full p-4 shadow-md shadow-slate-300 my-5">
                <h1>{props?.title || " "}</h1>
                <div className="flex flex-row gap-2 justify-between">
                    <p>{splittedDate || ""}</p>
                    <Badge className="h-6 rounded-lg px-2 text-center bg-black text-white text-sm">{props?.category || " "}</Badge>
                </div>
                <p>Keywords: {props.keywords}</p>
            </div>
        </Link>
    );
}
