// Common type definitions for the application
import type { ReactNode, FC } from 'react';

export interface SiteMetadata {
  author: string;
  title: string;
  siteUrl: string;
  description: string;
}

export interface Frontmatter {
  date: string;
  path: string;
  tags?: string;
  title: string;
  draft: boolean;
}

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
}

export interface MarkdownRemarkConnection {
  edges: MarkdownEdge[];
}

export interface ImageFluid {
  aspectRatio: number;
  base64: string;
  sizes: string;
  src: string;
  srcSet: string;
}

export interface File {
  sourceInstanceName: string;
  absolutePath: string;
  relativePath: string;
  sourceUrl?: string;
  sourceModifiedTime?: string;
}

// Gatsby page query result types
export interface PageData {
  site: {
    siteMetadata: SiteMetadata;
  };
  allMarkdownRemark: MarkdownRemarkConnection;
  file?: File;
  allFile: {
    edges: Array<{
      node: File;
    }>;
  };
}

export type ComponentProps<T extends Record<string, any>> = T & {
  children?: ReactNode;
};

export type GatsbyPageProps<DataType, ContextType = any> = {
  data: DataType;
  location: any;
  navigate?: any;
  pageContext?: ContextType;
};
