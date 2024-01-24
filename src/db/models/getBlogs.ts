'use server';
import Prisma from '@/lib/prisma';
import {BlogPost} from '@prisma/client';

interface MessageProps {
  message: string;
  error: string;
  data?: BlogPost[] | null;
}

export async function GetBlogs(): Promise<MessageProps> {
  try {
    const blogs = await Prisma.blogPost.findMany();
    return {
      message: 'Blogs found',
      error: '',
      data: blogs,
    };
  } catch (error) {
    console.log('Error getting blogs:', error);
    return {
      message: 'Error retriving blogs, try again?',
      error: 'Error retriving blogs, connection failure.',
      data: null,
    };
  }
}

export async function getMoreBlogs(): Promise<MessageProps> {
  try {
    // get more
    const blogs = await Prisma.blogPost.findMany();
    console.log(blogs);
    return {
      message: 'Blogs found',
      error: '',
      data: blogs,
    };
  } catch (error) {
    console.log('Error getting blogs:', error);
    return {
      message: 'Error retriving blogs, try again?',
      error: 'Error retriving blogs, connection failure.',
      data: null,
    };
  }
}

// export async function getCategoriesofBlogs(): Promise<BlogPost[] | null>{
//     try{
//         const categories = await Prisma.blogPost.findMany({
//             select: {
//                 category: true
//             }
//         })
//         return categories
//     } catch (error) {
//         console.log('Error getting categories:', error)
//         return []
//     }
// }
