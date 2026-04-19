import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '@/app/notes/Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Prefetch: завантажуємо дані на сервері
  // Використовуємо ті ж ключі, що і в useQuery на клієнті
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes({ page: 1, search: '', perPage: 12 }),
  });

  return (
    // Передаємо дегідрований стан кешу клієнтському компоненту
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
