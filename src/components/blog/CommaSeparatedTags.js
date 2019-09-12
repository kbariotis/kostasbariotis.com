import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const CommaSeparatedTags = ({ tags }) => (
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

CommaSeparatedTags.propTypes = {
  tags: PropTypes.string,
};

export default CommaSeparatedTags;
