import { CommentType, PostType } from '~/screens/TemplateScreen/Api/types';
import { endpoints } from './endpoints';

export const mutations = {
  comments: {
    create: (postId: string, data: CommentType) => endpoints.comments.create(postId, data),
    update: (postId: string, commentId: string, data: { title: string }) =>
      endpoints.comments.update(postId, commentId, data),
    delete: (postId: string, commentId: string) => endpoints.comments.delete(postId, commentId),
  },
  posts: {
    create: (data: PostType) => endpoints.posts.create(data),
    update: (data: PostType) => endpoints.posts.update(data),
    delete: (id: string) => endpoints.posts.delete(id),
  },
};
