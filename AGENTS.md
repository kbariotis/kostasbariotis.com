# kostasbariotis.com - Project Guide

## Project Overview

This is a personal blog built with [Gatsby](http://gatsbyjs.org) and [React](https://facebook.github.io/react/). The project is hosted at [kostasbariotis.com](https://kostasbariotis.com) and showcases articles, projects, and insights from Kostas Bariotis, a Staff Software Engineer.

**Author:** Kostas Bariotis  
**License:** MIT

## Project Structure

```
kostasbariotis.com/
├── blog/                          # Blog post markdown files organized by topic
├── src/                           # Source code
│   ├── templates/                 # React page templates
│   ├── components/                # Reusable React components
│   └── typography.ts              # Typography configuration
├── public/                        # Static build output
├── static/                        # Static assets
├── gatsby-config.js               # Gatsby configuration (plugins, metadata)
├── gatsby-browser.js              # Client-side Gatsby configuration
├── gatsby-ssr.js                  # Server-side rendering configuration
├── gatsby-node.js                 # Build-time Gatsby configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies and scripts
└── README.md                      # Main project README
```

## Tech Stack

- **Framework:** Gatsby 5.13.0
- **UI Library:** React 18.2.0
- **Language:** TypeScript
- **Styling:** Emotion + SASS
- **Content:** Markdown with Remark transformers
- **Deployment:** Netlify
- **Code Quality:** ESLint + Prettier
- **Git Hooks:** Husky + lint-staged

## Available Commands

### Development

```bash
npm run develop
```

Starts the Gatsby development server with hot-reload at `http://localhost:8000`.

### Build

```bash
npm run build
```

Builds the site for production with path prefixing. Output goes to the `public/` directory.

### Serve

```bash
npm run serve
```

Serves the production build locally for testing.

### Code Quality

```bash
npm run lint
```

Runs ESLint on TypeScript files in `src/` and root Gatsby config files with auto-fix enabled.

```bash
npm run type-check
```

Runs TypeScript compiler in check-only mode to verify type safety without emitting files.

### Maintenance

```bash
npm run clean
```

Removes the `.cache/` and `public/` directories for a fresh build.

### Testing

```bash
npm test
```

Currently a placeholder - tests should be implemented.

## Key Features

- **Static Site Generation:** Fast, SEO-friendly content delivery
- **Markdown Blogging:** Posts organized in the `blog/` directory
- **Responsive Design:** Mobile-first React components
- **Image Optimization:** Sharp integration for automatic image optimization
- **RSS Feed:** Automatic feed generation via gatsby-plugin-feed
- **Syntax Highlighting:** Prism.js for code blocks
- **Sitemap Generation:** Automatic XML sitemap creation
- **Offline Support:** Service worker with gatsby-plugin-offline
- **Google Analytics:** Integrated via gatsby-plugin-google-gtag
- **Disqus Comments:** Comment system for blog posts
- **PWA:** Manifest and offline support for installable app

## Development Workflow

1. **Writing Content:** Add markdown files to the `blog/` directory with frontmatter metadata
2. **Local Testing:** Run `npm run develop` to preview changes
3. **Code Changes:** Edit components in `src/` with TypeScript
4. **Linting:** Pre-commit hooks automatically run ESLint and format code
5. **Building:** `npm run build` creates optimized production bundle
6. **Deployment:** Netlify automatically deploys on git push

## Important Notes

- TypeScript is required for all new code in `src/` and Gatsby config files
- Code is automatically linted on commit via Husky hooks
- All Gatsby config files (gatsby-\*.js) are validated during development
- Build outputs to `public/` directory with path prefixing applied
