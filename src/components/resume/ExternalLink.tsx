import React from 'react';
import { css } from '@emotion/react';

interface ExternalLinkProps {
  title: string;
  url: string;
  description?: string;
}

const noPrintStyle = css({
  '@media print': {
    display: 'none',
  },
});

export default function ExternalLink({ title, url }: ExternalLinkProps) {
  return (
    <a rel="noopener noreferrer" target="_blank" href={url}>
      {title} <span css={noPrintStyle}>&#x2197;</span>
    </a>
  );
}
