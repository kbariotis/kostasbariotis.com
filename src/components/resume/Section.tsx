import React from 'react';
import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h3
        css={{
          color: '#8ab2ff',
          textTransform: 'uppercase',
          paddingBottom: '1rem',
          marginBottom: '0',
        }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </section>
  );
}
