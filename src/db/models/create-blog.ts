'use server';
import Prisma from '@/lib/prisma';
import {BlogPostProps} from '@/types/BlogPost.d';
interface MessageProps {
  message: string;
  error: string;
  data?: string;
}
export default async function createBlogPost({data}: BlogPostProps): Promise<MessageProps> {
  try {
    const newBlogPost = await Prisma.blogPost.create({
      data: {
        title: data?.title || 'Untitled',
        body: JSON.parse(data?.body as string) || {},
        userID: data?.userID || 1,
        tags: data?.tags || 'Untitled',
        category: data?.category || 'Untitled',
      },
    });
    console.log('New blog post created:', newBlogPost);
    return {
      message: 'Blog post created',
      error: '',
      data: 'new post created',
    };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return {
      message: 'Error creating blog post, try again?',
      error: 'Error creating blog post, connection failure.',
      data: 'error creating post',
    };
  }
}
