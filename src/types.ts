// Common type definitions for the application
import type { ReactNode, FC } from 'react';
import type { PageProps } from 'gatsby';

// Site metadata
export interface SiteMetadata {
  author: string;
  title: string;
  siteUrl: string;
  description: string;
}

// Frontmatter types
export interface Frontmatter {
  date: string;
  path: string;
  tags?: string;
  title: string;
  draft: boolean;
}

// Image types
export interface ImageFluid {
  aspectRatio: number;
  base64: string;
  sizes: string;
  src: string;
  srcSet: string;
}

export interface ChildImageSharp {
  fluid?: ImageFluid;
  fixed?: any;
}

export interface File {
  sourceInstanceName: string;
  absolutePath: string;
  relativePath: string;
  sourceUrl?: string;
  sourceModifiedTime?: string;
  childImageSharp?: ChildImageSharp;
}

// Markdown types
export interface MarkdownNode {
  excerpt: string;
  html: string;
  id: string;
  timeToRead: number;
  frontmatter: Frontmatter;
}

export interface MarkdownEdge {
  node: MarkdownNode;
  next?: {
    frontmatter: {
      path: string;
    };
  };
  previous?: {
    frontmatter: {
      path: string;
    };
  };
}

export interface MarkdownRemarkConnection {
  edges: MarkdownEdge[];
  totalCount?: number;
}

// Base page data type
export interface BasePageData {
  site: {
    siteMetadata: SiteMetadata;
  };
}

// Context types for templates
export interface PaginationPageContext {
  posts: Array<{
    excerpt: string;
    html: string;
    id: string;
    timeToRead: number;
    frontmatter: Frontmatter;
  }>;
  page: number;
  pagesSum: number;
  prevPath?: string;
  nextPath?: string;
}

// Utility types
export type ComponentProps<T extends Record<string, any>> = T & {
  children?: ReactNode;
};

export type GatsbyPageProps<DataType = any, ContextType = any> = PageProps<DataType, ContextType>;
