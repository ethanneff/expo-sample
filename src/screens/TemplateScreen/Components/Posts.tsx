import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { mutations } from '~/screens/TemplateScreen/Api/mutations';
import { queries } from '~/screens/TemplateScreen/Api/queries';
import { PostType } from '~/screens/TemplateScreen/Api/types';
import { PostUpdate } from '~/screens/TemplateScreen/Components/PostUpdate';
import { useAppTheme } from '~/theme/useAppTheme';
import { PostCreate } from './PostCreate';

type Modal =
  | {
      type: 'create';
    }
  | {
      type: 'update';
      postId: string;
    }
  | null;

export const Posts = () => {
  const { spacing, colors } = useAppTheme();
  const [modal, setModal] = useState<Modal>(null);
  const queryClient = useQueryClient();

  const posts = useInfiniteQuery({
    ...queries.posts.all(),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PostType[], pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
  });
  const deletePost = useMutation({
    mutationFn: (id: string) => mutations.posts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.posts.all().queryKey });
    },
  });

  if (posts.isPending && !posts.data) return <Text title="Loading posts..." />;
  if (posts.error) return <Text title="Error loading posts" />;

  return (
    <View>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding={spacing.$12}
        borderBottomWidth={1}
        borderBottomColor={colors.border}
        backgroundColor={colors.card}>
        <Text title="Posts" variant="h1" />
        <Button
          title=""
          icon="add"
          onPress={() => setModal({ type: 'create' })}
          variant="outline"
        />
      </View>
      <FlatList
        onRefresh={() => posts.refetch()}
        refreshing={posts.isRefetching}
        data={posts.data?.pages.flat()}
        onEndReached={() => {
          if (!posts.isFetching) return;
          posts.fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ gap: spacing.$12, padding: spacing.$12 }}
        renderItem={({ item }) => (
          <Card key={item.id}>
            <View gap={spacing.$8}>
              <View flexDirection="row" gap={spacing.$8} alignItems="center">
                <Text title={item.id} variant="lead" />
                <View flex={1} flexShrink={1}>
                  <Text title={item.title} variant="large" numberOfLines={1} />
                </View>
                <Button
                  title=""
                  icon="trash"
                  onPress={() => {
                    Alert.alert('Delete post', 'Are you sure you want to delete this post?', [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Delete', onPress: () => deletePost.mutate(item.id) },
                    ]);
                  }}
                  variant="outline"
                />
                <Button
                  title=""
                  icon="pencil"
                  onPress={() => setModal({ type: 'update', postId: item.id })}
                  variant="outline"
                />
              </View>
              <Text title={item.body} variant="muted" />
              <View alignSelf="flex-end">
                <Button title="Show Comments" onPress={() => {}} variant="outline" fitContent />
              </View>
            </View>
            {/* <Comments postId={post.id} /> */}
          </Card>
        )}
      />
      {modal?.type === 'create' && <PostCreate onClose={() => setModal(null)} />}
      {modal?.type === 'update' && (
        <PostUpdate onClose={() => setModal(null)} postId={modal.postId} />
      )}
    </View>
  );
};
