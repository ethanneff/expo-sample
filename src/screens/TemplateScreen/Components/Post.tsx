import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { queries } from '~/screens/TemplateScreen/Api/queries';
import { Comments } from '~/screens/TemplateScreen/Components/Comments';
import { useAppTheme } from '~/theme/useAppTheme';
import { mutations } from '../Api/mutations';
import { type PostType } from '../Api/types';

type Properties = {
  readonly onUpdate: () => void;
  readonly post: PostType;
};

export const Post = ({ onUpdate, post }: Properties) => {
  const { spacing } = useAppTheme();
  const queryClient = useQueryClient();

  const [showComments, setShowComments] = useState(false);

  const { mutate } = useMutation({
    mutationFn: (id: string) => mutations.posts.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queries.posts.all().queryKey });
    },
  });

  const handleDeletePost = useCallback(() => {
    Alert.alert('Delete post', 'Are you sure you want to delete this post?', [
      { style: 'cancel', text: 'Cancel' },
      {
        onPress: () => {
          mutate(post.id);
        },
        text: 'Delete',
      },
    ]);
  }, [post.id, mutate]);

  const handleShowComments = useCallback(() => {
    setShowComments(!showComments);
  }, [showComments]);

  return (
    <Card key={post.id}>
      <View gap={spacing.$8}>
        <View alignItems="center" flexDirection="row" gap={spacing.$8}>
          <Text title={post.id} variant="lead" />
          <View flex={1} flexShrink={1}>
            <Text numberOfLines={1} title={post.title} variant="large" />
          </View>
          <Button icon="trash" onPress={handleDeletePost} title="" variant="outline" />
          <Button icon="pencil" onPress={onUpdate} title="" variant="outline" />
        </View>
        <Text title={post.body} variant="muted" />
        <View
          alignItems="center"
          flexDirection="row"
          gap={spacing.$8}
          justifyContent="space-between">
          <Text title={formatDistanceToNow(post.createdAt, { addSuffix: true })} variant="muted" />
          {showComments ? null : (
            <Button
              fitContent
              onPress={handleShowComments}
              title="Show Comments"
              variant="outline"
            />
          )}
        </View>
      </View>
      {showComments ? <Comments postId={post.id} /> : null}
    </Card>
  );
};
