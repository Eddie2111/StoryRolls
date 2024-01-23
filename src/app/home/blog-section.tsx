import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import Link from 'next/link'
export default function BlogSection():JSX.Element{
    const Image1: string = `https://images.unsplash.com/photo-1703672141188-117ba6518b12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
    return(
        <main>
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          <Link href="/blogs/blog-1">
            <Card>
              <div className="w-full" />
              <div>
                  <Image src={Image1} alt="Avatar" width={280} height={50} className='mx-auto' style={{ width: '100%', height: 'auto'}}/>
              </div>
              <CardHeader className="text-lg font-semibold truncate">Blog Title 1</CardHeader>
              <CardContent className="truncate">This is the description of the first blog.</CardContent>
            </Card>
          </Link>
          <Link href="/blogs/blog-2">
          <Card>
            <div className="w-full" />
            <Image src={Image1} alt="Avatar" width={280} height={50} className='mx-auto' style={{ width: '100%', height: 'auto'}}/>
            <CardHeader className="text-lg font-semibold truncate">Blog Title 2</CardHeader>
            <CardContent className="truncate">This is the description of the second blog.</CardContent>
          </Card>
          </Link>
          <Link href="/blogs/blog-3">
            <Card>
              <div className="w-full" />
              <Image src={Image1} alt="Avatar" width={280} height={50} className='mx-auto' style={{ width: '100%', height: 'auto'}}/>
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
    )
}