import { useInfiniteQuery } from '@tanstack/react-query';
import { View } from 'react-native';
import { Text } from '~/components/Text/Text';
import { CommentType } from '~/screens/TemplateScreen/Api/types';
import { queries } from '../Api/queries';

type Props = {
  postId: string;
};

export const Comments = ({ postId }: Props) => {
  const comments = useInfiniteQuery({
    ...queries.comments.all(postId),
    initialPageParam: 1,
    getNextPageParam: (lastPage: CommentType[], pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
  });

  if (comments.isPending) return <Text title="Loading comments..." />;
  if (comments.error) return <Text title="Error loading comments" />;

  return (
    <View>
      {comments.data?.pages.flat().map((comment) => (
        <View key={comment.id}>
          <Text title={comment.body} />
          <Text title={comment.email} />
          <Text title={comment.name} />
        </View>
      ))}
    </View>
  );
};
