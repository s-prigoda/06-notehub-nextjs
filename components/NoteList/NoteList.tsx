'use client';

import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import { Note } from '@/types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      mutation.mutate(id);
    }
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <div className={css.contentWrapper}>
            <div className={css.header}>
              <h3 className={css.title}>{note.title}</h3>
              <span className={`${css.tag} ${css[note.tag.toLowerCase()]}`}>
                {note.tag}
              </span>
            </div>

            <p className={css.excerpt}>{note.content}</p>

            <div className={css.actions}>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                className={css.deleteBtn}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? '...' : 'Delete'}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
