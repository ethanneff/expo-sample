import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useState } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/Button/Button';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { queries } from '~/screens/TemplateScreen/Api/queries';
import { type PostType } from '~/screens/TemplateScreen/Api/types';
import { PostUpdate } from '~/screens/TemplateScreen/Components/PostUpdate';
import { useAppTheme } from '~/theme/useAppTheme';
import { Post } from './Post';
import { PostCreate } from './PostCreate';

type Modal = null | { postId: string; type: 'update' } | { type: 'create' };

const keyExtractor = (item: PostType) => item.id;

export const Posts = () => {
  const { colors, spacing } = useAppTheme();
  const [modal, setModal] = useState<Modal>(null);
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();

  const { data, error, fetchNextPage, isLoading, isRefetching } = useInfiniteQuery({
    ...queries.posts.all(),
    getNextPageParam: (lastPage: PostType[], pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const handleCreatePost = useCallback(() => {
    setModal({ type: 'create' });
  }, []);

  const handleUpdatePost = useCallback((postId: string) => {
    setModal({ postId, type: 'update' });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModal(null);
  }, []);

  const handleRefresh = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: queries.posts.all().queryKey });
  }, [queryClient]);

  const handleFetchNextPage = useCallback(() => {
    if (isLoading) return;
    void fetchNextPage();
  }, [isLoading, fetchNextPage]);

  const handleUpdate = useCallback(
    (postId: string) => () => {
      handleUpdatePost(postId);
    },
    [handleUpdatePost]
  );

  const handleRenderItem = useCallback(
    ({ item }: ListRenderItemInfo<PostType>) => {
      return <Post onUpdate={handleUpdate(item.id)} post={item} />;
    },
    [handleUpdate]
  );

  const handleListEmptyComponent = useCallback(() => {
    return (
      <View alignItems="center" flex={1} justifyContent="center">
        <Text title="No posts found" variant="muted" />
      </View>
    );
  }, []);

  if (isLoading) return <Text title="Loading posts..." />;
  if (error) return <Text title="Error loading posts" />;

  return (
    <React.Fragment>
      <View
        alignItems="center"
        backgroundColor={colors.card}
        borderBottomColor={colors.border}
        borderBottomWidth={1}
        flexDirection="row"
        justifyContent="space-between"
        padding={spacing.$12}>
        <Text title="Posts" variant="h1" />
        <Button icon="add" onPress={handleCreatePost} title="" variant="outline" />
      </View>
      <FlatList
        contentContainerStyle={{
          gap: spacing.$12,
          padding: spacing.$12,
          paddingBottom: insets.bottom,
        }}
        data={data?.pages.flat()}
        keyExtractor={keyExtractor}
        ListEmptyComponent={handleListEmptyComponent}
        onEndReached={handleFetchNextPage}
        onEndReachedThreshold={0.5}
        onRefresh={handleRefresh}
        refreshing={isRefetching}
        renderItem={handleRenderItem}
      />
      {modal?.type === 'create' && <PostCreate onClose={handleCloseModal} />}
      {modal?.type === 'update' && <PostUpdate onClose={handleCloseModal} postId={modal.postId} />}
    </React.Fragment>
  );
};
