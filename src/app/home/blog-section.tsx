import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
export default function BlogSection(): JSX.Element {
  const Image1: string = `https://images.unsplash.com/photo-1703672141188-117ba6518b12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
  return (
    <main>
      <section className="flex flex-col md:flex-row my-10 container gap-8">
        <Link href="/blogs/blog-1">
          <Card className="w-[24rem] mx-auto">
            <Image
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src={Image1}
              width="550"
            />
            <CardContent className="flex flex-col justify-center space-y-4 mt-5">
              <h3 className="text-lg font-bold">Post Title</h3>
              <p className="text-gray-500 dark:text-gray-400">Brief description of the blog post.</p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Read More
              </Link>
            </CardContent>
          </Card>
        </Link>
        <Link href="/blogs/blog-2">
          <Card className="w-[24rem] mx-auto">
            <div className="w-full" />
            <Image src={Image1} alt="Avatar" width={280} height={50} className="mx-auto" style={{ width: "100%", height: "auto" }} />
            <CardHeader className="text-lg font-semibold truncate">Blog Title 2</CardHeader>
            <CardContent className="truncate">This is the description of the second blog.</CardContent>
          </Card>
        </Link>
        <Link href="/blogs/blog-3">
          <Card className="w-[24rem] mx-auto">
            <div className="w-full" />
            <Image src={Image1} alt="Avatar" width={280} height={50} className="mx-auto" style={{ width: "100%", height: "auto" }} />
            <CardHeader className="text-lg font-semibold truncate">Blog Title 3</CardHeader>
            <CardContent className="truncate">This is the description of the third blog.</CardContent>
          </Card>
        </Link>
      </section>

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
