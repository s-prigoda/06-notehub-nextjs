'use client'; // Error components must be Client Components

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Можна логувати помилку в консоль для дебагу
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '20px', color: 'red' }}>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Try again
      </button>
    </div>
  );
}
