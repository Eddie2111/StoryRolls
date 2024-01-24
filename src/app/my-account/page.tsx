import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {cookies} from 'next/headers';

export default function Page(): JSX.Element {
  const cookieStore = cookies();
  const auth = cookieStore.get('user') || '';
  return (
    <>
      {auth ? (
        <div className='container mx-20 my-5'>
          <h1 className='text-3xl font-bold mb-10'>My Account</h1>
          <div className='flex flex-col md:flex-row gap-5'>
            <CustomCard
              title='Ask a question'
              subtitle='Ask your question to the community'
              link='/my-account/create-question'
            />
            <CustomCard
              title='Write a blog'
              subtitle='Write a blog to let your knowledge spread'
              link='/my-account/create-blog'
            />
          </div>

          <h1 className='text-3xl font-bold my-10'>My Activity</h1>
          <div className='grid gap-x-36 gap-y-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 '>
            <CustomCard
              title='My Questions'
              subtitle='Check the questions you have asked'
              link='/my-account/my-questions'
            />
            <CustomCard title='My Blogs' subtitle='Check the blogs you have wrote' link='/my-account/my-blogs' />
            <CustomCard title='My Comments' subtitle='Check the comments you have wrote' link='/my-account/#' />
            <CustomCard title='My Reports' subtitle='Check the contents you have reported' link='/my-account/#' />
          </div>
        </div>
      ) : (
        <div className='container mx-20 my-5'>
          <h1 className='text-3xl font-bold mb-10'>User Accounts</h1>
          <div className='flex flex-col md:flex-row gap-5'>
            <CustomCard title='Login' subtitle='Use your existing account' link='/my-account/login' />
            <CustomCard title='Create an account' subtitle='Sign up with story rolls today' link='/my-account/signup' />
          </div>
        </div>
      )}
    </>
  );
}

interface CustomCardProps {
  title: string;
  subtitle: string;
  link: string;
}

function CustomCard(data: CustomCardProps): JSX.Element {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.subtitle}.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'></div>
        </div>
      </CardContent>

      <CardFooter className='flex justify-between'>
        {/* the button has to behave like a link*/}
        <Link href={data.link}>
          <Button>Continue</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
