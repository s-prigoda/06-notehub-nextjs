'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const { id } = useParams();
  const noteId = Array.isArray(id) ? id[0] : id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId as string),
    enabled: !!noteId,
  });

  if (isLoading) return <p className={css.status}>Loading details...</p>;
  if (isError || !note) return <p className={css.error}>Note not found.</p>;

  return (
    <div className={css.container}>
      <article className={css.card}>
        <h1 className={css.title}>{note.title}</h1>
        <span className={css.tag}>{note.tag}</span>
        <p className={css.content}>{note.content}</p>
        <time className={css.date}>
          {new Date(note.createdAt).toLocaleString()}
        </time>
      </article>
    </div>
  );
}
