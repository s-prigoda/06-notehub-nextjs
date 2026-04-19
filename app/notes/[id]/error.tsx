'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div style={{ padding: '20px', color: 'red' }}>
      <h2>Oops! Something went wrong.</h2>
      <p>{error.message}</p>
    </div>
  );
}
