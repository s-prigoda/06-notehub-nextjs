'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import css from './NoteForm.module.css';
import { NoteTag } from '@/types/note';
interface NoteFormProps {
  onClose: () => void;
}

interface FormValues {
  title: string;
  tag: string;
  content: string;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Title is required'),
  tag: Yup.string()
    .oneOf(['Personal', 'Work', 'Study'], 'Invalid tag')
    .required('Tag is required'),
  content: Yup.string().max(500, 'Maximum 500 characters'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  return (
    <Formik<FormValues>
      initialValues={{ title: '', tag: '', content: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutation.mutate({
          ...values,
          tag: values.tag as NoteTag,
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.fieldWrapper}>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.fieldWrapper}>
            <label htmlFor="tag">Tag</label>
            <Field name="tag" as="select" className={css.input}>
              <option value="" disabled>
                Select a tag
              </option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>

          <div className={css.fieldWrapper}>
            <label htmlFor="content">Content (Optional)</label>
            <Field name="content" as="textarea" className={css.textarea} />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              onClick={onClose}
              className={css.cancelBtn}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitBtn}
              disabled={isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? 'Sending...' : 'Create Note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
