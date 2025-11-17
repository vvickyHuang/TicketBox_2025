'use client';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Divider } from '@mui/material';

export default function EventPage({ descMD }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(descMD)
      .then((res) => res.text())
      .then(setContent);
  }, []);

  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => (
          <Typography variant='body1' paragraph>
            {children}
          </Typography>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
