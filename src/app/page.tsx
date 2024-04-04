import { CardHeader, CardContent, Card } from "@/components/ui/card";
import BlogSection from "./home/blog-section";
import Image from "next/image";
export default function Home() {
    return (
        <section>
            <main className="flex-1 py-8 bg-gradient-to-r from-gray-200 to-slate-300">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Welcome to Story Rolls
                            </h1>
                            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                A place where stories come to life.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="grid gap-8 p-8 md:grid-cols-2 lg:grid-cols-3"></section>
            </main>
            <div className="rounded-lg w-[98%] mx-auto">
                <BlogSection />
            </div>
        </section>
    );
}
