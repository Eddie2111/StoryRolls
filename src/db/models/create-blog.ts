'use server'
import Prisma from '@/lib/prisma'
import {BlogPostProps} from '@/types/BlogPost.d'

async function createBlogPost({title, body, userID, tags, category}: BlogPostProps) {
    try {
      const newBlogPost = await prisma.blogPost.create({
        data: {
          title: title,
          body: body,
          userID: userID,
          tags: tags,
          category: category,
        },
      });
      console.log('New blog post created:', newBlogPost);
    } catch (error) {
      console.error('Error creating blog post:', error);
    } finally {
      await prisma.$disconnect();
    }
  }