import { getBlogByID } from "@/utils/getBlogs";
export default async function Page({ params }: { params: { blog: string } }) {
  const blog = await getBlogByID(params.blog);
  const blogBody = blog?.data?.body || "";
  const convertedBody = blogBody.toString() || "";
  if (!blog) return <div>loading</div>;
  if (!blog.data) return <div>No Blogs Found</div>;
  return (
    <div>
      <p>{blog?.data?.title}</p>
      <div dangerouslySetInnerHTML={{ __html: convertedBody || "" }}></div>
    </div>
  );
}
