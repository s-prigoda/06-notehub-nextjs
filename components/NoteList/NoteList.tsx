import { Note } from '@/types/note';
import css from './NoteList.module.css';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <Link href={`/notes/${note.id}`} className={css.link}>
            <h3 className={css.noteTitle}>{note.title}</h3>
            <p className={css.noteText}>
              {note.content.length > 100
                ? note.content.substring(0, 100) + '...'
                : note.content}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
