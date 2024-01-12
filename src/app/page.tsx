import Image from 'next/image'
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import BlogSection from './home/blog-section';
export default function Home() {
  return (
    <section>
      <main className="flex-1 bg-gray-100 py-8">
        <section className="text-center py-16 ">
          <h2 className="text-4xl font-bold">Welcome to StoryRolls</h2>
          <p className="mt-4 text-gray-600">A place where stories come to life.</p>
        </section>
        <section className="grid gap-8 p-8 md:grid-cols-2 lg:grid-cols-3">
        </section>
      </main>
      <BlogSection/>
    </section>
  )
}
