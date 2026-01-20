import React from 'react';
import type { ReactNode } from 'react';

import Post from './Post';

interface PostNode {
  frontmatter: {
    title: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface PostsProps {
  posts: PostNode[];
}

const Posts = ({ posts }: PostsProps) => (
  <div>
    {posts
      .filter((post) => post.frontmatter.title.length > 0)
      .map((post, index) => (
        <Post key={index} post={post} />
      ))}
  </div>
);

export default Posts;
