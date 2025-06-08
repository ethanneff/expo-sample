import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { endpoints } from './endpoints';

type QueryProps = {
  pageParam: number;
};

export const queries = createQueryKeyStore({
  comments: {
    all: (postId: string, limit: number = 10) => ({
      queryKey: ['comments', postId, limit],
      queryFn: ({ pageParam }: QueryProps) => endpoints.comments.getAll(postId, pageParam, limit),
    }),
    detail: (postId: string, commentId: string) => ({
      queryKey: ['comments', postId, commentId],
      queryFn: () => endpoints.comments.getById(postId, commentId),
    }),
  },
  posts: {
    all: (limit: number = 10) => ({
      queryKey: ['posts', 'all', 1, limit],
      queryFn: ({ pageParam }: QueryProps) => endpoints.posts.getAll(pageParam, limit),
    }),
    detail: (id: string) => ({ queryKey: [id], queryFn: () => endpoints.posts.getById(id) }),
  },
});
