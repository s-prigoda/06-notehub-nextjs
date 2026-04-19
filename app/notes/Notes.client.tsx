'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './Notes.module.css';

export default function NotesClient() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Дебаунс для пошуку (300мс)
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1); // При новому пошуку повертаємось на 1 сторінку
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search, perPage: 12 }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // Кеш вважається свіжим 5 хвилин
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  return (
    <div className={css.container}>
      <header className={css.toolbar}>
        <SearchBox onChange={debouncedSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={handlePageChange}
            forcePage={page - 1}
          />
        )}

        <button className={css.button} type="button" onClick={openModal}>
          Create note +
        </button>
      </header>

      <main className={css.mainContent}>
        {/* Завдяки prefetch, isLoading не буде true при першому завантаженні */}
        {isLoading && !data && <p className={css.status}>Loading notes...</p>}
        {isError && <p className={css.error}>Error loading notes!</p>}

        {data && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          !isLoading && <p className={css.status}>No notes found.</p>
        )}
      </main>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}
