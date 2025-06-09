import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { endpoints } from './endpoints';

type QueryProperties = {
  pageParam: number;
};

export const queries = createQueryKeyStore({
  comments: {
    all: (postId: string, limit = 5) => ({
      queryFn: ({ pageParam }: QueryProperties) =>
        endpoints.comments.getAll(postId, pageParam, limit),
      queryKey: ['comments', postId, limit],
    }),
    detail: (postId: string, commentId: string) => ({
      queryFn: () => endpoints.comments.getById(postId, commentId),
      queryKey: ['comments', postId, commentId],
    }),
  },
  posts: {
    all: (limit = 10) => ({
      queryFn: ({ pageParam }: QueryProperties) => endpoints.posts.getAll(pageParam, limit),
      queryKey: ['posts', 'all', 1, limit],
    }),
    detail: (id: string) => ({ queryFn: () => endpoints.posts.getById(id), queryKey: [id] }),
  },
});
