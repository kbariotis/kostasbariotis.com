import React from 'react';
import { Link } from 'gatsby';

interface CommaSeparatedTagsProps {
  tags: string;
}

const CommaSeparatedTags = ({ tags }: CommaSeparatedTagsProps) => (
  <div
    css={{
      color: 'rgba(255, 255, 255, 0.5)',
    }}
  >
    {tags && tags.length && (
      <span>
        Talking about:{' '}
        {tags.split(', ').map((tag, index, array) => (
          <span key={index}>
            <Link to={`/tag/${tag}/`}>{tag}</Link>
            {index < array.length - 1 ? ', ' : ''}
          </span>
        ))}
      </span>
    )}
  </div>
);

export default CommaSeparatedTags;
