import { getBlogByID } from "@/utils/getBlogs";
export default async function Page({ params }: { params: { blog: string } }) {
  const blog = await getBlogByID(params.blog);
  const blogBody = blog?.data?.body || "";
  const convertedBody = blogBody.toString() || "";
  if (!blog) return <div>loading</div>;
  if (!blog.data) return <div>No Blogs Found</div>;
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold">{blog.data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: convertedBody || "" }}></div>
    </div>
  );
}
