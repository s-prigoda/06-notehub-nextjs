import { useState } from 'react';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialData?: { title: string; content: string };
}

export default function NoteForm({
  onSuccess,
  onCancel,
  initialData,
}: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Тут буде логіка відправки через mutation (TanStack Query)
    console.log({ title, content });
    onSuccess();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={css.field}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className={css.actions}>
        <button type="submit" className={css.submitBtn}>
          Save
        </button>
        <button type="button" onClick={onCancel} className={css.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
}
