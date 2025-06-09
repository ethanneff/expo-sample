import { type CommentType, type PostType } from './types';
import { useStoreApi } from './useStoreApi';

/**
 * This is the function that fetches data from the API
 */
const fetcher = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const { baseUrl } = useStoreApi.getState();
  const url = `${baseUrl}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 10_000);
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json() as Promise<T>;
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      throw new Error('Request timed out after 10 seconds');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
};

/**
 * Data Access Layer (DAL) which is user to fetch data from the API and mock endpoints in tests.
 */
export const endpoints = {
  comments: {
    create: (postId: string, data: CommentType) =>
      fetcher<CommentType>(`/posts/${postId}/comments`, {
        body: JSON.stringify(data),
        method: 'POST',
      }),
    delete: (postId: string, commentId: string) =>
      fetcher<Comment>(`/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      }),
    getAll: (postId: string, page: number, limit: number) =>
      fetcher<CommentType[]>(`/posts/${postId}/comments?page=${page}&limit=${limit}`),
    getById: (postId: string, commentId: string) =>
      fetcher<CommentType>(`/posts/${postId}/comments/${commentId}`),
    update: (postId: string, commentId: string, data: { title: string }) =>
      fetcher<Comment>(`/posts/${postId}/comments/${commentId}`, {
        body: JSON.stringify(data),
        method: 'PUT',
      }),
  },
  posts: {
    create: (data: PostType) =>
      fetcher<PostType>(`/posts`, {
        body: JSON.stringify(data),
        method: 'POST',
      }),
    delete: (id: string) =>
      fetcher<PostType>(`/posts/${id}`, {
        method: 'DELETE',
      }),
    getAll: (page: number, limit: number) =>
      fetcher<PostType[]>(`/posts?page=${page}&limit=${limit}`),
    getById: (id: string) => fetcher<PostType>(`/posts/${id}`),
    update: (data: PostType) =>
      fetcher<PostType>(`/posts/${data.id}`, {
        body: JSON.stringify(data),
        method: 'PUT',
      }),
  },
};
