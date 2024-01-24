
export default async function Page({ params }: { params: { question: string } }) {
    return (
        <div>
            <p>Question: {params.question}</p>
        </div>
    )
  }