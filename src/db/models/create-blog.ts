'use server'
import Prisma from '@/lib/prisma'
import {BlogPostProps} from '@/types/BlogPost.d'

async function createBlogPost({title, body, userID, tags, category}: BlogPostProps) {
    try {
      const newBlogPost = await Prisma.blogPost.create({
        data: {
          title: title || 'Untitled',
          body: body || 'Untitled',
          userID: userID || 1,
          tags: tags || 'Untitled',
          category: category || 'Untitled',
        },
      });
      console.log('New blog post created:', newBlogPost);
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  }