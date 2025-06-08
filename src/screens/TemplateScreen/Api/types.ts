export type PostType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  body: string;
};

export type CommentType = {
  id: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  name: string;
  email: string;
};
