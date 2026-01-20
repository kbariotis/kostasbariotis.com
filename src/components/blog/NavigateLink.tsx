import React from 'react';
import { Link } from 'gatsby';
import dateformat from 'dateformat';

interface PostData {
  frontmatter: {
    path: string;
    title: string;
    date: string;
  };
  excerpt: string;
}

interface NavigateLinkProps {
  post: PostData;
}

const NavigateLink = ({ post }: NavigateLinkProps) =>
  post && (
    <div>
      <Link
        css={{
          fontSize: '1.11em',
          fontWeight: 'bold',
          color: '#8ab2ff',
          marginBottom: '5px',
        }}
        to={post.frontmatter.path}
      >
        {post.frontmatter.title}
      </Link>
      <div>{dateformat(post.frontmatter.date, 'd mmmm yyyy')}</div>
      <p>{`${post.excerpt}`}</p>
    </div>
  );

export default NavigateLink;
