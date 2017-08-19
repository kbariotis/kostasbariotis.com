import React from 'react';
import GatsbyLink from 'gatsby-link';
import PropTypes from 'prop-types';

const CommaSeparatedTags = ({ tags }) =>
  <div className="tags">
    Talking about:{' '}
    {tags &&
      tags.split(', ').map((tag, index, array) =>
        <span key={index}>
          <GatsbyLink to={`/tag/${tag}/`}>
            {tag}
          </GatsbyLink>
          {index < array.length - 1 ? ', ' : ''}
        </span>
      )}
  </div>;

CommaSeparatedTags.propTypes = {
  tags: PropTypes.string
};

export default CommaSeparatedTags;
