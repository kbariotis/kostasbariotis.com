import React from 'react';
import { css } from '@emotion/react';
import type { ReactNode } from 'react';

interface ExperienceItemProps {
  title: string;
  description: string;
  duration: string;
  bullets?: string[];
  skills?: string;
}

const skillsStyle = css({
  fontSize: '0.9rem',
  color: '#666',
  fontStyle: 'italic',
  marginBottom: '0.5rem',
  marginTop: '0.2rem',
});

export default function ExperienceItem({
  title,
  description,
  duration,
  bullets,
  skills,
}: ExperienceItemProps) {
  return (
    <div style={{ paddingBottom: '1rem' }}>
      <h4>{title}</h4>
      <h5>{duration}</h5>

      {skills && (
        <div css={skillsStyle}>
          <strong>Technologies:</strong> {skills}
        </div>
      )}
      <p style={{ marginBottom: '0.5rem' }}>{description}</p>
      {bullets && (
        <ul style={{ paddingBottom: 0, marginBottom: 0 }}>
          {bullets.map((bullet, index) => (
            <li style={{ marginBottom: '0.3rem' }} key={index}>
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
