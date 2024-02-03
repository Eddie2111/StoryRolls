"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ghb1A2vfdHa
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBlogsBySearching } from "@/utils/getBlogs";
export default function Search() {
  return (
    <div className="relative w-full max-w-sm">
      <AlertDialogDemo />
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="relative w-full max-w-sm">
          <Input className="pl-8" placeholder="Search" type="search" />
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 pointer-events-none" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Search for blogs</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <SearchComponent />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
import { BlogPost } from "@prisma/client";
import { ManyReturnProps } from "@/types/BlogPost.d";
import ResultCard from "@/components/contents/resultCard";
import { GetBlogsProps, CategoriesProps, CategoriesDataProps } from "@/types/BlogPost.d";
function SearchComponent() {
  const [search, setSearch] = React.useState<string>("");
  const [data, setData] = React.useState<BlogPost[] | null>(null);
  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const result: ManyReturnProps = await getBlogsBySearching(search);
    setData(result?.data || []);
  };
  return (
    <div className="">
      <div>
        <Input
          className="w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeSearch(e)}
          placeholder="Type to search"
          type="search"
        />
      </div>
      <div className="overflow-y-auto h-96">
        {data &&
          data.map((blog: BlogPost, index: number) => {
            return (
              <div key={index}>
                <ResultCard
                  id={(blog?.id as number) || 0}
                  title={blog?.title as string}
                  createdAt={blog?.createdAt.toString() as string}
                  category={blog?.category as string}
                  keywords={blog?.tags as string}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
