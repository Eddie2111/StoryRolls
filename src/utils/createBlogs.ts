'use server';
import {cookies} from 'next/headers';
import createBlog from '@/db/models/create-blog';
import {BlogPost} from '@prisma/client';
import jwt from 'jsonwebtoken';
import Prisma from '@/lib/prisma';
import {BlogPostProps} from '@/types/BlogPost.d';

export default async function createBlogs(data: {
  title: string;
  body: string;
  category: string;
  tags: string;
}): Promise<boolean> {
  const {title = '', body = '', category = '', tags = ''} = data;
  const cookieStore = cookies();
  const jwtsecret = (process.env.JWT_SECRET as string) || 'Untitled';
  const userCookie = cookieStore.get('user') || {name: '', value: ''};
  const token = userCookie.value || '';
  const decodedToken = ((await jwt.verify(token, jwtsecret)) as {id: number; iat: number; exp: number}) || {
    id: 0,
    iat: 0,
    exp: 0,
  };
  try {
    const blogCreated = {
      title: title.trim() || 'Untitled',
      body: body.trim() || 'Untitled',
      category: category.trim() || 'Untitled',
      tags: tags.trim() || 'Untitled',
      userID: decodedToken.id || 0,
    };
    const pushData = await Prisma.blogPost.create({data: blogCreated});
    console.log(blogCreated);
    if (!blogCreated) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error creating blog:', error);
    return false;
  }
}
