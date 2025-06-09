import { type CommentType, type PostType } from '~/screens/TemplateScreen/Api/types';
import { endpoints } from './endpoints';

export const mutations = {
  comments: {
    create: (postId: string, data: CommentType) => endpoints.comments.create(postId, data),
    delete: (postId: string, commentId: string) => endpoints.comments.delete(postId, commentId),
    update: (postId: string, commentId: string, data: { title: string }) =>
      endpoints.comments.update(postId, commentId, data),
  },
  posts: {
    create: (data: PostType) => endpoints.posts.create(data),
    delete: (id: string) => endpoints.posts.delete(id),
    update: (data: PostType) => endpoints.posts.update(data),
  },
};
