"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
export default function ContentCard({
  title,
  category,
  id,
  tags,
  author,
  createdAt,
}: {
  title: string;
  category: string;
  id: number;
  tags: string;
  author: string;
  createdAt: string;
}): JSX.Element {
  const Image1: string = `https://images.unsplash.com/photo-1703672141188-117ba6518b12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
  const date = new Date(createdAt || "");
  const splittedDate = date.toDateString() || "Sun Jan 0 2020";
  if (!title) {
    return (
      <Card className="w-[18rem] mx-auto">
        <CardContent className="flex flex-col justify-center space-y-4 mt-5">
          <h3 className="text-lg font-bold h-6 shimmer animate-pulse"> </h3>
          <div className="flex flex-row gap-2">
            <Badge className="block shimmer animate-pulse">Category</Badge>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-500 dark:text-gray-400 shimmer animate-pulse">Published By: Author</p>
            <p className="text-gray-500 dark:text-gray-400 shimmer animate-pulse">Published At: Date</p>
          </div>
          <Link
            className="text-center h-9 bottom-10 rounded-md px-4 py-2 text-sm font-medium text-black bg-white dark:text-black dark:bg-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white shadow-md shadow-slate-400 duration-300 shimmer animate-pulse"
            href="/"
          >
            Read More
          </Link>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="w-[18rem] mx-auto">
      <Image
        alt="Image"
        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
        height="310"
        src={Image1}
        width="550"
      />
      <CardContent className="flex flex-col justify-center space-y-4 mt-5">
        <h3 className="text-lg font-bold">{title.slice(0, 38) + "..." || " "}</h3>
        <div className="flex flex-row gap-2">
          <Badge className="block">{category || " "}</Badge>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500 dark:text-gray-400">Published By: {author || " "}</p>
          <p className="text-gray-500 dark:text-gray-400">Published At: {splittedDate || "Sun Jan 0 2020"}</p>
        </div>
        <Link
          className="text-center h-9 bottom-10 rounded-md px-4 py-2 text-sm font-medium text-black bg-white dark:text-black dark:bg-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white shadow-md shadow-slate-400 duration-300"
          href={"/blogs/" + id.toString()}
        >
          Read More
        </Link>
      </CardContent>
    </Card>
  );
}
