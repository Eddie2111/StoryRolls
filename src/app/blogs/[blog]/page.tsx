export default function Page({ params }: { params: { blog: string } }) {
    return <div>My Post: {params.blog}</div>
  }